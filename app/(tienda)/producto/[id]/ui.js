"use client";
import { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { useCarrito } from '../../../../context/CarritoContext';

export function AddToCart({ product }) {
  const [qty, setQty] = useState(1);
  const { addItem, setOpen } = useCarrito();
  const can = Math.max(0, product.stock || 0);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 border rounded" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
        <span>{qty}</span>
        <button className="px-3 py-1 border rounded" onClick={() => setQty(Math.min(can, qty + 1))}>+</button>
        <span className="text-sm text-gray-600 ml-2">Stock: {can}</span>
      </div>
      <Button
        disabled={can === 0}
        onClick={() => {
          addItem({ producto_id: product._id, titulo: product.titulo, precio: product.precio, cantidad: qty, imagen: product.imagenes?.[0], stock: product.stock, vendedor_id: product.vendedor_id });
          setOpen(true);
        }}
      >
        Agregar al carrito
      </Button>
    </div>
  );
}
