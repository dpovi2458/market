"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductForm from '../../../../components/vendedor/ProductForm';

export default function NuevoProducto() {
  const router = useRouter();
  
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
        <span className="text-gray-900 font-medium">Nuevo</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Publicar Nuevo Producto</h1>
          <p className="text-gray-600 mt-1">Completa el formulario para agregar un producto a tu catálogo</p>
        </div>
        <Link 
          href="/vendedor/productos"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Cancelar
        </Link>
      </div>

      <ProductForm onSaved={() => router.replace('/vendedor/productos')} />
    </div>
  );
}
