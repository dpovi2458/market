"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCarrito } from '../context/CarritoContext';

/**
 * ProductCardWithCart - Tarjeta de producto con acción de agregar al carrito
 * Estructura de 3 partes: Contenedor Grid → Contenido → Acciones
 */
export default function ProductCardWithCart({ product }) {
  const { addItem, setOpen } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [adding, setAdding] = useState(false);
  
  const first = product.imagenes?.[0] || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=60&auto=format&fit=crop';
  const canAdd = product.stock > 0;
  
  function handleAddToCart(e) {
    e.preventDefault();
    if (!canAdd || adding) return;
    setAdding(true);
    addItem({
      producto_id: product._id,
      titulo: product.titulo,
      precio: product.precio,
      imagen: first,
      stock: product.stock,
      cantidad
    });
    setCantidad(1);
    setOpen(true);
    // Pequeña ventana anti doble-click
    setTimeout(() => setAdding(false), 300);
  }
  
  function handleIncrement(e) {
    e.preventDefault();
    if (cantidad < product.stock) {
      setCantidad(cantidad + 1);
    }
  }
  
  function handleDecrement(e) {
    e.preventDefault();
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  return (
    <article className="product-card-grid">
      {/* Imagen con link al detalle */}
      <Link href={`/producto/${product._id}`} className="product-card-image-link">
        <div className="product-card-grid-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={first} alt={product.titulo} />
        </div>
      </Link>

      {/* Parte 1: Contenido informativo */}
      <div className="card-content">
        <Link href={`/producto/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="card-title">{product.titulo}</h3>
        </Link>
        
        {product.descripcion && (
          <p className="card-desc">{product.descripcion.slice(0, 80)}{product.descripcion.length > 80 ? '...' : ''}</p>
        )}
        
        <p className="card-meta">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'inline', verticalAlign: 'text-bottom' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {' '}{product.vendedor_nombre || 'Estudiante'}
        </p>
        
        <h4 className="card-price">S/ {product.precio.toFixed(2)}</h4>
      </div>

      {/* Parte 2: Acciones (cantidad + botón) */}
      <div className="card-actions">
        {canAdd && (
          <div className="qty-selector">
            <button 
              onClick={handleDecrement}
              disabled={cantidad <= 1}
              aria-label="Disminuir cantidad"
              className="qty-btn"
            >
              −
            </button>
            <span className="qty-value">{cantidad}</span>
            <button 
              onClick={handleIncrement}
              disabled={cantidad >= product.stock}
              aria-label="Aumentar cantidad"
              className="qty-btn"
            >
              +
            </button>
          </div>
        )}
        
        <button 
          onClick={handleAddToCart}
          disabled={!canAdd || adding}
          className={`btn-add-cart ${!canAdd ? 'disabled' : ''}`}
          aria-label={canAdd ? 'Agregar al carrito' : 'Sin stock'}
        >
          <svg 
            className="cart-icon" 
            width="20" 
            height="20" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>{adding ? 'Agregando...' : (canAdd ? 'Agregar al carrito' : 'Sin stock')}</span>
        </button>
      </div>
    </article>
  );
}
