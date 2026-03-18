'use client';
import Head from 'next/head';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES } from '../config/countries';
import { buildAlternates, shouldNoIndexAlternateLanguage } from '../config/localization';
import { DEFAULT_CURRENCY, DEFAULT_OG_LOCALE, getBaseUrl } from '../config/runtime';

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
    marketContent,
    getSeoKeywords,
    getWhatsAppNumber,
  } = useLocale();

  const availableLanguageMap = {
    es: 'Spanish',
    en: 'English',
    pt: 'Portuguese',
  };
  
  const baseUrl = getBaseUrl();
  
  // Generar título SEO (Meta Title) - Optimizado < 60 chars
  const getTitle = () => {
    if (pageTitle) return pageTitle;
    
    if (countryConfig?.seo?.title) {
      return countryConfig.seo.title;
    }

    if (marketContent?.seo?.homeTitle) {
      return marketContent.seo.homeTitle;
    }

    return '';
  };
  
  // Generar descripción SEO con keywords optimizadas
  const getDescription = () => {
    if (pageDescription) return pageDescription;

    if (marketContent?.seo?.homeDescription) {
      return marketContent.seo.homeDescription;
    }
    
    if (countryConfig?.seo?.description) {
      return countryConfig.seo.description;
    }

    return '';
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
    return localeMap[language] || DEFAULT_OG_LOCALE;
  };
  
  // Generar hreflang alternates
  const generateAlternates = () => buildAlternates(baseUrl, pagePath);
  
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
        "name": countryConfig?.name || marketContent?.seo?.regionName
      }
    ] : Object.values(COUNTRIES).map(c => ({
      "@type": "Country",
      "name": c.name
    })),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": `+${getWhatsAppNumber()}`,
      "areaServed": countryConfig?.name || marketContent?.seo?.regionName,
      "availableLanguage": availableLanguageMap[language]
    }
  };
  
  // Structured Data - LocalBusiness (solo si es país específico)
  const localBusinessSchema = country ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `PressurePro ${countryConfig?.name ?? marketContent?.seo?.regionName ?? ''}`,
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
      ...(country === 'epa' && { "latitude": "40.4168", "longitude": "-3.7038", "addressLocality": "Madrid" }),
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": `+${getWhatsAppNumber()}`,
      "areaServed": countryConfig?.name,
      "availableLanguage": availableLanguageMap[language]
    },
    "sameAs": [
      // Agregar redes sociales si existen
      baseUrl
    ]
  } : null;
  
  // Structured Data - Product
  const productReviews = marketContent?.seo?.productReviews || [];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "PressurePro TPMS",
    "description": (marketContent?.seo?.productDescriptionTemplate ?? '').replace('{tireTerm}', countryConfig?.terminology?.tires ?? ''),
    "brand": {
      "@type": "Brand",
      "name": "PressurePro"
    },
    "category": "Tire Pressure Monitoring Systems",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": countryConfig?.currency || DEFAULT_CURRENCY,
      "areaServed": {
        "@type": "Country",
        "name": countryConfig?.name || marketContent?.seo?.regionName
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": productReviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Organization",
        "name": review.author,
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.ratingValue,
        "bestRating": "5",
      },
    }))
  };

  const alternates = generateAlternates();
  const title = getTitle();
  const description = getDescription();
  const shouldNoIndex = shouldNoIndexAlternateLanguage(language, country);

  return (
    <Head>
      {/* Título y descripción */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={getKeywords()} />
      {shouldNoIndex && (
        <>
          <meta name="robots" content="noindex,follow" />
          <meta name="googlebot" content="noindex,follow" />
        </>
      )}
      
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
