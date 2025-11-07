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
  const seller = getSellerFromCookie();
  if (!seller) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file');
  if (!file) return NextResponse.json({ error: 'Archivo requerido' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const upload = () =>
    new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'marketplace-facultad', resource_type: 'image' }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }).end(buffer);
    });

  try {
    const result = await upload();
    return NextResponse.json({ url: result.secure_url });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
