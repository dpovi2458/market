import { NextResponse } from 'next/server';
import { VendorModel } from '../../../../lib/models/Vendor';
import bcrypt from 'bcryptjs';
import { signToken, setSellerCookie } from '../../../../lib/auth';

export async function POST(req) {
  const { usuario, password } = await req.json();
  if (!usuario || !password) return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 400 });

  // Try DB first
  const Vendor = await VendorModel();
  const vendor = await Vendor.findOne({ usuario, activo: true });
  let ok = false;
  let identity = null;

  if (vendor) {
    ok = await bcrypt.compare(password, vendor.password_hash);
    identity = { id: vendor._id, nombre: vendor.nombre, usuario: vendor.usuario };
  }

  // Fallback to env hardcoded (for initial access)
  if (!ok && process.env.SELLER_USER && process.env.SELLER_PASSWORD) {
    if (usuario === process.env.SELLER_USER && password === process.env.SELLER_PASSWORD) {
      ok = true;
      identity = { id: 'env-hardcoded', nombre: 'Vendedor', usuario };
    }
  }

  if (!ok || !identity) return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });

  const token = signToken(identity);
  setSellerCookie(token);
  return NextResponse.json({ ok: true, vendedor: identity });
}
