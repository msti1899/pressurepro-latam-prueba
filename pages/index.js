import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '../sections';
import { Navbar, Footer, CountryBanner, WhatsAppButton } from '../components';
import DynamicSEO from '../components/DynamicSEO';
import { COUNTRIES, LANGUAGES } from '../config/countries';
import { scrollToSection } from '../utils/motion';
import { DEFAULT_LOCALE } from '../config/runtime';

// Lazy load secciones below-the-fold con dynamic imports
const About = dynamic(() => import('../sections/About'), { loading: () => <div className="h-screen" /> });
const Explore = dynamic(() => import('../sections/Explore'), { loading: () => <div className="h-screen" /> });
const GetStarted = dynamic(() => import('../sections/GetStarted'), { loading: () => <div className="h-96" /> });
const WhatsNew = dynamic(() => import('../sections/WhatsNew'), { loading: () => <div className="h-screen" /> });
const World = dynamic(() => import('../sections/World'), { loading: () => <div className="h-[600px]" /> });
const Insights = dynamic(() => import('../sections/Insights'), { loading: () => <div className="h-screen" /> });
const Feedback = dynamic(() => import('../sections/Feedback'), { loading: () => <div className="h-screen" /> });
const ROICalculator = dynamic(() => import('../sections/ROICalculator'), { loading: () => <div className="h-screen" /> });
const DeviceShowcase = dynamic(() => import('../sections/DeviceShowcase'), { loading: () => <div className="h-screen" /> });
const FeaturedProjects = dynamic(() => import('../sections/FeaturedProjects'), { loading: () => <div className="h-96" /> });

/**
 * Página principal que se renderiza para todas las rutas de locale
 * Next.js i18n maneja automáticamente las rutas /es, /en, /pt, /mx, /ar, etc.
 */
const Page = () => {
  const router = useRouter();
  const locale = router.locale || DEFAULT_LOCALE;
  
  // Determinar si es un país o un idioma
  const isCountry = COUNTRIES && COUNTRIES[locale];
  const language = isCountry ? COUNTRIES[locale].language : (LANGUAGES && LANGUAGES[locale] ? locale : DEFAULT_LOCALE);
  const country = isCountry ? locale : null;
  const countryConfig = isCountry ? COUNTRIES[locale] : null;

  // Si la URL tiene un hash (ej: /#about), hacer scroll a esa sección
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Pequeño delay para que las secciones se rendericen primero
      const timer = setTimeout(() => {
        scrollToSection(hash);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* SEO dinámico con hreflang y structured data */}
      <DynamicSEO />
      
      {/* Banner de detección de país */}
      <CountryBanner currentLanguage={language} currentCountry={country} />
      
      <div className="bg-primary-black tech-bg overflow-hidden">
        <Navbar />
        <Hero />
        <div className="relative">
          <About />
          <div className="gradient-03 z-0" />
          <Explore />
        </div>
        <div className="relative">
          <GetStarted />
          <div className="gradient-04 z-0" />
          <WhatsNew />
        </div>
        <World />
        <div className="relative">
          <Insights />
          <div className="gradient-04 z-0" />
          <Feedback />
        </div>
        <ROICalculator />
        <DeviceShowcase />
        <FeaturedProjects />
        <Footer />
      </div>
      
      {/* Botón flotante de WhatsApp */}
      <WhatsAppButton />
    </>
  );
};

export default Page;
