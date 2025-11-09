import mongoose, { Schema } from 'mongoose';
import { connectDB } from '../mongodb';

const VerificationSchema = new Schema(
  {
    email_institucional: { type: String, required: true, lowercase: true },
    codigo_otp: { type: String, required: true }, // 6 dígitos
    intentos: { type: Number, default: 0 },
    max_intentos: { type: Number, default: 5 },
    bloqueado_hasta: Date,
    expira_en: { type: Date, required: true }, // 10 minutos de duración
    verificado: { type: Boolean, default: false },
    fecha_creacion: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

// Índice para limpiar automáticamente registros expirados
VerificationSchema.index({ expira_en: 1 }, { expireAfterSeconds: 0 });

export async function VerificationModel() {
  await connectDB();
  return mongoose.models.Verification || mongoose.model('Verification', VerificationSchema, 'verificaciones');
}
