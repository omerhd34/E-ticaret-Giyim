import { NextResponse } from "next/server";

export async function GET() {
 // Test için hata döndür
 return NextResponse.json(
  { success: false, error: "Bu bir test API hatasıdır!" },
  { status: 500 }
 );
}

