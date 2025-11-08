"use client";
import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ProductForm({ initial = {}, onSaved }) {
  const [data, setData] = useState({
    titulo: '',
    descripcion: '',
    precio: 0,
    categoria: 'utiles',
    stock: 0,
    disponible: true,
    imagenes: [],
    ...initial
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function upload(file) {
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      
      // Check content type before parsing
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Server returned non-JSON response:', text.substring(0, 200));
        throw new Error('Error del servidor al procesar la imagen');
      }
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al subir imagen');
      return json.url;
    } catch (err) {
      console.error('Upload error:', err);
      throw new Error(err.message || 'Error al subir imagen. Verifica tu conexión.');
    }
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { ...data, precio: Number(data.precio), stock: Number(data.stock) };
      const url = initial._id ? `/api/productos/${initial._id}` : '/api/productos';
      const method = initial._id ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error');
      onSaved?.(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Input label="Título*" value={data.titulo} onChange={(e) => setData({ ...data, titulo: e.target.value })} />
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-1">Descripción*</span>
        <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" rows={4} value={data.descripcion} onChange={(e) => setData({ ...data, descripcion: e.target.value })} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Precio*" type="number" min="0" step="0.1" value={data.precio} onChange={(e) => setData({ ...data, precio: e.target.value })} />
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Categoría*</span>
          <select className="w-full rounded-lg border border-gray-300 px-3 py-2" value={data.categoria} onChange={(e) => setData({ ...data, categoria: e.target.value })}>
            <option value="utiles">Útiles</option>
            <option value="comida">Comida</option>
            <option value="tecnologia">Tecnología</option>
            <option value="ropa">Ropa</option>
            <option value="otros">Otros</option>
          </select>
        </label>
        <Input label="Stock*" type="number" min="0" value={data.stock} onChange={(e) => setData({ ...data, stock: e.target.value })} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={data.disponible} onChange={(e) => setData({ ...data, disponible: e.target.checked })} />
          Disponible
        </label>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Imágenes (1-3)</p>
        <input type="file" accept="image/*" onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          try {
            const url = await upload(f);
            setData((d) => ({ ...d, imagenes: [...(d.imagenes || []), url].slice(0, 3) }));
          } catch (err) {
            setError(err.message);
          }
        }} />
        <div className="flex gap-2 mt-2">
          {(data.imagenes || []).map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={url} alt="img" className="w-16 h-16 object-cover rounded" />
          ))}
        </div>
      </div>
      {error && <p className="text-danger text-sm">{error}</p>}
      <Button loading={loading} type="submit">Guardar</Button>
    </form>
  );
}
