import mongoose, { Schema } from 'mongoose';
import { connectDB } from '../mongodb';

const ProductSchema = new Schema(
  {
    titulo: { type: String, required: true, maxlength: 100 },
    descripcion: { type: String, required: true, maxlength: 500 },
    precio: { type: Number, required: true, min: 0 },
    categoria: { type: String, required: true, enum: ['utiles', 'comida', 'tecnologia', 'ropa', 'otros'] },
    imagenes: { type: [String], default: [], validate: [(arr) => arr.length <= 3, 'Máximo 3 imágenes'] },
    stock: { type: Number, required: true, default: 0, min: 0 },
    disponible: { type: Boolean, default: true },
    vendedor_id: { type: String },
    vendedor_nombre: { type: String }
  },
  { timestamps: { createdAt: 'fecha_creacion', updatedAt: 'fecha_actualizacion' } }
);

export async function ProductModel() {
  await connectDB();
  return mongoose.models.Product || mongoose.model('Product', ProductSchema, 'productos');
}
