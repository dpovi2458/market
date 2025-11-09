import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { VendorModel } from '../../../../lib/models/Vendor';
import { VerificationModel } from '../../../../lib/models/Verification';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';
import { isValidUNMSMEmail, extractDataFromUNMSMEmail } from '../../../../lib/unmsm';

export async function POST(req) {
  const { email, password, isNewUser, emailVerificado } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
  }

  // Validar que sea email institucional UNMSM
  if (!isValidUNMSMEmail(email)) {
    return NextResponse.json({ 
      error: 'Debes usar tu correo institucional UNMSM (ejemplo@unmsm.edu.pe)' 
    }, { status: 400 });
  }

  // Verificar que el email haya sido verificado con OTP
  if (emailVerificado) {
    const Verification = await VerificationModel();
    const verification = await Verification.findOne({
      email_institucional: email.toLowerCase(),
      verificado: true,
      expira_en: { $gt: new Date() }
    });

    if (!verification) {
      return NextResponse.json({ 
        error: 'Email no verificado. Por favor verifica tu email primero.' 
      }, { status: 401 });
    }
  }

  const Vendor = await VendorModel();
  let vendor = null;
  let isNewRegistration = false;

  // Buscar vendedor por email institucional
  vendor = await Vendor.findOne({ email_institucional: email.toLowerCase() });

  if (!vendor && isNewUser) {
    // Registrar nuevo vendedor automáticamente
    try {
      const userData = extractDataFromUNMSMEmail(email);
      const passwordHash = await bcrypt.hash(password, 10);

      // Generar nombre de usuario único basado en el email
      const emailLocalPart = email.split('@')[0];
      const username = emailLocalPart.toLowerCase().replace(/[^a-z0-9]/g, '');

      vendor = new Vendor({
        nombre: userData.nombre,
        apellido: userData.apellido,
        usuario: username, // Agregar campo usuario
        email_institucional: email.toLowerCase(),
        password_hash: passwordHash,
        email: email.toLowerCase(),
        codigo_unmsm: userData.codigo,
        rol_unmsm: userData.rolEstimado,
        facultad: userData.facultad,
        activo: true,
        verificado: true,
        fecha_primer_acceso: new Date()
      });

      await vendor.save();
      isNewRegistration = true;
    } catch (error) {
      console.error('Error registrando nuevo vendedor:', error);
      return NextResponse.json({ 
        error: 'Error al registrar. Intenta de nuevo.' 
      }, { status: 500 });
    }
  } else if (!vendor) {
    return NextResponse.json({ 
      error: 'Email no registrado. ¿Es tu primer acceso? Marca "Registrarse"' 
    }, { status: 401 });
  }

  // Verificar contraseña
  const passwordMatch = await bcrypt.compare(password, vendor.password_hash);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  // Generar token
  const identity = {
    id: vendor._id.toString(),
    nombre: vendor.nombre,
    apellido: vendor.apellido,
    email_institucional: vendor.email_institucional,
    facultad: vendor.facultad,
    rol_unmsm: vendor.rol_unmsm
  };

  const token = signToken(identity);
  const res = NextResponse.json({ 
    ok: true, 
    vendedor: identity,
    isNewRegistration
  });

  res.cookies.set({
    name: 'vendedor_token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 días
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  return res;
}
