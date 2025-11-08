import Link from 'next/link';

export default function ProductCard({ product }) {
  const first = product.imagenes?.[0] || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=60&auto=format&fit=crop';
  
  return (
    <article className="product-card">
      <Link href={`/producto/${product._id}`} className="product-card-link">
        <div className="product-card-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={first} alt={product.titulo} />
          
          {product.stock <= 0 && (
            <span className="badge badge-danger">Agotado</span>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <span className="badge badge-warning">¡Últimas {product.stock}!</span>
          )}
          
          <span className="badge badge-category">
            {getCategoryEmoji(product.categoria)} {getCategoryName(product.categoria)}
          </span>
        </div>
        
        <div className="product-card-content">
          <h3 className="product-card-title">{product.titulo}</h3>
          <p className="product-card-price">S/ {product.precio.toFixed(2)}</p>
          <p className="product-card-vendor">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {product.vendedor_nombre || 'Estudiante'}
          </p>
        </div>
      </Link>
    </article>
  );
}

function getCategoryEmoji(categoria) {
  const emojis = {
    utiles: '📚',
    comida: '🍕',
    tecnologia: '💻',
    ropa: '👕',
    otros: '📦'
  };
  return emojis[categoria] || '📦';
}

function getCategoryName(categoria) {
  const names = {
    utiles: 'Útiles',
    comida: 'Comida',
    tecnologia: 'Tecnología',
    ropa: 'Ropa',
    otros: 'Otros'
  };
  return names[categoria] || 'Otros';
}
