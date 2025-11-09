# 🎨 GUÍA DE PERSONALIZACIÓN - MARKET HEADER

## Cómo Personalizar Tu Header

Este documento te muestra cómo hacer cambios al nuevo header sin complicaciones.

---

## 📍 UBICACIÓN DEL ARCHIVO

```
marketplace-facultad/
└── components/
    └── MarketHeader.js  ← Archivo principal
```

---

## 🎨 CAMBIOS COMUNES

### 1. CAMBIAR COLORES DEL LOGO

**Localización:** `MarketHeader.js` línea ~26

```javascript
// ❌ Antes (Teal)
<div className="bg-gradient-to-br from-teal-600 to-teal-700 p-2.5 rounded-xl ...">

// ✅ Cambiar a Purple
<div className="bg-gradient-to-br from-purple-600 to-purple-700 p-2.5 rounded-xl ...">

// ✅ Cambiar a Orange
<div className="bg-gradient-to-br from-orange-600 to-orange-700 p-2.5 rounded-xl ...">

// ✅ Cambiar a Azul
<div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl ...">
```

**Opciones de colores disponibles:**
```
- teal (actual)
- purple
- orange
- blue
- green
- red
- indigo
- pink
```

---

### 2. CAMBIAR COLOR DEL TEXTO DEL LOGO

**Localización:** `MarketHeader.js` línea ~32

```javascript
// ❌ Antes (Teal)
<span className="text-xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 ...">

// ✅ Cambiar a Purple
<span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-purple-600 ...">

// ✅ Solo color sólido (sin gradient)
<span className="text-xl font-bold text-teal-700 ...">
```

---

### 3. CAMBIAR TAMAÑO DEL LOGO

**Localización:** `MarketHeader.js` línea ~26

```javascript
// Tamaño del icono dentro del box:
// ❌ Actual (w-6 h-6 = 24px)
<ShoppingCartIcon />  

// ✅ Más grande (w-8 h-8 = 32px)
<ShoppingCartIcon />  ← Aumenta el SVG

// En el SVG, cambiar:
<svg className="w-8 h-8 text-white">

// ✅ Más pequeño (w-4 h-4 = 16px)
<svg className="w-4 h-4 text-white">
```

**Tamaños Tailwind:**
```
w-4 h-4 = 16px
w-5 h-5 = 20px
w-6 h-6 = 24px (actual)
w-8 h-8 = 32px
w-10 h-10 = 40px
```

---

### 4. CAMBIAR VELOCIDAD DE ANIMACIONES

**Localización:** `MarketHeader.js` línea ~26

```javascript
// ❌ Actual (300ms)
transition-all duration-300 group-hover:scale-105

// ✅ Más lento (500ms)
transition-all duration-500 group-hover:scale-105

// ✅ Más rápido (200ms)
transition-all duration-200 group-hover:scale-105
```

**Durations disponibles:**
```
duration-100 = 100ms
duration-150 = 150ms
duration-200 = 200ms
duration-300 = 300ms (actual)
duration-500 = 500ms
duration-700 = 700ms
duration-1000 = 1000ms
```

---

### 5. CAMBIAR EFECTO HOVER DEL LOGO

**Localización:** `MarketHeader.js` línea ~26

```javascript
// ❌ Actual (escala + sombra)
group-hover:shadow-xl transition-all duration-300 group-hover:scale-105

// ✅ Solo sombra (sin escala)
group-hover:shadow-xl transition-all duration-300

// ✅ Solo escala (sin sombra)
transition-all duration-300 group-hover:scale-105

// ✅ Más escala
group-hover:scale-110  ← En lugar de scale-105

// ✅ Menos escala
group-hover:scale-102  ← En lugar de scale-105

// ✅ Añadir rotación
group-hover:rotate-3 transition-all duration-300 group-hover:scale-105
```

---

### 6. CAMBIAR COLOR DEL SEARCH ICON

**Localización:** `MarketHeader.js` línea ~94

```javascript
// ❌ Actual (teal-600)
<SearchIcon />  // Dentro de div con color

// En SearchBar.js, línea ~13:
style={{ color: '#4B9CA3' }}  // Código hex teal

// ✅ Cambiar a purple
style={{ color: '#7c3aed' }}  // Purple-600

// ✅ Cambiar a orange
style={{ color: '#ea580c' }}  // Orange-600
```

---

### 7. CAMBIAR ESTILOS DEL SEARCH BAR

