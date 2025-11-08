"use client";
import { useState } from 'react';
import { useCarrito } from '../../../../context/CarritoContext';

export function AddToCart({ product }) {
  const [qty, setQty] = useState(1);
  const { addItem, setOpen } = useCarrito();
  const can = Math.max(0, product.stock || 0);
  const [showNotif, setShowNotif] = useState(false);

  function handleAdd() {
    addItem({ producto_id: product._id, titulo: product.titulo, precio: product.precio, cantidad: qty, imagen: product.imagenes?.[0], stock: product.stock, vendedor_id: product.vendedor_id });
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000);
    setOpen(true);
  }

  return (
    <>
      <div className="quantity-section">
        <div className="quantity-control">
          <button className="quantity-button" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>−</button>
          <input type="number" className="quantity-input" value={qty} readOnly />
          <button className="quantity-button" onClick={() => setQty(Math.min(can, qty + 1))} disabled={qty >= can}>+</button>
        </div>
        <div className="stock-info">
          <div className="stock-badge">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4V9h16v11z"></path>
            </svg>
            Stock: <span>{can}</span>
          </div>
        </div>
      </div>
      <button className="add-to-cart" onClick={handleAdd} disabled={can === 0}>
        {can === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>
      {showNotif && (
        <div className="notification show">
          ✓ Producto agregado al carrito
        </div>
      )}
    </>
  );
}
