# ProductCardWithCart - Componente de Tarjeta con 3 Partes

## Estructura

El componente sigue la arquitectura de **3 partes claras**:

### 1. Contenedor Grid
- Layout CSS Grid: `140px | 1fr | auto` (imagen | contenido | acciones)
- Responsive: Cambia a 1 columna en móvil
- Padding y gaps en múltiplos de 8 (sistema de spacing)
- Max-width: 900px para evitar expansión excesiva

### 2. Contenido Informativo
- **Título** (card-title): Lexend, semibold, teal en hover, 2 líneas max
- **Descripción** (card-desc): Noto Sans, secondary color, 80 chars truncado
- **Metadatos** (card-meta): Nombre del vendedor con ícono
- **Precio** (card-price): Grande, bold, color teal primario

### 3. Acciones
- **Selector de cantidad**: 
  - Botones +/- de 40×40px (target táctil)
  - Disabled cuando alcanza límites (1 o stock)
  - Hover: fondo teal
- **Botón "Agregar al carrito"**:
  - Gradiente teal
  - Ícono SVG de carrito
  - Estados: normal, hover, active, disabled, loading
  - Min height 48px (accesibilidad)

## Uso

### Opción 1: Componente individual
```jsx
import ProductCardWithCart from '@/components/ProductCardWithCart';

<ProductCardWithCart product={productData} />
```

### Opción 2: Lista de productos
```jsx
import ProductList from '@/components/ProductList';

<ProductList products={productsArray} />
```

### Opción 3: En una página
```jsx
// app/(tienda)/productos/page.js
import ProductList from '@/components/ProductList';
import { listProductsPublic } from '@/lib/server/productsService';

export default async function ProductosPage() {
  const { items } = await listProductsPublic({ limit: 20 });
  
  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
      <h1>Productos disponibles</h1>
      <ProductList products={items} />
    </div>
  );
}
```

## Formato de datos esperado

```js
{
  _id: "123",
  titulo: "CARNÉ UNIVERSITARIO PREGRADO",
  descripcion: "Procedimiento para la obtención del carné...",
  precio: 17.70,
  stock: 10,
  categoria: "utiles", // utiles | comida | tecnologia | ropa | otros
  vendedor_nombre: "OFICINA DE SECRETARÍA GENERAL",
  imagenes: ["https://..."]
}
```

## Responsive

- **Desktop (>768px)**: Grid 3 columnas, botón con texto completo
- **Tablet (768px)**: Grid 1 columna, acciones en fila horizontal
- **Mobile (<480px)**: Solo ícono del carrito (sin texto "Agregar al carrito")

## Accesibilidad

✅ WCAG 2.1 AA compliant
- Focus rings de 3px en todos los controles interactivos
- aria-label en botones +/- 
- aria-hidden en íconos decorativos
- Touch targets mínimo 40-48px
- Contraste 4.5:1 en textos
- Estados disabled visibles

## CSS Classes

### Principales
- `.product-card-grid` - Contenedor principal
- `.card-content` - Área de información
- `.card-actions` - Área de controles
- `.qty-selector` - Selector de cantidad
- `.btn-add-cart` - Botón principal

### Modificadores
- `.btn-add-cart.disabled` - Botón sin stock

## Ventajas vs ProductCard original

| Característica | ProductCard | ProductCardWithCart |
|---|---|---|
| Layout | Vertical (imagen arriba) | Horizontal (grid 3 col) |
| Acción principal | Link al detalle | Agregar al carrito |
| Cantidad | Solo en detalle | Directa en tarjeta |
| Espacio | Compacto para grids | Más espacioso, lista |
| Información | Mínima | Descripción incluida |
| Responsive | Grid 2-4 cols | Lista apilable |

## Cuándo usar cada uno

- **ProductCard**: Home, grids de productos, vistas de exploración
- **ProductCardWithCart**: Páginas de categoría, búsqueda, checkout rápido

## Demo visual

```
┌─────────────────────────────────────────────────────────┐
│ ┌─────────┐  CARNÉ UNIVERSITARIO PREGRADO      ┌─────┐ │
│ │         │  Procedimiento para obtención...    │ - 1 + │
│ │  Imagen │  📚 SECRETARÍA GENERAL              └─────┘ │
│ │ 140x140 │  S/ 17.70                          ┌────────┐
│ └─────────┘                                     │🛒 Agre│
│                                                  │  gar  │
│                                                  └────────┘
└─────────────────────────────────────────────────────────┘
```
