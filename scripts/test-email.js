/**
 * Script para probar la configuración de email
 * Ejecutar con: node scripts/test-email.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
function loadEnv() {
  try {
    const envPath = join(__dirname, '..', '.env');
    const envContent = readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    }
    console.log('✓ Variables de entorno cargadas\n');
  } catch (error) {
    console.error('⚠️  No se pudo cargar .env');
  }
}

loadEnv();

// Importar después de cargar env
import { sendOTPEmail } from '../lib/email.js';

async function testEmail() {
  console.log('📧 ═══════════════════════════════════════════════════════');
  console.log('📧 PRUEBA DE CONFIGURACIÓN DE EMAIL');
  console.log('📧 ═══════════════════════════════════════════════════════\n');

  // Mostrar configuración actual
  console.log('🔍 Configuración detectada:');
  console.log('  - NODE_ENV:', process.env.NODE_ENV || 'development');
  console.log('  - EMAIL_SERVICE:', process.env.EMAIL_SERVICE || 'No configurado');
  console.log('  - EMAIL_USER:', process.env.EMAIL_USER || 'No configurado');
  console.log('  - SMTP_HOST:', process.env.SMTP_HOST || 'No configurado');
  console.log('  - RESEND_API_KEY:', process.env.RESEND_API_KEY ? '***configurado***' : 'No configurado');
  console.log('  - SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? '***configurado***' : 'No configurado');
  console.log('');

  // Pedir email de destino
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  let testEmail = await question('📧 Ingresa el email de prueba (presiona Enter para usar ejemplo): ');
  testEmail = testEmail.trim() || 'test@unmsm.edu.pe';

  rl.close();

  const testCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  console.log('\n🚀 Enviando email de prueba...');
  console.log('  - Destinatario:', testEmail);
  console.log('  - Código OTP:', testCode);
  console.log('');

  try {
    const result = await sendOTPEmail(testEmail, testCode);
    
    if (result) {
      console.log('\n✅ ═══════════════════════════════════════════════════════');
      console.log('✅ EMAIL ENVIADO EXITOSAMENTE');
      console.log('✅ ═══════════════════════════════════════════════════════');
      console.log('\n📋 Siguiente pasos:');
      console.log('  1. Revisa la bandeja de entrada de:', testEmail);
      console.log('  2. Revisa también la carpeta de SPAM');
      console.log('  3. Busca el código OTP:', testCode);
      console.log('');
    } else {
      console.log('\n❌ ═══════════════════════════════════════════════════════');
      console.log('❌ ERROR AL ENVIAR EMAIL');
      console.log('❌ ═══════════════════════════════════════════════════════');
      console.log('\n📋 Posibles soluciones:');
      console.log('  1. Verifica las variables de entorno en .env');
      console.log('  2. Revisa los logs arriba para ver el error específico');
      console.log('  3. Consulta EMAIL_SETUP.md para instrucciones detalladas');
      console.log('  4. Si usas Gmail, asegúrate de usar App Password');
      console.log('');
    }
  } catch (error) {
    console.error('\n❌ Error crítico:', error.message);
  }

  process.exit(result ? 0 : 1);
}

testEmail();
