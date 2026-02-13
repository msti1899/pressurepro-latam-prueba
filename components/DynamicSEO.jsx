'use client';
import Head from 'next/head';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES, LANGUAGES } from '../config/countries';
import { WHATSAPP_NUMBER } from '../config/whatsapp';

/**
 * Componente SEO dinámico que genera meta tags optimizados
 * para cada país/idioma, incluyendo structured data (JSON-LD)
 */
const DynamicSEO = ({ 
  pagePath = '',
  pageTitle,
  pageDescription,
  pageImage = '/cover.png'
}) => {
  const { 
    language, 
    country, 
    countryConfig, 
    translations,
    getSeoKeywords 
  } = useLocale();
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';
  
  // Generar título SEO
  const getTitle = () => {
    if (pageTitle) return pageTitle;
    
    if (countryConfig?.seo?.title) {
      return countryConfig.seo.title;
    }
    
    if (country && COUNTRIES[country]) {
      return `PressurePro ${COUNTRIES[country].name} - Monitoreo de ${countryConfig?.terminology?.tires || 'Neumáticos'}`;
    }
    
    return translations?.hero?.title || 'PressurePro LATAM - Monitoreo de Neumáticos';
  };
  
  // Generar descripción SEO con keywords optimizadas
  const getDescription = () => {
    if (pageDescription) return pageDescription;
    
    // Descripciones específicas por país con keywords
    const countryDescriptions = {
      'cl': `Sistema TPMS PressurePro para monitoreo de neumáticos en tiempo real en Chile. Especializado en minería, transporte y flotas comerciales. Ahorro de combustible hasta 15%, prevención de accidentes y optimización operativa.`,
      'pe': `Sistema TPMS PressurePro para monitoreo de neumáticos en Perú. Soluciones para minería, transporte pesado y maquinaria. Sensores de presión y temperatura en tiempo real para máxima seguridad operacional.`,
      'mx': `Sistema TPMS PressurePro para monitoreo de llantas en México. Tecnología de sensores inteligentes para flotillas comerciales. Reducción de costos operativos y mayor seguridad vehicular.`,
      'br': `Sistema TPMS PressurePro para monitoramento de pneus no Brasil. Soluções para frotas comerciais, mineração e agricultura. Tecnologia de sensores em tempo real para economia de combustível.`,
      'ar': `Sistema TPMS PressurePro para monitoreo de neumáticos en Argentina. Soluciones para agricultura, transporte y flotas comerciales. Ahorro operativo y prevención de accidentes en rutas argentinas.`,
      'co': `Sistema TPMS PressurePro para monitoreo de neumáticos en Colombia. Tecnología de sensores para transporte de carga, minería y flotas. Optimización de costos operativos y seguridad vial.`,
      'uy': `Sistema TPMS PressurePro para monitoreo de neumáticos en Uruguay. Soluciones para transporte, agricultura y flotas comerciales. Sensores de presión en tiempo real para máxima eficiencia.`,
      'bo': `Sistema TPMS PressurePro para monitoreo de neumáticos en Bolivia. Especializado en transporte de carga, minería y operaciones de altura. Sensores de presión y temperatura en tiempo real.`,
    };
    
    if (country && countryDescriptions[country]) {
      return countryDescriptions[country];
    }
    
    if (countryConfig?.seo?.description) {
      return countryConfig.seo.description;
    }
    
    return 'Sistema TPMS PressurePro para monitoreo de presión y temperatura de neumáticos en tiempo real. Soluciones para flotas comerciales, minería y transporte en toda América Latina. Ahorro de combustible, prevención de accidentes y optimización operativa.';
  };
  
  // Generar keywords
  const getKeywords = () => {
    const baseKeywords = getSeoKeywords();
    return baseKeywords.join(', ');
  };
  
  // Generar URL canónica
  const getCanonicalUrl = () => {
    const locale = country || language;
    return `${baseUrl}/${locale}${pagePath}`;
  };
  
  // Generar locale para Open Graph
  const getOgLocale = () => {
    if (countryConfig?.hreflang) {
      return countryConfig.hreflang.replace('-', '_');
    }
    const localeMap = {
      es: 'es_LA',
      en: 'en_US',
      pt: 'pt_BR'
    };
    return localeMap[language] || 'es_LA';
  };
  
  // Generar hreflang alternates
  const generateAlternates = () => {
    const alternates = [];
    
    // Versiones por idioma
    Object.keys(LANGUAGES).forEach(langCode => {
      alternates.push({
        hreflang: LANGUAGES[langCode].hreflang,
        href: `${baseUrl}/${langCode}${pagePath}`
      });
    });
    
    // Versiones por país
    Object.keys(COUNTRIES).forEach(countryCode => {
      alternates.push({
        hreflang: COUNTRIES[countryCode].hreflang,
        href: `${baseUrl}/${countryCode}${pagePath}`
      });
    });
    
    // x-default
    alternates.push({
      hreflang: 'x-default',
      href: `${baseUrl}/es${pagePath}`
    });
    
    return alternates;
  };
  
  // Structured Data - Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PressurePro LATAM",
    "url": baseUrl,
    "logo": `${baseUrl}/pp-white.png`,
    "description": getDescription(),
    "areaServed": country ? [
      {
        "@type": "Country",
        "name": countryConfig?.name || "Latinoamérica"
      }
    ] : Object.values(COUNTRIES).map(c => ({
      "@type": "Country",
      "name": c.name
    })),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": `+${WHATSAPP_NUMBER}`,
      "areaServed": countryConfig?.name || "Latinoamérica",
      "availableLanguage": language === 'pt' ? "Portuguese" : language === 'en' ? "English" : "Spanish"
    }
  };
  
  // Structured Data - LocalBusiness (solo si es país específico)
  const localBusinessSchema = country ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `PressurePro ${countryConfig?.name || ''}`,
    "description": getDescription(),
    "url": getCanonicalUrl(),
    "logo": `${baseUrl}/pp-white.png`,
    "image": `${baseUrl}${pageImage}`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": country.toUpperCase()
    },
    "geo": {
      "@type": "GeoCoordinates",
      // Coordenadas de ciudades principales por país
      ...(country === 'cl' && { "latitude": "-33.4489", "longitude": "-70.6693", "addressLocality": "Santiago" }),
      ...(country === 'pe' && { "latitude": "-12.0464", "longitude": "-77.0428", "addressLocality": "Lima" }),
      ...(country === 'mx' && { "latitude": "19.4326", "longitude": "-99.1332", "addressLocality": "Ciudad de México" }),
      ...(country === 'br' && { "latitude": "-23.5505", "longitude": "-46.6333", "addressLocality": "São Paulo" }),
      ...(country === 'ar' && { "latitude": "-34.6037", "longitude": "-58.3816", "addressLocality": "Buenos Aires" }),
      ...(country === 'co' && { "latitude": "4.7110", "longitude": "-74.0721", "addressLocality": "Bogotá" }),
      ...(country === 'uy' && { "latitude": "-34.9011", "longitude": "-56.1645", "addressLocality": "Montevideo" }),
      ...(country === 'bo' && { "latitude": "-16.5000", "longitude": "-68.1500", "addressLocality": "La Paz" }),
      ...(country === 'es' && { "latitude": "40.4168", "longitude": "-3.7038", "addressLocality": "Madrid" }),
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": `+${WHATSAPP_NUMBER}`,
      "areaServed": countryConfig?.name,
      "availableLanguage": language === 'pt' ? "Portuguese" : language === 'en' ? "English" : "Spanish"
    },
    "sameAs": [
      // Agregar redes sociales si existen
      baseUrl
    ]
  } : null;
  
  // Structured Data - Product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "PressurePro TPMS",
    "description": `Sistema de monitoreo de presión de ${countryConfig?.terminology?.tires || 'neumáticos'} en tiempo real`,
    "brand": {
      "@type": "Brand",
      "name": "PressurePro"
    },
    "category": "Tire Pressure Monitoring Systems",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": countryConfig?.currency || "USD",
      "areaServed": {
        "@type": "Country",
        "name": countryConfig?.name || "Latinoamérica"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Organization",
          "name": "Minera Los Pelambres"
        },
        "datePublished": "2025-11-15",
        "reviewBody": "Implementamos PressurePro en nuestra flota minera y hemos visto una reducción del 18% en costos de neumáticos. El monitoreo en tiempo real nos permite anticipar problemas antes de que ocurran.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Organization",
          "name": "Transportes Rápidos del Norte"
        },
        "datePublished": "2025-10-22",
        "reviewBody": "Sistema excelente para nuestra flotilla de camiones. La instalación fue sencilla y el ahorro en combustible ha sido notable. Altamente recomendado para transporte de carga.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Organization",
          "name": "Agrícola Santa Rosa"
        },
        "datePublished": "2025-09-10",
        "reviewBody": "Los sensores TPMS han mejorado significativamente la eficiencia de nuestra maquinaria agrícola. Menos paradas por problemas de neumáticos durante la cosecha.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        }
      }
    ]
  };

  const alternates = generateAlternates();
  const title = getTitle();
  const description = getDescription();

  return (
    <Head>
      {/* Título y descripción */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={getKeywords()} />
      
      {/* Canonical */}
      <link rel="canonical" href={getCanonicalUrl()} />
      
      {/* Hreflang alternates */}
      {alternates.map(({ hreflang, href }) => (
        <link 
          key={hreflang}
          rel="alternate" 
          hrefLang={hreflang} 
          href={href} 
        />
      ))}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={getCanonicalUrl()} />
      <meta property="og:image" content={`${baseUrl}${pageImage}`} />
      <meta property="og:locale" content={getOgLocale()} />
      <meta property="og:site_name" content="PressurePro LATAM" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${pageImage}`} />
      
      {/* Geo tags para SEO local */}
      {country && countryConfig && (
        <>
          <meta name="geo.region" content={country.toUpperCase()} />
          <meta name="geo.placename" content={countryConfig.name} />
        </>
      )}
      
      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </Head>
  );
};

export default DynamicSEO;
