import { notFound } from 'next/navigation';
import { ProductModel } from '../../../../lib/models/Product';
import { AddToCart } from './ui';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function ProductDetail({ params }) {
  try {
    const Product = await ProductModel();
    const product = await Product.findById(params.id).lean();
    if (!product) return notFound();
    const json = JSON.parse(JSON.stringify(product));

    return (
      <div className="product-layout">
        <div className="image-section">
          <div className="product-image-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={json.imagenes?.[0] || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80'} alt={json.titulo} className="product-image" />
          </div>
        </div>
        <div className="info-section">
          <div>
            <h1 className="product-title">{json.titulo}</h1>
            <p className="product-description">{json.descripcion}</p>
          </div>
          <div className="price-container">
            <div className="price">
              <span className="price-currency">S/</span>
              <span>{json.precio.toFixed(2)}</span>
            </div>
          </div>
          <div className="vendor-section">
            <div className="vendor-label">Vendedor</div>
            <div className="vendor-name">{json.vendedor_nombre || 'Estudiante'}</div>
            {json.contacto && (
              <div className="mt-2">
                <div className="vendor-label">Contacto</div>
                <div className="vendor-name text-primary">{json.contacto}</div>
              </div>
            )}
          </div>
          <AddToCart product={json} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return notFound();
  }
}
