"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCarrito } from '../context/CarritoContext';
import SearchBar from './SearchBar';
import ShoppingCartDrawer from './ShoppingCartDrawer';
import { Suspense } from 'react';

export default function MarketHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, open, setOpen } = useCarrito();
  const pathname = usePathname();
  const isSeller = pathname?.startsWith('/vendedor');
  const totalItems = items.reduce((a, b) => a + b.cantidad, 0);

  // Icons as SVG components for consistency with next/js
  const ShoppingCartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const SearchIcon = () => (
    <svg className="h-5 w-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-md">
      <div className="container mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between py-4 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <ShoppingCartIcon />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent hidden sm:inline">
              Market Facultad
            </span>
          </Link>

          {/* Desktop Search Bar - Solo si NO es vendedor */}
          {!isSeller && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <Suspense fallback={<input type="text" disabled className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-teal-200 bg-gray-50" />}>
                <SearchBar />
              </Suspense>
            </div>
          )}

          {/* Desktop Navigation - Solo si NO es vendedor */}
          {!isSeller && (
            <nav className="hidden md:flex items-center gap-3">
              {/* Cart Button */}
              <button 
                onClick={() => setOpen(true)}
                className="relative p-2.5 text-gray-700 hover:text-teal-600 hover:bg-teal-50 
                         rounded-xl transition-all duration-200 group"
                aria-label="Carrito de compras"
              >
                <ShoppingCartIcon />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                 font-bold rounded-full w-5 h-5 flex items-center justify-center
                                 group-hover:scale-110 transition-transform">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Vendor Login */}
              <Link
                href="/vendedor/login"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold 
                         text-gray-700 hover:text-teal-700 hover:bg-teal-50 
                         rounded-xl transition-all duration-200 border-2 border-transparent
                         hover:border-teal-200"
              >
                <UserIcon />
                <span>Vendedor</span>
              </Link>

              {/* Language Picker (ESP) */}
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium 
                         text-gray-700 hover:bg-gray-50 rounded-xl border border-gray-200
                         transition-all duration-200 hover:border-gray-300"
              >
                <svg width="20" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 0H0V14H21V0Z" fill="#D80027"/>
                  <path d="M14 0H7V14H14V0Z" fill="#F0F0F0"/>
                </svg>
                <span className="font-semibold">ESP</span>
              </button>
            </nav>
          )}

          {/* Mobile Menu Button - Solo si NO es vendedor */}
          {!isSeller && (
            <button
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menú"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
        </div>

        {/* Mobile Search Bar - Solo si NO es vendedor */}
        {!isSeller && (
          <div className="md:hidden pb-3">
            <Suspense fallback={<input type="text" disabled className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-teal-200 bg-gray-50" />}>
              <SearchBar />
            </Suspense>
          </div>
        )}

        {/* Mobile Menu - Solo si NO es vendedor */}
        {!isSeller && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 
                         hover:text-teal-700 rounded-lg transition-all text-left w-full"
              >
                <ShoppingCartIcon />
                <span className="font-medium">Carrito</span>
                {totalItems > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold 
                                 rounded-full w-6 h-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                href="/vendedor/login"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 
                         hover:text-teal-700 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserIcon />
                <span className="font-medium">Vendedor</span>
              </Link>
              
              <div className="px-4 py-3 flex items-center gap-2 text-sm text-gray-600">
                <svg width="20" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 0H0V14H21V0Z" fill="#D80027"/>
                  <path d="M14 0H7V14H14V0Z" fill="#F0F0F0"/>
                </svg>
                <span className="font-semibold">Español (ESP)</span>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Shopping Cart Drawer - Nuevo componente mejorado */}
      {!isSeller && <ShoppingCartDrawer />}
    </header>
  );
}
