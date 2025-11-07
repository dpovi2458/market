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

## Notas
- Este es un MVP: las validaciones son básicas y no hay pasarela de pago.
- Revisa el archivo `middleware.js` para ver las rutas protegidas.
- Componentes clave: `components/ui/*`, `components/Product*`, `context/CarritoContext.js`.

## Próximos pasos sugeridos
- Rate limiting en API.
- Mejorar el carrusel de imágenes.
- Paginación o infinite scroll real en catálogo.
- Emails al vendedor (servicio externo tipo Resend/Sendgrid).