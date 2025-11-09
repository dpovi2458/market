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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-1 text-gray-900">¡Bienvenido, {vendedorNombre}!</h1>
        <p className="text-gray-600">Aquí tienes un resumen de tu negocio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Productos publicados</div>
              <div className="text-3xl font-bold text-gray-900">{totalProds}</div>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Pedidos pendientes</div>
              <div className="text-3xl font-bold text-amber-600">{pendientes}</div>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Productos agotados</div>
              <div className="text-3xl font-bold text-red-600">{agotados}</div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
