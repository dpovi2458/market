import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { VerificationModel } from '../../../../lib/models/Verification';
import { generateOTP, sendOTPEmail } from '../../../../lib/email';
import { isValidUNMSMEmail } from '../../../../lib/unmsm';

export async function POST(req) {
  try {
    const { email, action } = await req.json();

    if (!email || !isValidUNMSMEmail(email)) {
      return NextResponse.json({ 
        error: 'Email institucional UNMSM inválido' 
      }, { status: 400 });
    }

    const emailLower = email.toLowerCase();
    const Verification = await VerificationModel();

    // Limpiar verificaciones expiradas
    await Verification.deleteMany({ expira_en: { $lt: new Date() } });

    // Verificar si hay un registro activo reciente
    const existingVerification = await Verification.findOne({
      email_institucional: emailLower,
      verificado: false,
      expira_en: { $gt: new Date() }
    });

    // Si existe un código activo y hace poco tiempo, avisar
    if (existingVerification && existingVerification.fecha_creacion) {
      const secondsSinceCreation = (Date.now() - existingVerification.fecha_creacion) / 1000;
      if (secondsSinceCreation < 60) {
        return NextResponse.json({ 
          error: 'Espera 1 minuto antes de solicitar otro código',
          retry_in: Math.ceil(60 - secondsSinceCreation)
        }, { status: 429 });
      }
    }

    // Verificar si está bloqueado
    if (existingVerification && existingVerification.bloqueado_hasta && existingVerification.bloqueado_hasta > new Date()) {
      const minutosRestantes = Math.ceil((existingVerification.bloqueado_hasta - Date.now()) / 1000 / 60);
      return NextResponse.json({ 
        error: `Demasiados intentos fallidos. Intenta en ${minutosRestantes} minutos`,
        blocked_until: existingVerification.bloqueado_hasta
      }, { status: 429 });
    }

    // Generar nuevo OTP
    const nuevoOTP = generateOTP();
    const expiraEn = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    // Crear o actualizar registro de verificación
    const verification = await Verification.findOneAndUpdate(
      { email_institucional: emailLower },
      {
        email_institucional: emailLower,
        codigo_otp: nuevoOTP,
        intentos: 0,
        bloqueado_hasta: null,
        expira_en: expiraEn,
        verificado: false,
        fecha_creacion: new Date()
      },
      { upsert: true, new: true }
    );

    // Enviar email con OTP (en desarrollo y producción)
    const emailEnviado = await sendOTPEmail(emailLower, nuevoOTP);

    if (!emailEnviado) {
      return NextResponse.json({ 
        error: 'Error enviando código. Intenta de nuevo más tarde.' 
      }, { status: 500 });
    }

    // Log para debugging (mostrar OTP SOLO en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] OTP para ${emailLower}: ${nuevoOTP}`);
    }

    return NextResponse.json({ 
      ok: true,
      message: 'Código enviado a tu email institucional',
      email_masked: maskEmail(emailLower),
      expires_in: 600, // segundos
      // CRÍTICO: NUNCA enviar el código en producción por seguridad
      dev_code: process.env.NODE_ENV === 'development' ? nuevoOTP : undefined
    }, { status: 200 });

  } catch (error) {
    console.error('Error en OTP request:', error);
    return NextResponse.json({ 
      error: 'Error procesando solicitud' 
    }, { status: 500 });
  }
}

/**
 * Enmascara el email para mostrar en UI
 */
function maskEmail(email) {
  const [local, domain] = email.split('@');
  const masked = local.substring(0, 2) + '*'.repeat(local.length - 2) + '@' + domain;
  return masked;
}
