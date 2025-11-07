"use client";
import { useRouter } from 'next/navigation';
import ProductForm from '../../../../components/vendedor/ProductForm';

export default function NuevoProducto() {
  const router = useRouter();
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Publicar producto</h1>
      <ProductForm onSaved={() => router.replace('/vendedor/productos')} />
    </div>
  );
}
