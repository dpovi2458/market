import Card from '../../../components/ui/Card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function getData() {
  try {
    const [prodsRes, ordersRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/vendedor/productos`, { cache: 'no-store' }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/vendedor/pedidos`, { cache: 'no-store' })
    ]);
    const prods = prodsRes.ok ? await prodsRes.json() : { items: [] };
    const orders = ordersRes.ok ? await ordersRes.json() : { items: [] };
    const agotados = prods.items.filter((p) => p.stock <= 0 || !p.disponible).length;
    const pendientes = orders.items.filter((o) => o.estado === 'pendiente').length;
    return { totalProds: prods.items.length, agotados, pendientes };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return { totalProds: 0, agotados: 0, pendientes: 0 };
  }
}

export default async function Dashboard() {
  const { totalProds, agotados, pendientes } = await getData();
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card><div className="text-sm text-gray-600">Productos publicados</div><div className="text-2xl font-bold">{totalProds}</div></Card>
        <Card><div className="text-sm text-gray-600">Pedidos pendientes</div><div className="text-2xl font-bold">{pendientes}</div></Card>
        <Card><div className="text-sm text-gray-600">Productos agotados</div><div className="text-2xl font-bold">{agotados}</div></Card>
      </div>
      <div className="flex gap-3">
        <Link href="/vendedor/productos/nuevo" className="btn-primary">Publicar producto</Link>
        <Link href="/vendedor/productos" className="btn-primary bg-secondary hover:bg-amber-600">Ver productos</Link>
        <Link href="/vendedor/pedidos" className="btn-primary bg-gray-800 hover:bg-black">Ver pedidos</Link>
      </div>
    </div>
  );
}
