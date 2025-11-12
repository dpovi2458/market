"use client";
import { useState } from 'react';
import { useCloudinaryUpload } from '../../hooks/useCloudinaryUpload';
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
    contacto: '',
    ...initial
  });
  const [loading, setLoading] = useState(false);
  const { uploadImage, uploading, progress } = useCloudinaryUpload();
  const [error, setError] = useState('');

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
      const url = await uploadImage(file);
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
    <form onSubmit={submit} className="max-w-4xl mx-auto space-y-6 bg-white rounded-xl shadow-sm p-6 md:p-8">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {initial._id ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Los campos marcados con * son obligatorios</p>
      </div>

      {/* Información básica */}
      <div className="space-y-5">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Información básica
          </h3>
        </div>
        
        <Input 
          label="Título del producto*" 
          value={data.titulo} 
          onChange={(e) => setData({ ...data, titulo: e.target.value })}
          placeholder="Ej: Calculadora científica Casio FX-991"
          required
        />
        
        <Input 
          label="Contacto (WhatsApp, Telegram, etc.)" 
          value={data.contacto} 
          onChange={(e) => setData({ ...data, contacto: e.target.value })}
          placeholder="Ej: WhatsApp 987654321, @usuario_telegram"
          maxLength={200}
        />
        
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Descripción detallada*
          </span>
          <textarea 
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" 
            rows={5} 
            value={data.descripcion} 
            onChange={(e) => setData({ ...data, descripcion: e.target.value })}
            placeholder="Describe el producto: estado, características, marca, modelo..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">{data.descripcion.length} caracteres</p>
        </label>
      </div>

      {/* Precio y disponibilidad */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Precio y disponibilidad
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-[38px] text-gray-500 font-medium z-10">S/</span>
            <Input 
              label="Precio*" 
              type="number" 
              min="0" 
              step="0.01" 
              value={data.precio} 
              onChange={(e) => setData({ ...data, precio: e.target.value })}
              placeholder="0.00"
              required
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          
          <label className="block">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Categoría*
            </span>
            <select 
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white" 
              value={data.categoria} 
              onChange={(e) => setData({ ...data, categoria: e.target.value })}
              required
            >
              <option value="utiles">📚 Útiles</option>
              <option value="comida">🍕 Comida</option>
              <option value="tecnologia">💻 Tecnología</option>
              <option value="ropa">👕 Ropa</option>
              <option value="otros">📦 Otros</option>
            </select>
          </label>
          
          <Input 
            label="Stock disponible*" 
            type="number" 
            min="0" 
            value={data.stock} 
            onChange={(e) => setData({ ...data, stock: e.target.value })}
            placeholder="0"
            required
          />
        </div>

        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
          <input 
            type="checkbox" 
            checked={data.disponible} 
            onChange={(e) => setData({ ...data, disponible: e.target.checked })}
            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary cursor-pointer"
          />
          <div className="flex-1">
            <span className="font-medium text-gray-900">Producto disponible para la venta</span>
            <p className="text-xs text-gray-500 mt-0.5">Desactiva si está agotado o no quieres venderlo temporalmente</p>
          </div>
        </label>
      </div>

      {/* Imágenes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Imágenes del producto
          <span className="text-sm font-normal text-gray-500">({(data.imagenes || []).length}/3)</span>
        </h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
          <label className="cursor-pointer block">
            <input 
              type="file" 
              accept="image/*" 
              disabled={uploading || (data.imagenes || []).length >= 3}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload(f);
                e.target.value = '';
              }}
              className="hidden"
            />
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">
                  {(data.imagenes || []).length >= 3 ? 'Máximo 3 imágenes alcanzado' : 'Click para seleccionar imagen'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP hasta 5MB</p>
              </div>
            </div>
          </label>
        </div>

        {uploading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">Subiendo imagen...</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <span className="text-sm font-semibold text-primary">{progress}%</span>
          </div>
        )}

        {(data.imagenes || []).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(data.imagenes || []).map((url, i) => (
              <div key={i} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={url} 
                  alt={`Imagen ${i + 1}`} 
                  className="w-full h-40 object-cover rounded-lg border-2 border-gray-200 group-hover:border-primary transition-all shadow-sm"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setData((d) => ({ ...d, imagenes: d.imagenes.filter((_, idx) => idx !== i) }))}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-red-600 transition-all transform hover:scale-110 shadow-lg"
                    title="Eliminar imagen"
                  >
                    ×
                  </button>
                </div>
                <div className="absolute top-2 left-2 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700">
                  #{i + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-red-800">Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit button */}
      <div className="flex gap-3 pt-4 border-t">
        <Button 
          loading={loading} 
          type="submit" 
          disabled={uploading}
          className="flex-1"
        >
          {uploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Esperando imagen...
            </>
          ) : loading ? (
            'Guardando...'
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {initial._id ? 'Actualizar producto' : 'Crear producto'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
