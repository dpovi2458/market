"use client";
import useSWR from 'swr';
import PedidoTable from '../../../components/vendedor/PedidoTable';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function PedidosPage() {
  const { data, mutate } = useSWR('/api/vendedor/pedidos', fetcher);
  const items = data?.items || [];

  async function mark(o, estado) {
    await fetch('/api/vendedor/pedidos', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: o._id, estado }) });
    mutate();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Pedidos recibidos</h1>
      <PedidoTable items={items} onMark={mark} />
    </div>
  );
}
