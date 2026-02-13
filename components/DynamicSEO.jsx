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
  
  // Generar título SEO (Meta Title) - Optimizado < 60 chars
  const getTitle = () => {
    if (pageTitle) return pageTitle;
    
    if (countryConfig?.seo?.title) {
      return countryConfig.seo.title;
    }
    
    if (country && COUNTRIES[country]) {
      const term = countryConfig?.terminology?.tires || 'Neumáticos';
      return `PressurePro ${COUNTRIES[country].name} | Monitoreo TPMS ${term}`;
    }
    
    return 'PressurePro LATAM | Monitoreo de Neumáticos TPMS';
  };
  
  // Generar descripción SEO con keywords optimizadas
  const getDescription = () => {
    if (pageDescription) return pageDescription;
    
    // Descripciones específicas por país con keywords (Optimizadas < 160 chars)
    const countryDescriptions = {
      'cl': `Monitoreo TPMS PressurePro en Chile para minería y transporte. Controle neumáticos en tiempo real, ahorre combustible y mejore la seguridad de su flota.`,
      'pe': `TPMS PressurePro Perú: Monitoreo de neumáticos para minería y carga. Tecnología de sensores en tiempo real para optimizar costos y seguridad vehicular.`,
      'mx': `PressurePro México: Sistema TPMS para monitoreo de llantas en flotillas. Reduzca costos y evite accidentes en carreteras con nuestros sensores inteligentes.`,
      'br': `TPMS PressurePro Brasil: Monitoramento de pneus para frotas e mineração. Economize combustível e aumente a segurança com tecnologia em tempo real.`,
      'ar': `Monitoreo de neumáticos PressurePro en Argentina. Solución TPMS para agro y transporte. Prevenga accidentes y controle la presión de su flota hoy.`,
      'co': `PressurePro Colombia: Monitoreo de llantas para transporte y carga. Sistema TPMS líder para optimizar costos operativos y seguridad en rutas.`,
      'uy': `TPMS PressurePro Uruguay: Monitoreo de neumáticos para agro y transporte forestal. Tecnología oficial para control de presión y temperatura.`,
      'bo': `PressurePro Bolivia: Sistema de monitoreo de neumáticos para minería y transporte. Controle su flota en tiempo real y reduzca costos operativos.`,
      'es': `PressurePro España: Monitorización TPMS certificada CE para flotas. Cumpla la normativa europea, ahorre combustible y mejore la seguridad vial.`,
      'us': `PressurePro TPMS: Real-time tire monitoring for commercial fleets. Reduce fuel costs and improve safety with our advanced sensor technology.`,
    };
    
    if (country && countryDescriptions[country]) {
      return countryDescriptions[country];
    }
    
    if (countryConfig?.seo?.description) {
      return countryConfig.seo.description;
    }

    if (language === 'pt') {
        return `Sistema TPMS PressurePro para monitoramento de pressão de pneus. Soluções para frotas comerciais em toda a América Latina.`;
    }
    
    if (language === 'en') {
        return `PressurePro TPMS: Real-time tire pressure monitoring system for commercial fleets across Latin America. Save fuel and improve safety.`;
    }
    
    // Default global abreviado
    return `Sistema TPMS PressurePro para monitoreo de neumáticos en tiempo real. Optimice su flota comercial, reduzca costos y mejore la seguridad en LATAM.`;
  };
  
  // Generar keywords
  const getKeywords = () => {
    const baseKeywords = getSeoKeywords();
    return baseKeywords.join(', ');
  };
  
  // Generar URL canónica
  const getCanonicalUrl = () => {
    // IMPORTANTE: Para producción, siempre usar el dominio real
    // Esto evita contenido duplicado si se accede desde vercel.app
    // El "error" en audits de staging es esperado y correcto
    const locale = country || language;
    // Asegurar que no haya doble slash // (excepto en https://)
    const cleanPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
    return `${baseUrl}/${locale}${cleanPath === '/' ? '' : cleanPath}`;
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
    const cleanPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
    const pathSuffix = cleanPath === '/' ? '' : cleanPath;
    
    // Versiones por idioma
    Object.keys(LANGUAGES).forEach(langCode => {
      alternates.push({
        hreflang: LANGUAGES[langCode].hreflang,
        href: `${baseUrl}/${langCode}${pathSuffix}`
      });
    });
    
    // Versiones por país
    Object.keys(COUNTRIES).forEach(countryCode => {
      alternates.push({
        hreflang: COUNTRIES[countryCode].hreflang,
        href: `${baseUrl}/${countryCode}${pathSuffix}`
      });
    });
    
    // x-default (Global fallback -> 'es' o una página específica de aterrizaje global)
    alternates.push({
      hreflang: 'x-default',
      href: `${baseUrl}/es${pathSuffix}`
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
