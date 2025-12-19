import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');

  if (session && session.value === 'authenticated') {
   return NextResponse.json({
    success: true,
    authenticated: true
   });
  }

  return NextResponse.json({
   success: true,
   authenticated: false
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, authenticated: false },
   { status: 500 }
  );
 }
}

