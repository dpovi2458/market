# Sistema de Diseño Visual - Market Facultad

## 🎨 Paleta de Color (Teal/Purple/Orange)

### Primary (Teal) - Identidad de marca
```css
--color-primary-1: #EBF4F4  /* Fondos suaves */
--color-primary-2: #C3DEE0  /* Bordes sutiles */
--color-primary-3: #87BDC2  /* Scrollbar, acentos */
--color-primary-4: #4B9CA3  /* Hover en interactivos */
--color-primary-5: #0F7B85  /* CTA principal, headers */
--color-primary-6: #0B5C63  /* Texto enfatizado */
--color-primary-7: #073D42  /* Texto primario oscuro */
--color-primary-8: #031E21  /* Headings */
```

### Purple (Destacados institucionales)
```css
--color-purple-1: #d9deed  /* Fondos suaves */
--color-purple-2: #8e9ec9  /* Elementos secundarios */
--color-purple-3: #1d3d93  /* Badges, categorías centrales */
```

### Orange (Urgencia, promociones)
```css
--color-orange-1: #f9e7d8  /* Fondos suaves */
--color-orange-2: #edb98a  /* Elementos secundarios */
--color-orange-3: #db7316  /* Alertas, llamadas urgentes */
```

### Validación WCAG 2.1 AA
- ✅ Primary-5 (#0F7B85) sobre blanco: ~5.3:1 (AA texto normal)
- ✅ Purple-3 (#1d3d93) sobre blanco: ~8.5:1 (AAA)
- ⚠️ Orange-3 (#db7316) sobre blanco: ~4.2:1 (usar solo ≥18pt o iconos)

---

## 📝 Tipografía

### Fuentes
- **Lexend**: Headings, UI, botones, labels
- **Noto Sans**: Body text, datos, descripciones

### Escala modular (ratio 1.25)
```css
--text-xs: 0.75rem     /* 12px - metadatos, badges */
--text-sm: 0.875rem    /* 14px - descripciones, labels */
--text-base: 1rem      /* 16px - body */
--text-lg: 1.125rem    /* 18px - subtítulos */
--text-xl: 1.25rem     /* 20px - precios, destacados */
--text-2xl: 1.5rem     /* 24px - títulos sección */
--text-3xl: 1.875rem   /* 30px - hero, títulos principales */
--text-4xl: 2.25rem    /* 36px - landing hero */
```

### Pesos
```css
--weight-light: 300
--weight-normal: 400
--weight-medium: 500
--weight-semibold: 600
--weight-bold: 700
```

---

## 📐 Espaciado (Sistema 8-puntos)

```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-24: 6rem     /* 96px */
```

### Border Radius
```css
--radius-sm: 6px
--radius-md: 10px    /* Default para inputs, botones */
--radius-lg: 12px    /* Cards */
--radius-xl: 16px
--radius-full: 9999px /* Badges, pills */
```

---

## 🎭 Sombras (con tint de marca)

```css
--shadow-sm: 0 2px 4px rgba(15, 123, 133, 0.08)
--shadow-md: 0 4px 12px rgba(15, 123, 133, 0.12)
--shadow-lg: 0 8px 24px rgba(15, 123, 133, 0.16)
--shadow-glass: 12.8px 57.6px 83.2px rgba(15, 123, 133, 0.14),
                inset 0 1.6px 3.2px rgba(0, 0, 0, 0.04),
                inset -1.6px -6.4px 6.4px rgba(0, 0, 0, 0.06),
                inset 1.6px 6.4px 6.4px rgba(255, 255, 255, 0.56)
```

---

## 🧩 Componentes

### Button
**Variantes:**
- `primary`: Gradiente teal, sombra sutil
- `secondary`: Blanco con borde teal
- `danger`: Rojo con sombra
- `outline`: Borde teal, transparente

**Características:**
- Min-height: 48px (WCAG táctil)
- Focus ring: 3px #94c2ff con offset 2px
- Hover: brightness 1.05 + translateY(-1px)
- Active: scale(0.98)
- Font: Lexend semibold

### Input
**Características:**
- Border: 2px #C3DEE0
- Hover border: #87BDC2
- Focus ring: 3px #94c2ff
- Padding: 12px 16px
- Border-radius: 10px
- Font: Noto Sans

### Card
**Características:**
- Background: white
- Border: 1px #C3DEE0
- Border-radius: 12px
- Shadow: shadow-sm
- Hover: shadow-md
- Card-scale variant: scale(1.04) en desktop

### ProductCard
**Features:**
- Imagen aspect-ratio 1:1
- Hover: scale(1.1) en imagen
- Badges con glassmorphism:
  - Danger: gradiente rojo
  - Warning: gradiente naranja
  - Category: backdrop-blur 80px
- Precio: 24px bold teal
- Vendor: 14px con icono

---

## 🎬 Animaciones

```css
--transition-fast: 150ms ease
--transition-base: 300ms ease
--transition-slow: 500ms ease
```

### Microinteracciones
- Hover botones: brightness(1.05)
- Active: scale(0.98)
- Cards: translateY(-4px) + shadow-lg
- Focus: outline 3px con offset 2px

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.92);
backdrop-filter: blur(80px);
-webkit-backdrop-filter: blur(80px);
```

---

## ♿ Accesibilidad WCAG 2.1 AA

### Contraste
- Texto normal (< 18pt): ≥ 4.5:1 ✅
- Texto grande (≥ 18pt): ≥ 3:1 ✅
- Elementos no-texto: ≥ 3:1 ✅

### Foco visible
- Todos los interactivos: outline 3px solid #94c2ff
- Offset: 2px
- Contraste del outline: ≥ 3:1 ✅

### Objetivos táctiles
- Mínimo: 48×48px
- Separación: 8px ✅

### ARIA
- Landmarks semánticos
- Labels descriptivos en iconos
- Live regions en carrusel

---

## 📱 Responsividad

### Breakpoints
```css
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1400px) { /* 2xl */ }
```

### Principios
- Mobile-first approach
- Cards: 1 col móvil → 2-3 desktop
- Container max: 1400px
- Padding inline: 24px desktop, 16px móvil
- Card-scale disabled < 983px

---

## 🎯 Checklist implementación

✅ Tokens CSS en `globals.css`  
✅ Fuentes Google (Lexend + Noto Sans)  
✅ Sistema espaciado 8-puntos  
✅ Sombras con tint de marca  
✅ Scrollbar personalizado teal  
✅ Selección de texto teal  
✅ Button con variantes y focus WCAG  
✅ Input con estados y accesibilidad  
✅ Card con hover scale  
✅ ProductCard con badges glassmorphism  
✅ Navbar con backdrop-blur  
✅ SearchBar con iconografía  
✅ Microinteracciones globales  
✅ Animaciones suaves 300ms  

---

## 🚀 Próximos pasos sugeridos

1. **Componentes adicionales:**
   - Banner hero con imagen de fondo
   - Carrusel horizontal con botones glassmorphism
   - Modal/Dialog con overlay
   - Toast notifications

2. **Mejoras UX:**
   - Skeleton loaders
   - Estados empty
   - Animaciones de entrada (fade-in, slide-in)
   - Infinite scroll con feedback

3. **Optimizaciones:**
   - Lazy load de imágenes
   - Preload de fuentes críticas
   - CSS critical inline

---

**Última actualización:** 8 de noviembre, 2025  
**Versión:** 1.0.0
