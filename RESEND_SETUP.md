# 🚀 Guía Rápida - Configuración de Resend

## ✅ Pasos de Configuración (3 minutos)

### 1️⃣ Obtener API Key

1. **Ir a Resend:**
   - Visita: https://resend.com/
   - Crea una cuenta (gratis) si no tienes una
   - Inicia sesión

2. **Crear API Key:**
   - Ve a: https://resend.com/api-keys
   - Clic en "Create API Key"
   - Nombre: `Market Facultad UNMSM`
   - Permiso: `Full Access` o `Sending Access`
   - Clic en "Create"
   - **Copia la clave** (empieza con `re_...`)

3. **Guardar la clave:**
   - ⚠️ **IMPORTANTE:** Solo se muestra UNA VEZ
   - Guárdala en un lugar seguro

### 2️⃣ Configurar en el Proyecto

**Edita el archivo `.env`:**

```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_TU_CLAVE_REAL_AQUI
EMAIL_FROM=Market Facultad UNMSM <onboarding@resend.dev>
```

**Reemplaza:**
- `re_TU_CLAVE_REAL_AQUI` → Tu API Key real de Resend

### 3️⃣ Probar Configuración

```bash
# Probar envío de email
node scripts/test-resend.js
```

Ingresa un email de prueba y verifica que llegue el código.

### 4️⃣ Reiniciar Servidor

```bash
# Detener servidor actual (Ctrl+C)
# Luego reiniciar:
npm run dev
```

---

## ✨ Características de Resend

### Plan Gratuito:
- ✅ **3,000 emails gratis al mes**
- ✅ API moderna y rápida
- ✅ Sin tarjeta de crédito requerida
- ✅ Dominio de prueba: `onboarding@resend.dev`
- ✅ Dashboard con métricas
- ✅ Logs de todos los emails

### Verificar Dominio Propio (Opcional):
1. Ve a: https://resend.com/domains
2. Agrega tu dominio (ej: `tudominio.com`)
3. Sigue las instrucciones para agregar registros DNS
4. Una vez verificado, cambia en `.env`:
   ```env
   EMAIL_FROM=Market Facultad UNMSM <noreply@tudominio.com>
   ```

---

## 🎯 Ejemplo de Configuración Completa

```env
# .env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
# ... otras variables ...

# Email con Resend
EMAIL_SERVICE=resend
RESEND_API_KEY=re_abc123xyz789...
EMAIL_FROM=Market Facultad UNMSM <onboarding@resend.dev>
```

---

## 🧪 Verificar que Funciona

### Prueba 1: Script de Test
```bash
node scripts/test-resend.js
```
✅ Debe mostrar: "EMAIL ENVIADO EXITOSAMENTE CON RESEND"

### Prueba 2: En la Aplicación
1. Ir a: http://localhost:3000/vendedor/login
2. Ingresar email institucional
3. Clic en "Continuar"
4. Verificar que llegue el email

### Prueba 3: Dashboard de Resend
- Ve a: https://resend.com/emails
- Verás el historial de emails enviados
- Métricas de entregas, aperturas, etc.

---

## 🔍 Troubleshooting

### Error: "Invalid API key"
**Causa:** API Key incorrecta o expirada
**Solución:** 
1. Verifica que la clave empiece con `re_`
2. Crea una nueva API Key si es necesario
3. Asegúrate de no tener espacios extra en `.env`

### Error: "Rate limit exceeded"
**Causa:** Superaste el límite de 3,000 emails/mes
**Solución:**
1. Verifica tu cuota en: https://resend.com/overview
2. Espera al siguiente mes o actualiza plan

### Email va a SPAM
**Solución:**
1. Usa dominio verificado (no `onboarding@resend.dev`)
2. Configura SPF, DKIM, DMARC en tu dominio
3. Marca como "No es spam" la primera vez

### Email no llega
**Checklist:**
1. ✅ API Key configurada correctamente
2. ✅ EMAIL_SERVICE=resend en `.env`
3. ✅ Servidor reiniciado después de cambios
4. ✅ Email válido ingresado
5. ✅ Revisar carpeta de SPAM
6. ✅ Revisar logs en: https://resend.com/emails

---

## 📊 Límites del Plan Gratuito

| Característica | Límite |
|---------------|---------|
| Emails/mes | 3,000 |
| Emails/día | 100 |
| Dominios | 1 |
| API Keys | Ilimitadas |
| Retención de logs | 30 días |

---

## 🎓 Recursos

- **Documentación:** https://resend.com/docs
- **API Reference:** https://resend.com/docs/api-reference
- **Dashboard:** https://resend.com/overview
- **Emails enviados:** https://resend.com/emails
- **API Keys:** https://resend.com/api-keys
- **Dominios:** https://resend.com/domains

---

## ✅ Checklist de Configuración

- [ ] Cuenta de Resend creada
- [ ] API Key generada
- [ ] API Key agregada a `.env`
- [ ] EMAIL_SERVICE=resend configurado
- [ ] EMAIL_FROM configurado
- [ ] Script de prueba ejecutado exitosamente
- [ ] Servidor reiniciado
- [ ] Email de prueba recibido
- [ ] Dashboard de Resend revisado

---

## 🚀 Siguiente Paso

Una vez configurado, el sistema enviará automáticamente emails con códigos OTP cuando:
- Un usuario se registre
- Se solicite verificación de email
- Se use el flujo de login con OTP

**¡Listo para usar!** 🎉

---

**Última actualización:** Noviembre 9, 2025
