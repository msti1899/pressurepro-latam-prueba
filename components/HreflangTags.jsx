'use client';
import Head from 'next/head';
import { buildAlternates } from '../config/localization';
import { getBaseUrl } from '../config/runtime';

/**
 * Componente que genera las etiquetas hreflang para SEO internacional
 * Estas etiquetas ayudan a Google a entender la relación entre versiones de la página
 */
const HreflangTags = ({ currentLanguage, currentCountry, pagePath = '' }) => {
  const baseUrl = getBaseUrl();
  const alternates = buildAlternates(baseUrl, pagePath);
  
  // Determinar el canonical actual
  const currentPath = currentCountry 
    ? `${baseUrl}/${currentCountry}${pagePath}`
    : `${baseUrl}/${currentLanguage}${pagePath}`;
  
  return (
    <Head>
      {/* Canonical para la página actual */}
      <link rel="canonical" href={currentPath} />
      
      {/* Etiquetas hreflang para todas las versiones */}
      {alternates.map(({ hreflang, href }) => (
        <link 
          key={hreflang}
          rel="alternate" 
          hrefLang={hreflang} 
          href={href} 
        />
      ))}
    </Head>
  );
};

export default HreflangTags;
