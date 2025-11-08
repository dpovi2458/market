"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCarrito } from '../context/CarritoContext';
import SearchBar from './SearchBar';
import { Suspense } from 'react';

export default function Navbar() {
  const { items, open, setOpen } = useCarrito();
  const pathname = usePathname();
  const router = useRouter();
  const isSeller = pathname?.startsWith('/vendedor');

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between py-4 gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-primary">
            Market Facultad
          </span>
        </Link>
        
        {!isSeller && (
          <div className="hidden md:block flex-1 max-w-2xl">
            <Suspense fallback={<div />}> 
              <SearchBar />
            </Suspense>
          </div>
        )}
        
        <nav className="flex items-center gap-3">
          {!isSeller && (
            <button 
              className="cart-trigger" 
              onClick={() => setOpen(true)} 
              aria-label="Abrir carrito"
            >
              <svg className="icon" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {items.reduce((a, b) => a + b.cantidad, 0) > 0 && (
                <span className="badge">{items.reduce((a, b) => a + b.cantidad, 0)}</span>
              )}
            </button>
          )}
          <Link 
            href="/vendedor/login" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-all min-h-[48px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Vendedor
          </Link>
        </nav>
      </div>
      
      {!isSeller && (
        <div className="md:hidden container pb-3">
          <Suspense fallback={<div />}> 
            <SearchBar />
          </Suspense>
        </div>
      )}
      
      {!isSeller && open && <MiniCart onClose={() => setOpen(false)} onGoCart={() => { setOpen(false); router.push('/carrito'); }} />}
    </header>
  );
}

function MiniCart({ onClose, onGoCart }) {
  const { items, updateCantidad, removeItem } = useCarrito();
  const total = items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);
  
  return (
    <div className="mini-cart" role="dialog" aria-modal="true" aria-labelledby="miniCartTitle">
      <div className="mini-cart-overlay" onClick={onClose}></div>
      <div className="mini-cart-content">
        <div className="mini-cart-header">
          <h3 id="miniCartTitle">Tu carrito</h3>
          <button className="mini-cart-close" onClick={onClose} aria-label="Cerrar carrito">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="mini-cart-empty">
            <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {items.map((it) => (
                <li key={it.producto_id} className="cart-line">
                  {it.imagen && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.imagen} alt={it.titulo} />
                  )}
                  <div className="cart-line-info">
                    <p className="cart-line-title">{it.titulo}</p>
                    <p className="cart-line-price">S/ {it.precio.toFixed(2)}</p>
                    <div className="cart-line-actions">
                      <div className="qty-control">
                        <button onClick={() => updateCantidad(it.producto_id, Math.max(1, it.cantidad - 1))} aria-label="Disminuir cantidad">−</button>
                        <span>{it.cantidad}</span>
                        <button onClick={() => updateCantidad(it.producto_id, Math.min(it.stock ?? 99, it.cantidad + 1))} aria-label="Aumentar cantidad">+</button>
                      </div>
                      <button className="cart-line-remove" onClick={() => removeItem(it.producto_id)} aria-label="Eliminar producto">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="cart-summary">
              <div className="cart-summary-line">
                <span>Subtotal ({items.reduce((a, b) => a + b.cantidad, 0)} items)</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="cart-actions">
              <button className="btn-secondary" onClick={onClose}>Seguir comprando</button>
              <button className="btn-primary" onClick={onGoCart}>Ir al carrito</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
