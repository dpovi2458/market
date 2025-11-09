# Sistema de Login con Facebook para Marketplace UNMSM

## ✅ Cambios Realizados

1. **NextAuth.js instalado** - Sistema de autenticación con Facebook
2. **Login con Facebook** - Página `/vendedor/login` actualizada
3. **AuthProvider** - Componente wrapper para NextAuth
4. **Layout actualizado** - Incluye AuthProvider

## 📋 Pasos Pendientes

### 1. Configurar Facebook App

1. Ve a https://developers.facebook.com/
2. Crea una nueva app de Facebook
3. Configura Facebook Login en tu app
4. Añade estas URLs de redirect:
   - **Development**: `http://localhost:3000/api/auth/callback/facebook`
   - **Production**: `https://tu-dominio.com/api/auth/callback/facebook`
5. Copia el App ID y App Secret

### 2. Configurar Variables de Entorno

Añade a tu archivo `.env.local`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_aqui_usa_openssl_rand_base64_32

# Facebook OAuth
FACEBOOK_CLIENT_ID=tu_app_id_de_facebook
FACEBOOK_CLIENT_SECRET=tu_app_secret_de_facebook
```

Para generar NEXTAUTH_SECRET en PowerShell:
```powershell
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### 3. Crear API Route para crear vendedor

Crear archivo: `app/api/vendedor/create-with-facebook/route.js`

```javascript
import { NextResponse } from 'next/server';
import { VendorModel } from '../../../../lib/models/Vendor';
import { VerificationModel } from '../../../../lib/models/Verification';
import { isValidUNMSMEmail, extractDataFromUNMSMEmail } from '../../../../lib/unmsm';
import { signToken } from '../../../../lib/auth';

export async function POST(req) {
  try {
    const { email_institucional, facebook_id, nombre, email_facebook } = await req.json();

    if (!isValidUNMSMEmail(email_institucional)) {
      return NextResponse.json({ 
        error: 'Email institucional inválido' 
      }, { status: 400 });
    }

    // Verificar que el email haya sido verificado con OTP
    const Verification = await VerificationModel();
    const verification = await Verification.findOne({
      email_institucional: email_institucional.toLowerCase(),
      verificado: true,
      expira_en: { $gt: new Date() }
    });

    if (!verification) {
      return NextResponse.json({ 
        error: 'Email no verificado. Completa la verificación primero.' 
      }, { status: 401 });
    }

    const Vendor = await VendorModel();
    
    // Verificar si ya existe un vendedor con este email o Facebook ID
    let vendor = await Vendor.findOne({
      $or: [
        { email_institucional: email_institucional.toLowerCase() },
        { facebook_id: facebook_id }
      ]
    });

    if (vendor) {
      // Si ya existe, actualizar y retornar token
      vendor.facebook_id = facebook_id;
      vendor.email_facebook = email_facebook;
      vendor.activo = true;
      await vendor.save();
    } else {
      // Crear nuevo vendedor
      const userData = extractDataFromUNMSMEmail(email_institucional);
      const emailLocalPart = email_institucional.split('@')[0];
      const username = emailLocalPart.toLowerCase().replace(/[^a-z0-9]/g, '');

      vendor = new Vendor({
        nombre: nombre || userData.nombre,
        apellido: userData.apellido,
        usuario: username,
        email_institucional: email_institucional.toLowerCase(),
        email: email_institucional.toLowerCase(),
        email_facebook: email_facebook,
        facebook_id: facebook_id,
        codigo_unmsm: userData.codigo,
        rol_unmsm: userData.rolEstimado,
        facultad: userData.facultad,
        activo: true,
        verificado: true,
        fecha_primer_acceso: new Date()
      });

      await vendor.save();
    }

    // Generar token
    const identity = {
      id: vendor._id.toString(),
      nombre: vendor.nombre,
      apellido: vendor.apellido,
      email_institucional: vendor.email_institucional,
      facultad: vendor.facultad,
      rol_unmsm: vendor.rol_unmsm
    };

    const token = signToken(identity);

    const response = NextResponse.json({ 
      ok: true,
      vendor: {
        id: vendor._id,
        nombre: vendor.nombre,
        email: vendor.email_institucional
      }
    }, { status: 200 });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    });

    return response;
  } catch (error) {
    console.error('Error creando vendedor:', error);
    return NextResponse.json({ 
      error: 'Error procesando solicitud' 
    }, { status: 500 });
  }
}
```

### 4. Actualizar Modelo de Vendor

En `lib/models/Vendor.js`, añade los campos de Facebook:

```javascript
facebook_id: { type: String, unique: true, sparse: true },
email_facebook: { type: String },
```

Y elimina el campo `password_hash` ya que ya no se usa.

### 5. Arreglar archivo de registro

El archivo `app/vendedor/registro/page.js` tiene contenido duplicado.
Reemplázalo completamente con el contenido del archivo REGISTRO_PAGE.md que crearé.

### 6. Verificar rutas de la API

- `/api/vendedor/otp-request` - ✅ Ya existe
- `/api/vendedor/verify-otp` - ✅ Ya existe
- `/api/vendedor/create-with-facebook` - ⚠️  Crear (paso 3)

### 7. Eliminar rutas antiguas (opcional)

Ya no necesitas:
- `/api/vendedor/login/route.js` - Ya no se usa el login con contraseña

## 🎯 Flujo Completo

1. Usuario hace clic en "Continuar con Facebook" en `/vendedor/login`
2. Se autentica con Facebook (popup de Facebook)
3. Redirige a `/vendedor/registro`
4. Ingresa su email institucional UNMSM
5. Recibe código OTP por email (Resend)
6. Verifica el código
7. Se crea la cuenta de vendedor vinculada a Facebook
8. Redirige a `/vendedor/dashboard`

## 🔧 Testing

Para probar en desarrollo:
1. Asegúrate de tener las variables de entorno configuradas
2. Ejecuta `npm run dev`
3. Ve a `http://localhost:3000/vendedor/login`
4. Haz clic en "Continuar con Facebook"

## 📝 Notas

- El sistema de OTP con Resend ya está funcionando
- Facebook maneja la autenticación principal
- El email UNMSM verifica que sea estudiante de la universidad
- Ya no se usan contraseñas (más seguro)
