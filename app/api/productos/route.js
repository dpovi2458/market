import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ProductModel } from '../../../lib/models/Product';
import { getSellerFromCookie } from '../../../lib/auth';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const categoria = searchParams.get('categoria') || '';
  const limit = Number(searchParams.get('limit') || 24);
  const page = Number(searchParams.get('page') || 1);

  const Product = await ProductModel();
  const query = { disponible: true, stock: { $gt: 0 } };
  if (q) query.$or = [{ titulo: { $regex: q, $options: 'i' } }, { descripcion: { $regex: q, $options: 'i' } }];
  if (categoria) query.categoria = categoria;
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Product.find(query).sort({ fecha_creacion: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(query)
  ]);
  return NextResponse.json({ items, total });
}

const productSchema = z.object({
  titulo: z.string().min(1).max(100),
  descripcion: z.string().min(1).max(500),
  precio: z.number().nonnegative(),
  categoria: z.enum(['utiles', 'comida', 'tecnologia', 'ropa', 'otros']),
  imagenes: z.array(z.string().url()).max(3).optional().default([]),
  stock: z.number().int().min(0),
  disponible: z.boolean().optional().default(true),
  vendedor_id: z.string().optional(),
  vendedor_nombre: z.string().optional()
});

export async function POST(req) {
  try {
    const body = await req.json();
    const data = productSchema.parse(body);
    const seller = getSellerFromCookie();
    if (seller) {
      data.vendedor_id = seller.id;
      data.vendedor_nombre = data.vendedor_nombre || seller.nombre || 'Vendedor';
    }
    const Product = await ProductModel();
    const doc = await Product.create(data);
    return NextResponse.json(doc, { status: 201 });
  } catch (e) {
    const msg = e?.errors?.[0]?.message || e.message || 'Error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
