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
  
  // Generar descripción SEO
  const getDescription = () => {
    if (pageDescription) return pageDescription;
    
    if (countryConfig?.seo?.description) {
      return countryConfig.seo.description;
    }
    
    return translations?.about?.text?.substring(0, 160) || 
      'Sistema de monitoreo de presión y temperatura de neumáticos en tiempo real para flotas.';
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
    }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </Head>
  );
};

export default DynamicSEO;
