"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCarrito } from '../../../context/CarritoContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { isValidPhone } from '../../../lib/utils';

export default function CarritoPage() {
  const { items, updateCantidad, removeItem, clear } = useCarrito();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', punto_entrega: '', comentarios: '' });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const total = items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);

  function validate() {
    const e = {};
    if (!form.nombre) e.nombre = 'Requerido';
    if (!form.telefono) e.telefono = 'Requerido';
    else if (!isValidPhone(form.telefono)) e.telefono = 'Formato inválido';
    if (!form.punto_entrega) e.punto_entrega = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, comprador: form })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || 'Error al crear pedido');
      }
      clear();
      router.replace('/pedido-exitoso');
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Tu pedido</h1>
      <Steps step={step} />
      {step === 1 && (
        <div className="space-y-4 mt-4">
          {items.length === 0 && <p className="text-gray-600">No hay productos en el carrito.</p>}
          <ul className="divide-y bg-white rounded-xl border">
            {items.map((it) => (
              <li key={it.producto_id} className="p-3 flex gap-3 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {it.imagen && <img src={it.imagen} alt={it.titulo} className="w-16 h-16 object-cover rounded" />}
                <div className="flex-1">
                  <p className="font-medium">{it.titulo}</p>
                  <p className="text-sm text-gray-600">S/ {it.precio.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button className="px-2 py-1 border rounded" onClick={() => updateCantidad(it.producto_id, Math.max(1, it.cantidad - 1))}>-</button>
                    <span>{it.cantidad}</span>
                    <button className="px-2 py-1 border rounded" onClick={() => updateCantidad(it.producto_id, Math.min(it.stock ?? 99, it.cantidad + 1))}>+</button>
                    <button className="ml-3 text-danger text-sm" onClick={() => removeItem(it.producto_id)}>Eliminar</button>
                  </div>
                </div>
                <div className="font-semibold">S/ {(it.precio * it.cantidad).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-semibold">S/ {total.toFixed(2)}</span>
          </div>
          <Button onClick={() => setStep(2)} disabled={items.length === 0}>Proceder a pedir</Button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl p-4 border mt-4 space-y-3">
          <Input label="Nombre completo*" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} error={errors.nombre} />
          <Input label="WhatsApp/Teléfono*" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} error={errors.telefono} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Punto de entrega*" value={form.punto_entrega} onChange={(e) => setForm({ ...form, punto_entrega: e.target.value })} error={errors.punto_entrega} />
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Comentarios adicionales</span>
            <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" rows={3} value={form.comentarios} onChange={(e) => setForm({ ...form, comentarios: e.target.value })} />
          </label>
          <div className="flex gap-2 pt-2">
            <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200" onClick={() => setStep(1)}>Volver</Button>
            <Button loading={loading} onClick={submit}>Confirmar pedido</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Steps({ step }) {
  const steps = ['Revisar carrito', 'Datos de contacto'];
  return (
    <div className="flex items-center gap-3 text-sm">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${i + 1 <= step ? 'bg-primary' : 'bg-gray-300'}`}>{i + 1}</span>
          <span className={`${i + 1 === step ? 'font-semibold' : 'text-gray-600'}`}>{s}</span>
          {i < steps.length - 1 && <span className="text-gray-400">/</span>}
        </div>
      ))}
    </div>
  );
}
