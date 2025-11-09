/**
 * Script para eliminar el índice único del campo 'usuario' en la colección vendedores
 * Ejecutar con: node scripts/drop-usuario-index.js
 */

import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno manualmente
function loadEnv() {
  try {
    const envPath = join(__dirname, '..', '.env');
    const envContent = readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    }
  } catch (error) {
    console.error('⚠️  No se pudo cargar .env, usando variables de entorno del sistema');
  }
}

loadEnv();

async function dropUsuarioIndex() {
  try {
    // Conectar a MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI no está definido en las variables de entorno');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✓ Conectado a MongoDB');

    // Obtener la colección
    const db = mongoose.connection.db;
    const collection = db.collection('vendedores');

    // Listar índices existentes
    const indexes = await collection.indexes();
    console.log('\n📋 Índices actuales:');
    indexes.forEach(index => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    // Verificar si existe el índice usuario_1
    const hasUsuarioIndex = indexes.some(index => index.name === 'usuario_1');
    
    if (hasUsuarioIndex) {
      console.log('\n🗑️  Eliminando índice usuario_1...');
      await collection.dropIndex('usuario_1');
      console.log('✓ Índice usuario_1 eliminado exitosamente');
    } else {
      console.log('\n⚠️  Índice usuario_1 no encontrado (puede que ya haya sido eliminado)');
    }

    // Listar índices después de eliminar
    const indexesAfter = await collection.indexes();
    console.log('\n📋 Índices después de la eliminación:');
    indexesAfter.forEach(index => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    console.log('\n✅ Proceso completado exitosamente');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
}

dropUsuarioIndex();
