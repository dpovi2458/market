"use client";
import useSWR from 'swr';
import ProductTable from '../../../components/vendedor/ProductTable';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ProductosPage() {
  const { data, mutate } = useSWR('/api/vendedor/productos', fetcher);
  const items = data?.items || [];

  async function toggle(p) {
    await fetch(`/api/productos/${p._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ disponible: !p.disponible }) });
    mutate();
  }
  async function remove(p) {
    if (!confirm('¿Eliminar producto?')) return;
    await fetch(`/api/productos/${p._id}`, { method: 'DELETE' });
    mutate();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Tus productos</h1>
      <a className="btn-primary inline-block" href="/vendedor/productos/nuevo">Publicar nuevo</a>
      <ProductTable items={items} onToggle={toggle} onDelete={remove} />
    </div>
  );
}
