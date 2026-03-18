/**
 * Sitemap Index - Índice de sitemaps
 * ===================================
 * Este archivo organiza múltiples sitemaps en un índice maestro.
 * Útil cuando el sitio crece y se agregan nuevas secciones (blog, productos, etc.)
 * 
 * Actualmente incluye:
 * ✅ sitemap.xml - Páginas principales (home, industrias, FAQ)
 * 🔮 Futuros: sitemap-blog.xml, sitemap-images.xml, sitemap-videos.xml
 */

import { getBaseUrl } from '../config/runtime';

const BASE_URL = getBaseUrl();

function generateSitemapIndex() {
  const currentDate = new Date().toISOString();
  
  // Lista de sitemaps disponibles
  const sitemaps = [
    {
      loc: `${BASE_URL}/sitemap.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${BASE_URL}/sitemap-images.xml`,
      lastmod: currentDate,
    },
    // Cuando implementes el blog, descomenta esta línea:
    // {
    //   loc: `${BASE_URL}/sitemap-blog.xml`,
    //   lastmod: currentDate,
    // },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;
}

function SitemapIndex() {
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemapIndex = generateSitemapIndex();
  
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemapIndex);
  res.end();
  
  return {
    props: {},
  };
}

export default SitemapIndex;
