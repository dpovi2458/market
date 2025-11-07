import Link from 'next/link';
import ProductGrid from '../../components/ProductGrid';
import { listProductsPublic } from '../../lib/server/productsService';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }) {
  const q = searchParams?.q || '';
  const categoria = searchParams?.categoria || '';
  const { items } = await listProductsPublic({ q, categoria, limit: 24 });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          ['todos', 'Todos'],
          ['utiles', 'Útiles'],
          ['comida', 'Comida'],
          ['tecnologia', 'Tecnología'],
          ['ropa', 'Ropa'],
          ['otros', 'Otros']
        ].map(([key, label]) => (
          <CategoriaChip key={key} active={(categoria || 'todos') === key} href={`/?${new URLSearchParams({ ...(q && { q }), ...(key !== 'todos' && { categoria: key }) }).toString()}`}>{label}</CategoriaChip>
        ))}
      </div>
      <ProductGrid products={items} />
    </div>
  );
}

function CategoriaChip({ active, href, children }) {
  return (
    <Link href={href} className={`px-3 py-1 rounded-full border ${active ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200'}`}>
      {children}
    </Link>
  );
}
