import { NextResponse } from 'next/server';
import { getSellerFromCookie } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const seller = getSellerFromCookie();
    if (!seller) return NextResponse.json({ ok: false }, { status: 401 });
    return NextResponse.json({ ok: true, vendedor: seller });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete('vendedor_token');
  return NextResponse.json({ ok: true, message: 'Sesión cerrada' });
}
