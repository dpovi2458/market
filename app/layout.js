'use client';
import './globals.css';
import MarketHeaderEnhanced from '../components/MarketHeaderEnhanced';
import Footer from '../components/Footer';
import { CarritoProvider } from '../context/CarritoContext';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isVendedorRoute = pathname?.startsWith('/vendedor');

  return (
    <html lang="es">
      <head>
        <title>Market Facultad - Compra y Vende Entre Estudiantes</title>
        <meta name="description" content="Marketplace de compra y venta entre estudiantes de Ingeniería Industrial" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F7B85" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <CarritoProvider>
          {!isVendedorRoute && <MarketHeaderEnhanced />}
          <main className={isVendedorRoute ? "" : "container py-4"} style={isVendedorRoute ? {} : { paddingTop: '80px' }}>{children}</main>
          {!isVendedorRoute && <Footer />}
        </CarritoProvider>
      </body>
    </html>
  );
}