**Localización:** `components/SearchBar.js` línea ~20

```javascript
// ❌ Actual
borderColor: '#C3DEE0'  // Teal claro

// ✅ Cambiar a purple
borderColor: '#e9d5ff'  // Purple claro

// ✅ Cambiar a orange
borderColor: '#fed7aa'  // Orange claro
```

---

### 8. CAMBIAR BADGE DEL CARRITO

**Localización:** `MarketHeader.js` línea ~102

```javascript
// ❌ Actual (rojo)
<span className="absolute -top-1 -right-1 bg-red-500 ...">

// ✅ Cambiar a orange
<span className="absolute -top-1 -right-1 bg-orange-500 ...">

// ✅ Cambiar a pink
<span className="absolute -top-1 -right-1 bg-pink-500 ...">

// ✅ Cambiar a purple
<span className="absolute -top-1 -right-1 bg-purple-500 ...">
```

---

### 9. CAMBIAR POSICIÓN DEL BADGE

**Localización:** `MarketHeader.js` línea ~103

```javascript
// ❌ Actual (arriba-derecha)
<span className="absolute -top-1 -right-1 ...">

// ✅ Abajo-derecha
<span className="absolute -bottom-1 -right-1 ...">

// ✅ Arriba-izquierda
<span className="absolute -top-1 -left-1 ...">

// ✅ Más lejos de la esquina
<span className="absolute top-0 -right-2 ...">
```

---

### 10. CAMBIAR PADDING DEL HEADER

**Localización:** `MarketHeader.js` línea ~16

```javascript
// ❌ Actual
<div className="flex items-center justify-between py-4 gap-4">

// ✅ Más espacios
<div className="flex items-center justify-between py-6 gap-6">

// ✅ Menos espacio
<div className="flex items-center justify-between py-3 gap-2">
```

**Valores disponibles:**
```
py-2 = 8px
py-3 = 12px
py-4 = 16px (actual)
py-6 = 24px
py-8 = 32px
```

---

### 11. CAMBIAR BORDER DEL HEADER

**Localización:** `MarketHeader.js` línea ~13

```javascript
// ❌ Actual (2px gris)
<header className="... border-b-2 border-gray-200 ...">

// ✅ Sin border
<header className="... ...">

// ✅ Border teal
<header className="... border-b-2 border-teal-200 ...">

// ✅ Border más grueso (4px)
<header className="... border-b-4 border-gray-200 ...">
```

---

### 12. CAMBIAR SOMBRA DEL HEADER

**Localización:** `MarketHeader.js` línea ~13

```javascript
// ❌ Actual (shadow-md)
<header className="... shadow-md">

// ✅ Sin sombra
<header className="... ...">

// ✅ Sombra más fuerte
<header className="... shadow-lg">

// ✅ Sombra muy fuerte
<header className="... shadow-xl">
```

---

## 🎨 ESQUEMAS DE COLOR COMPLETOS

### Opción 1: Purple (Moderno)
```javascript
Logo: from-purple-600 to-purple-700
Text: from-purple-700 to-purple-600
Icons: purple-600
Hover: purple-50, purple-200
```

### Opción 2: Orange (Vibrante)
```javascript
Logo: from-orange-600 to-orange-700
Text: from-orange-700 to-orange-600
Icons: orange-600
Hover: orange-50, orange-200
```

### Opción 3: Blue (Profesional)
```javascript
Logo: from-blue-600 to-blue-700
Text: from-blue-700 to-blue-600
Icons: blue-600
Hover: blue-50, blue-200
```

### Opción 4: Green (Natural)
```javascript
Logo: from-green-600 to-green-700
Text: from-green-700 to-green-600
Icons: green-600
Hover: green-50, green-200
```

---

## 🔧 ESTRUCTURA DEL CÓDIGO

```javascript
export default function MarketHeader() {
  // Line 15-17: Header container & styles
  // Line 21-30: Logo section
  // Line 33-44: Desktop search bar
  // Line 47-100: Desktop navigation
  // Line 103-107: Mobile menu button
  // Line 111-119: Mobile search bar
  // Line 122-160: Mobile menu
}
```

---

## 📝 GUÍA PASO A PASO: CAMBIAR TODO A PURPLE

1. **Abre** `components/MarketHeader.js`

2. **Línea 26:** Logo box color
   ```javascript
   // Cambiar
   from-teal-600 to-teal-700
   // Por
   from-purple-600 to-purple-700
   ```

