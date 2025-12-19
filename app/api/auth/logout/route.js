import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
 try {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');

  return NextResponse.json({
   success: true,
   message: 'Çıkış yapıldı'
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: 'Bir hata oluştu' },
   { status: 500 }
  );
 }
}

