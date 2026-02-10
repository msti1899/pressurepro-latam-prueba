import { COUNTRIES, LANGUAGES } from '../config/countries';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';

function generateSiteMap() {
  const currentDate = new Date().toISOString();
  
  // Generar URLs para idiomas
  const languageUrls = Object.keys(LANGUAGES).map(lang => ({
    loc: `${BASE_URL}/${lang}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  }));
  
  // Generar URLs para países
  const countryUrls = Object.keys(COUNTRIES).map(country => ({
    loc: `${BASE_URL}/${country}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '1.0' // Mayor prioridad para páginas de país
  }));
  
  // Combinar todas las URLs
  const allUrls = [...languageUrls, ...countryUrls];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${generateHreflangLinks(url.loc)}
  </url>`).join('')}
</urlset>`;
}

function generateHreflangLinks(currentUrl) {
  const links = [];
  
  // Agregar versiones de idioma
  Object.keys(LANGUAGES).forEach(lang => {
    links.push(`<xhtml:link rel="alternate" hreflang="${LANGUAGES[lang].hreflang}" href="${BASE_URL}/${lang}" />`);
  });
  
  // Agregar versiones de país
  Object.keys(COUNTRIES).forEach(country => {
    links.push(`<xhtml:link rel="alternate" hreflang="${COUNTRIES[country].hreflang}" href="${BASE_URL}/${country}" />`);
  });
  
  // Agregar x-default
  links.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/es" />`);
  
  return links.join('\n    ');
}

function SiteMap() {
  // Esta página no renderiza nada
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();
  
  return {
    props: {},
  };
}

export default SiteMap;
