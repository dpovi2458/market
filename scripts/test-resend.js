/**
 * Script para probar la configuración de Resend
 * Ejecutar con: node scripts/test-resend.js
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

async function testResend() {
  console.log('📧 ═══════════════════════════════════════════════════════');
  console.log('📧 PRUEBA DE CONFIGURACIÓN DE RESEND');
  console.log('📧 ═══════════════════════════════════════════════════════\n');

  // Verificar configuración
  console.log('🔍 Verificando configuración...\n');
  
  const emailService = process.env.EMAIL_SERVICE;
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;

  console.log('  - EMAIL_SERVICE:', emailService);
  console.log('  - RESEND_API_KEY:', resendApiKey ? `${resendApiKey.substring(0, 8)}...` : '❌ NO CONFIGURADO');
  console.log('  - EMAIL_FROM:', emailFrom || '❌ NO CONFIGURADO');
  console.log('');

  // Validar configuración
  if (emailService !== 'resend') {
    console.error('❌ ERROR: EMAIL_SERVICE debe ser "resend"');
    console.log('\nAgrega a tu .env:');
    console.log('  EMAIL_SERVICE=resend');
    process.exit(1);
  }

  if (!resendApiKey || resendApiKey.includes('TU_API_KEY')) {
    console.error('❌ ERROR: RESEND_API_KEY no está configurado correctamente');
    console.log('\nPasos para obtener tu API Key:');
    console.log('  1. Ve a: https://resend.com/api-keys');
    console.log('  2. Crea una nueva API Key');
    console.log('  3. Copia la clave que empieza con "re_"');
    console.log('  4. Agrégala a tu .env:');
    console.log('     RESEND_API_KEY=re_tu_clave_aqui');
    process.exit(1);
  }

  if (!resendApiKey.startsWith('re_')) {
    console.error('⚠️  ADVERTENCIA: La API Key de Resend debe empezar con "re_"');
    console.log('  Asegúrate de haber copiado la clave correctamente.\n');
  }

  // Importar módulo de email
  const { sendOTPEmail } = await import('../lib/email.js');

  // Solicitar email de destino
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  console.log('📝 Ingresa el email de destino para la prueba:');
  let testEmail = await question('   Email: ');
  testEmail = testEmail.trim();

  if (!testEmail) {
    console.error('❌ ERROR: Debes ingresar un email válido');
    rl.close();
    process.exit(1);
  }

  rl.close();

  const testCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  console.log('\n🚀 Enviando email de prueba con Resend...');
  console.log('  - Destinatario:', testEmail);
  console.log('  - Código OTP:', testCode);
  console.log('  - Remitente:', emailFrom);
  console.log('');

  try {
    const startTime = Date.now();
    const result = await sendOTPEmail(testEmail, testCode);
    const duration = Date.now() - startTime;
    
    if (result) {
      console.log('\n✅ ═══════════════════════════════════════════════════════');
      console.log('✅ EMAIL ENVIADO EXITOSAMENTE CON RESEND');
      console.log('✅ ═══════════════════════════════════════════════════════');
      console.log(`\n⏱️  Tiempo de envío: ${duration}ms`);
      console.log('\n📋 Siguiente pasos:');
      console.log('  1. Revisa la bandeja de entrada de:', testEmail);
      console.log('  2. Revisa también la carpeta de SPAM');
      console.log('  3. Busca el código OTP:', testCode);
      console.log('  4. El asunto es: "🔐 Código de Verificación - u-market UNMSM"');
      console.log('\n💡 TIP: Puedes ver las estadísticas en:');
      console.log('   https://resend.com/emails');
      console.log('');
      process.exit(0);
    } else {
      console.log('\n❌ ═══════════════════════════════════════════════════════');
      console.log('❌ ERROR AL ENVIAR EMAIL');
      console.log('❌ ═══════════════════════════════════════════════════════');
      console.log('\n📋 Posibles causas:');
      console.log('  1. API Key incorrecta o expirada');
      console.log('  2. Límite de emails alcanzado (3,000/mes en plan gratuito)');
      console.log('  3. Email remitente no verificado');
      console.log('\n💡 Soluciones:');
      console.log('  1. Verifica tu API Key en: https://resend.com/api-keys');
      console.log('  2. Revisa tu cuota en: https://resend.com/overview');
      console.log('  3. Usa onboarding@resend.dev para pruebas sin verificar dominio');
      console.log('');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error crítico:', error.message);
    console.error('\nDetalles:', error);
    process.exit(1);
  }
}

testResend();
