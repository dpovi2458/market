import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { ProductModel } from '../../../../lib/models/Product';
import { getSellerFromCookie } from '../../../../lib/auth';

export async function GET() {
  const seller = getSellerFromCookie();
  if (!seller) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  
  const Product = await ProductModel();
  
  // Si es usuario hardcoded de env, mostrar todos los productos
  const query = seller.id === 'env-hardcoded' ? {} : { vendedor_id: seller.id };
  
  const items = await Product.find(query).sort({ fecha_creacion: -1 }).lean();
  return NextResponse.json({ items });
}
