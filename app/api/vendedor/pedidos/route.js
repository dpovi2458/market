import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { OrderModel } from '../../../../lib/models/Order';
import { getSellerFromCookie } from '../../../../lib/auth';

export async function GET() {
  const seller = getSellerFromCookie();
  if (!seller) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  
  const Order = await OrderModel();
  
  // Si es usuario hardcoded de env, mostrar todos los pedidos
  const query = seller.id === 'env-hardcoded' ? {} : { vendedor_id: seller.id };
  
  const items = await Order.find(query).sort({ fecha_pedido: -1 }).lean();
  return NextResponse.json({ items });
}

export async function PATCH(req) {
  const seller = getSellerFromCookie();
  if (!seller) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const { id, estado } = await req.json();
  const Order = await OrderModel();
  await Order.updateOne({ _id: id, vendedor_id: seller.id }, { $set: { estado } });
  return NextResponse.json({ ok: true });
}
