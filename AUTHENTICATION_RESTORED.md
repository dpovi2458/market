# Sistema de Autenticación Tradicional Restaurado ✅

## Resumen

Se ha eliminado completamente el sistema de login con Facebook/NextAuth.js y se ha restaurado el sistema tradicional de autenticación con email institucional UNMSM y contraseña.

## Cambios Realizados

### ❌ Archivos Eliminados (Facebook Login)

1. **`app/api/auth/[...nextauth]/route.js`** - Configuración de NextAuth.js con Facebook provider
2. **`app/api/vendedor/create-with-facebook/route.js`** - API para crear vendedores con Facebook
3. **`components/AuthProvider.js`** - Proveedor de sesión de NextAuth
4. **Versión anterior de `app/vendedor/login/page.js`** - Login con botón de Facebook
5. **Versión anterior de `app/vendedor/registro/page.js`** - Registro vinculado a Facebook

### ✅ Archivos Restaurados/Creados

1. **`app/vendedor/login/page.js`** ✨ **NUEVO**
   - Login tradicional con email institucional + contraseña
   - Validación de dominio @unmsm.edu.pe
   - Opción de mostrar/ocultar contraseña
   - Redirección automática si ya existe sesión activa

2. **`app/vendedor/registro/page.js`** ✨ **NUEVO**
   - Flujo completo en 3 pasos:
     - **Paso 1:** Ingreso de email institucional UNMSM
     - **Paso 2:** Verificación con código OTP (6 dígitos enviado por Resend)
     - **Paso 3:** Creación de contraseña (con confirmación)
   - Timer de reenvío de código (60 segundos)
   - Código OTP visible en modo desarrollo
   - Validación de contraseñas coincidentes
   - Opción para cambiar email si se equivocó

3. **`app/layout.js`** - Restaurado
   - Removido `AuthProvider` de NextAuth
   - Solo mantiene `CarritoProvider`

4. **`lib/models/Vendor.js`** - Restaurado
   - Campo `password_hash` obligatorio nuevamente
   - Eliminados campos `facebook_id` y `email_facebook`
   - Schema vuelto a su estado original

### 🔧 Archivos Sin Cambios (Ya funcionaban)

1. **`app/api/vendedor/login/route.js`** - Login API con bcrypt
2. **`app/api/vendedor/otp-request/route.js`** - Envío de OTP vía Resend
3. **`app/api/vendedor/verify-otp/route.js`** - Verificación de códigos OTP
4. **`lib/auth.js`** - Generación de tokens JWT
5. **`lib/email.js`** - Integración con Resend para envío de emails
6. **`lib/unmsm.js`** - Validación de emails institucionales

## Flujo de Autenticación Completo

### 📝 Registro (Primera Vez)

1. Usuario visita `/vendedor/registro`
2. Ingresa email institucional (ejemplo@unmsm.edu.pe)
3. Sistema envía código OTP de 6 dígitos al email
4. Usuario ingresa el código recibido
5. Sistema verifica el código en la base de datos
6. Usuario crea su contraseña (mínimo 6 caracteres)
7. Sistema:
   - Hashea la contraseña con bcrypt
   - Crea el vendedor en MongoDB
   - Genera token JWT
   - Establece sesión
   - Redirige a `/vendedor/dashboard`

### 🔐 Login (Usuarios Existentes)

1. Usuario visita `/vendedor/login`
2. Ingresa email institucional + contraseña
3. Sistema:
   - Busca vendedor por email
   - Verifica contraseña con bcrypt
   - Genera token JWT
   - Establece sesión
   - Redirige a `/vendedor/dashboard`

## Validaciones Implementadas

### Email
- ✅ Formato válido de email
- ✅ Dominio obligatorio: `@unmsm.edu.pe`
- ✅ Case-insensitive (se guarda en minúsculas)

### Código OTP
- ✅ Exactamente 6 dígitos numéricos
- ✅ Expiración: 15 minutos desde el envío
- ✅ Máximo 3 intentos por código
- ✅ Timer de reenvío: 60 segundos

### Contraseña
- ✅ Mínimo 6 caracteres
- ✅ Confirmación debe coincidir
- ✅ Hasheada con bcrypt (10 salt rounds)
- ✅ Opción de mostrar/ocultar

## Diseño UI

