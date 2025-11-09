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
      {/* Hero Banner */}
      {!q && !categoria && (
        <section className="hero-banner">
          <div className="hero-content">
            <h1 className="hero-title">
              Compra y vende entre estudiantes
            </h1>
            <p className="hero-subtitle">
              u-market es tu marketplace para encontrar útiles, comida, tecnología y más. 
              Hecho por estudiantes, para estudiantes de la Facultad de Ingeniería Industrial.
            </p>
            <div className="hero-ctas">
              <Link href="/?categoria=utiles" className="hero-btn hero-btn-primary">
                <span>Explorar catálogo</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/vendedor/login" className="hero-btn hero-btn-secondary">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6v6m0 0v6M4 12a8 8 0 1116 0 8 8 0 01-16 0z" />
                </svg>
                <span>Vende aquí</span>
              </Link>
            </div>
          </div>
          <div className="hero-graphic">
            <img 
              src="/hero-estudiantes fii.svg" 
              alt="Estudiantes u-market"
              className="hero-illustration"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Filtros de categoría con scroll horizontal */}
      <section className="categories-section" style={{ marginTop: 'var(--space-12)' }}>
        <div className="container">
          <h2 className="section-title" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>
            Todos los productos
          </h2>
          <div className="categories-scroll-container">
            <div className="categories-row">
              <Link href="/?" className={`category-chip ${!categoria ? 'active' : ''}`}>
                Todos
              </Link>
              <Link href="/?categoria=utiles" className={`category-chip ${categoria === 'utiles' ? 'active' : ''}`}>
                Útiles
              </Link>
              <Link href="/?categoria=comida" className={`category-chip ${categoria === 'comida' ? 'active' : ''}`}>
                Comida
              </Link>
              <Link href="/?categoria=tecnologia" className={`category-chip ${categoria === 'tecnologia' ? 'active' : ''}`}>
                Tecnología
              </Link>
              <Link href="/?categoria=ropa" className={`category-chip ${categoria === 'ropa' ? 'active' : ''}`}>
                Ropa
              </Link>
              <Link href="/?categoria=otros" className={`category-chip ${categoria === 'otros' ? 'active' : ''}`}>
                Otros
              </Link>
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
