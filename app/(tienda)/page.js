import Link from 'next/link';
import ProductGrid from '../../components/ProductGrid';
import { listProductsPublic } from '../../lib/server/productsService';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function Home({ searchParams }) {
  const q = searchParams?.q || '';
  const categoria = searchParams?.categoria || '';
  const { items } = await listProductsPublic({ q, categoria, limit: 24 });

  return (
    <div style={{ paddingBottom: 'var(--space-12)' }}>
      {/* Banner Hero */}
      {!q && !categoria && (
        <section id="banner" className="hero-banner">
          <div className="banner-content">
            <h1 className="banner-title">
              Bienvenido a <span className="brand-gradient">UniMarket</span>
            </h1>
            <p className="banner-subtitle">
              El marketplace de la Universidad Nacional Mayor de San Marcos
            </p>
            <p className="banner-description">
              Encuentra productos, servicios y gestiona tus trámites universitarios en un solo lugar.
            </p>
            <div className="banner-actions">
              <a href="#productos" className="btn-hero-primary">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Explorar productos
              </a>
              <Link href="/vendedor/login" className="btn-hero-secondary">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Soy vendedor
              </Link>
            </div>
          </div>
          <div className="banner-image">
            <div className="banner-stats">
              <div className="stat-card">
                <div className="stat-number">{items.length}+</div>
                <div className="stat-label">Productos</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Seguro</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Disponible</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filtros de categoría con scroll horizontal */}
      <section className="categories-section" id="productos">
        <div className="container">
          <h2 className="section-title">
            {q ? `Resultados para "${q}"` : categoria ? getCategoryName(categoria) : 'Todos los productos'}
          </h2>
          <div className="categories-scroll-container">
            <div className="categories-row">
              {[
                ['todos', '🏪 Todos'],
                ['utiles', '📚 Útiles'],
                ['comida', '🍕 Comida'],
                ['tecnologia', '💻 Tecnología'],
                ['ropa', '👕 Ropa'],
                ['otros', '📦 Otros']
              ].map(([key, label]) => (
                <CategoriaChip 
                  key={key} 
                  active={(categoria || 'todos') === key} 
                  href={`/?${new URLSearchParams({ ...(q && { q }), ...(key !== 'todos' && { categoria: key }) }).toString()}`}
                >
                  {label}
                </CategoriaChip>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de productos */}
      <div className="container" style={{ marginTop: 'var(--space-8)' }}>
        <ProductGrid products={items} />
        {items.length === 0 && (
          <div className="empty-state">
            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3>No se encontraron productos</h3>
            <p>Intenta con otra búsqueda o categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoriaChip({ active, href, children }) {
  return (
    <Link 
      href={href} 
      className={`category-chip ${active ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
}

function getCategoryName(categoria) {
  const names = {
    utiles: '📚 Útiles escolares',
    comida: '🍕 Comida y bebidas',
    tecnologia: '💻 Tecnología',
    ropa: '👕 Ropa y accesorios',
    otros: '📦 Otros productos'
  };
  return names[categoria] || 'Productos';
}
