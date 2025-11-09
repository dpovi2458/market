import mongoose, { Schema } from 'mongoose';
import { connectDB } from '../mongodb';

const VendorSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: String,
    email_institucional: { type: String, unique: true, required: true }, // correo@unmsm.edu.pe
    usuario: { type: String }, // Removemos unique, usaremos email_institucional como identificador único
    password_hash: { type: String, required: true },
    email: String,
    telefono: String,
    codigo_unmsm: String, // Código de estudiante/docente extraído del email
    rol_unmsm: { type: String, enum: ['estudiante', 'docente', 'administrativo'], default: 'estudiante' },
    facultad: String,
    programa: String,
    activo: { type: Boolean, default: true },
    verificado: { type: Boolean, default: false },
    fecha_primer_acceso: Date
  },
  { timestamps: { createdAt: 'fecha_registro', updatedAt: false } }
);

export async function VendorModel() {
  await connectDB();
  return mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema, 'vendedores');
}

