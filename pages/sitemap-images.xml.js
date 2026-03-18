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
import {
  resolveLocaleState,
  getTranslationsForMarket,
  getMarketContentForLocale,
} from '../config/localization';
import { getBaseUrl } from '../config/runtime';

const BASE_URL = getBaseUrl();

function generateImageSitemap() {
  const currentDate = new Date().toISOString();
  
  // Todos los locales
  const allLocales = [...Object.keys(LANGUAGES), ...Object.keys(COUNTRIES)];
  
  // Generar entradas de imágenes para cada industria en cada locale
  const imageUrls = [];
  
  for (const locale of allLocales) {
    const { language, country } = resolveLocaleState(locale);
    const translations = getTranslationsForMarket(language, country);
    const marketContent = getMarketContentForLocale(language, country);
    const regionName = marketContent?.seo?.regionName;
    const defaultImageCaption = marketContent?.seo?.homeTitle;

    for (const industry of INDUSTRIES) {
      const content = industry[language] || industry.es;
      
      imageUrls.push({
        pageLoc: `${BASE_URL}/${locale}/industries/${industry.slug}`,
        images: [
          {
            loc: `${BASE_URL}${industry.imgUrl}`,
            caption: content.name,
            title: `${content.name} - PressurePro TPMS`,
            geoLocation: COUNTRIES[locale]?.name || regionName,
          }
        ]
      });
    }
    
    const products = translations?.insights?.products || [];

    // Imágenes de la home (productos)
    imageUrls.push({
      pageLoc: `${BASE_URL}/${locale}`,
      images: [
        {
          loc: `${BASE_URL}/planet-06.png`,
          caption: products[0]?.title || defaultImageCaption,
          title: products[0]?.description || products[0]?.title || defaultImageCaption,
        },
        {
          loc: `${BASE_URL}/planet-07.png`,
          caption: products[1]?.title || defaultImageCaption,
          title: products[1]?.description || products[1]?.title || defaultImageCaption,
        },
        {
          loc: `${BASE_URL}/planet-08.png`,
          caption: products[2]?.title || defaultImageCaption,
          title: products[2]?.description || products[2]?.title || defaultImageCaption,
        },
        {
          loc: `${BASE_URL}/planet-088.png`,
          caption: products[3]?.title || defaultImageCaption,
          title: products[3]?.description || products[3]?.title || defaultImageCaption,
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
