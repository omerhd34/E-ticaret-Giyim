import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Campaign from '@/models/Campaign';

// GET - Aktif kampanyaları getir (public)
export async function GET() {
 try {
  await dbConnect();
  const campaigns = await Campaign.find({ isActive: true })
   .sort({ order: 1, createdAt: -1 })
   .limit(10);

  return NextResponse.json({
   success: true,
   data: campaigns,
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, error: 'Kampanyalar getirilemedi' },
   { status: 500 }
  );
 }
}

