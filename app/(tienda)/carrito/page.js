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

  const subtotal = items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);
  const envio = 0; // Puedes calcular el envío aquí si aplica
  const total = subtotal + envio;

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

  if (items.length === 0 && step === 1) {
    return (
      <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <div className="cart-empty">
          <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 style={{ 
            fontFamily: 'var(--font-primary)', 
            fontSize: 'var(--text-2xl)', 
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-primary)',
            marginTop: 'var(--space-6)'
          }}>Tu carrito está vacío</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
            Explora nuestros productos y encuentra lo que necesitas
          </p>
          <Button 
            variant="primary" 
            onClick={() => router.push('/')}
            style={{ marginTop: 'var(--space-8)' }}
          >
            Ver productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
      <h1 style={{ 
        fontFamily: 'var(--font-primary)', 
        fontSize: 'var(--text-3xl)', 
        fontWeight: 'var(--weight-bold)',
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-6)'
      }}>
        {step === 1 ? 'Carrito de compras' : 'Información de contacto'}
      </h1>
      
      <Steps step={step} />

      <section className="cart-page">
        {/* Columna izquierda: Lista de productos o formulario */}
        <div className="cart-list">
          {step === 1 && (
            <>
              <ul className="cart-items-list">
                {items.map((it) => (
                  <li key={it.producto_id} className="cart-item-row">
                    {it.imagen && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.imagen} alt={it.titulo} className="cart-item-image" />
                    )}
                    <div className="cart-item-info">
                      <h3 className="cart-item-title">{it.titulo}</h3>
                      <p className="cart-item-unit-price">S/ {it.precio.toFixed(2)} c/u</p>
                      <div className="cart-item-actions">
                        <div className="qty-control">
                          <button 
                            onClick={() => updateCantidad(it.producto_id, Math.max(1, it.cantidad - 1))}
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <span>{it.cantidad}</span>
                          <button 
                            onClick={() => updateCantidad(it.producto_id, Math.min(it.stock ?? 99, it.cantidad + 1))}
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="cart-item-remove-btn"
                          onClick={() => removeItem(it.producto_id)}
                          aria-label="Eliminar producto"
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-subtotal">
                      S/ {(it.precio * it.cantidad).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {step === 2 && (
            <div className="checkout-form">
              <Input 
                label="Nombre completo*" 
                value={form.nombre} 
                onChange={(e) => setForm({ ...form, nombre: e.target.value })} 
                error={errors.nombre} 
              />
              <Input 
                label="WhatsApp/Teléfono*" 
                value={form.telefono} 
                onChange={(e) => setForm({ ...form, telefono: e.target.value })} 
                error={errors.telefono} 
              />
              <Input 
                label="Email" 
                type="email" 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
              />
              <Input 
                label="Punto de entrega*" 
                value={form.punto_entrega} 
                onChange={(e) => setForm({ ...form, punto_entrega: e.target.value })} 
                error={errors.punto_entrega} 
              />
              <label className="form-field">
                <span className="form-label">Comentarios adicionales</span>
                <textarea 
                  className="form-textarea" 
                  rows={4} 
                  value={form.comentarios} 
                  onChange={(e) => setForm({ ...form, comentarios: e.target.value })}
                  placeholder="Instrucciones especiales, preferencias de entrega, etc."
                />
              </label>
            </div>
          )}
        </div>

        {/* Columna derecha: Resumen del pedido (sticky) */}
        <aside className="order-summary">
          <h4 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-6)'
          }}>Resumen del pedido</h4>
          
          <dl className="totals">
            <div className="totals-row">
              <dt>Subtotal ({items.length} {items.length === 1 ? 'producto' : 'productos'})</dt>
              <dd>S/ {subtotal.toFixed(2)}</dd>
            </div>
            <div className="totals-row">
              <dt>Envío</dt>
              <dd>{envio === 0 ? 'Por coordinar' : `S/ ${envio.toFixed(2)}`}</dd>
            </div>
            <div className="totals-row grand">
              <dt>Total</dt>
              <dd>S/ {total.toFixed(2)}</dd>
            </div>
          </dl>

          {step === 1 && (
            <Button 
              variant="primary" 
              onClick={() => setStep(2)} 
              disabled={items.length === 0}
              style={{ width: '100%', marginTop: 'var(--space-6)' }}
            >
              Continuar con el pedido
            </Button>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <Button 
                variant="primary" 
                loading={loading} 
                onClick={submit}
                style={{ width: '100%' }}
              >
                {loading ? 'Procesando...' : 'Confirmar pedido'}
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setStep(1)}
                style={{ width: '100%' }}
              >
                Volver al carrito
              </Button>
            </div>
          )}

          <div className="order-summary-note">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <p>Los productos serán reservados hasta que coordines la entrega con el vendedor.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Steps({ step }) {
  const steps = ['Revisar carrito', 'Datos de contacto'];
  return (
    <div className="checkout-steps">
      {steps.map((s, i) => (
        <div key={i} className="step-item">
          <span className={`step-number ${i + 1 <= step ? 'active' : ''}`}>
            {i + 1}
          </span>
          <span className={`step-label ${i + 1 === step ? 'current' : ''}`}>
            {s}
          </span>
          {i < steps.length - 1 && <span className="step-divider">/</span>}
        </div>
      ))}
    </div>
  );
}
