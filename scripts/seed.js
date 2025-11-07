/*
  Seed inicial: crea 5 vendedores y 10 productos de ejemplo.
  Uso: npm run seed
*/
// Script de seed en CommonJS para evitar warnings ESM si el proyecto no usa "type":"module".
// Crea 5 vendedores y 10 productos de ejemplo.
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({
  // Prioriza .env.local si existe, de lo contrario intenta .env
  path: fs.existsSync(path.join(process.cwd(), '.env.local'))
    ? path.join(process.cwd(), '.env.local')
    : path.join(process.cwd(), '.env')
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI no definido. Asegúrate de crearlo en .env.local');
  process.exit(1);
}

const vendorSchema = new mongoose.Schema(
  { nombre: String, usuario: String, password_hash: String, email: String, telefono: String, activo: Boolean },
  { timestamps: { createdAt: 'fecha_registro' } }
);
const productSchema = new mongoose.Schema(
  {
    titulo: String,
    descripcion: String,
    precio: Number,
    categoria: String,
    imagenes: [String],
    stock: Number,
    disponible: Boolean,
    vendedor_id: String,
    vendedor_nombre: String
  },
  { timestamps: { createdAt: 'fecha_creacion', updatedAt: 'fecha_actualizacion' } }
);

async function main() {
  await mongoose.connect(MONGODB_URI, { dbName: 'marketplace' });
  const Vendor = mongoose.model('Vendor', vendorSchema, 'vendedores');
  const Product = mongoose.model('Product', productSchema, 'productos');

  console.log('Limpiando colecciones...');
  await Vendor.deleteMany({});
  await Product.deleteMany({});

  console.log('Creando vendedores...');
  const vendors = [];
  for (let i = 1; i <= 5; i++) {
    const v = await Vendor.create({
      nombre: `Vendedor ${i}`,
      usuario: `seller${i}`,
      password_hash: await bcrypt.hash('clave123', 10),
      email: `seller${i}@facultad.edu`,
      telefono: `+51999999${i}${i}`,
      activo: true
    });
    vendors.push(v);
  }

  console.log('Creando productos...');
  const categories = ['utiles', 'comida', 'tecnologia', 'ropa', 'otros'];
  const sampleImgs = [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975922329-6c237c2b5e09?w=800&q=80&auto=format&fit=crop'
  ];
  for (let i = 1; i <= 10; i++) {
    const v = vendors[i % vendors.length];
    await Product.create({
      titulo: `Producto ${i}`,
      descripcion: 'Descripción breve del producto de ejemplo para el marketplace.',
      precio: 5 * i,
      categoria: categories[i % categories.length],
      imagenes: [sampleImgs[i % sampleImgs.length]],
      stock: 5 + (i % 10),
      disponible: true,
      vendedor_id: String(v._id),
      vendedor_nombre: v.nombre
    });
  }

  console.log('Seed completado. Credenciales ejemplo: seller1..5 / clave123');
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error('Fallo en seed:', e);
  process.exit(1);
});
