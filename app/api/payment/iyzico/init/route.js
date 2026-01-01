import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Product from '@/models/Product';
import Iyzipay from 'iyzipay';

// İyzico Ödeme Başlatma
export async function POST(request) {
 try {
  await dbConnect();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user-session');

  if (!sessionCookie || !sessionCookie.value) {
   return NextResponse.json({ success: false, message: 'Oturum bulunamadı' }, { status: 401 });
  }

  let session;
  try {
   session = JSON.parse(sessionCookie.value);
  } catch {
   return NextResponse.json({ success: false, message: 'Oturum hatası. Lütfen tekrar giriş yapın.' }, { status: 401 });
  }

  if (!session?.id) {
   return NextResponse.json({ success: false, message: 'Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.' }, { status: 401 });
  }

  const body = await request.json();
  const { items, total, address, cardId } = body || {};

  if (!Array.isArray(items) || items.length === 0) {
   return NextResponse.json({ success: false, message: 'Sepet boş' }, { status: 400 });
  }
  if (!address?.id) {
   return NextResponse.json({ success: false, message: 'Adres seçilmedi' }, { status: 400 });
  }

  // İyzico bilgileri
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const baseUrl = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';
  // sandbox veya https://api.iyzipay.com

  if (!apiKey || !secretKey) {
   return NextResponse.json({ success: false, message: 'İyzico ayarları eksik. Lütfen yöneticiye başvurun.' }, { status: 500 });
  }

  // İyzico client oluştur
  const iyzipay = new Iyzipay({
   apiKey: apiKey,
   secretKey: secretKey,
   uri: baseUrl,
  });

  const user = await User.findById(session.id);
  if (!user) {
   return NextResponse.json({ success: false, message: 'Kullanıcı bulunamadı' }, { status: 404 });
  }

  // Ürün fiyatlarını kontrol et
  const normalizedItems = items.map((it) => ({
   ...it,
   productId: String(it?.productId || it?._id || it?.id || ""),
   quantity: Number(it?.quantity || 1) || 1,
  }));
  const productIds = Array.from(new Set(normalizedItems.map((it) => it.productId).filter(Boolean)));
  const products = await Product.find({ _id: { $in: productIds } }).select("price discountPrice name slug images").lean();
  const productById = new Map(products.map((p) => [String(p._id), p]));

  const repricedItems = normalizedItems.map((it) => {
   const p = productById.get(String(it.productId));
   if (!p) return { ...it, _missingProduct: true };
   const price = p.discountPrice && p.discountPrice < p.price ? p.discountPrice : p.price;
   return {
    ...it,
    name: it.name || p.name,
    slug: it.slug || p.slug,
    image: it.image || p?.images?.[0] || "",
    price: Number(price || 0),
   };
  });
  const missing = repricedItems.find((it) => it._missingProduct);
  if (missing) {
   return NextResponse.json(
    { success: false, message: "Sepetinizdeki ürünlerden bazıları artık bulunamadı. Lütfen sepeti güncelleyin." },
    { status: 404 }
   );
  }

  const itemsTotal = repricedItems.reduce((sum, it) => sum + (Number(it.price || 0) * (Number(it.quantity || 1) || 1)), 0);
  const shippingCost = itemsTotal >= 500 ? 0 : 29.99;
  const serverGrandTotal = Math.round((itemsTotal + shippingCost) * 100) / 100;

  // Sipariş ID oluştur
  const orderId = `YZT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  // Adres bilgilerini al
  const selectedAddress = user.addresses?.find((a) => String(a._id) === String(address.id));
  if (!selectedAddress) {
   return NextResponse.json({ success: false, message: 'Adres bulunamadı' }, { status: 404 });
  }

  const baseUrlFrontend = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');
  const callbackUrl = `${baseUrlFrontend}/odeme-basarili`;

  // İyzico checkout form initialization
  const userIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
  const iyzicoRequest = {
   locale: Iyzipay.LOCALE.TR,
   conversationId: orderId,
   price: serverGrandTotal.toFixed(2),
   paidPrice: serverGrandTotal.toFixed(2),
   currency: Iyzipay.CURRENCY.TRY,
   basketId: orderId,
   paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
   callbackUrl: callbackUrl,
   enabledInstallments: [1], // Taksit yok
   buyer: {
    id: String(session.id),
    name: user.name || '',
    surname: user.name?.split(' ').slice(1).join(' ') || '',
    gsmNumber: selectedAddress.phone || user.phone || '',
    email: user.email || '',
    identityNumber: '11111111111', // Test için, gerçek uygulamada kullanıcıdan alınmalı
    lastLoginDate: new Date().toISOString().split('T')[0],
    registrationDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    registrationAddress: `${selectedAddress.address}, ${selectedAddress.district}/${selectedAddress.city}`,
    ip: userIp,
    city: selectedAddress.city || '',
    country: 'Turkey',
    zipCode: '', // İsteğe bağlı
   },
   shippingAddress: {
    contactName: `${selectedAddress.fullName}`,
    city: selectedAddress.city || '',
    country: 'Turkey',
    address: selectedAddress.address || '',
    zipCode: '', // İsteğe bağlı
   },
   billingAddress: {
    contactName: `${selectedAddress.fullName}`,
    city: selectedAddress.city || '',
    country: 'Turkey',
    address: selectedAddress.address || '',
    zipCode: '', // İsteğe bağlı
   },
   basketItems: repricedItems.map((item, index) => ({
    id: String(item.productId || index),
    name: item.name || 'Ürün',
    category1: 'Genel',
    category2: '',
    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
    price: (item.price * item.quantity).toFixed(2),
   })),
  };

  // İyzico API çağrısı (Promise wrapper)
  return new Promise((resolve) => {
   iyzipay.checkoutFormInitialize.create(iyzicoRequest, async (err, result) => {
    if (err) {
     console.error('İyzico error:', err);
     resolve(NextResponse.json({ success: false, message: err.message || 'Ödeme başlatılamadı' }, { status: 400 }));
     return;
    }

    if (result.status === 'success') {
     // Geçici sipariş bilgilerini sakla
     const tempOrder = {
      orderId,
      userId: session.id,
      items: repricedItems,
      total: serverGrandTotal,
      address: {
       id: address.id,
       summary: address.summary,
       shippingAddress: address.shippingAddress,
       billingAddress: address.billingAddress,
      },
      cardId: cardId || null,
      createdAt: new Date(),
     };

     if (!user.tempOrders) user.tempOrders = [];
     user.tempOrders.push(tempOrder);
     if (user.tempOrders.length > 10) {
      user.tempOrders = user.tempOrders.slice(-10);
     }
     await user.save();

     resolve(NextResponse.json({
      success: true,
      checkoutFormContent: result.checkoutFormContent,
      paymentPageUrl: result.paymentPageUrl,
      orderId,
     }));
    } else {
     resolve(NextResponse.json({
      success: false,
      message: result.errorMessage || 'Ödeme başlatılamadı',
     }, { status: 400 }));
    }
   });
  });
 } catch (error) {
  console.error('İyzico init error:', error);
  return NextResponse.json({ success: false, message: 'Ödeme başlatılamadı', error: error.message }, { status: 500 });
 }
}

