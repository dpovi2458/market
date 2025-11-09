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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between" style={{ height: '80px' }}>
          {/* Logo */}
          <Link href="/vendedor/dashboard" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">u-market</div>
              <div className="text-xs text-teal-600 font-semibold">Panel Vendedor</div>
            </div>
          </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-2">
            <Link 
              href="/vendedor/dashboard" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/vendedor/dashboard') 
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link 
              href="/vendedor/productos" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/vendedor/productos') || pathname.startsWith('/vendedor/productos') 
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Productos
            </Link>
            <Link 
              href="/vendedor/pedidos" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/vendedor/pedidos') 
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Pedidos
            </Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden lg:inline">Tienda</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Salir</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-700"
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
          <nav className="md:hidden py-3 border-t border-gray-200">
            <div className="flex flex-col gap-1">
              <Link 
                href="/vendedor/dashboard" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/vendedor/dashboard') 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/vendedor/productos" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/vendedor/productos') || pathname.startsWith('/vendedor/productos')
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Productos
              </Link>
              <Link 
                href="/vendedor/pedidos" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/vendedor/pedidos') 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pedidos
              </Link>
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
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
