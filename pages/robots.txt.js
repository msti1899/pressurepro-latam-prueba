import { COUNTRIES, LANGUAGES } from '../config/countries';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';

function generateRobotsTxt() {
  // Generar Allow dinámicamente desde los locales configurados
  const allLocales = [...Object.keys(LANGUAGES), ...Object.keys(COUNTRIES)];
  const allowLines = allLocales.map(locale => `Allow: /${locale}`).join('\n');
  const allowIndustryLines = allLocales.map(locale => `Allow: /${locale}/industries/`).join('\n');

  return `# robots.txt for PressurePro LATAM
User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Bloquear rutas de API y archivos internos
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Permitir todas las versiones de idioma y país
${allowLines}

# Permitir páginas de industrias
${allowIndustryLines}
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
