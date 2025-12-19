import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// GET - Kullanıcının kartlarını getir
export async function GET() {
 try {
  await dbConnect();

  const cookieStore = await cookies();
  const session = cookieStore.get('user-session');

  if (!session || !session.value) {
   return NextResponse.json(
    { success: false, message: 'Oturum bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 401 }
   );
  }

  let userData;
  try {
   userData = JSON.parse(session.value);
  } catch (parseError) {
   return NextResponse.json(
    { success: false, message: 'Oturum hatası. Lütfen tekrar giriş yapın.' },
    { status: 401 }
   );
  }

  if (!userData || !userData.id) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 401 }
   );
  }

  const user = await User.findById(userData.id);

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 404 }
   );
  }

  return NextResponse.json({
   success: true,
   cards: user.cards || [],
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Kartlar getirilemedi', error: error.message },
   { status: 500 }
  );
 }
}

// POST - Yeni kart ekle
export async function POST(request) {
 try {
  await dbConnect();

  const cookieStore = await cookies();
  const session = cookieStore.get('user-session');

  if (!session || !session.value) {
   return NextResponse.json(
    { success: false, message: 'Oturum bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 401 }
   );
  }

  let userData;
  try {
   userData = JSON.parse(session.value);
  } catch (parseError) {
   return NextResponse.json(
    { success: false, message: 'Oturum hatası. Lütfen tekrar giriş yapın.' },
    { status: 401 }
   );
  }

  if (!userData || !userData.id) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 401 }
   );
  }

  const body = await request.json();

  const user = await User.findById(userData.id);

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 404 }
   );
  }

  // Eğer yeni kart varsayılan ise, diğerlerini varsayılan olmaktan çıkar
  if (body.isDefault && user.cards && user.cards.length > 0) {
   user.cards.forEach(card => {
    card.isDefault = false;
   });
  }

  // Kartları ekle
  if (!user.cards) {
   user.cards = [];
  }

  // Kart numarasını sadece son 4 hanesini sakla (güvenlik için)
  const cardNumber = body.cardNumber.replace(/\s/g, '');
  const last4Digits = cardNumber.slice(-4);
  const maskedCardNumber = '**** **** **** ' + last4Digits;

  // Yeni kart oluştur
  user.cards.push({
   cardName: body.cardName,
   cardNumber: maskedCardNumber, // Sadece son 4 hane saklanıyor
   cardHolderName: body.cardHolderName,
   expiryDate: body.expiryDate,
   cvv: body.cvv,
   isDefault: body.isDefault || false,
  });

  await user.save();

  const newCard = user.cards[user.cards.length - 1];

  return NextResponse.json({
   success: true,
   message: 'Kart eklendi',
   card: newCard,
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Kart eklenemedi', error: error.message },
   { status: 500 }
  );
 }
}

