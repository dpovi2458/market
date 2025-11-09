# 🔍 DEBUG REPORT - Sistema de Autenticación

## Análisis del Problema

**Issue identificado:** El login NO funciona sin registrarse primero porque el flujo está diseñado así intencionalmente, pero hay problemas en la validación.

## Flujo Actual vs Flujo Esperado

### ❌ Problema Detectado:

En `/api/vendedor/login/route.js` línea 23-36:

```javascript
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
```

**PROBLEMA:** La verificación OTP expira en 10 minutos, pero se requiere para el registro. Si el usuario se demora más de 10 minutos entre verificar el OTP y crear la contraseña, el registro fallará.

## Solución Implementada

### 1. Modificar la lógica de verificación

La verificación OTP debe ser:
- ✅ Obligatoria DURANTE el proceso de registro
- ❌ NO requerida después de que la cuenta ya fue creada

### 2. Aumentar tiempo de expiración de verificación verificada

Cuando un OTP es verificado exitosamente, debemos extender su validez para dar tiempo al usuario de completar el registro.

## Implementación

