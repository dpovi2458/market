import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { ProductModel } from '../../../../lib/models/Product';
import { z } from 'zod';

export async function GET(_req, { params }) {
  const Product = await ProductModel();
  const doc = await Product.findById(params.id).lean();
  if (!doc) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(doc);
}

const productUpdate = z.object({
  titulo: z.string().min(1).max(100).optional(),
  descripcion: z.string().min(1).max(500).optional(),
  precio: z.number().nonnegative().optional(),
  categoria: z.enum(['utiles', 'comida', 'tecnologia', 'ropa', 'otros']).optional(),
  imagenes: z.array(z.string().url()).max(3).optional(),
  stock: z.number().int().min(0).optional(),
  disponible: z.boolean().optional(),
  contacto: z.string().max(200).optional()
});

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const data = productUpdate.parse(body);
    const Product = await ProductModel();
    const doc = await Product.findByIdAndUpdate(params.id, data, { new: true });
    if (!doc) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json(doc);
  } catch (e) {
    const msg = e?.errors?.[0]?.message || e.message || 'Error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(_req, { params }) {
  const Product = await ProductModel();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