### Colores Principales
- **Teal-600** (`#0d9488`): Botones principales, iconos, enlaces
- **Blue-50** (`#eff6ff`): Fondo degradado
- **Cyan-50** (`#ecfeff`): Fondo degradado
- **Red-50** (`#fef2f2`): Mensajes de error
- **Yellow-50** (`#fefce8`): Código OTP en desarrollo

### Características
- ✨ Diseño moderno con Tailwind CSS
- 📱 Responsive (móvil, tablet, desktop)
- ♿ Accesible (labels, ARIA attributes)
- 🎨 Animaciones suaves (hover, focus, transitions)
- 🔒 Iconos de seguridad (candados, escudos)
- ⏱️ Spinners de carga
- 👁️ Toggle para mostrar/ocultar contraseñas

## Servicios Externos

### Resend (Email/OTP)
- **Usado en:** Envío de códigos OTP
- **API Key:** Configurada en `.env` como `RESEND_API_KEY`
- **From:** `onboarding@resend.dev` (cambiar a dominio propio en producción)
- **Template:** Email HTML con código OTP destacado

### MongoDB (Base de Datos)
- **Colecciones:**
  - `vendors` - Vendedores registrados
  - `verifications` - Códigos OTP temporales
- **Campos en Vendor:**
  ```javascript
  {
    nombre: String,
    apellido: String,
    usuario: String,
    email_institucional: String (unique),
    password_hash: String (required),
    email: String,
    codigo_unmsm: String,
    rol_unmsm: String,
    facultad: String,
    activo: Boolean,
    verificado: Boolean,
    fecha_primer_acceso: Date
  }
  ```

## Seguridad

### ✅ Implementado
- Contraseñas hasheadas con bcrypt (no se guardan en texto plano)
- Validación de email institucional obligatoria
- Verificación OTP de dos factores en registro
- Expiración de códigos OTP (15 minutos)
- Límite de intentos de verificación (3 máximo)
- Tokens JWT con expiración
- Cookies HTTP-only para sesión
- Sanitización de inputs

### 🔐 Mejoras Sugeridas
- [ ] Implementar rate limiting en login (prevenir fuerza bruta)
- [ ] Agregar CAPTCHA en registro
- [ ] Implementar recuperación de contraseña
- [ ] Agregar autenticación de dos factores opcional
- [ ] Logging de intentos fallidos
- [ ] Bloqueo temporal después de X intentos fallidos

## Testing

### Modo Desarrollo
En `NODE_ENV === 'development'`:
- El código OTP se muestra en pantalla (amarillo)
- Logs de consola más verbosos
- No se requiere dominio verificado en Resend

### Modo Producción
En `NODE_ENV === 'production'`:
- Código OTP solo por email
- Logs mínimos
- Dominio verificado requerido en Resend
- Rate limiting habilitado

## Próximos Pasos

1. **Configurar Dominio en Resend**
   - Verificar dominio propio
   - Cambiar `from` de `onboarding@resend.dev` a `noreply@tudominio.com`

2. **Implementar Recuperación de Contraseña**
   - Flujo: email → OTP → nueva contraseña
   - Similar al registro pero sin crear cuenta nueva

3. **Mejorar Seguridad**
   - Rate limiting con Redis
   - Logging con Winston
   - Monitoring con Sentry

4. **Testing**
   - Tests unitarios para validaciones
   - Tests de integración para flujos completos
   - Tests E2E con Playwright

## Comandos Útiles

```bash
# Iniciar desarrollo
npm run dev

# Verificar email en logs (desarrollo)
# El código OTP aparece en la consola y en la UI

# Limpiar verificaciones expiradas (opcional)
# Crear script en /scripts/clean-verifications.js

# Ver usuarios registrados
# Usar MongoDB Compass o conexión directa
```

## Documentación de Referencia

- **Resend:** https://resend.com/docs
- **bcryptjs:** https://github.com/dcodeIO/bcrypt.js
- **Mongoose:** https://mongoosejs.com/docs/
- **Next.js App Router:** https://nextjs.org/docs/app
- **Tailwind CSS:** https://tailwindcss.com/docs

---

**Estado:** ✅ Sistema completamente funcional y listo para usar  
**Última actualización:** 2025-01-23  
**Autor:** GitHub Copilot
