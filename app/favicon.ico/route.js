import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Serve a minimal SVG as favicon via /favicon.ico route to avoid 404s
export async function GET() {
  const svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><rect width=\"64\" height=\"64\" rx=\"12\" fill=\"#2563eb\"/><path d=\"M14 24h36l-6 20H22l-8-20z\" fill=\"#ffffff\"/></svg>`;
  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
