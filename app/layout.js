import './globals.css';
import MarketHeaderEnhanced from '../components/MarketHeaderEnhanced';
import Footer from '../components/Footer';
import { CarritoProvider } from '../context/CarritoContext';

export const metadata = {
  metadataBase: new URL('https://market-facultad.vercel.app'),
  title: 'Market Facultad - Compra y Vende Entre Estudiantes',
  description: 'Marketplace de compra y venta entre estudiantes de Ingeniería Industrial. Útiles, comida, tecnología y más.',
  keywords: 'marketplace, estudiantes, compra, venta, ingeniería industrial',
  authors: [{ name: 'Market Facultad' }],
  creator: 'Market Facultad',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://market-facultad.vercel.app',
    siteName: 'Market Facultad',
    title: 'Market Facultad - Compra y Vende Entre Estudiantes',
    description: 'Marketplace de compra y venta entre estudiantes de Ingeniería Industrial',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Market Facultad'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@marketfacultad',
    creator: '@marketfacultad',
    title: 'Market Facultad',
    description: 'Compra y vende entre estudiantes',
    image: '/og-image.png'
  },
  alternates: {
    canonical: 'https://market-facultad.vercel.app'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F7B85" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <CarritoProvider>
          <MarketHeaderEnhanced />
          <main className="container py-4" style={{ paddingTop: '80px' }}>{children}</main>
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
