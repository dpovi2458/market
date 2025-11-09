/**
 * Servicio de email para envío de códigos OTP
 * Soporta múltiples proveedores: Gmail, Resend, SMTP genérico
 */

import nodemailer from 'nodemailer';

/**
 * Configurar transportador de email según el proveedor
 */
const getEmailTransporter = () => {
  // Si no hay configuración de email, devolver transportador de prueba
  if (!process.env.EMAIL_SERVICE && !process.env.SMTP_HOST) {
    console.warn('⚠️  No hay configuración de email. Usando transportador de prueba.');
    // Transportador de prueba de Ethereal (solo para desarrollo)
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    });
  }

  // Opción 1: Gmail (requiere App Password)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('EMAIL_USER y EMAIL_PASSWORD son requeridos para Gmail');
    }
    
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // App Password de Gmail
      }
    });
  }
  
  // Opción 2: Outlook/Hotmail
  if (process.env.EMAIL_SERVICE === 'outlook') {
    return nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Opción 3: SendGrid
  if (process.env.EMAIL_SERVICE === 'sendgrid') {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }

  // Opción 4: Resend (recomendado para desarrollo)
  if (process.env.EMAIL_SERVICE === 'resend') {
    return nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 587,
      secure: false,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY
      }
    });
  }
  
  // Opción 5: SMTP Genérico
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  throw new Error('No se ha configurado ningún servicio de email válido');
};

/**
 * Envía código OTP al email institucional
 */
export async function sendOTPEmail(emailInstitucional, codigoOTP) {
  try {
    // En desarrollo sin configuración de email, solo simular
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_SERVICE && !process.env.SMTP_HOST) {
      console.log('\n📧 ═══════════════════════════════════════════════════════');
      console.log('📧 SIMULACIÓN DE EMAIL (Desarrollo sin configuración)');
      console.log('📧 ═══════════════════════════════════════════════════════');
      console.log(`📧 Para: ${emailInstitucional}`);
      console.log(`📧 Asunto: 🔐 Código de Verificación - Market Facultad UNMSM`);
      console.log(`📧 Código OTP: ${codigoOTP}`);
      console.log('📧 ═══════════════════════════════════════════════════════\n');
      return true; // Simular envío exitoso
    }

    const transporter = getEmailTransporter();
    
    // Verificar conexión SMTP
    try {
      await transporter.verify();
      console.log('✓ Servidor SMTP conectado correctamente');
    } catch (verifyError) {
      console.error('❌ Error al conectar con servidor SMTP:', verifyError.message);
      throw verifyError;
    }
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Market Facultad UNMSM <noreply@marketplace.unmsm.edu.pe>',
      to: emailInstitucional,
      subject: '🔐 Código de Verificación - Market Facultad UNMSM',
      html: generarHTMLEmail(codigoOTP, emailInstitucional),
      text: `Tu código de verificación es: ${codigoOTP}\n\nEste código expira en 10 minutos.\n\nSi no solicitaste este código, ignora este mensaje.`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✓ Email enviado exitosamente:', result.messageId);
    
    // Si estamos usando Ethereal (desarrollo), mostrar URL de preview
    if (process.env.NODE_ENV === 'development' && result.messageId) {
      const previewUrl = nodemailer.getTestMessageUrl(result);
      if (previewUrl) {
        console.log('🔗 Preview del email:', previewUrl);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    console.error('Detalles del error:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    // En desarrollo, mostrar el código aunque falle el envío
    if (process.env.NODE_ENV === 'development') {
      console.log('\n⚠️  EMAIL NO ENVIADO - Código OTP:', codigoOTP, '\n');
    }
    
    return false;
  }
}

/**
 * Genera HTML del email con el código OTP
 */
function generarHTMLEmail(codigoOTP, email) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 40px; text-align: center; }
        .content p { color: #666; line-height: 1.6; margin: 15px 0; }
        .otp-box { background: #f0fdf4; border: 2px solid #0d9488; border-radius: 8px; padding: 20px; margin: 30px 0; }
        .otp-code { font-size: 32px; font-weight: bold; color: #0d9488; letter-spacing: 8px; font-family: 'Courier New', monospace; }
        .otp-subtext { font-size: 12px; color: #999; margin-top: 10px; }
        .warning { background: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0; border-radius: 4px; text-align: left; }
        .warning strong { color: #92400e; }
        .warning p { margin: 5px 0; font-size: 13px; color: #78350f; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e5e7eb; }
        .footer a { color: #0d9488; text-decoration: none; }
        .badge { display: inline-block; background: #0d9488; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Verificación de Email</h1>
          <p>Market Facultad UNMSM</p>
        </div>
        
        <div class="content">
          <p style="font-size: 16px; color: #333;">¡Hola! 👋</p>
          <p>Para continuar con tu registro en Market Facultad, verifica tu correo institucional ingresando el siguiente código:</p>
          
          <div class="otp-box">
            <div class="otp-code">${codigoOTP}</div>
            <div class="otp-subtext">Válido por 10 minutos</div>
          </div>
          
          <div class="warning">
            <strong>⚠️ Información importante:</strong>
            <p>✓ Este código es personal e intransferible</p>
            <p>✓ Válido solo por 10 minutos</p>
            <p>✓ No compartas este código con nadie</p>
            <p>✓ Si no solicitaste este código, ignora este email</p>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            Si tienes problemas, <a href="mailto:soporte@marketplace.unmsm.edu.pe" style="color: #0d9488;">contacta al soporte</a>
          </p>
        </div>
        
        <div class="footer">
          <p>Este es un correo automático. Por favor, no respondas a este mensaje.</p>
          <p>© 2025 Market Facultad UNMSM. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Genera un código OTP de 6 dígitos
 */
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
