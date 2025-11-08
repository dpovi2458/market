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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function uploadToServer(file) {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Error desconocido' }));
        throw new Error(errorData.error || 'Error al subir imagen');
      }

      const data = await res.json();
      return data.url;
    } catch (err) {
      console.error('Upload error:', err);
      throw err;
    } finally {
      setUploading(false);
    }
  }

  async function handleImageUpload(file) {
    if (!file) return;
    setError('');
    
    // Validar en cliente
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar 5MB');
      return;
    }

    try {
      const url = await uploadToServer(file);
      setData((d) => ({ ...d, imagenes: [...(d.imagenes || []), url].slice(0, 3) }));
    } catch (err) {
      setError(err.message || 'Error al subir imagen. Intenta de nuevo.');
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
        <input 
          type="file" 
          accept="image/*" 
          disabled={uploading || (data.imagenes || []).length >= 3}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleImageUpload(f);
            e.target.value = ''; // Reset input
          }} 
        />
        {uploading && (
          <div className="mt-2">
            <p className="text-sm text-primary">Subiendo imagen...</p>
          </div>
        )}
        <div className="flex gap-2 mt-2 flex-wrap">
          {(data.imagenes || []).map((url, i) => (
            <div key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Imagen ${i + 1}`} className="w-20 h-20 object-cover rounded border" />
              <button
                type="button"
                onClick={() => setData((d) => ({ ...d, imagenes: d.imagenes.filter((_, idx) => idx !== i) }))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 font-bold shadow"
                title="Eliminar imagen"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-danger text-sm">{error}</p>}
      <Button loading={loading} type="submit" disabled={uploading}>
        {uploading ? 'Esperando imagen...' : 'Guardar'}
      </Button>
    </form>
  );
}
