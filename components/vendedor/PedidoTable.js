export default function PedidoTable({ items = [], onMark }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th className="p-3">Fecha</th>
            <th className="p-3">Comprador</th>
            <th className="p-3">Contacto</th>
            <th className="p-3">Productos</th>
            <th className="p-3">Entrega</th>
            <th className="p-3">Total</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {items.map((o) => (
            <tr key={o._id} className="border-t align-top">
              <td className="p-3 text-sm">{new Date(o.fecha_pedido).toLocaleString()}</td>
              <td className="p-3 text-sm">{o.comprador?.nombre}</td>
              <td className="p-3 text-sm">
                <a href={`tel:${o.comprador?.telefono}`} className="text-primary">{o.comprador?.telefono}</a>
                {o.comprador?.email && <div className="text-gray-600">{o.comprador.email}</div>}
              </td>
              <td className="p-3 text-sm">
                <ul className="list-disc pl-4">
                  {o.productos.map((p, i) => (
                    <li key={i}>{p.titulo} x {p.cantidad}</li>
                  ))}
                </ul>
                {o.comprador?.comentarios && <div className="text-xs text-gray-600 mt-1">"{o.comprador.comentarios}"</div>}
              </td>
              <td className="p-3 text-sm">{o.comprador?.punto_entrega}</td>
              <td className="p-3 font-semibold">S/ {o.total.toFixed(2)}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${o.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{o.estado}</span>
              </td>
              <td className="p-3">
                {o.estado === 'pendiente' && (
                  <button className="text-success" onClick={() => onMark?.(o, 'entregado')}>Marcar entregado</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
