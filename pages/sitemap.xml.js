import { COUNTRIES, LANGUAGES } from '../config/countries';
import { INDUSTRY_SLUGS } from '../constants/industries';

/**
 * Sitemap Principal - Main Sitemap
 * =================================
 * Contiene todas las páginas principales del sitio:
 * - Homes por idioma/país (11 URLs)
 * - Páginas de industrias (66 URLs = 6 industrias × 11 locales)
 * - Páginas FAQ (11 URLs)
 * 
 * Total: ~88 URLs
 * 
 * Incluye etiquetas hreflang para cada URL para SEO internacional.
 * Google recomienda dividir en múltiples sitemaps cuando:
 * - Superas 50,000 URLs por sitemap, O
 * - El archivo supera 50MB sin comprimir
 * 
 * Para este sitio: UN SOLO SITEMAP es suficiente (pero tenemos sitemap-index
 * preparado para cuando agregues blog u otras secciones).
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';

function generateSiteMap() {
  const currentDate = new Date().toISOString();
  
  // Fechas de última modificación más precisas
  const lastModDates = {
    home: currentDate,
    faq: new Date('2026-02-13').toISOString(), // Fecha de creación FAQ
    industries: new Date('2026-02-10').toISOString(), // Ajustar según última actualización
  };
  
  // Todos los locales disponibles (idiomas + países)
  const allLocales = [...Object.keys(LANGUAGES), ...Object.keys(COUNTRIES)];
  
  // Generar URLs para idiomas (home)
  const languageUrls = Object.keys(LANGUAGES).map(lang => ({
    loc: `${BASE_URL}/${lang}`,
    lastmod: lastModDates.home,
    changefreq: 'weekly',
    priority: '0.9',
    pagePath: ''
  }));
  
  // Generar URLs para países (home)
  const countryUrls = Object.keys(COUNTRIES).map(country => ({
    loc: `${BASE_URL}/${country}`,
    lastmod: lastModDates.home,
    changefreq: 'weekly',
    priority: '1.0',
    pagePath: ''
  }));

  // Generar URLs de industrias para cada locale
  const industryUrls = [];
  for (const locale of allLocales) {
    for (const slug of INDUSTRY_SLUGS) {
      industryUrls.push({
        loc: `${BASE_URL}/${locale}/industries/${slug}`,
        lastmod: lastModDates.industries,
        changefreq: 'monthly',
        priority: '0.8',
        pagePath: `/industries/${slug}`
      });
    }
  }
  
  // Generar URLs de FAQ para cada locale
  const faqUrls = allLocales.map(locale => ({
    loc: `${BASE_URL}/${locale}/faq`,
    lastmod: lastModDates.faq,
    changefreq: 'monthly',
    priority: '0.7',
    pagePath: '/faq'
  }));
  
  // Combinar todas las URLs
  const allUrls = [...languageUrls, ...countryUrls, ...industryUrls, ...faqUrls];
  
  // Agregar comentario con estadísticas en el XML (útil para debugging)
  const stats = `
  <!--
    stats}
  ${📊 Estadísticas del Sitemap:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    • Homes (idiomas):        ${languageUrls.length} URLs
    • Homes (países):         ${countryUrls.length} URLs
    • Páginas de industrias:  ${industryUrls.length} URLs
    • Páginas FAQ:            ${faqUrls.length} URLs
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    📍 Total URLs:            ${allUrls.length} URLs
    
    ⚙️ Prioridades:
    1.0 = Homes por país (máxima prioridad)
    0.9 = Homes por idioma
    0.8 = Industrias (contenido principal)
    0.7 = FAQ (contenido de soporte)
    
    📅 Última generación: ${currentDate}
  -->
  `;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${generateHreflangLinks(url.pagePath)}
  </url>`).join('')}
</urlset>`;
}

function generateHreflangLinks(pagePath) {
  const links = [];
  
  // Agregar versiones de idioma
  Object.keys(LANGUAGES).forEach(lang => {
    links.push(`<xhtml:link rel="alternate" hreflang="${LANGUAGES[lang].hreflang}" href="${BASE_URL}/${lang}${pagePath}" />`);
  });
  
  // Agregar versiones de país
  Object.keys(COUNTRIES).forEach(country => {
    links.push(`<xhtml:link rel="alternate" hreflang="${COUNTRIES[country].hreflang}" href="${BASE_URL}/${country}${pagePath}" />`);
  });
  
  // Agregar x-default
  links.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/es${pagePath}" />`);
  
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
