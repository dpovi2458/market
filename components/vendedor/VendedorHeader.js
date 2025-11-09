"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VendedorHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/vendedor/session', { method: 'DELETE' });
      if (res.ok) {
        router.push('/vendedor/login');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-gradient-to-r from-teal-600 to-blue-600 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <Link href="/vendedor/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Panel Vendedor</h1>
              <p className="text-xs text-teal-100">Market Facultad</p>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            <Link 
              href="/vendedor/dashboard" 
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                isActive('/vendedor/dashboard') 
                  ? 'bg-white text-teal-700 shadow-md' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </div>
            </Link>
            <Link 
              href="/vendedor/productos" 
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                isActive('/vendedor/productos') || pathname.startsWith('/vendedor/productos') 
                  ? 'bg-white text-teal-700 shadow-md' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Productos</span>
              </div>
            </Link>
            <Link 
              href="/vendedor/pedidos" 
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                isActive('/vendedor/pedidos') 
                  ? 'bg-white text-teal-700 shadow-md' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Pedidos</span>
              </div>
            </Link>
          </nav>

          {/* Botones de acción */}
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden lg:inline">Tienda</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white rounded-xl font-semibold transition-all shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Salir</span>
            </button>

            {/* Hamburger Menu Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/20 rounded-xl text-white transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-2">
              <Link 
                href="/vendedor/dashboard" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/vendedor/dashboard') 
                    ? 'bg-white text-teal-700' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/vendedor/productos" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/vendedor/productos') || pathname.startsWith('/vendedor/productos')
                    ? 'bg-white text-teal-700' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Productos
              </Link>
              <Link 
                href="/vendedor/pedidos" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/vendedor/pedidos') 
                    ? 'bg-white text-teal-700' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Pedidos
              </Link>
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-white hover:bg-white/20 rounded-xl font-semibold transition-all"
              >
                Ver Tienda
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
