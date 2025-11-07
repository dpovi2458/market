import './globals.css';
import Navbar from '../components/Navbar';
import { CarritoProvider } from '../context/CarritoContext';

export const metadata = {
  title: 'Marketplace Facultad Industrial',
  description: 'Compra y venta entre estudiantes de Ingeniería Industrial'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CarritoProvider>
          <Navbar />
          <main className="container py-4">{children}</main>
        </CarritoProvider>
      </body>
    </html>
  );
}
