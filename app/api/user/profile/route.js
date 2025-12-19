import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// GET - Kullanıcı profil bilgilerini getir
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

  const user = await User.findById(userData.id).select('-password');

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Kullanıcı bulunamadı' },
    { status: 404 }
   );
  }

  return NextResponse.json({
   success: true,
   user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    profileImage: user.profileImage || '',
    notificationPreferences: {
     emailNotifications: user.notificationPreferences?.emailNotifications !== undefined ? user.notificationPreferences.emailNotifications : true,
     campaignNotifications: user.notificationPreferences?.campaignNotifications !== undefined ? user.notificationPreferences.campaignNotifications : false,
    },
   },
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Profil bilgileri getirilemedi', error: error.message },
   { status: 500 }
  );
 }
}

// PUT - Kullanıcı profil bilgilerini güncelle
export async function PUT(request) {
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
    { success: false, message: 'Kullanıcı bulunamadı' },
    { status: 404 }
   );
  }

  // Şifre değişikliği kontrolü
  if (body.currentPassword && body.newPassword) {
   // Mevcut şifreyi kontrol et
   const hashedCurrentPassword = Buffer.from(body.currentPassword).toString('base64');
   if (user.password !== hashedCurrentPassword) {
    return NextResponse.json(
     { success: false, message: 'Mevcut şifre hatalı' },
     { status: 400 }
    );
   }

   // Yeni şifre validasyonu
   if (body.newPassword.length < 6) {
    return NextResponse.json(
     { success: false, message: 'Yeni şifre en az 6 karakter olmalıdır' },
     { status: 400 }
    );
   }

   // Yeni şifreyi hashle ve kaydet
   const hashedNewPassword = Buffer.from(body.newPassword).toString('base64');
   user.password = hashedNewPassword;
  }

  // Email değişikliği kontrolü - başka bir kullanıcıda aynı email var mı?
  if (body.email && body.email !== user.email) {
   const existingUser = await User.findOne({ email: body.email.toLowerCase() });
   if (existingUser && existingUser._id.toString() !== user._id.toString()) {
    return NextResponse.json(
     { success: false, message: 'Bu e-posta adresi zaten kullanılıyor' },
     { status: 400 }
    );
   }
  }

  // Profil bilgilerini güncelle
  if (body.name) user.name = body.name;
  if (body.email) user.email = body.email.toLowerCase();
  if (body.phone !== undefined) user.phone = body.phone || '';
  if (body.profileImage !== undefined) user.profileImage = body.profileImage || '';

  // Bildirim tercihlerini güncelle
  if (body.notificationPreferences) {
   if (!user.notificationPreferences) {
    user.notificationPreferences = {};
   }
   if (body.notificationPreferences.emailNotifications !== undefined) {
    user.notificationPreferences.emailNotifications = body.notificationPreferences.emailNotifications;
   }
   if (body.notificationPreferences.campaignNotifications !== undefined) {
    user.notificationPreferences.campaignNotifications = body.notificationPreferences.campaignNotifications;
   }
  }

  await user.save();

  // Session'ı güncelle
  cookieStore.set('user-session', JSON.stringify({
   id: user._id.toString(),
   email: user.email,
   name: user.name,
  }), {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'strict',
   maxAge: 60 * 60 * 24 * 30, // 30 gün
   path: '/',
  });

  return NextResponse.json({
   success: true,
   message: 'Profil güncellendi',
   user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    profileImage: user.profileImage || '',
    notificationPreferences: {
     emailNotifications: user.notificationPreferences?.emailNotifications !== undefined ? user.notificationPreferences.emailNotifications : true,
     campaignNotifications: user.notificationPreferences?.campaignNotifications !== undefined ? user.notificationPreferences.campaignNotifications : false,
    },
   },
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Profil güncellenemedi', error: error.message },
   { status: 500 }
  );
 }
}

// DELETE - Kullanıcı hesabını sil
export async function DELETE() {
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
    { success: false, message: 'Kullanıcı bulunamadı' },
    { status: 404 }
   );
  }

  // Kullanıcıyı veritabanından sil
  await User.findByIdAndDelete(userData.id);

  // Cookie'yi temizle
  const response = NextResponse.json({
   success: true,
   message: 'Hesap başarıyla silindi',
  });

  // Cookie'yi sil
  cookieStore.delete('user-session');
  response.cookies.set('user-session', '', {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'strict',
   expires: new Date(0),
   path: '/',
   maxAge: 0,
  });
  response.cookies.delete('user-session');

  // Cache ve storage temizleme header'ları
  response.headers.set('Clear-Site-Data', '"cookies", "storage", "cache"');
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  // Set-Cookie header'ı manuel ekle
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.headers.set(
   'Set-Cookie',
   `user-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict${secureFlag}`
  );

  return response;
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Hesap silinemedi', error: error.message },
   { status: 500 }
  );
 }
}

