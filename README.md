# Marketplace Facultad Industrial (MVP)

Marketplace simple para compra/venta entre estudiantes de Ingeniería Industrial.

## Requisitos
- Node.js 18+
- MongoDB Atlas (Free Tier)
- Cuenta Cloudinary (gratuita)

## 1) Configuración inicial

1. Clona o copia este proyecto.
2. Crea el archivo `.env.local` en la raíz (usa `.env.local.example` de referencia) y completa:
   - MONGODB_URI
   - JWT_SECRET (cualquier cadena larga aleatoria)
   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
   - NEXT_PUBLIC_APP_URL (http://localhost:3000 durante desarrollo)
3. Instala dependencias y levanta el proyecto:

```powershell
npm install
npm run dev
```

4. (Opcional) Poblar datos de ejemplo (5 vendedores y 10 productos):

```powershell
npm run seed
```

- Credenciales ejemplo: `seller1` / `clave123`

## 2) Backend
- Conexión a MongoDB: `lib/mongodb.js` (Mongoose + cliente nativo opcional)
- Modelos: `lib/models/{Product,Order,Vendor}.js`
- Rutas API (App Router):
  - `GET /api/productos` (búsqueda, filtro por categoría, paginado)
  - `POST /api/productos` (crear producto)
  - `GET/PUT/DELETE /api/productos/[id]`
  - `POST /api/pedidos` (crear pedido)
  - `POST /api/vendedor/login` (autenticación, cookie httpOnly)
  - `GET /api/vendedor/productos` (productos del vendedor)
  - `GET/PATCH /api/vendedor/pedidos` (pedidos del vendedor, marcar entregado)
  - `POST /api/upload` (subida de imagen a Cloudinary)

## 3) Frontend (features)
- Catálogo: página de inicio con grid, búsqueda en tiempo real y chips de categoría.
- Detalle de producto: info completa + agregar al carrito.
- Carrito: ícono con contador, drawer rápido y página `/carrito` con flujo de 2 pasos (revisión + datos de contacto). Tras confirmar, redirige a `/pedido-exitoso`.

## 4) Panel Vendedor
- `/vendedor/login` para ingresar.
- Middleware protege `/vendedor/*`.
- Dashboard con métricas básicas.
- Gestión de productos: listar/crear/editar/eliminar, subir imágenes a Cloudinary.
- Pedidos: listado y acción para marcar como entregado.

## 5) Deploy
### Vercel (rápido)
1. Crea un nuevo proyecto en Vercel importando este repo.
2. Añade las variables de entorno del `.env.local` en el panel de Vercel.
3. Deploy. Configura `NEXT_PUBLIC_APP_URL` con la URL de producción.

### DigitalOcean Apps (alternativa)
1. Crea una App en DigitalOcean, conecta el repo.
2. Servicio de tipo Node.js con el comando `npm run build` y `npm start`.
3. Añade variables de entorno (las mismas del `.env.local`).
4. Asigna dominio y deploy.

### Otros proveedores (Railway, Render, Netlify, Amplify)
La lógica es similar: subir repo, definir variables y construir.

| Plataforma | Build Command | Start Command | Archivo env |
|-----------|---------------|---------------|-------------|
| Vercel | auto (Next) | auto | Panel de variables |
| Netlify (Next 13) | `npm run build` | `npm run start` (Next Runtime) | UI Netlify |
| Railway | `npm run build` | `npm run start` | Variables en Settings |
| Render | `npm install && npm run build` | `npm run start` | Environment en Dashboard |
| Amplify | Detecta `npm run build` | `npx next start` | Amplify Console |

### Variables requeridas (todas las plataformas)
```
MONGODB_URI
JWT_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_APP_URL (https://tu-dominio.com)
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
```

### Checklist antes de hacer deploy
- [ ] `.env.example` NO contiene credenciales reales
- [ ] Subiste variables al panel del hosting
- [ ] Upload preset Unsigned creado en Cloudinary
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` correcto (prueba /api/test-cloudinary)
- [ ] Dominio final añadido a `allowedOrigins` si usas server actions
- [ ] Revisaste logs post-deploy (errores de conexión Mongo / Cloudinary)

### Probar Cloudinary en producción
Ruta de prueba: `/api/test-cloudinary` debe devolver `{ ok: true }`.
Si falla:
1. Verifica que no haya espacios en las variables.
2. Rota claves si sospechas exposición.
3. Revisa que el preset sea **Unsigned**.

### Estrategia de subida de imágenes
Este proyecto soporta dos modos:
1. Upload directo desde el navegador (recomendado) usando `useCloudinaryUpload`.
2. Upload vía backend (`POST /api/upload`) para escenarios donde necesites validar server-side.

Si el hosting bloquea buffers grandes (algunos planes free), usa sólo el modo directo.

### Consejos anti-frustración (errores comunes)
| Problema | Causa | Solución |
|----------|-------|----------|
| 500 Cloudinary config missing | Variables no cargadas | Revisar panel env y redeploy |
| 401 No autorizado en /api/upload | Cookie no enviada | Ver dominio y `NEXT_PUBLIC_APP_URL` |
| CORS al subir directo | Cloud name incorrecto | Revisa `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` |
| Upload preset must be whitelisted | Modo Signed | Crear preset Unsigned |
| Timeout en Render/Railway | Plan con cold starts | Activar plano superior o usar upload directo |

### Seguridad extra
- Limita formatos y tamaño en el preset.
- Considera moderación automática de contenido en Cloudinary.
- Implementa rate limiting en rutas `/api/upload` para evitar abuso.
- Nunca expongas `CLOUDINARY_API_SECRET` en el cliente.

### Rotación de claves
Si subiste credenciales reales al repo en algún momento:
1. Genera nuevas en Cloudinary y MongoDB.
2. Invalida las antiguas.
3. Fuerza un redeploy.

---
## 6) Checklist rápido deploy (resumen)
```
1. Crear preset Unsigned en Cloudinary
2. Llenar .env.local con vars necesarias
3. Subir repo / conectar hosting
4. Configurar variables en panel
5. Deploy
6. Verificar /api/test-cloudinary y subida de imagen en panel vendedor
```

## Notas
- Este es un MVP: las validaciones son básicas y no hay pasarela de pago.
- Revisa el archivo `middleware.js` para ver las rutas protegidas.
- Componentes clave: `components/ui/*`, `components/Product*`, `context/CarritoContext.js`.

## Próximos pasos sugeridos
- Rate limiting en API.
- Mejorar el carrusel de imágenes.
- Paginación o infinite scroll real en catálogo.
- Emails al vendedor (servicio externo tipo Resend/Sendgrid).