import Link from 'next/link';
import Card from './ui/Card';

export default function ProductCard({ product }) {
  const first = product.imagenes?.[0] || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=60&auto=format&fit=crop';
  return (
    <Link href={`/producto/${product._id}`} className="block">
      <Card className="p-0 overflow-hidden hover:shadow-md transition">
        {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src={first} alt={product.titulo} className="w-full aspect-square object-cover" />
        <div className="p-3">
          <p className="font-medium line-clamp-1">{product.titulo}</p>
          <p className="text-primary font-semibold">S/ {product.precio.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{product.vendedor_nombre || 'Estudiante'}</p>
          {product.stock <= 0 && (
            <span className="inline-block mt-1 text-xs text-danger">Agotado</span>
          )}
        </div>
      </Card>
    </Link>
  );
}