3. **Línea 32:** Logo text color
   ```javascript
   // Cambiar
   from-teal-700 to-teal-600
   // Por
   from-purple-700 to-purple-600
   ```

4. **Línea 55:** Search icon color
   ```javascript
   // Cambiar
   text-teal-600
   // Por
   text-purple-600
   ```

5. **Línea 67:** Links hover color
   ```javascript
   // Cambiar
   hover:text-teal-600 hover:bg-teal-50 hover:border-teal-200
   // Por
   hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200
   ```

6. **Línea 77:** Vendor link
   ```javascript
   // Cambiar
   hover:text-teal-700 hover:bg-teal-50 hover:border-teal-200
   // Por
   hover:text-purple-700 hover:bg-purple-50 hover:border-purple-200
   ```

7. **Guarda y verifica** en http://localhost:3000 ✅

---

## 🧪 PROBAR CAMBIOS EN VIVO

1. **Haz un cambio** en `MarketHeader.js`
2. **Guarda el archivo** (Ctrl+S)
3. **El navegador auto-actualiza** (hot reload)
4. **Verás el cambio inmediatamente**

Si no ves cambios:
- Recarga la página: `F5`
- Limpia caché: `Ctrl+Shift+Delete`
- Abre en incógnito

---

## ⚠️ COSAS QUE NO DEBES HACER

❌ No cambies la estructura HTML
❌ No elimines componentes sin reemplazar
❌ No cambies los nombres de funciones
❌ No modifiques useCarrito() directamente
❌ No hagas cambios sin probar primero

---

## ✅ MEJOR PRÁCTICA

Cuando hagas cambios:

1. **Guarda una copia**
   ```bash
   copy MarketHeader.js MarketHeader.backup.js
   ```

2. **Haz un cambio a la vez**
   - Cambia color
   - Guarda
   - Verifica

3. **Si algo va mal, revierte**
   ```bash
   copy MarketHeader.backup.js MarketHeader.js
   ```

4. **Después de estar satisfecho, elimina backup**
   ```bash
   del MarketHeader.backup.js
   ```

---

## 💡 EJEMPLOS PRÁCTICOS

### Ejemplo 1: Header Minimalista
```javascript
// Quita gradients, solo colores sólidos
Logo: bg-teal-600
Text: text-teal-700
Hover: simple hover:bg-teal-50
```

### Ejemplo 2: Header Colorido
```javascript
// Gradients más llamativos
Logo: from-teal-500 to-teal-800
Text: from-teal-800 to-teal-500
Badge: bg-orange-600
```

### Ejemplo 3: Header Oscuro
```javascript
// Background más oscuro
bg-gray-900 text-white
Logo: bg-teal-600
Border: border-gray-700
```

---

## 🎯 RESUMEN DE ARCHIVOS

| Archivo | Cambios | Dificultad |
|---------|---------|-----------|
| MarketHeader.js | Colores, tamaños, animaciones | Fácil |
| SearchBar.js | Color icono, estilos search | Medio |
| globals.css | Estilos adicionales | Difícil |
| layout.js | Estructura header | No tocar |

---

## 🚀 DESPUÉS DE CAMBIOS

1. **Verifica en local:**
   ```
   http://localhost:3000
   ```

2. **Prueba mobile:**
   - DevTools: F12
   - Toggle device: Ctrl+Shift+M
   - Verifica menu slide-down

3. **Si está bien, deploy:**
   ```bash
   git add -A
   git commit -m "style: customize header colors"
   git push origin main
   ```

---

## 📞 AYUDA RÁPIDA

**¿Cambio no se ve?**
- Recarga: `F5`
- Hard refresh: `Ctrl+Shift+F5`
- Dev tools: `F12` → Application → Clear cache

**¿Color se ve diferente?**
- Usa hex codes en lugar de tailwind
- `style={{ color: '#0F7B85' }}`

**¿Animación muy lenta?**
- Reduce `duration-300` a `duration-200`

**¿Quiero volver a original?**
- Restaura desde git: `git checkout components/MarketHeader.js`

---

## 🎉 ¡AHORA A PERSONALIZAR!

¿Necesitas ayuda con algún cambio específico? Avísame y lo hacemos juntos 🚀

---

**Última actualización:** 8 de Noviembre, 2025  
**Versión:** 1.0  
**Status:** ✅ LISTO PARA PERSONALIZAR
