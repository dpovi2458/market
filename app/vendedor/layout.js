"use client";
import VendedorHeader from '../../components/vendedor/VendedorHeader';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VendedorLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hideHeader = pathname?.startsWith('/vendedor/login');

  useEffect(() => {
    const checkAuth = async () => {
      // Si estamos en la página de login, no verificar autenticación
      if (hideHeader) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/vendedor/session', { credentials: 'include' });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.replace('/vendedor/login');
        }
      } catch (error) {
        router.replace('/vendedor/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, hideHeader, router]);

  // Loading state
  if (isLoading && !hideHeader) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado y no está en login, no renderizar nada (se redirigirá)
  if (!isAuthenticated && !hideHeader) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <VendedorHeader />}
      <main className={hideHeader ? "" : "container mx-auto px-4 py-8"}>
        {children}
      </main>
    </div>
  );
}

