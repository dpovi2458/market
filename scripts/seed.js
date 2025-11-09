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

  const products = [
    { titulo: 'Cuaderno A4 150 hojas', desc: 'Cuaderno rayado de calidad para apuntes', precio: 12.50, cat: 'utiles', stock: 15 },
    { titulo: 'Bolígrafo Set 5 colores', desc: 'Set de bolígrafos de punta fina', precio: 8.00, cat: 'utiles', stock: 20 },
    { titulo: 'Pizza Margarita', desc: 'Pizza casera deliciosa, entrega a domicilio', precio: 18.00, cat: 'comida', stock: 5 },
    { titulo: 'Café Premium 1kg', desc: 'Granos de café importados molidos', precio: 35.00, cat: 'comida', stock: 8 },
    { titulo: 'Cable USB-C', desc: 'Cable de carga rápida 2 metros', precio: 22.00, cat: 'tecnologia', stock: 12 },
    { titulo: 'Protector pantalla vidrio templado', desc: 'Protector para smartphone con instalación', precio: 15.00, cat: 'tecnologia', stock: 18 },
    { titulo: 'Polerón oversize gris', desc: 'Polerón cómodo para estudiantes', precio: 65.00, cat: 'ropa', stock: 10 },
    { titulo: 'Mochila de tela resistente', desc: 'Mochila básica azul con compartimentos', precio: 45.00, cat: 'ropa', stock: 6 },
    { titulo: 'Energizante bebida 250ml', desc: 'Bebida energética sin azúcar', precio: 7.50, cat: 'comida', stock: 25 },
    { titulo: 'Auriculares Bluetooth', desc: 'Auriculares inalámbricos con 20h batería', precio: 89.00, cat: 'tecnologia', stock: 7 }
  ];

  for (let i = 0; i < products.length; i++) {
    const v = vendors[i % vendors.length];
    const p = products[i];
    await Product.create({
      titulo: p.titulo,
      descripcion: p.desc,
      precio: p.precio,
      categoria: p.cat,
      imagenes: [sampleImgs[i % sampleImgs.length]],
      stock: p.stock,
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
