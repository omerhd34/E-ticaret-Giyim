import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// PUT - Kart güncelle
export async function PUT(request, { params }) {
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

  const resolvedParams = await params;
  const { id } = resolvedParams;
  const body = await request.json();

  const user = await User.findById(userData.id);

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 404 }
   );
  }

  const cardIdStr = String(id).trim();

  let card = user.cards.id(cardIdStr);

  if (!card) {
   card = user.cards.find(c => {
    const cIdStr = c._id ? c._id.toString() : String(c._id);
    return cIdStr === cardIdStr;
   });
  }

  if (!card) {
   return NextResponse.json(
    { success: false, message: 'Kart bulunamadı' },
    { status: 404 }
   );
  }

  // Eğer güncellenen kart varsayılan ise, diğerlerini varsayılan olmaktan çıkar
  if (body.isDefault && user.cards && user.cards.length > 0) {
   user.cards.forEach(c => {
    const cIdStr = c._id ? c._id.toString() : String(c._id);
    if (cIdStr !== cardIdStr) {
     c.isDefault = false;
    }
   });
  }

  // Kart numarası değiştiyse ve maskelenmiş değilse, sadece son 4 hanesini sakla
  if (body.cardNumber && !body.cardNumber.startsWith('****')) {
   const cardNumber = body.cardNumber.replace(/\s/g, '');
   const last4Digits = cardNumber.slice(-4);
   card.cardNumber = '**** **** **** ' + last4Digits;
  }

  // Sadece gerekli alanları güncelle (MongoDB özel alanlarını hariç tut)
  if (body.cardName !== undefined) card.cardName = body.cardName;
  if (body.cardHolderName !== undefined) card.cardHolderName = body.cardHolderName;
  if (body.expiryDate !== undefined) card.expiryDate = body.expiryDate;
  if (body.cvv !== undefined) card.cvv = body.cvv;
  if (body.isDefault !== undefined) card.isDefault = body.isDefault;

  await user.save();

  return NextResponse.json({
   success: true,
   message: 'Kart güncellendi',
   card: card,
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Kart güncellenemedi', error: error.message },
   { status: 500 }
  );
 }
}

// DELETE - Kart sil
export async function DELETE(request, { params }) {
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

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const user = await User.findById(userData.id);

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 404 }
   );
  }

  const cardIdStr = String(id).trim();

  const cardIndex = user.cards.findIndex(c => {
   const cIdStr = c._id ? c._id.toString() : String(c._id);
   return cIdStr === cardIdStr;
  });

  if (cardIndex === -1) {
   return NextResponse.json(
    { success: false, message: 'Kart bulunamadı' },
    { status: 404 }
   );
  }

  user.cards.splice(cardIndex, 1);
  await user.save();

  return NextResponse.json({
   success: true,
   message: 'Kart silindi',
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Kart silinemedi', error: error.message },
   { status: 500 }
  );
 }
}

