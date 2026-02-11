import { COUNTRIES, LANGUAGES } from '../config/countries';
import { INDUSTRY_SLUGS } from '../constants/industries';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';

function generateSiteMap() {
  const currentDate = new Date().toISOString();
  
  // Todos los locales disponibles (idiomas + países)
  const allLocales = [...Object.keys(LANGUAGES), ...Object.keys(COUNTRIES)];
  
  // Generar URLs para idiomas (home)
  const languageUrls = Object.keys(LANGUAGES).map(lang => ({
    loc: `${BASE_URL}/${lang}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9',
    pagePath: ''
  }));
  
  // Generar URLs para países (home)
  const countryUrls = Object.keys(COUNTRIES).map(country => ({
    loc: `${BASE_URL}/${country}`,
    lastmod: currentDate,
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
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.8',
        pagePath: `/industries/${slug}`
      });
    }
  }
  
  // Combinar todas las URLs
  const allUrls = [...languageUrls, ...countryUrls, ...industryUrls];
  
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
