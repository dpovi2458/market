import { ProductModel } from '../models/Product';

export async function listProductsPublic({ q, categoria, page = 1, limit = 24 } = {}) {
  const Product = await ProductModel();
  const query = { disponible: true, stock: { $gt: 0 } };
  if (q) {
    query.$or = [
      { titulo: { $regex: q, $options: 'i' } },
      { descripcion: { $regex: q, $options: 'i' } }
    ];
  }
  if (categoria) query.categoria = categoria;

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Product.find(query).sort({ fecha_creacion: -1 }).skip(skip).limit(Number(limit)).lean(),
    Product.countDocuments(query)
  ]);
  return { items: JSON.parse(JSON.stringify(items)), total };
}
