import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get('user-session');

  if (!session || !session.value) {
   return NextResponse.json({
    success: true,
    authenticated: false
   });
  }

  // Cookie'deki session'ı parse et
  let userData;
  try {
   userData = JSON.parse(session.value);
  } catch (parseError) {
   return NextResponse.json({
    success: true,
    authenticated: false
   });
  }

  // Kullanıcı ID'si yoksa authenticated değil
  if (!userData || !userData.id) {
   return NextResponse.json({
    success: true,
    authenticated: false
   });
  }

  // Veritabanında kullanıcıyı kontrol et
  await dbConnect();
  const user = await User.findById(userData.id).select('-password');

  if (!user) {
   // Kullanıcı veritabanında yoksa cookie'yi sil ve authenticated false dön
   return NextResponse.json({
    success: true,
    authenticated: false
   });
  }

  // Kullanıcı var, authenticated true dön
  return NextResponse.json({
   success: true,
   authenticated: true,
   user: {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone || '',
   }
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, authenticated: false },
   { status: 500 }
  );
 }
}

