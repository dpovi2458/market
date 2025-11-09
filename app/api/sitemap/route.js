import { listProductsPublic } from '../../../lib/server/productsService';

export async function GET() {
  try {
    const { items } = await listProductsPublic({ limit: 1000 });
    
    const baseUrl = 'https://market-facultad.vercel.app';
    
    const staticPages = [
      { url: '', priority: 1.0, changefreq: 'daily' },
      { url: '/carrito', priority: 0.8, changefreq: 'weekly' },
      { url: '/vendedor/login', priority: 0.7, changefreq: 'weekly' }
    ];

    const productPages = items.map((product) => ({
      url: `/producto/${product._id}`,
      priority: 0.7,
      changefreq: 'weekly',
      lastmod: product.fecha_actualizacion || new Date().toISOString()
    }));

    const allPages = [...staticPages, ...productPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      page.lastmod ? `\n    <lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>` : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
