# Configuración de Cloudinary para Upload Directo

## ✨ Ventajas del Upload Directo desde el Navegador

- ✅ **Funciona desde cualquier hosting** (Vercel, Netlify, DigitalOcean, etc.)
- ✅ **No consume recursos del servidor** - upload directo a Cloudinary
- ✅ **Más rápido** - sin pasar por tu backend
- ✅ **Barra de progreso** - feedback visual para el usuario
- ✅ **Más seguro** - no expone API secrets en el cliente

## 📋 Pasos para Configurar Cloudinary

### 1. Crear un Upload Preset en Cloudinary

1. Ve a tu [Cloudinary Console](https://console.cloudinary.com/)
2. En el menú lateral, ve a **Settings** (⚙️)
3. Selecciona la pestaña **Upload**
4. Scroll hasta **Upload presets**
5. Click en **Add upload preset**

### 2. Configurar el Preset

**Nombre del preset:** `marketplace_unsigned` (o el que prefieras)

**Configuración recomendada:**

```
Signing Mode: Unsigned
Folder: marketplace-facultad (opcional, puedes dejarlo vacío)
```

**Transformaciones (opcional pero recomendado):**
- Width: 1000
- Height: 1000
- Crop: limit
- Quality: auto:good
- Format: auto

**Restricciones de seguridad:**
```
Allowed formats: jpg, png, webp, gif
Max file size: 5000000 (5MB)
Max image width: 2000
Max image height: 2000
```

3. **Guarda el preset**

### 3. Copiar el Preset Name

Una vez creado, copia el nombre del preset (por ejemplo: `marketplace_unsigned`)

### 4. Agregar a Variables de Entorno

**Desarrollo local** - Edita `.env`:
```env
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=marketplace_unsigned
```

**Producción (Vercel):**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - Name: `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
   - Value: `marketplace_unsigned`
4. Redeploy la aplicación

**Producción (DigitalOcean Apps):**
1. Ve a tu App en DO
2. Settings → App-Level Environment Variables
3. Agrega la variable
4. Redeploy

## 🧪 Probar la Configuración

1. Inicia la app: `npm run dev`
2. Login como vendedor: http://localhost:3000/vendedor/login
   - Usuario: `seller1`
   - Contraseña: `clave123`
3. Ve a crear producto: http://localhost:3000/vendedor/productos/nuevo
4. Sube una imagen - deberías ver:
   - Barra de progreso durante el upload
   - La imagen aparece inmediatamente
   - No hay errores en consola

## 🔍 Troubleshooting

### Error: "Cloudinary no está configurado"
- Verifica que `.env` tenga `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- Reinicia el servidor de desarrollo después de editar `.env`

### Error: "Upload preset must be whitelisted"
- El preset debe estar en modo **Unsigned**
- Revisa la configuración del preset en Cloudinary Console

### Error: "Invalid signature"
- No uses un preset **Signed** - debe ser **Unsigned**
- Crea un nuevo preset en modo Unsigned

### La imagen no sube pero no hay error
- Revisa la consola del navegador (F12)
- Verifica que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` sea correcto
- Prueba con una imagen más pequeña (< 1MB)

### Error de CORS
- No debería pasar con Cloudinary
- Si ocurre, verifica que el cloud_name sea correcto

## 📱 Características Implementadas

✅ **Validación en cliente:**
- Solo imágenes (image/*)
- Máximo 5MB
- Máximo 3 imágenes por producto

✅ **UX mejorada:**
- Barra de progreso durante upload
- Botón deshabilitado mientras sube
- Preview inmediato de imágenes
- Botón × para eliminar imágenes antes de guardar

✅ **Sin dependencia del backend:**
- Upload 100% desde el navegador
- Funciona aunque el backend esté caído
- No consume bandwidth del servidor

## 🔐 Seguridad

**¿Es seguro el unsigned upload?**

Sí, si lo configuras correctamente:

✅ **Restricciones aplicadas:**
- Solo formatos de imagen permitidos
- Tamaño máximo configurado en Cloudinary
- Folder específico (marketplace-facultad)
- No permite uploads arbitrarios

⚠️ **Recomendaciones adicionales:**
- Activa "Auto moderation" en Cloudinary para filtrar contenido inapropiado
- Configura límites de uploads por IP en Cloudinary
- Considera activar "Eager transformations" para optimización automática

## 🚀 Deploy a Producción

1. Asegúrate de tener todas las variables en Vercel/DO:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=marketplace_unsigned
```

2. Deploy:
```bash
git add .
git commit -m "feat: direct browser upload to Cloudinary"
git push origin main
```

3. Vercel auto-desplegará, o en DO haz redeploy manual

4. Prueba en producción igual que en local

---

**¿Necesitas ayuda?** Revisa los logs de consola del navegador y del servidor.
