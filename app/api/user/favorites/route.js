import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// GET - Kullanıcının favorilerini getir
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

  const user = await User.findById(userData.id).populate('favorites');

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 404 }
   );
  }

  // Favoriler populate edilmişse tam obje, değilse sadece ID
  // Frontend'de kullanmak için ID'leri döndür
  const favoriteIds = (user.favorites || []).map(fav => {
   if (fav && fav._id) {
    return fav._id.toString();
   }
   return fav ? fav.toString() : null;
  }).filter(Boolean);

  return NextResponse.json({
   success: true,
   favorites: favoriteIds,
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Favoriler getirilemedi', error: error.message },
   { status: 500 }
  );
 }
}

// POST - Favorilere ürün ekle
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
  const { productId } = body;

  if (!productId) {
   return NextResponse.json(
    { success: false, message: 'Ürün ID gereklidir' },
    { status: 400 }
   );
  }

  const user = await User.findById(userData.id);

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 404 }
   );
  }

  // Ürün zaten favorilerde mi kontrol et
  if (user.favorites && user.favorites.includes(productId)) {
   return NextResponse.json({
    success: true,
    message: 'Ürün zaten favorilerinizde',
    favorites: user.favorites,
   });
  }

  // Favorilere ekle
  if (!user.favorites) {
   user.favorites = [];
  }
  user.favorites.push(productId);
  await user.save();

  return NextResponse.json({
   success: true,
   message: 'Ürün favorilere eklendi',
   favorites: user.favorites,
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Favorilere eklenemedi', error: error.message },
   { status: 500 }
  );
 }
}

// DELETE - Favorilerden ürün çıkar
export async function DELETE(request) {
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

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
   return NextResponse.json(
    { success: false, message: 'Ürün ID gereklidir' },
    { status: 400 }
   );
  }

  const user = await User.findById(userData.id);

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.' },
    { status: 404 }
   );
  }

  // Favorilerden çıkar
  if (user.favorites) {
   user.favorites = user.favorites.filter(
    favId => favId.toString() !== productId.toString()
   );
   await user.save();
  }

  return NextResponse.json({
   success: true,
   message: 'Ürün favorilerden çıkarıldı',
   favorites: user.favorites || [],
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Favorilerden çıkarılamadı', error: error.message },
   { status: 500 }
  );
 }
}

