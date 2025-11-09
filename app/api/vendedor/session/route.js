import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { getSellerFromCookie } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  const seller = getSellerFromCookie();
  if (!seller) return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  return NextResponse.json({ ok: true, vendedor: seller });
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete('vendedor_token');
  return NextResponse.json({ ok: true, message: 'Sesión cerrada' });
}
