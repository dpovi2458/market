import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { v2 as cloudinary } from 'cloudinary';
import { getSellerFromCookie } from '../../../lib/auth';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
  try {
    // Validate Cloudinary config
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary credentials missing');
      return NextResponse.json({ error: 'Configuración de Cloudinary incompleta' }, { status: 500 });
    }

    const seller = getSellerFromCookie();
    if (!seller) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const form = await req.formData();
    const file = form.get('file');
    if (!file) return NextResponse.json({ error: 'Archivo requerido' }, { status: 400 });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Solo se permiten imágenes' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'La imagen no debe superar 5MB' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const upload = () =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: 'marketplace-facultad', 
            resource_type: 'image',
            transformation: [
              { width: 1000, height: 1000, crop: 'limit' },
              { quality: 'auto:good' }
            ]
          }, 
          (err, res) => {
            if (err) {
              console.error('Cloudinary upload error:', err);
              reject(err);
            } else {
              resolve(res);
            }
          }
        ).end(buffer);
      });

    const result = await upload();
    return NextResponse.json({ url: result.secure_url });
  } catch (e) {
    console.error('Upload route error:', e);
    return NextResponse.json({ error: e.message || 'Error al subir imagen' }, { status: 500 });
  }
}
