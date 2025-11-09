# 🎓 Sistema de Autenticación UNMSM - Panel de Vendedor

## 📋 Descripción

Sistema profesional de autenticación para vendedores utilizando correos institucionales UNMSM (@unmsm.edu.pe). El sistema extrae automáticamente datos personales del email y facilita el registro e inicio de sesión.

---

## ✨ Características principales

### 1. **Validación de Email Institucional**
- ✅ Solo acepta correos con dominio `@unmsm.edu.pe`
- ✅ Validación en tiempo real en el formulario
- ✅ Mensajes de error claros y descriptivos

### 2. **Extracción Automática de Datos**
El sistema extrae automáticamente:
- **Nombre y Apellido**: Del formato del email (ej: juan.perez@unmsm.edu.pe → Juan Perez)
- **Facultad**: Del subdominio (ej: fcc.unmsm.edu.pe → Facultad de Ciencias Contables)
- **Código UNMSM**: Código de estudiante/docente si está en el email
- **Rol**: Detecta automáticamente si es estudiante, docente o administrativo

### 3. **Dual Mode: Iniciar Sesión / Registrarse**
- **Iniciar Sesión**: Para usuarios registrados anteriormente
- **Registrarse**: Crea automáticamente la cuenta en el primer acceso
- Toggle visible en el formulario para cambiar entre modos

### 4. **Seguridad**
- ✅ Contraseñas hasheadas con bcryptjs (mínimo 6 caracteres)
- ✅ Cookies httpOnly y secure
- ✅ Sesión de 30 días
- ✅ Validación en servidor y cliente

---

## 🚀 Cómo usar

### **Para Estudiantes/Docentes UNMSM**

#### Primer acceso (Registro):
1. Visita: `http://localhost:3000/vendedor/login`
2. Haz clic en **"Registrarse"**
3. Ingresa tu correo institucional (ej: `juan.perez@unmsm.edu.pe`)
4. Crea una contraseña (mínimo 6 caracteres)
5. ¡Tu perfil se completará automáticamente!

#### Accesos posteriores (Login):
1. Haz clic en **"Iniciar Sesión"**
2. Ingresa tu correo y contraseña
3. Serás redirigido al dashboard

---

## 📊 Datos Extraídos del Email

### Ejemplo 1: Estudiante de Ciencias Contables
```
Email: juan.perez@fcc.unmsm.edu.pe
↓
Nombre: Juan
Apellido: Perez
Facultad: Facultad de Ciencias Contables
Rol: Estudiante
Código: juan.perez (si contiene números, se extrae)
```

### Ejemplo 2: Con Código de Estudiante
```
Email: 19123456@fec.unmsm.edu.pe
↓
Nombre: Estudiante 19123456
Apellido: UNMSM
Facultad: Facultad de Educación
Rol: Estudiante
Código: 19123456
```

### Ejemplo 3: Docente
```
Email: profesor.garcia@fim.unmsm.edu.pe
↓
Nombre: Profesor
Apellido: Garcia
Facultad: Facultad de Ingeniería Industrial
Rol: Docente (detectado por "prof")
```

---

## 🗂️ Facultades Soportadas

| Código | Facultad |
|--------|----------|
| fcc | Facultad de Ciencias Contables |
| fcf | Facultad de Ciencias Farmacéuticas y Bioquímica |
| fd | Facultad de Derecho |
| fec | Facultad de Educación |
| feca | Facultad de Electrónica y Ciencias |
| fcs | Facultad de Ciencias Sociales |
| fim | Facultad de Ingeniería Industrial |
| fiis | Facultad de Ingeniería de Sistemas |
| fiqt | Facultad de Química e Ingeniería Química |
| fmvz | Facultad de Medicina Veterinaria |
| fcm | Facultad de Medicina |
| fc | Facultad de Ciencias |

---

## 🔧 Estructura de Base de Datos

