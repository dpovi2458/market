import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { ProductModel } from '../../../../lib/models/Product';
import { getSellerFromCookie } from '../../../../lib/auth';

export async function GET() {
  const seller = getSellerFromCookie();
  if (!seller) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const Product = await ProductModel();
  const items = await Product.find({ vendedor_id: seller.id }).sort({ fecha_creacion: -1 }).lean();
  return NextResponse.json({ items });
}
