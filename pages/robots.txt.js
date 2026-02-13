/**
 * Robots.txt dinámico
 * ===================
 * Informa a los crawlers sobre qué pueden indexar.
 * Referencias a todos los sitemaps incluidas.
 */

import { COUNTRIES, LANGUAGES } from '../config/countries';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';

function generateRobotsTxt() {
  // Generar Allow dinámicamente desde los locales configurados
  const allLocales = [...Object.keys(LANGUAGES), ...Object.keys(COUNTRIES)];
  const allowLines = allLocales.map(locale => `Allow: /${locale}`).join('\n');
  const allowIndustryLines = allLocales.map(locale => `Allow: /${locale}/industries/`).join('\n');

  return `# robots.txt for PressurePro LATAM
# Última actualización: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

# Sitemaps (múltiples para mejor organización SEO)
Sitemap: ${BASE_URL}/sitemap-index.xml
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-images.xml

# Bloquear rutas de API y archivos internos
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Permitir archivos de recursos
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.webp$
Allow: /*.svg$
Allow: /*.pdf$

# Permitir todas las versiones de idioma y país
${allowLines}

# Permitir páginas de industrias
${allowIndustryLines}

# Google Images
User-agent: Googlebot-Image
Allow: /

# Bing
User-agent: Bingbot
Allow: /
`;
}

function RobotsTxt() {
  return null;
}

export async function getServerSideProps({ res }) {
  const robotsTxt = generateRobotsTxt();
  
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(robotsTxt);
  res.end();
  
  return {
    props: {},
  };
}

export default RobotsTxt;