### Campos de Vendedor (Vendor)
```javascript
{
  nombre: String,                    // Extraído del email
  apellido: String,                  // Extraído del email
  email_institucional: String,       // Email único UNMSM
  usuario: String,                   // Para compatibilidad (nullable)
  password_hash: String,             // Hasheada con bcryptjs
  email: String,                     // Copia del email_institucional
  telefono: String,
  codigo_unmsm: String,              // Código extraído
  rol_unmsm: String,                 // 'estudiante' | 'docente' | 'administrativo'
  facultad: String,                  // Nombre de la facultad
  programa: String,
  activo: Boolean,
  verificado: Boolean,
  fecha_primer_acceso: Date,
  fecha_registro: Date
}
```

---

## 📝 Archivos Modificados

1. **`lib/models/Vendor.js`**
   - Campos nuevos: `email_institucional`, `codigo_unmsm`, `rol_unmsm`, `facultad`, `verificado`

2. **`lib/unmsm.js`** (NUEVO)
   - Funciones de validación y extracción de datos UNMSM
   - Mapeo de facultades
   - Detección automática de roles

3. **`app/api/vendedor/login/route.js`**
   - Integración con validación UNMSM
   - Registro automático en primer acceso
   - Token JWT con datos UNMSM

4. **`app/vendedor/login/page.js`**
   - UI rediseñada con toggle Iniciar Sesión/Registrarse
   - Validación de email en tiempo real
   - Mensajes informativos

---

## 🔐 Flujo de Autenticación

```
Usuario llega a login
        ↓
¿Ingresa email @unmsm.edu.pe?
    ├─ NO → Error: "Usa correo institucional UNMSM"
    └─ SÍ ↓
¿Es primer acceso (Registrarse)?
    ├─ SÍ:
    │   ├─ Extraer datos del email
    │   ├─ Crear usuario automáticamente
    │   ├─ Hashear contraseña
    │   └─ Generar token JWT
    │
    └─ NO:
        ├─ Buscar usuario en BD
        ├─ ¿Existe?
        │   ├─ NO → Error: "Email no registrado"
        │   └─ SÍ ↓
        ├─ Verificar contraseña
        │   ├─ Incorrecta → Error
        │   └─ Correcta ↓
        └─ Generar token JWT
            ↓
        Guardar cookie (30 días)
            ↓
        Redireccionar a /vendedor/dashboard
```

---

## 🧪 Ejemplos de Prueba

### Registrarse como Estudiante
```
Email: luis.hernandez@fiqt.unmsm.edu.pe
Contraseña: MiContra123
↓
Se crea automáticamente:
- Nombre: Luis
- Apellido: Hernandez
- Facultad: Facultad de Química e Ingeniería Química
- Rol: Estudiante
```

### Registrarse con Código
```
Email: 20191234@fiis.unmsm.edu.pe
Contraseña: Seguro123
↓
Se crea automáticamente:
- Nombre: Estudiante 20191234
- Apellido: UNMSM
- Facultad: Facultad de Ingeniería de Sistemas
- Código: 20191234
- Rol: Estudiante
```

---

## 🛠️ Tecnologías Utilizadas

- **Next.js 14**: Framework React full-stack
- **MongoDB**: Base de datos NoSQL
- **bcryptjs**: Hash de contraseñas
- **JWT**: Autenticación de sesiones
- **Tailwind CSS**: Estilos profesionales

---

## ✅ Checklist de Funcionalidades

- ✅ Validación de email @unmsm.edu.pe
- ✅ Extracción automática de nombre y apellido
- ✅ Extracción de facultad desde subdominio
- ✅ Detección de rol (estudiante/docente/admin)
- ✅ Registro automático en primer acceso
- ✅ Toggle Iniciar Sesión / Registrarse
- ✅ Validación de contraseña (mínimo 6 caracteres)
- ✅ Hash seguro de contraseñas
- ✅ Sesión persistente (30 días)
- ✅ UI profesional y responsive
- ✅ Mensajes de error descriptivos

---

## 🎯 Próximas mejoras posibles

- [ ] Recuperación de contraseña por email
- [ ] 2FA con código OTP
- [ ] Sincronización con directorio UNMSM (API oficial)
- [ ] Verificación de email adicional
- [ ] Perfil de usuario editable
- [ ] Dashboard con estadísticas personalizadas por facultad

---

**¡Sistema listo para usar! 🚀**
