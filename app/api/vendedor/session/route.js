import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { getSellerFromCookie } from '../../../../lib/auth';

export async function GET() {
  const seller = getSellerFromCookie();
  if (!seller) return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  return NextResponse.json({ ok: true, vendedor: seller });
}
