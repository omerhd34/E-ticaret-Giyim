import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
 try {
  // Response önce oluştur (cookie silmeden önce)
  const response = NextResponse.json({
   success: true,
   message: 'Çıkış yapıldı'
  });

  // Cookie'yi sil - cookie store ve response üzerinden
  try {
   const cookieStore = await cookies();
   cookieStore.delete('user-session');
  } catch (cookieError) {
  }

  // Response üzerinden cookie'yi sil
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

  // Hata durumunda bile response döndür ve cookie'yi silmeyi dene
  const errorResponse = NextResponse.json(
   {
    success: false,
    message: 'Çıkış yapılırken bir hata oluştu',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
   },
   { status: 500 }
  );

  // Cookie silme işlemlerini tekrar dene
  try {
   const cookieStore = await cookies();
   cookieStore.delete('user-session');
   errorResponse.cookies.set('user-session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
    maxAge: 0,
   });
   errorResponse.cookies.delete('user-session');
   errorResponse.headers.set('Clear-Site-Data', '"cookies", "storage", "cache"');
  } catch (e) {
  }

  return errorResponse;
 }
}

