import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { VendorModel } from '../../../../lib/models/Vendor';
import { VerificationModel } from '../../../../lib/models/Verification';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const Vendor = await VendorModel();
    const Verification = await VerificationModel();

    const verification = await Verification.findOne({ email, verificado: true });
    if (!verification || verification.expira_en < new Date()) {
      return NextResponse.json({ error: 'Verificación no válida o expirada' }, { status: 400 });
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    vendor.password_hash = hashedPassword;
    await vendor.save();

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ [RESET] Contraseña actualizada para:', email);
    }

    await Verification.deleteOne({ email });

    return NextResponse.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Error al restablecer contraseña' }, { status: 500 });
  }
}
