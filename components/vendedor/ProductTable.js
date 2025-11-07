export default function ProductTable({ items = [], onToggle, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th className="p-3">Producto</th>
            <th className="p-3">Precio</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-3 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.imagenes?.[0] || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&q=60&auto=format&fit=crop'} alt="img" className="w-12 h-12 object-cover rounded" />
                <div>
                  <div className="font-medium">{p.titulo}</div>
                  <div className="text-xs text-gray-600">{p.categoria}</div>
                </div>
              </td>
              <td className="p-3">S/ {p.precio.toFixed(2)}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${p.disponible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{p.disponible ? 'Disponible' : 'Agotado'}</span>
              </td>
              <td className="p-3 space-x-2">
                <a href={`/vendedor/productos/editar/${p._id}`} className="text-primary">Editar</a>
                <button className="text-gray-700" onClick={() => onToggle?.(p)}>{p.disponible ? 'Marcar Agotado' : 'Marcar Disponible'}</button>
                <button className="text-danger" onClick={() => onDelete?.(p)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
