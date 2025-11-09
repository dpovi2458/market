# 🖼️ Imágenes - Market Facultad

## Archivos de Imagen

### hero-estudiantes-fii.png
**Ubicación:** `/public/images/hero-estudiantes-fii.png`  
**Tamaño recomendado:** 500-600px ancho  
**Formato:** PNG con transparencia  
**Propósito:** Imagen hero banner (lado derecho)

**Instrucciones:**
1. Guarda tu imagen de estudiantes de FII aquí
2. Asegúrate que sea PNG para mantener transparencia
3. Comprime con TinyPNG antes de subir
4. Ancho recomendado: 600px máximo

---

## Optimización de Imágenes

Para mejor performance, comprimi tu imagen antes de subirla:

**Herramientas recomendadas:**
- [TinyPNG](https://tinypng.com/) - Comprime sin perder calidad
- [Squoosh](https://squoosh.app/) - Google's image compressor
- ImageMagick CLI: `convert image.png -quality 85 image-optimized.png`

**Tamaño target:** < 200KB

---

## Uso en el Código

La imagen se referencia en `app/(tienda)/page.js`:

```jsx
<img 
  src="/images/hero-estudiantes-fii.png" 
  alt="Estudiantes de Ingeniería Industrial"
  className="hero-illustration"
  loading="lazy"
/>
```

---

**Última actualización:** 8 de Noviembre, 2025
