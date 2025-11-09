"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCarrito } from '../context/CarritoContext';
import SearchBar from './SearchBar';
import ShoppingCartDrawer from './ShoppingCartDrawer';
import { Suspense } from 'react';

/**
 * MarketHeaderEnhanced - Header mejorado con más características visuales
 * Similar al diseño profesional que mencionaste, pero optimizado para Next.js
 */
export default function MarketHeaderEnhanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, open, setOpen } = useCarrito();
  const pathname = usePathname();
  const isSeller = pathname?.startsWith('/vendedor');
  const totalItems = items.reduce((a, b) => a + b.cantidad, 0);

  // SVG Icons
  const ShoppingCartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <>
      {/* Header Principal */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-white"
        style={{
          boxShadow: 'rgba(136, 144, 195, 0.2) 0px 1px 2px 0px, rgba(136, 144, 195, 0.2) 0px 2px 6px 2px'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 gap-4">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-2.5 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
                <ShoppingCartIcon />
              </div>
              <span className="font-bold text-sm sm:text-lg bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                u-market
              </span>
            </Link>

            {/* Desktop Search - Solo si NO es vendedor */}
            {!isSeller && (
              <div className="hidden md:block flex-1 max-w-2xl mx-6">
                <Suspense fallback={<input type="text" disabled className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50" />}>
                  <SearchBar />
                </Suspense>
              </div>
            )}

            {/* Desktop Navigation */}
            {!isSeller && (
              <nav className="hidden md:flex items-center gap-2">
                {/* Cart Button - Circle */}
                <button 
                  onClick={() => setOpen(true)}
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 border border-gray-200 hover:border-teal-300"
                  aria-label="Carrito de compras"
                >
                  <ShoppingCartIcon />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Vendor Button - Circle */}
                <Link
                  href="/vendedor/login"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 border border-gray-200 hover:border-teal-300"
                  aria-label="Panel de vendedor"
                >
                  <UserIcon />
                </Link>

                {/* Home Button - Circle */}
                <Link
                  href="/"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 border border-gray-200 hover:border-teal-300"
                  aria-label="Inicio"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11v-5h2v5m-6-5h.01M9 15h6" />
                  </svg>
                </Link>
              </nav>
            )}

            {/* Mobile Menu Button */}
            {!isSeller && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                aria-label="Menú"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            )}
          </div>

          {/* Mobile Search Bar */}
          {!isSeller && (
            <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
              <Suspense fallback={<input type="text" disabled className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50" />}>
                <SearchBar />
              </Suspense>
            </div>
          )}

          {/* Mobile Menu */}
          {!isSeller && isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 space-y-2 animate-in slide-in-from-top">
              <button
                onClick={() => {
                  setOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all text-left"
              >
                <ShoppingCartIcon />
                <span className="font-medium">Carrito</span>
                {totalItems > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                href="/vendedor/login"
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserIcon />
                <span className="font-medium">Vendedor</span>
              </Link>

              <Link
                href="/"
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11v-5h2v5m-6-5h.01M9 15h6" />
                </svg>
                <span className="font-medium">Inicio</span>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Shopping Cart Drawer */}
      {!isSeller && <ShoppingCartDrawer />}

      {/* Spacer para el header fijo */}
      <div className="h-20" />
    </>
  );
}
