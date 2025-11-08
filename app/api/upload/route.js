import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { v2 as cloudinary } from 'cloudinary';
import { getSellerFromCookie } from '../../../lib/auth';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
  try {
    // Auth check
    const seller = getSellerFromCookie();
    if (!seller) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Validate config
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary config missing:', {
        cloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: !!process.env.CLOUDINARY_API_KEY,
        apiSecret: !!process.env.CLOUDINARY_API_SECRET
      });
      return NextResponse.json({ error: 'Cloudinary no está configurado en el servidor' }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Solo se permiten imágenes' }, { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'La imagen no debe superar 5MB' }, { status: 400 });
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

    // Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'marketplace-facultad',
          resource_type: 'image',
          transformation: [
            { width: 1000, height: 1000, crop: 'limit' },
            { quality: 'auto:good' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Upload successful:', result.secure_url);
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({ 
      url: result.secure_url,
      width: result.width,
      height: result.height
    });

  } catch (error) {
    console.error('Upload route error:', error);
    return NextResponse.json({ 
      error: error.message || 'Error al procesar la imagen',
      details: error.toString()
    }, { status: 500 });
  }
}
