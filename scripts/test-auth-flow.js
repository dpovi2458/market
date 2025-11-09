// Script de debugging para probar el flujo de autenticación
// Uso: node scripts/test-auth-flow.js

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';
const TEST_EMAIL = 'test.vendor@unmsm.edu.pe';
const TEST_PASSWORD = 'testpass123';

async function testAuthFlow() {
  console.log('🔍 DEBUGGING FLUJO DE AUTENTICACIÓN\n');

  // PASO 1: Solicitar OTP
  console.log('📧 PASO 1: Solicitando código OTP...');
  try {
    const otpResponse = await fetch(`${BASE_URL}/api/vendedor/otp-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TEST_EMAIL })
    });
    
    const otpData = await otpResponse.json();
    console.log('Status:', otpResponse.status);
    console.log('Response:', JSON.stringify(otpData, null, 2));

    if (!otpResponse.ok) {
      console.error('❌ Error solicitando OTP');
      return;
    }

    const otpCode = otpData.dev_code;
    console.log('✅ OTP enviado:', otpCode);

    if (!otpCode) {
      console.error('❌ No se recibió código OTP en modo desarrollo');
      return;
    }

    // PASO 2: Verificar OTP
    console.log('\n🔐 PASO 2: Verificando código OTP...');
    const verifyResponse = await fetch(`${BASE_URL}/api/vendedor/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TEST_EMAIL, codigo: otpCode })
    });

    const verifyData = await verifyResponse.json();
    console.log('Status:', verifyResponse.status);
    console.log('Response:', JSON.stringify(verifyData, null, 2));

    if (!verifyResponse.ok) {
      console.error('❌ Error verificando OTP');
      return;
    }

    console.log('✅ OTP verificado correctamente');

    // PASO 3: Crear cuenta (registro)
    console.log('\n👤 PASO 3: Creando cuenta con contraseña...');
    const registerResponse = await fetch(`${BASE_URL}/api/vendedor/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        isNewUser: true,
        emailVerificado: true
      })
    });

    const registerData = await registerResponse.json();
    console.log('Status:', registerResponse.status);
    console.log('Response:', JSON.stringify(registerData, null, 2));

    if (!registerResponse.ok) {
      console.error('❌ Error creando cuenta');
      console.error('Detalles:', registerData.error);
      return;
    }

    console.log('✅ Cuenta creada exitosamente');

    // PASO 4: Intentar login
    console.log('\n🔑 PASO 4: Intentando login con credenciales...');
    const loginResponse = await fetch(`${BASE_URL}/api/vendedor/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        isNewUser: false,
        emailVerificado: false
      })
    });

    const loginData = await loginResponse.json();
    console.log('Status:', loginResponse.status);
    console.log('Response:', JSON.stringify(loginData, null, 2));

    if (!loginResponse.ok) {
      console.error('❌ Error en login');
      return;
    }

    console.log('✅ Login exitoso');

    console.log('\n✨ FLUJO COMPLETO EXITOSO ✨');
    console.log('\nVendedor creado:');
    console.log('- ID:', loginData.vendedor.id);
    console.log('- Nombre:', loginData.vendedor.nombre);
    console.log('- Email:', loginData.vendedor.email_institucional);
    console.log('- Facultad:', loginData.vendedor.facultad);

  } catch (error) {
    console.error('\n💥 ERROR INESPERADO:', error.message);
    console.error(error.stack);
  }
}

// Ejecutar test
testAuthFlow().catch(console.error);
