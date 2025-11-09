import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { VerificationModel } from '../../../../lib/models/Verification';
import { isValidUNMSMEmail } from '../../../../lib/unmsm';

export async function POST(req) {
  try {
    const { email, codigo } = await req.json();

    // Validaciones
    if (!email || !isValidUNMSMEmail(email)) {
      return NextResponse.json({ 
        error: 'Email institucional inválido' 
      }, { status: 400 });
    }

    if (!codigo || codigo.length !== 6) {
      return NextResponse.json({ 
        error: 'Código OTP debe tener 6 dígitos' 
      }, { status: 400 });
    }

    const emailLower = email.toLowerCase();
    const Verification = await VerificationModel();

    // Buscar verificación activa
    const verification = await Verification.findOne({
      email_institucional: emailLower,
      expira_en: { $gt: new Date() }
    });

    if (!verification) {
      return NextResponse.json({ 
        error: 'Código expirado o no existe. Solicita uno nuevo.' 
      }, { status: 404 });
    }

    // Verificar si está bloqueado
    if (verification.bloqueado_hasta && verification.bloqueado_hasta > new Date()) {
      const minutosRestantes = Math.ceil((verification.bloqueado_hasta - Date.now()) / 1000 / 60);
      return NextResponse.json({ 
        error: `Demasiados intentos fallidos. Intenta en ${minutosRestantes} minutos`,
        blocked_until: verification.bloqueado_hasta
      }, { status: 429 });
    }

    // Verificar si ya alcanzó el máximo de intentos
    if (verification.intentos >= verification.max_intentos) {
      // Bloquear por 15 minutos
      verification.bloqueado_hasta = new Date(Date.now() + 15 * 60 * 1000);
      await verification.save();
      
      return NextResponse.json({ 
        error: 'Demasiados intentos fallidos. Intenta en 15 minutos',
        blocked_until: verification.bloqueado_hasta
      }, { status: 429 });
    }

    // Verificar código
    if (verification.codigo_otp !== codigo) {
      // Incrementar intentos
      verification.intentos += 1;
      await verification.save();

      const intentosRestantes = verification.max_intentos - verification.intentos;
      
      return NextResponse.json({ 
        error: `Código incorrecto. Te quedan ${intentosRestantes} intentos`,
        intentos_restantes: intentosRestantes
      }, { status: 401 });
    }

    // ✅ Código correcto
    verification.verificado = true;
    // Extender expiración a 30 minutos para dar tiempo de completar el registro
    verification.expira_en = new Date(Date.now() + 30 * 60 * 1000);
    await verification.save();

    return NextResponse.json({ 
      ok: true,
      message: 'Email verificado exitosamente',
      email: emailLower
    }, { status: 200 });

  } catch (error) {
    console.error('Error verificando OTP:', error);
    return NextResponse.json({ 
      error: 'Error procesando verificación' 
    }, { status: 500 });
  }
}
