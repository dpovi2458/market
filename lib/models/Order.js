import mongoose, { Schema } from 'mongoose';
import { connectDB } from '../mongodb';

const OrderItemSchema = new Schema({
  producto_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  titulo: String,
  precio: Number,
  cantidad: Number,
  subtotal: Number
});

const OrderSchema = new Schema(
  {
    productos: [OrderItemSchema],
    total: Number,
    comprador: {
      nombre: { type: String, required: true },
      telefono: { type: String, required: true },
      email: String,
      punto_entrega: { type: String, required: true },
      comentarios: String
    },
    vendedor_id: { type: String },
    estado: { type: String, enum: ['pendiente', 'entregado'], default: 'pendiente' }
  },
  { timestamps: { createdAt: 'fecha_pedido', updatedAt: false } }
);

export async function OrderModel() {
  await connectDB();
  return mongoose.models.Order || mongoose.model('Order', OrderSchema, 'pedidos');
}
