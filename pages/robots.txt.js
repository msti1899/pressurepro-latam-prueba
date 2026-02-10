const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';

function generateRobotsTxt() {
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
Allow: /es
Allow: /en
Allow: /pt
Allow: /mx
Allow: /ar
Allow: /br
Allow: /pe
Allow: /cl
Allow: /co
Allow: /bo
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
