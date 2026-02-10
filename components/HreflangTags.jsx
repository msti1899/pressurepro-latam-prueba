'use client';
import Head from 'next/head';
import { COUNTRIES, LANGUAGES, getAllRoutes } from '../config/countries';

/**
 * Componente que genera las etiquetas hreflang para SEO internacional
 * Estas etiquetas ayudan a Google a entender la relación entre versiones de la página
 */
const HreflangTags = ({ currentLanguage, currentCountry, pagePath = '' }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';
  
  // Generar todas las alternativas de idioma/país
  const generateAlternates = () => {
    const alternates = [];
    
    // Añadir versiones por idioma (sin país específico)
    Object.keys(LANGUAGES).forEach(langCode => {
      const lang = LANGUAGES[langCode];
      alternates.push({
        hreflang: lang.hreflang,
        href: `${baseUrl}/${langCode}${pagePath}`
      });
    });
    
    // Añadir versiones por país
    Object.keys(COUNTRIES).forEach(countryCode => {
      const country = COUNTRIES[countryCode];
      alternates.push({
        hreflang: country.hreflang,
        href: `${baseUrl}/${countryCode}${pagePath}`
      });
    });
    
    // Añadir x-default (versión por defecto cuando no hay coincidencia)
    alternates.push({
      hreflang: 'x-default',
      href: `${baseUrl}/es${pagePath}`
    });
    
    return alternates;
  };
  
  const alternates = generateAlternates();
  
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
