import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import crypto from 'crypto';

export async function POST(request) {
 try {
  await dbConnect();

  const { token, password } = await request.json();

  if (!token || !password) {
   return NextResponse.json(
    { success: false, message: 'Token ve şifre gereklidir' },
    { status: 400 }
   );
  }

  if (password.length < 6) {
   return NextResponse.json(
    { success: false, message: 'Şifre en az 6 karakter olmalıdır' },
    { status: 400 }
   );
  }

  // Token'ı hash'le
  const resetPasswordToken = crypto
   .createHash('sha256')
   .update(token)
   .digest('hex');

  // Kullanıcıyı bul ve token kontrolü yap
  const user = await User.findOne({
   resetPasswordToken,
   resetPasswordExpires: { $gt: Date.now() }, // Süresi dolmamış
  });

  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Geçersiz veya süresi dolmuş token' },
    { status: 400 }
   );
  }

  // Şifreyi güncelle
  const hashedPassword = Buffer.from(password).toString('base64');
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return NextResponse.json({
   success: true,
   message: 'Şifre başarıyla sıfırlandı',
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
   { status: 500 }
  );
 }
}

