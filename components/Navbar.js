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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between py-4 gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
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
        
        <nav className="flex items-center gap-4">
          {!isSeller && (
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group" 
              onClick={() => setOpen(true)} 
              aria-label="Abrir carrito"
            >
              <CarritoIcon count={items.reduce((a, b) => a + b.cantidad, 0)} />
            </button>
          )}
          <Link 
            href="/vendedor/login" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-all"
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
    <div className="space-y-6">
      {items.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-600 font-medium">Tu carrito está vacío</p>
          <p className="text-sm text-gray-500 mt-1">Agrega productos para comenzar</p>
        </div>
      )}
      
      <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
        {items.map((it) => (
          <li key={it.producto_id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            {it.imagen && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.imagen} alt={it.titulo} className="w-20 h-20 object-cover rounded-lg shadow-sm flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 line-clamp-2 mb-1">{it.titulo}</p>
              <p className="text-lg font-bold text-primary mb-2">S/ {it.precio.toFixed(2)}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border">
                  <button 
                    className="px-3 py-1.5 hover:bg-gray-100 rounded-l-lg transition-colors font-medium"
                    onClick={() => updateCantidad(it.producto_id, Math.max(1, it.cantidad - 1))}
                  >
                    −
                  </button>
                  <span className="font-semibold min-w-[2rem] text-center">{it.cantidad}</span>
                  <button 
                    className="px-3 py-1.5 hover:bg-gray-100 rounded-r-lg transition-colors font-medium"
                    onClick={() => updateCantidad(it.producto_id, Math.min(it.stock ?? 99, it.cantidad + 1))}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                  onClick={() => removeItem(it.producto_id)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {items.length > 0 && (
        <>
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal ({items.reduce((a, b) => a + b.cantidad, 0)} items)</span>
              <span className="font-semibold">S/ {total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary text-2xl">S/ {total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button onClick={onGoCart} className="w-full">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Finalizar compra
          </Button>
        </>
      )}
    </div>
  );
}
