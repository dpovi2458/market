import mongoose, { Schema } from 'mongoose';
import { connectDB } from '../mongodb';

const VendorSchema = new Schema(
  {
    nombre: { type: String, required: true },
    usuario: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    email: String,
    telefono: String,
    activo: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: 'fecha_registro', updatedAt: false } }
);

export async function VendorModel() {
  await connectDB();
  return mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema, 'vendedores');
}
