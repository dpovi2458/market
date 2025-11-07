import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';

export const runtime = 'nodejs';

export async function GET() {
  const envOk = Boolean(process.env.MONGODB_URI && process.env.JWT_SECRET);
  let dbOk = false, error = null;
  try {
    await connectDB();
    dbOk = true;
  } catch (e) {
    error = e?.message || String(e);
  }
  return NextResponse.json({ envOk, dbOk, nodeEnv: process.env.NODE_ENV, error });
}
