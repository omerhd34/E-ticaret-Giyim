import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Product from '@/models/Product';
import { sendAdminNewOrderEmail, sendUserOrderConfirmationEmail } from '@/lib/notifications';
import Iyzipay from 'iyzipay';

// İyzico Callback Handler
export async function POST(request) {
 try {
  await dbConnect();

  const body = await request.json();
  const { token, orderId } = body || {};

  if (!token) {
   return NextResponse.json({ success: false, message: 'Token bulunamadı' }, { status: 400 });
  }

  // İyzico bilgileri
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const baseUrl = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

  if (!apiKey || !secretKey) {
   return NextResponse.json({ success: false, message: 'İyzico ayarları eksik' }, { status: 500 });
  }

  // İyzico client oluştur
  const iyzipay = new Iyzipay({
   apiKey: apiKey,
   secretKey: secretKey,
   uri: baseUrl,
  });

  // Ödeme sonucunu kontrol et
  return new Promise((resolve) => {
   iyzipay.checkoutForm.retrieve({ token: token }, async (err, result) => {
    if (err) {
     console.error('İyzico callback error:', err);
     resolve(NextResponse.json({ success: false, message: err.message || 'Ödeme kontrol edilemedi' }, { status: 400 }));
     return;
    }

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
     // Kullanıcıyı bul (tempOrders'tan)
     const merchantOid = result.conversationId || orderId;
     if (!merchantOid) {
      resolve(NextResponse.json({ success: false, message: 'Sipariş ID bulunamadı' }, { status: 400 }));
      return;
     }

     const users = await User.find({ 'tempOrders.orderId': merchantOid });
     if (!users || users.length === 0) {
      resolve(NextResponse.json({ success: false, message: 'Sipariş bulunamadı' }, { status: 404 }));
      return;
     }

     const user = users[0];
     const tempOrder = user.tempOrders?.find((o) => o.orderId === merchantOid);

     if (!tempOrder) {
      resolve(NextResponse.json({ success: false, message: 'Geçici sipariş bulunamadı' }, { status: 404 }));
      return;
     }

     // Siparişi oluştur
     const order = {
      orderId: merchantOid,
      date: new Date(),
      status: 'Ödendi',
      total: Number(result.paidPrice || tempOrder.total),
      items: tempOrder.items,
      payment: {
       type: 'card',
       method: 'İyzico',
       transactionId: result.paymentId || token,
       paymentStatus: result.paymentStatus,
       currency: result.currency,
       installment: result.installment,
      },
      addressId: String(tempOrder.address.id),
      addressSummary: tempOrder.address.summary || '',
      shippingAddress: tempOrder.address.shippingAddress || null,
      billingAddress: tempOrder.address.billingAddress || null,
      createdAt: new Date(),
     };

     if (!Array.isArray(user.orders)) user.orders = [];
     user.orders.unshift(order);

     // Geçici siparişi temizle
     user.tempOrders = user.tempOrders.filter((o) => o.orderId !== merchantOid);
     await user.save();

     // Ürünlerin soldCount değerlerini güncelle
     try {
      for (const item of tempOrder.items) {
       const productId = item.productId;
       if (productId) {
        await Product.findByIdAndUpdate(
         productId,
         { $inc: { soldCount: item.quantity || 1 } },
         { new: true }
        );
       }
      }
     } catch (soldCountError) {
      // soldCount update error - silently fail
     }

     // Admin'e e-posta bildirimi
     try {
      const adminEmail = process.env.EMAIL_USER;
      if (adminEmail) {
       await sendAdminNewOrderEmail({
        adminEmail,
        orderId: merchantOid,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        total: order.total,
        paymentMethod: 'Kart ile Ödeme (İyzico)',
        addressSummary: tempOrder.address.summary || '',
        items: tempOrder.items,
       });
      }
     } catch (e) {
      // Admin email error - silently fail
     }

     // Müşteriye e-posta bildirimi
     try {
      const emailNotificationsEnabled = user.notificationPreferences?.emailNotifications !== false;
      if (emailNotificationsEnabled && user.email) {
       await sendUserOrderConfirmationEmail({
        userEmail: user.email,
        userName: user.name,
        orderId: merchantOid,
        orderDate: order.date,
        total: order.total,
        paymentMethod: 'Kart ile Ödeme (İyzico)',
        addressSummary: tempOrder.address.summary || '',
        items: tempOrder.items,
       });
      }
     } catch (e) {
      // User email error - silently fail
     }

     resolve(NextResponse.json({ success: true, message: 'Ödeme başarılı', orderId: merchantOid }));
    } else {
     // Ödeme başarısız
     const merchantOid = result.conversationId || orderId;
     if (merchantOid) {
      const users = await User.find({ 'tempOrders.orderId': merchantOid });
      if (users && users.length > 0) {
       const user = users[0];
       user.tempOrders = user.tempOrders.filter((o) => o.orderId !== merchantOid);
       await user.save();
      }
     }

     resolve(NextResponse.json({
      success: false,
      message: result.errorMessage || 'Ödeme başarısız',
      errorCode: result.errorCode,
     }));
    }
   });
  });
 } catch (error) {
  console.error('İyzico callback error:', error);
  return NextResponse.json({ success: false, message: 'Callback işlenirken hata oluştu', error: error.message }, { status: 500 });
 }
}

