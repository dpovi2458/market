import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { z } from 'zod';
import { OrderModel } from '../../../lib/models/Order';
import { ProductModel } from '../../../lib/models/Product';
import { onlyIfSingleVendor } from '../../../lib/utils';

const schema = z.object({
  items: z.array(
    z.object({
      producto_id: z.string(),
      titulo: z.string(),
      precio: z.number().nonnegative(),
      cantidad: z.number().int().positive(),
      vendedor_id: z.string().optional()
    })
  ),
  comprador: z.object({
    nombre: z.string().min(1),
    telefono: z.string().min(6),
    email: z.string().email().optional().or(z.literal('').transform(() => undefined)),
    punto_entrega: z.string().min(1),
    comentarios: z.string().optional()
  })
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    const Product = await ProductModel();
    // Validate stock and take snapshots
    const ids = parsed.items.map((i) => i.producto_id);
    const dbProducts = await Product.find({ _id: { $in: ids } });
    const snapshot = parsed.items.map((i) => {
      const p = dbProducts.find((x) => String(x._id) === i.producto_id);
      if (!p || !p.disponible) throw new Error(`Producto no disponible: ${i.titulo}`);
      if (p.stock < i.cantidad) throw new Error(`Stock insuficiente para ${p.titulo}`);
      return {
        producto_id: p._id,
        titulo: p.titulo,
        precio: p.precio,
        cantidad: i.cantidad,
        subtotal: p.precio * i.cantidad,
        vendedor_id: p.vendedor_id
      };
    });
    const total = snapshot.reduce((s, x) => s + x.subtotal, 0);
    const vendedor_id = onlyIfSingleVendor(snapshot);

    const Order = await OrderModel();
    const order = await Order.create({
      productos: snapshot.map(({ vendedor_id, ...rest }) => rest),
      total,
      comprador: parsed.comprador,
      vendedor_id
    });

    // Reduce stock (simple, no concurrency handling for MVP)
    await Promise.all(
      snapshot.map((s) => Product.updateOne({ _id: s.producto_id }, { $inc: { stock: -s.cantidad } }))
    );

    return NextResponse.json({ ok: true, id: order._id });
  } catch (e) {
    console.error('Error creando pedido:', e);
    const msg = e?.errors?.[0]?.message || e.message || 'Error';
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
