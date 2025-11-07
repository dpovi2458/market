import { notFound } from 'next/navigation';
import { ProductModel } from '../../../../lib/models/Product';
import Button from '../../../../components/ui/Button';
import { AddToCart } from './ui';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function ProductDetail({ params }) {
  try {
    const Product = await ProductModel();
    const product = await Product.findById(params.id).lean();
    if (!product) return notFound();
    const json = JSON.parse(JSON.stringify(product));

    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {/* Carousel simple */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={json.imagenes?.[0] || '/placeholder.png'} alt={json.titulo} className="w-full rounded-xl object-cover aspect-square" />
          {json.imagenes?.length > 1 && (
            <div className="flex gap-2 mt-2">
              {json.imagenes.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="mini" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">{json.titulo}</h1>
          <p className="text-gray-700">{json.descripcion}</p>
          <p className="text-2xl text-primary font-bold">S/ {json.precio.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Vendedor: {json.vendedor_nombre || 'Estudiante'}</p>
          <AddToCart product={json} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return notFound();
  }
}
