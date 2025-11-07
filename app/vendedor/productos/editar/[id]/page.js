import { ProductModel } from '../../../../../lib/models/Product';
import ProductForm from '../../../../../components/vendedor/ProductForm';

export default async function EditarProducto({ params }) {
  const Product = await ProductModel();
  const product = await Product.findById(params.id).lean();
  const data = JSON.parse(JSON.stringify(product || {}));
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Editar producto</h1>
      <ProductForm initial={data} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
