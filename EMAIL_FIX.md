# 🚀 SOLUCIÓN RÁPIDA - Email OTP No Se Envía

## ⚡ Problema
Los códigos OTP no llegan al correo electrónico.

## ✅ Soluciones Implementadas

### 🎯 Solución Actual (Modo Desarrollo)
**El sistema ahora funciona SIN configuración de email:**

```
📧 ═══════════════════════════════════════════════════════
📧 SIMULACIÓN DE EMAIL (Desarrollo sin configuración)
📧 ═══════════════════════════════════════════════════════
📧 Para: estudiante@unmsm.edu.pe
📧 Asunto: 🔐 Código de Verificación - Market Facultad UNMSM
📧 Código OTP: 123456
📧 ═══════════════════════════════════════════════════════
```

- ✅ **El código se muestra en la consola del servidor**
- ✅ **El código aparece en la interfaz de usuario (modo dev)**
- ✅ **No necesitas configurar email para desarrollo**
- ✅ **Funciona inmediatamente**

---

## 🔧 Configuración para Enviar Emails Reales

### Opción 1: Gmail (5 minutos) ⭐ RECOMENDADO

1. **Crear App Password:**
   - Ve a: https://myaccount.google.com/security
   - Activa "Verificación en 2 pasos"
   - Busca "App Passwords"
   - Crea una nueva para "Mail" → "Other: Market Facultad"
   - Copia el código de 16 caracteres

2. **Agregar a `.env`:**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   EMAIL_FROM=Market Facultad UNMSM <tu-email@gmail.com>
   ```

3. **Reiniciar servidor:**
   ```bash
   npm run dev
   ```

✅ **Ventajas:**
- Gratis
- 500 emails/día
- Configuración en 5 minutos
- Muy confiable

---

### Opción 2: Resend (3 minutos) 🚀 PRODUCCIÓN

1. **Crear cuenta:**
   - Ve a: https://resend.com/
   - Regístrate (gratis)
   - Crea API Key

2. **Agregar a `.env`:**
   ```env
   EMAIL_SERVICE=resend
   RESEND_API_KEY=re_xxxxxxxxxxxxxx
   EMAIL_FROM=Market Facultad UNMSM <onboarding@resend.dev>
   ```

✅ **Ventajas:**
- **3,000 emails gratis/mes**
- API moderna
- Perfecto para producción
- Métricas integradas

---

## 🧪 Probar Configuración

```bash
node scripts/test-email.js
```

Esto enviará un email de prueba y te mostrará si funciona correctamente.

---

## 📋 Checklist Rápido

**Para Desarrollo (Sin email):**
- [x] Sistema funciona sin configuración
- [x] Códigos visibles en consola
- [x] Códigos visibles en UI
- [x] Listo para usar

**Para Enviar Emails Reales:**
- [ ] Elegir proveedor (Gmail o Resend)
- [ ] Obtener credenciales
- [ ] Agregar a `.env`
- [ ] Reiniciar servidor
- [ ] Ejecutar `node scripts/test-email.js`
- [ ] Verificar recepción de email

---

## 🎥 Video Tutorial Gmail App Password

1. Google Account → Seguridad
2. Verificación en 2 pasos → Activar
3. App Passwords → Crear nueva
4. Seleccionar "Mail" → "Otro"
5. Copiar código de 16 dígitos
6. Pegar en `.env` como `EMAIL_PASSWORD`

---

## 📚 Documentación Completa

- **EMAIL_SETUP.md** - Guía completa de configuración
- **.env.example** - Ejemplos de todas las opciones
- **scripts/test-email.js** - Script de prueba

---

## 🆘 Problemas Comunes

### "Invalid login" en Gmail
**Solución:** Debes usar **App Password**, NO tu contraseña normal

### "Connection timeout"
**Solución:** Verifica firewall o prueba con Resend

### Emails van a SPAM
**Solución:** 
1. Marca como "No es spam"
2. Agrega remitente a contactos
3. En producción, usa dominio verificado

---

## ⚡ Resumen

| Opción | Configuración | Costo | Emails/mes | Recomendado |
|--------|---------------|-------|------------|-------------|
| Sin Config | ❌ No | Gratis | N/A | ✅ Desarrollo |
| Gmail | 5 min | Gratis | 15,000 | ✅ Desarrollo |
| Resend | 3 min | Gratis | 3,000 | ✅ Producción |
| SendGrid | 5 min | Gratis | 3,000 | ⚠️ Alternativa |

---

**Estado actual:** ✅ Sistema funcionando en modo desarrollo (sin email real)

**Para producción:** Configura Gmail o Resend según la guía arriba
