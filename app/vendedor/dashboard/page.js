import Card from '../../../components/ui/Card';
import Link from 'next/link';
import { getSellerFromCookie } from '../../../lib/auth';
import { ProductModel } from '../../../lib/models/Product';
import { OrderModel } from '../../../lib/models/Order';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function getData() {
  try {
    const seller = getSellerFromCookie();
    if (!seller) {
      redirect('/vendedor/login');
    }

    const Product = await ProductModel();
    const Order = await OrderModel();

    // Si es usuario hardcoded de env, mostrar todos los productos y pedidos
    const isEnvUser = seller.id === 'env-hardcoded';
    
    const query = isEnvUser ? {} : { vendedor_id: seller.id };
    
    const [productos, pedidos] = await Promise.all([
      Product.find(query).lean(),
      Order.find(query).lean()
    ]);

    const totalProds = productos.length;
    const agotados = productos.filter((p) => p.stock <= 0 || !p.disponible).length;
    const pendientes = pedidos.filter((o) => o.estado === 'pendiente').length;

    return { 
      totalProds, 
      agotados, 
      pendientes,
      vendedorNombre: seller.nombre || seller.usuario
    };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return { 
      totalProds: 0, 
      agotados: 0, 
      pendientes: 0,
      vendedorNombre: 'Vendedor'
    };
  }
}

export default async function Dashboard() {
  const { totalProds, agotados, pendientes, vendedorNombre } = await getData();
  
  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}>
      {/* Header estilo sistema universitario */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-8 shadow-lg" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">¡Bienvenido, {vendedorNombre}!</h1>
            <p className="text-teal-50">Aquí tienes un resumen de tu negocio</p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Card Productos */}
        <article className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300" style={{ flex: '1 1 400px', maxWidth: '420px' }}>
          <div className="flex flex-col p-4 bg-teal-50 rounded-t-lg">
            <div className="flex items-center justify-center" style={{ height: '45px' }}>
              <h5 className="text-teal-700 text-center font-semibold">PRODUCTOS PUBLICADOS</h5>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-6">
            <h4 className="text-5xl font-bold text-teal-600">{totalProds}</h4>
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </article>

        {/* Card Pedidos */}
        <article className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300" style={{ flex: '1 1 400px', maxWidth: '420px' }}>
          <div className="flex flex-col p-4 bg-amber-50 rounded-t-lg">
            <div className="flex items-center justify-center" style={{ height: '45px' }}>
              <h5 className="text-amber-700 text-center font-semibold">PEDIDOS PENDIENTES</h5>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-6">
            <h4 className="text-5xl font-bold text-amber-600">{pendientes}</h4>
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </article>

        {/* Card Agotados */}
        <article className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300" style={{ flex: '1 1 400px', maxWidth: '420px' }}>
          <div className="flex flex-col p-4 bg-red-50 rounded-t-lg">
            <div className="flex items-center justify-center" style={{ height: '45px' }}>
              <h5 className="text-red-700 text-center font-semibold">PRODUCTOS AGOTADOS</h5>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-6">
            <h4 className="text-5xl font-bold text-red-600">{agotados}</h4>
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
