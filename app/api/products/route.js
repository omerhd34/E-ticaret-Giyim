import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

// GET - Tüm ürünleri getir
export async function GET(request) {
 try {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const subCategory = searchParams.get('subCategory');
  const isNew = searchParams.get('isNew');
  const isFeatured = searchParams.get('isFeatured');
  const search = searchParams.get('search') || searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '50');
  const sort = searchParams.get('sort') || '-createdAt';

  let query = {};

  // Arama parametresi varsa name, description ve tags'de ara
  if (search && search.trim()) {
   const searchTerm = search.trim();
   const searchRegex = new RegExp(searchTerm, 'i');
   query.$or = [
    { name: searchRegex },
    { description: searchRegex },
    { tags: { $in: [searchRegex] } },
    { brand: searchRegex },
    { category: searchRegex },
    { subCategory: searchRegex }
   ];
  }

  // Özel kategoriler için özel filtreleme
  if (category === 'YENİ GELENLER' || category === 'Yeni Gelenler') {
   // Yeni ürünler için isNew filtresi
   query.isNew = true;
  } else if (category === 'İndirimler') {
   // İndirimli ürünler için discountPrice olanları filtrele (price'dan küçük olmalı)
   query.$and = [
    { discountPrice: { $exists: true, $ne: null, $gt: 0 } },
    { $expr: { $lt: ['$discountPrice', '$price'] } }
   ];
  } else if (category) {
   // Normal kategoriler için kategori araması
   query.category = { $regex: new RegExp(`^${category}$`, 'i') };
  }

  if (subCategory) {
   // Case-insensitive alt kategori araması
   query.subCategory = { $regex: new RegExp(`^${subCategory}$`, 'i') };
  }

  if (isNew === 'true') {
   query.isNew = true;
  }

  if (isFeatured === 'true') {
   query.isFeatured = true;
  }

  let products;

  // Eğer arama varsa text search kullan, yoksa normal query
  if (search && search.trim()) {
   products = await Product.find(query)
    .sort(sort)
    .limit(limit)
    .lean();
  } else {
   products = await Product.find(query)
    .sort(sort)
    .limit(limit)
    .lean();
  }

  // rating/reviewCount alanları bazı eski kayıtlarda hatalı kalabiliyor.
  // Liste/kart tarafında tutarlı görünmesi için ratings dizisinden yeniden hesapla.
  const normalizedProducts = (products || []).map((p) => {
   const ratingsArr = Array.isArray(p?.ratings) ? p.ratings : [];
   const reviewCount = ratingsArr.length;
   const avgRaw = reviewCount > 0
    ? ratingsArr.reduce((sum, r) => sum + (Number(r?.rating) || 0), 0) / reviewCount
    : 0;
   const rating = Math.round(avgRaw * 10) / 10;
   return { ...p, rating, reviewCount };
  });

  return NextResponse.json({ success: true, data: normalizedProducts });
 } catch (error) {
  return NextResponse.json(
   { success: false, error: 'ÃœrÃ¼nler getirilemedi' },
   { status: 500 }
  );
 }
}

// POST - Yeni ürün ekle (Admin)
export async function POST(request) {
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

  const body = await request.json();

  // Slug oluştur
  const slug = body.name
   .toLowerCase()
   .replace(/ğ/g, 'g')
   .replace(/ü/g, 'u')
   .replace(/ş/g, 's')
   .replace(/ı/g, 'i')
   .replace(/ö/g, 'o')
   .replace(/ç/g, 'c')
   .replace(/[^a-z0-9]+/g, '-')
   .replace(/^-+|-+$/g, '');

  // Fiyat validasyonu
  const price = parseFloat(body.price);
  if (isNaN(price) || price <= 0) {
   return NextResponse.json(
    { success: false, error: 'Fiyat geçerli bir pozitif sayı olmalıdır!' },
    { status: 400 }
   );
  }

  // İndirimli fiyat validasyonu
  if (body.discountPrice !== undefined && body.discountPrice !== null && body.discountPrice !== '') {
   const discountPrice = parseFloat(body.discountPrice);

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
  const processedSizes = body.sizes && Array.isArray(body.sizes)
   ? body.sizes.map(s => {
    const upperSize = String(s).trim().toUpperCase();
    return validSizes.includes(upperSize) ? upperSize : null;
   }).filter(Boolean)
   : [];

  const product = await Product.create({
   ...body,
   sizes: processedSizes,
   slug: `${slug}-${Date.now()}`,
  });

  return NextResponse.json({ success: true, data: product }, { status: 201 });
 } catch (error) {
  return NextResponse.json(
   {
    success: false,
    error: error.message || 'Ürün eklenemedi',
    details: process.env.NODE_ENV === 'development' ? error.stack : undefined
   },
   { status: 500 }
  );
 }
}