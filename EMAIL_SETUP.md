# 📧 Configuración de Email para OTP

## 🚀 Opciones de Configuración

El sistema soporta múltiples proveedores de email. Elige el que mejor se adapte a tus necesidades:

---

## ✅ Opción 1: Gmail (Recomendado para desarrollo)

### Paso 1: Crear App Password

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Seguridad → Verificación en 2 pasos (debe estar activada)
3. App Passwords → Crear nueva contraseña de aplicación
4. Selecciona "Mail" y "Other" (escribe "Market Facultad")
5. Copia la contraseña de 16 caracteres generada

### Paso 2: Agregar a `.env`

```env
# Configuración de Email - Gmail
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # App Password (16 caracteres)
EMAIL_FROM=Market Facultad UNMSM <tu-email@gmail.com>
```

### ✅ Ventajas:
- Gratis
- Fácil de configurar
- Confiable
- Límite: 500 emails/día

---

## ✅ Opción 2: Resend (Recomendado para producción)

### Paso 1: Crear cuenta gratuita

1. Ve a: https://resend.com/
2. Crea una cuenta (gratis)
3. Verifica tu email
4. Ve a "API Keys" y crea una nueva clave

### Paso 2: Agregar a `.env`

```env
# Configuración de Email - Resend
EMAIL_SERVICE=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxx
EMAIL_FROM=Market Facultad UNMSM <onboarding@resend.dev>  # Usar tu dominio verificado
```

### ✅ Ventajas:
- **3,000 emails gratis al mes**
- API moderna
- Excelente para producción
- Métricas integradas
- Fácil verificación de dominios

---

## ✅ Opción 3: SendGrid

### Paso 1: Crear cuenta

1. Ve a: https://sendgrid.com/
2. Crea cuenta gratuita
3. Verifica tu email
4. Crea API Key en Settings → API Keys

### Paso 2: Agregar a `.env`

```env
# Configuración de Email - SendGrid
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxx
EMAIL_FROM=Market Facultad UNMSM <noreply@tudominio.com>
```

### ✅ Ventajas:
- 100 emails gratis al día
- Muy confiable
- Buena documentación

---

## ✅ Opción 4: Outlook/Hotmail

### Agregar a `.env`

```env
# Configuración de Email - Outlook
EMAIL_SERVICE=outlook
EMAIL_USER=tu-email@outlook.com
EMAIL_PASSWORD=tu-contraseña
EMAIL_FROM=Market Facultad UNMSM <tu-email@outlook.com>
```

---

## ✅ Opción 5: SMTP Genérico (Cualquier servidor)

```env
# Configuración de Email - SMTP Genérico
SMTP_HOST=smtp.tuservidor.com
SMTP_PORT=587
SMTP_SECURE=false  # true para puerto 465
SMTP_USER=tu-usuario
SMTP_PASSWORD=tu-contraseña
EMAIL_FROM=Market Facultad UNMSM <noreply@tudominio.com>
```

---

## 🔧 Modo Desarrollo (Sin configuración)

Si no configuras ningún servicio de email:

### Comportamiento:
- ✅ El código OTP se muestra en la **consola del servidor**
- ✅ El código también aparece en la **interfaz de usuario**
- ✅ No se envían emails reales
- ✅ Ideal para desarrollo local

### Logs que verás:
```
📧 ═══════════════════════════════════════════════════════
📧 SIMULACIÓN DE EMAIL (Desarrollo sin configuración)
📧 ═══════════════════════════════════════════════════════
📧 Para: estudiante@unmsm.edu.pe
📧 Asunto: 🔐 Código de Verificación - Market Facultad UNMSM
📧 Código OTP: 123456
📧 ═══════════════════════════════════════════════════════
```

---

## 🧪 Probar Configuración

### Script de prueba (crear: `scripts/test-email.js`)

```javascript
import { sendOTPEmail } from '../lib/email.js';

async function testEmail() {
  const testEmail = 'tu-email@gmail.com'; // Cambia esto
  const testCode = '123456';
  
  console.log('🧪 Probando envío de email...\n');
  const result = await sendOTPEmail(testEmail, testCode);
  
  if (result) {
    console.log('✅ Email enviado exitosamente!');
  } else {
    console.log('❌ Error al enviar email');
  }
}

testEmail();
```

Ejecutar:
```bash
node scripts/test-email.js
```

---

## 🔍 Troubleshooting

### Error: "Invalid login"
**Causa:** Credenciales incorrectas
**Solución:** 
- Gmail: Usa App Password, no tu contraseña normal
- Verifica que EMAIL_USER y EMAIL_PASSWORD estén correctos

### Error: "Connection timeout"
**Causa:** Firewall o puerto bloqueado
**Solución:**
- Intenta puerto 587 en lugar de 465
- Desactiva temporalmente el firewall
- Verifica que `SMTP_SECURE=false` para puerto 587

### Error: "self signed certificate"
**Causa:** Certificado SSL no confiable
**Solución:** Agregar a configuración:
```javascript
tls: { rejectUnauthorized: false }
```

### No llegan los emails
**Posibles causas:**
1. Revisa carpeta de SPAM
2. Verifica que el email institucional existe
3. Revisa logs del servidor para ver errores
4. Verifica límites de envío del proveedor

---

## 📋 Checklist de Configuración

- [ ] Elegir proveedor de email
- [ ] Crear cuenta (si es necesario)
- [ ] Obtener credenciales (API Key o App Password)
- [ ] Agregar variables a `.env`
- [ ] Reiniciar servidor de desarrollo
- [ ] Probar envío de OTP
- [ ] Verificar recepción en email
- [ ] Revisar carpeta de SPAM

---

## 🎯 Recomendación para Desarrollo

```env
# .env
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email-de-prueba@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=Market Facultad UNMSM <tu-email-de-prueba@gmail.com>
```

## 🎯 Recomendación para Producción

```env
# .env.production
EMAIL_SERVICE=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxx
EMAIL_FROM=Market Facultad UNMSM <noreply@tudominio.com>
```

---

## 📚 Recursos

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Resend Docs](https://resend.com/docs)
- [SendGrid Docs](https://docs.sendgrid.com/)
- [Nodemailer Docs](https://nodemailer.com/)

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs del servidor
2. Verifica las variables de entorno
3. Prueba con el script de test
4. Revisa la carpeta de SPAM

**Última actualización:** Noviembre 9, 2025
