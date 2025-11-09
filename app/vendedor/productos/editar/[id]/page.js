import Link from 'next/link';
import { ProductModel } from '../../../../../lib/models/Product';
import ProductForm from '../../../../../components/vendedor/ProductForm';
import { redirect } from 'next/navigation';

export default async function EditarProducto({ params }) {
  const Product = await ProductModel();
  const product = await Product.findById(params.id).lean();
  
  if (!product) {
    redirect('/vendedor/productos');
  }
  
  const data = JSON.parse(JSON.stringify(product || {}));
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/vendedor/dashboard" className="text-gray-500 hover:text-teal-600 transition-colors">
          Dashboard
        </Link>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/vendedor/productos" className="text-gray-500 hover:text-teal-600 transition-colors">
          Productos
        </Link>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">Editar</span>
      </nav>

      {/* Header con botón volver */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Producto</h1>
          <p className="text-gray-600 mt-1">Actualiza la información de tu producto</p>
        </div>
        <Link 
          href="/vendedor/productos"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a productos
        </Link>
      </div>

      <ProductForm initial={data} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
