/**
 * Sitemap de Imágenes - Image Sitemap
 * ====================================
 * Ayuda a Google a indexar las imágenes de productos e industrias
 * en Google Images, generando tráfico adicional desde búsqueda de imágenes.
 * 
 * Beneficios:
 * ✅ Mejor ranking en Google Images
 * ✅ Alt text y títulos aparecem en resultados
 * ✅ Tráfico adicional desde búsqueda visual
 */

import { COUNTRIES, LANGUAGES } from '../config/countries';
import { INDUSTRIES } from '../constants/industries';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';

function generateImageSitemap() {
  const currentDate = new Date().toISOString();
  
  // Todos los locales
  const allLocales = [...Object.keys(LANGUAGES), ...Object.keys(COUNTRIES)];
  
  // Generar entradas de imágenes para cada industria en cada locale
  const imageUrls = [];
  
  for (const locale of allLocales) {
    for (const industry of INDUSTRIES) {
      const langCode = COUNTRIES[locale]?.language || locale;
      const content = industry[langCode] || industry.es;
      
      imageUrls.push({
        pageLoc: `${BASE_URL}/${locale}/industries/${industry.slug}`,
        images: [
          {
            loc: `${BASE_URL}${industry.imgUrl}`,
            caption: content.name,
            title: `${content.name} - Sistema TPMS PressurePro`,
            geoLocation: COUNTRIES[locale]?.name || 'América Latina',
          }
        ]
      });
    }
    
    // Imágenes de la home (productos)
    imageUrls.push({
      pageLoc: `${BASE_URL}/${locale}`,
      images: [
        {
          loc: `${BASE_URL}/planet-06.png`,
          caption: 'Sensores TPMS PressurePro',
          title: 'Sensores de presión y temperatura de neumáticos',
        },
        {
          loc: `${BASE_URL}/planet-07.png`,
          caption: 'Monitor Pulse TPMS con Display',
          title: 'Monitor TPMS en tiempo real para cabina',
        },
        {
          loc: `${BASE_URL}/planet-08.png`,
          caption: 'Link TPMS para flotas',
          title: 'Sistema TPMS para configuraciones de acople',
        },
        {
          loc: `${BASE_URL}/planet-088.png`,
          caption: 'FX TPMS Fleet Management',
          title: 'Gestión de neumáticos para flotas comerciales',
        },
      ]
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${imageUrls.map(entry => `
  <url>
    <loc>${entry.pageLoc}</loc>
    <lastmod>${currentDate}</lastmod>
    ${entry.images.map(image => `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:caption>${escapeXml(image.caption)}</image:caption>
      <image:title>${escapeXml(image.title)}</image:title>
      ${image.geoLocation ? `<image:geo_location>${escapeXml(image.geoLocation)}</image:geo_location>` : ''}
    </image:image>`).join('')}
  </url>`).join('')}
</urlset>`;
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function ImageSitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateImageSitemap();
  
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();
  
  return {
    props: {},
  };
}

export default ImageSitemap;
