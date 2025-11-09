"use client";
import { useCarrito } from '../context/CarritoContext';
import { useRouter } from 'next/navigation';

export default function ShoppingCartDrawer() {
  const { items, open, setOpen, removeItem, updateCantidad, totalPrice, totalItems } = useCarrito();
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/carrito');
    setOpen(false);
  };

  // Icons como SVG para evitar lucide-react
  const XIcon = () => (
    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const ShoppingCartIcon = () => (
    <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  const MinusIcon = () => (
    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  );

  const PlusIcon = () => (
    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  );

  const Trash2Icon = () => (
    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 112 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: 'min(450px, 100vw)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <ShoppingCartIcon />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Mi carrito</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <XIcon />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <ShoppingCartIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-500">
                  Agrega productos para comenzar tu compra
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.producto_id}
                  className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="flex-shrink-0">
                    {item.imagen && (
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {item.titulo}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{item.vendedor || 'Vendedor'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-teal-700">
                        S/ {(item.precio * item.cantidad).toFixed(2)}
                      </span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCantidad(item.producto_id, Math.max(1, item.cantidad - 1))}
                          disabled={item.cantidad <= 1}
                          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
                          aria-label="Disminuir cantidad"
                        >
                          <MinusIcon />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-900">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => updateCantidad(item.producto_id, Math.min(item.stock ?? 99, item.cantidad + 1))}
                          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <PlusIcon />
                        </button>
                        <button
                          onClick={() => removeItem(item.producto_id)}
                          className="p-1.5 hover:bg-red-50 rounded-md transition-colors ml-2"
                          aria-label="Eliminar producto"
                        >
                          <Trash2Icon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-4">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Productos ({totalItems})</span>
                  <span>S/ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-teal-700">S/ {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold 
                           py-4 rounded-xl transition-all duration-200 
                           hover:shadow-lg hover:-translate-y-0.5 
                           flex items-center justify-center gap-2"
                >
                  Finalizar compra
                  <ArrowRightIcon />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold 
                           py-4 rounded-xl border-2 border-gray-300 transition-all duration-200
                           hover:border-gray-400"
                >
                  Seguir comprando
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Pago seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span>Envío en campus</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
