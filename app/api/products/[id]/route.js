import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import User from '@/models/User';
import { sendPriceChangeEmail, sendStockAvailableEmail } from '@/lib/notifications';

// GET - Tek ürün getir
export async function GET(request, { params }) {
 try {
  await dbConnect();
  // Next.js App Router'da params async olabilir
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const product = await Product.findById(id);

  if (!product) {
   return NextResponse.json(
    { success: false, error: 'Ürün bulunamadı' },
    { status: 404 }
   );
  }

  // Görüntülenme sayısını artır
  product.viewCount += 1;
  await product.save();

  return NextResponse.json({ success: true, data: product });
 } catch (error) {
  return NextResponse.json(
   { success: false, error: 'Ürün getirilemedi' },
   { status: 500 }
  );
 }
}

// PUT - Ürün güncelle (Admin)
export async function PUT(request, { params }) {
 try {
  // Admin kontrolü
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin-session');

  if (!adminSession || adminSession.value !== 'authenticated') {
   return NextResponse.json(
    { success: false, error: 'Yetkisiz erişim. Admin girişi gereklidir.' },
    { status: 401 }
   );
  }

  await dbConnect();
  // Next.js App Router'da params async olabilir
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const body = await request.json();

  // Önce ürünün var olup olmadığını kontrol et
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
   return NextResponse.json(
    { success: false, error: 'Ürün bulunamadı' },
    { status: 404 }
   );
  }

  // Slug oluştur (eğer name değiştiyse)
  let slug = existingProduct.slug;
  if (body.name && body.name !== existingProduct.name) {
   slug = body.name
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
   slug = `${slug}-${Date.now()}`;
  }

  // Fiyat validasyonu
  if (body.price !== undefined) {
   const price = parseFloat(body.price);
   if (isNaN(price) || price <= 0) {
    return NextResponse.json(
     { success: false, error: 'Fiyat geçerli bir pozitif sayı olmalıdır!' },
     { status: 400 }
    );
   }
  }

  // İndirimli fiyat validasyonu
  if (body.discountPrice !== undefined && body.discountPrice !== null && body.discountPrice !== '') {
   const discountPrice = parseFloat(body.discountPrice);
   const price = body.price !== undefined ? parseFloat(body.price) : existingProduct.price;

   if (isNaN(discountPrice) || discountPrice <= 0) {
    return NextResponse.json(
     { success: false, error: 'İndirimli fiyat pozitif bir sayı olmalıdır!' },
     { status: 400 }
    );
   }

   if (discountPrice >= price) {
    return NextResponse.json(
     { success: false, error: 'İndirimli fiyat normal fiyattan küçük olmalıdır!' },
     { status: 400 }
    );
   }
  }

  const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', "3XL", '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'];
  let processedSizes = existingProduct.sizes;
  if (body.sizes && Array.isArray(body.sizes)) {
   processedSizes = body.sizes.map(s => {
    const upperSize = String(s).trim().toUpperCase();
    return validSizes.includes(upperSize) ? upperSize : null;
   }).filter(Boolean);
  }

  // Eski fiyatları ve stoku kaydet (bildirim için)
  const oldPrice = existingProduct.price;
  const oldDiscountPrice = existingProduct.discountPrice || null;
  const oldEffectivePrice = oldDiscountPrice && oldDiscountPrice < oldPrice
   ? oldDiscountPrice
   : oldPrice;
  const oldStock = existingProduct.stock || 0;

  let product;
  try {
   product = await Product.findByIdAndUpdate(
    id,
    {
     ...body,
     sizes: processedSizes,
     slug: slug,
    },
    { new: true, runValidators: true }
   );
  } catch (validationError) {
   // Mongoose validasyon hatası
   if (validationError.name === 'ValidationError') {
    const validationMessages = Object.values(validationError.errors || {}).map(err => err.message).join(', ');
    return NextResponse.json(
     {
      success: false,
      error: `Validasyon hatası: ${validationMessages || validationError.message}`,
      details: process.env.NODE_ENV === 'development' ? validationError.message : undefined
     },
     { status: 400 }
    );
   }
   // Diğer hatalar
   throw validationError;
  }

  if (!product) {
   return NextResponse.json(
    { success: false, error: 'Ürün bulunamadı' },
    { status: 404 }
   );
  }

  // Yeni efektif fiyatı hesapla (indirimli fiyat varsa ve price'dan küçükse onu kullan)
  const newDiscountPrice = product.discountPrice || null;
  const newPrice = newDiscountPrice && newDiscountPrice < product.price
   ? newDiscountPrice
   : product.price;

  // Fiyat değişikliği kontrolü
  // Hem price hem de discountPrice değişikliklerini kontrol et
  const priceFieldChanged = 'price' in body;
  const discountPriceFieldChanged = 'discountPrice' in body;

  const priceChanged = priceFieldChanged && parseFloat(body.price) !== parseFloat(oldPrice);

  // discountPrice değişikliği: ya yeni değer gönderildi ya da kaldırıldı (null/undefined/boş string)
  const newDiscountPriceValue = discountPriceFieldChanged
   ? (body.discountPrice === null || body.discountPrice === '' || body.discountPrice === undefined ? null : parseFloat(body.discountPrice))
   : (product.discountPrice || null);

  const oldDiscountPriceValue = oldDiscountPrice ? parseFloat(oldDiscountPrice) : null;
  const discountPriceChanged = discountPriceFieldChanged && newDiscountPriceValue !== oldDiscountPriceValue;

  // Efektif fiyat değişikliği kontrolü (kullanıcının göreceği fiyat)
  const effectivePriceChanged = Math.abs(newPrice - oldEffectivePrice) > 0.01; // Küçük farkları da yakala

  const isPriceDrop = newPrice < oldEffectivePrice;

  if ((priceChanged || discountPriceChanged) && effectivePriceChanged && isPriceDrop) {
   // Bu ürünü favorilerine ekleyen kullanıcıları bul
   try {
    const usersWithFavorite = await User.find({
     favorites: id
    }).select('name email phone notificationPreferences');

    // Her kullanıcıya bildirim gönder (tercihlerine göre)
    // Fiyat düşüşü bildirimi: hem campaignNotifications hem emailNotifications açık olmalı
    for (const user of usersWithFavorite) {
     // E-posta bildirimi (hem kampanya hem e-posta tercihi açıksa)
     if (user.notificationPreferences?.campaignNotifications && user.notificationPreferences?.emailNotifications && user.email) {
      try {
       const productUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/urun/${product.slug}`;
       await sendPriceChangeEmail(
        user.email,
        user.name,
        product.name,
        oldEffectivePrice,
        newPrice,
        productUrl
       );
      } catch (emailError) {
      }
     }

    }
   } catch (notificationError) {
   }
  }

  // Stok değişikliği kontrolü (stok 0'dan büyük bir değere çıktıysa bildirim gönder)
  const newStock = product.stock || 0;
  const stockFieldChanged = 'stock' in body;
  const stockAdded = stockFieldChanged && oldStock <= 0 && newStock > 0;

  if (stockAdded) {
   // Bu ürünü favorilerine ekleyen kullanıcıları bul
   try {
    const usersWithFavorite = await User.find({
     favorites: id
    }).select('name email phone notificationPreferences');

    // Her kullanıcıya bildirim gönder (tercihlerine göre)
    // Stok artışı bildirimi: hem campaignNotifications hem emailNotifications açık olmalı
    for (const user of usersWithFavorite) {
     // E-posta bildirimi (hem kampanya hem e-posta tercihi açıksa)
     if (user.notificationPreferences?.campaignNotifications && user.notificationPreferences?.emailNotifications && user.email) {
      try {
       const productUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/urun/${product.slug}`;
       await sendStockAvailableEmail(
        user.email,
        user.name,
        product.name,
        productUrl
       );
      } catch (emailError) {
      }
     }

    }
   } catch (notificationError) {
   }
  }

  return NextResponse.json({ success: true, data: product });
 } catch (error) {
  return NextResponse.json(
   {
    success: false,
    error: error.message || 'Ürün güncellenemedi',
    details: process.env.NODE_ENV === 'development' ? error.stack : undefined
   },
   { status: 500 }
  );
 }
}

// DELETE - Ürün sil (Admin)
export async function DELETE(request, { params }) {
 try {
  await dbConnect();
  // Next.js App Router'da params async olabilir
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
   return NextResponse.json(
    { success: false, error: 'Ürün bulunamadı' },
    { status: 404 }
   );
  }

  return NextResponse.json({ success: true, data: {} });
 } catch (error) {
  return NextResponse.json(
   { success: false, error: 'Ürün silinemedi' },
   { status: 500 }
  );
 }
}