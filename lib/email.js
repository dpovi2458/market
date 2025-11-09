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
      console.log(`📧 Asunto:  Código de Verificación - Market Facultad UNMSM`);
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
      subject: ' Código de Verificación - Market Facultad UNMSM',
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
        <title>Verificación de Email - Market Facultad UNMSM</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                margin: 0;
                padding: 0;
                background-color: #f0f2f5;
                box-sizing: border-box;
            }
            .container {
                max-width: 600px;
                width: 100%;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                overflow: hidden;
                border: 1px solid #e5e7eb;
            }
            .logo-section {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px 20px 16px;
                border-bottom: 1px solid #e5e7eb;
                background-color: #f9fafb;
            }
            .logo-icon {
                width: 48px;
                height: 48px;
                margin-right: 12px;
            }
            .logo-text {
                font-size: 24px;
                font-weight: 700;
                color: #0d9488;
                margin: 0;
            }
            .header {
                text-align: center;
                padding: 30px 20px 20px;
            }
            .header h1 {
                margin: 0 0 8px 0;
                font-size: 28px;
                color: #111827;
                font-weight: 700;
            }
            .header p {
                margin: 0;
                font-size: 16px;
                color: #4b5563;
            }
            .content {
                padding: 20px 30px 30px;
                line-height: 1.6;
            }
            .content p {
                color: #4b5563;
                font-size: 15px;
                margin: 12px 0;
            }
            .otp-box {
                margin: 30px 0;
                text-align: center;
            }
            .otp-code {
                display: inline-block;
                padding: 14px 24px;
                font-size: 32px;
                font-weight: 700;
                color: #0d9488;
                background-color: #f0fdfa;
                border-radius: 12px;
                border: 2px dashed #99d9d3;
                letter-spacing: 3px;
            }
            .otp-subtext {
                margin-top: 12px;
                font-size: 14px;
                color: #dc2626;
                font-weight: 500;
            }
            .warning {
                margin-top: 30px;
                padding: 20px;
                background-color: #fffbeb;
                border-radius: 12px;
                border: 1px solid #fde68a;
                color: #78350f;
            }
            .warning strong {
                font-size: 16px;
                display: block;
                margin-bottom: 12px;
            }
            .warning p {
                margin: 6px 0;
                font-size: 14px;
            }
            .footer {
                text-align: center;
                padding: 24px 30px;
                font-size: 12px;
                color: #6b7280;
                background-color: #f9fafb;
                border-top: 1px solid #e5e7eb;
            }
            .footer p {
                margin: 5px 0;
            }
            .footer a {
                color: #0d9488;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
      <div class="container">
        <!-- Logo Section -->
        <div class="logo-section">
          <svg class="logo-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="16" fill="#0d9488"/>
            <path d="M40 24V18a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v6M18 28h28l2 18H16l2-18Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
          <h2 class="logo-text">Market Facultad</h2>
        </div>
        
        <div class="header">
          <h1>Verificación de Email</h1>
          <p>Código de Acceso Temporal</p>
        </div>
        
        <div class="content">
          <p style="font-size: 16px; color: #333;">¡Hola Futuro emprendedor! 👋</p>
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
            Si tienes problemas, <a href="mailto:dpovi2458@gmail.com" style="color: #0d9488;">contacta al soporte</a>
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
