import ProductCardWithCart from './ProductCardWithCart';

/**
 * ProductList - Muestra productos en formato lista con tarjetas grid de 3 partes
 * Ideal para vistas de carrito, checkout o listado detallado
 */
export default function ProductList({ products = [] }) {
  if (products.length === 0) {
    return (
      <div style={{ 
        padding: 'var(--space-12)', 
        textAlign: 'center',
        color: 'var(--text-secondary)' 
      }}>
        <p>No se encontraron productos.</p>
      </div>
    );
  }
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      {products.map((p) => (
        <ProductCardWithCart key={p._id} product={p} />
      ))}
    </div>
  );
}
