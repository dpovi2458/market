# Sistema de Carrito - Market Facultad

## ✨ Implementación Completada

He implementado un **sistema de carrito completo y profesional** siguiendo el sistema de diseño de San Market con las siguientes características:

### 📦 Componentes Creados/Actualizados

#### 1. **Modal.js** (components/ui/)
- Modal reutilizable con glassmorphism
- Overlay con backdrop blur
- Animaciones suaves (fadeIn + slideUp)
- Cierre con tecla ESC
- Diseño responsive

#### 2. **CarritoModal.js** (components/)
- Modal completo del carrito
- Lista de items con imagen, nombre, vendedor
- Controles de cantidad (+/-)
- Precio total por item
- Botón eliminar
- Total dinámico
- Estado vacío con mensaje amigable
- Botón "Proceder al pago" que redirige a `/carrito`

#### 3. **CarritoIcon.js** (components/)
- Botón del carrito en header
- Badge con contador de items (estilo naranja)
- Notificación toast cuando se agrega producto
- Integrado con CarritoContext

#### 4. **CarritoContext.js** (context/)
Nuevas funciones agregadas:
- `totalItems`: Total de productos en el carrito
- `totalPrice`: Suma total del precio
- `increaseQuantity(id)`: Aumentar cantidad (respeta stock)
- `decreaseQuantity(id)`: Disminuir cantidad (mínimo 1)

#### 5. **Navbar.js** (components/)
- Integrado CarritoIcon y CarritoModal
- Reemplazado MiniCart anterior por el nuevo sistema

#### 6. **globals.css** (app/)
Estilos agregados:
- `.cart-button` y `.cart-icon`
- `.cart-badge` (naranja con borde blanco)
- `.notification` (toast verde con animación slideIn)
- `.cart-modal-*` (overlay, content, header, body, footer)
- `.cart-item-*` (imagen, detalles, controles de cantidad)
- `.cart-total` y `.cart-checkout-btn`
- Media queries responsive

---

## 🎨 Características del Diseño

### ✅ Sistema de Diseño San Market
- **Paleta de colores**: Teal (#0F7B85), Purple (#1d3d93), Orange (#db7316)
- **Tipografías**: Lexend (headings) + Noto Sans (body)
- **Espaciado**: Sistema 8-puntos
- **Border-radius**: Consistentes (sm: 6px, md: 10px, lg: 12px, xl: 16px)
- **Sombras**: Con tint de marca teal
- **Transiciones**: Suaves (300ms ease)

### ♿ Accesibilidad WCAG 2.1 AA
- ✅ Roles ARIA: `role="dialog"`, `aria-modal="true"`
- ✅ Labels descriptivos: Todos los botones tienen `aria-label`
- ✅ Foco visible: Outline de 3px con contraste ≥3:1
- ✅ Navegación con teclado: ESC para cerrar modal
- ✅ Anuncios: `aria-live="polite"` en badge y notificaciones
- ✅ Screen reader: Clase `.sr-only` para textos ocultos

### 📱 Responsive
- **Desktop**: Modal centrado con max-width 600px
- **Móvil**: Modal ocupa 90vh, se ancla abajo (border-radius superior)
- Imágenes de productos: 80px desktop, 60px móvil
- Notificaciones: Se adaptan a pantalla completa en móvil

---

## 🚀 Funcionalidades

### 1. Ver Carrito
- Click en el botón del header abre el modal
- Modal glassmorphism con backdrop blur

### 2. Items del Carrito
Cada item muestra:
- Imagen del producto
- Nombre del producto
- Vendedor (con icono)
- Controles de cantidad (+/-)
- Precio total (precio × cantidad)
- Botón eliminar

### 3. Control de Cantidad
- Botón **+**: Aumenta cantidad (respeta stock máximo)
- Botón **−**: Disminuye cantidad
- Se deshabilita botón − cuando cantidad = 1
- Actualiza precios en tiempo real

### 4. Total Dinámico
- Se calcula automáticamente: Σ (precio × cantidad)
- Muestra en formato `S/ ##.##`
- Se actualiza al cambiar cantidades o eliminar items

### 5. Estado Vacío
- Mensaje: "Tu carrito está vacío"
- Icono ilustrativo del carrito
- Botón checkout deshabilitado

### 6. Notificaciones Toast
- Aparece cuando se agrega un producto
- Color verde (#0f8514)
- Icono de check
- Animación slideIn desde la derecha
- Desaparece automáticamente después de 3 segundos

### 7. Proceder al Pago
- Botón destacado en el footer del modal
- Redirige a `/carrito` (página de checkout)
- Deshabilitado cuando carrito está vacío

---

## 🎯 Flujo de Usuario

1. Usuario navega productos en home
2. Click en "Agregar al carrito" → se agrega al carrito
3. Notificación toast aparece confirmando
4. Badge del carrito se actualiza con el total de items
5. Click en icono del carrito → abre modal
6. Usuario puede:
   - Ajustar cantidades
   - Eliminar productos
   - Ver total actualizado
7. Click en "Proceder al pago" → redirige a `/carrito`

---

## 📝 Próximas Mejoras Sugeridas

1. **Animación del badge**: Escala cuando se agrega producto
2. **Toast notifications mejoradas**: 
   - Diferentes tipos (success, error, warning)
   - Múltiples notificaciones apiladas
3. **Descuentos y cupones**: Campo para aplicar códigos
4. **Persistencia**: Ya implementada con localStorage
5. **Empty state mejorado**: Botón "Ver productos destacados"
6. **Loading states**: Skeleton loaders mientras carga
7. **Confirmación al eliminar**: "¿Estás seguro?"

---

## 🧪 Testing

Para probar el carrito:

1. Inicia el servidor: `npm run dev`
2. Navega a la página principal
3. Agrega productos al carrito
4. Click en el icono del carrito en el header
5. Prueba:
   - Aumentar/disminuir cantidades
   - Eliminar productos
   - Cerrar modal (click fuera, botón X, o ESC)
   - Proceder al pago

---

**Última actualización:** 8 de noviembre, 2025  
**Versión:** 1.0.0
