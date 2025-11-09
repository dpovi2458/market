"use client";
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // SVG Icons
  const ShoppingCartIcon = () => (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  const ExternalLinkIcon = () => (
    <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-4l4-4m0 0l4 4m-4-4v12" />
    </svg>
  );

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Column 1: Logo y Descripción */}
          <div className="flex flex-col gap-6 items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <ShoppingCartIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">u-market</span>
                <span className="text-xs text-teal-400 font-semibold">v1.0.0</span>
              </div>
            </Link>
            <p className="text-gray-400 text-center md:text-left max-w-md leading-relaxed text-sm md:text-base">
              Compra y vende entre estudiantes de la Facultad de Ingeniería Industrial . Rápido, seguro y sin complicaciones.
            </p>
          </div>

          {/* Column 2: Enlaces Directos */}
          <div className="flex flex-col gap-6 items-center md:items-start">
            <h4 className="font-semibold text-lg text-white border-b-2 border-teal-600 pb-2">
              Enlaces útiles
            </h4>
            <nav className="flex flex-col gap-3 items-center md:items-start text-sm md:text-base">
              <Link 
                href="/"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-200 hover:translate-x-1 transform"
              >
                Inicio
              </Link>
              <Link 
                href="/#productos"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-200 hover:translate-x-1 transform"
              >
                Productos
              </Link>
              <Link 
                href="/vendedor/login"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-200 hover:translate-x-1 transform"
              >
                Sé vendedor
              </Link>
              <Link 
                href="/carrito"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-200 hover:translate-x-1 transform"
              >
                Mi carrito
              </Link>
            </nav>
          </div>

          {/* Column 3: Contacto */}
          <div className="flex flex-col gap-6 items-center md:items-start">
            <h4 className="font-semibold text-lg text-white border-b-2 border-teal-600 pb-2">
              ¿Necesitas ayuda?
            </h4>
            <div className="flex flex-col gap-6 w-full items-center md:items-start">
              <div className="flex flex-col gap-2">
                <p className="text-gray-400 text-xs md:text-sm">
                  Contacto directo:
                </p>
                <a 
                  href="mailto:soporte@marketfacultad.edu.pe"
                  className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold break-words"
                >
                  dpovi2458@gmail.com
                </a>
              </div>
              
              <a 
                href="https://www.unmsm.edu.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 hover:bg-teal-50 transform group-hover:scale-105">
                  <span className="text-teal-700 font-semibold text-sm flex items-center gap-2">
                    UNMSM
                    <ExternalLinkIcon />
                  </span>
                </div>
              </a>

              <div className="pt-4 border-t border-gray-700 w-full">
                <p className="text-xs text-gray-500 text-center md:text-left">
                  Soporte: Lunes - Viernes 8pm - 10pm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor y Copyright */}
        <div className="pt-12 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} u-market
              </p>
              <p className="text-gray-500 text-xs mt-1">
               Facultad de Ingeniería Industrial - UNMSM
              </p>
            </div>
            
            <div className="text-center hidden md:block">
              <p className="text-gray-500 text-xs">
                Hecho por estudiantes, para estudiantes 💙
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-500 text-xs">
                <a 
                  href="#" 
                  className="hover:text-teal-400 transition-colors"
                >
                  Privacidad
                </a>
                {' '} • {' '}
                <a 
                  href="#" 
                  className="hover:text-teal-400 transition-colors"
                >
                  Términos
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
