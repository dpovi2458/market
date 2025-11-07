import Link from 'next/link';

export default function PedidoExitoso() {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl p-6 border text-center space-y-3">
      <h1 className="text-2xl font-semibold text-success">¡Pedido recibido!</h1>
      <p className="text-gray-700">Gracias por tu compra. El vendedor te contactará por WhatsApp en breve.</p>
      <Link className="btn-primary inline-block" href="/">Volver al inicio</Link>
    </div>
  );
}
