"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCarrito } from '../context/CarritoContext';
import CarritoIcon from './CarritoIcon';
import SearchBar from './SearchBar';
import { Suspense } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';

export default function Navbar() {
  const { items, open, setOpen } = useCarrito();
  const pathname = usePathname();
  const router = useRouter();
  const isSeller = pathname?.startsWith('/vendedor');

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="container flex items-center justify-between py-3 gap-3">
        <Link href="/" className="text-primary font-semibold">Market Facultad</Link>
        {!isSeller && (
          <div className="hidden md:block flex-1 text-center">
            <Suspense fallback={<div />}> 
              <SearchBar />
            </Suspense>
          </div>
        )}
        <nav className="flex items-center gap-3">
          {!isSeller && (
            <button className="relative" onClick={() => setOpen(true)} aria-label="Abrir carrito">
              <CarritoIcon count={items.reduce((a, b) => a + b.cantidad, 0)} />
            </button>
          )}
          <Link href="/vendedor/login" className="text-sm text-gray-600 hover:text-primary">Vendedor</Link>
        </nav>
      </div>
      {!isSeller && (
        <div className="md:hidden container pb-3">
          <Suspense fallback={<div />}> 
            <SearchBar />
          </Suspense>
        </div>
      )}
      <Modal open={!isSeller && open} onClose={() => setOpen(false)} title="Tu carrito">
        <CartDrawer onClose={() => setOpen(false)} onGoCart={() => { setOpen(false); router.push('/carrito'); }} />
      </Modal>
    </header>
  );
}

function CartDrawer({ onClose, onGoCart }) {
  const { items, updateCantidad, removeItem } = useCarrito();
  const total = items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);
  return (
    <div className="space-y-4">
      {items.length === 0 && <p className="text-sm text-gray-600">Tu carrito está vacío.</p>}
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.producto_id} className="flex items-center gap-3">
            {it.imagen && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.imagen} alt={it.titulo} className="w-16 h-16 object-cover rounded" />
            )}
            <div className="flex-1">
              <p className="font-medium line-clamp-1">{it.titulo}</p>
              <p className="text-sm text-gray-600">S/ {it.precio.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-1">
                <button className="px-2 py-1 border rounded" onClick={() => updateCantidad(it.producto_id, Math.max(1, it.cantidad - 1))}>-</button>
                <span>{it.cantidad}</span>
                <button className="px-2 py-1 border rounded" onClick={() => updateCantidad(it.producto_id, Math.min(it.stock ?? 99, it.cantidad + 1))}>+</button>
                <button className="ml-3 text-danger text-sm" onClick={() => removeItem(it.producto_id)}>Eliminar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Total:</span>
        <span className="text-lg font-semibold">S/ {total.toFixed(2)}</span>
      </div>
      <Button onClick={onGoCart} disabled={items.length === 0}>Ir al carrito</Button>
    </div>
  );
}
