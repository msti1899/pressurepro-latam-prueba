'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LanguageContext } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { navVariants } from '../utils/motion';
import { scrollToSection } from '../utils/motion';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES } from '../config/countries';
import CountrySlider from './CountrySlider';

/**
 * Componente de navegación principal de la aplicación
 * Incluye selector de idiomas, selector de país (slide) y menú desplegable de secciones
 */
const Navbar = () => {
  // ----- CONTEXTOS Y ESTADOS -----
  const { language, changeLanguage, translations } = useContext(LanguageContext);
  
  // Obtener país del contexto de locale
  const localeCtx = useLocale();
  const currentCountry = localeCtx?.country;
  const countryFlag = currentCountry && COUNTRIES?.[currentCountry]?.flag;
  
  // Estado para el slider de países
  const [isCountrySliderOpen, setIsCountrySliderOpen] = useState(false);
  
  // Estados para controlar la UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  
  // Referencias
  const navRef = useRef(null);
  
  // ----- CONSTANTES Y CONFIGURACIÓN -----
  // Altura fija de la navbar en píxeles
  const FIXED_NAV_HEIGHT = 95;
  // Altura adaptada para móviles (elimina el espacio no deseado)
  const MOBILE_NAV_HEIGHT = 77; // Ajustado para eliminar el gap de 18px
  
  // Mapeo de idiomas a imágenes de banderas
  const FLAG_IMAGES = {
    es: 'https://flagcdn.com/es.svg',
    en: 'https://flagcdn.com/us.svg',
    pt: 'https://flagcdn.com/br.svg'
  };
  
  // Secciones del sitio para navegación
  const sections = [
    { id: 'about', name: translations?.navbar?.about || 'Acerca de' },
    { id: 'mercados', name: translations?.navbar?.explore || 'Mercados' },
    { id: 'getstarted', name: translations?.navbar?.getStarted || 'Comenzar' },
    { id: 'whatsnew', name: translations?.navbar?.whatsNew || 'Novedades' },
    { id: 'world', name: translations?.navbar?.world || 'Ubicaciones' },
    { id: 'insights', name: translations?.navbar?.insights || 'Insights' },
    { id: 'faq', name: 'FAQ', isExternal: true },
    { id: 'feedback', name: translations?.navbar?.feedback || 'Contacto' },
  ];

  // ----- EFECTOS Y EVENTOS -----
  // Efecto para establecer altura fija de la navbar
  useEffect(() => {
    setNavHeight(FIXED_NAV_HEIGHT);
    
    const handleResize = () => {
      setNavHeight(FIXED_NAV_HEIGHT);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efecto para detectar el scroll y aplicar estilos
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para cerrar el menú de idiomas al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageMenuOpen && !event.target.closest('.language-selector')) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageMenuOpen]);

  // ----- ANIMACIONES Y VARIANTES -----
  // Variantes para animaciones del menú principal
  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.05
      }
    }
  };

  // Variantes para los elementos del menú
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Variantes para el menú de idiomas
  const languageMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const languageItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  };

  // ----- MANEJADORES DE EVENTOS -----
  /**
   * Maneja la selección de idioma
   * @param {string} selectedLanguage - Código del idioma seleccionado
   */
  const handleLanguageChange = (selectedLanguage) => {
    changeLanguage(selectedLanguage);
    setIsLanguageMenuOpen(false);
  };

  // Router para detectar la ruta actual
  const router = useRouter();

  /**
   * Maneja la navegación entre secciones
   * Si estamos en la home, hace scroll directo.
   * Si estamos en otra página (ej. industrias), navega a la home con hash.
   * @param {string} sectionId - ID de la sección a la que navegar
   */
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Verificar si estamos en la página principal
    const isHome = router.pathname === '/' || router.pathname === '/index';
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      // Navegar a la home con el hash para que haga scroll al llegar
      router.push(`/#${sectionId}`);
    }
  };

  // ----- COMPONENTES INTERNOS -----
  /**
   * Componente para el selector de idiomas
   */
  const LanguageSelector = () => (
    <div className="language-selector relative">
      <button
        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer group backdrop-blur-sm"
        aria-label={`Cambiar idioma. Idioma actual: ${language === 'es' ? 'Español' : language === 'en' ? 'English' : 'Português'}`}
        aria-expanded={isLanguageMenuOpen}
        aria-haspopup="listbox"
      >
        <span className="text-[11px] sm:text-[12px] text-white/90 font-medium tracking-wider uppercase group-hover:text-white transition-colors">
          {language === 'es' ? 'ES' : language === 'en' ? 'EN' : 'PT'}
        </span>
        
        <motion.div 
          className="flex items-center justify-center h-4 opacity-70 group-hover:opacity-100 transition-opacity"
          animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="8" 
            height="5" 
            viewBox="0 0 8 5" 
            className="sm:w-[10px] sm:h-[6px]"
            fill="none"
          >
            <path 
              d="M1 1L4 4L7 1" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isLanguageMenuOpen && (
          <motion.div
            className="absolute left-0 top-full mt-2 bg-primary-black/80 backdrop-blur-md p-2 rounded-lg border border-white/10 shadow-lg"
            variants={languageMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="listbox"
            aria-label="Seleccionar idioma"
          >
            {Object.entries(FLAG_IMAGES).map(([langCode, flagPath]) => (
              <motion.button
                key={langCode}
                onClick={() => handleLanguageChange(langCode)}
                className={`w-full my-1 px-3 py-1.5 min-w-[44px] min-h-[44px] flex items-center justify-start gap-2 rounded-md ${language === langCode ? 'bg-white/10 opacity-100' : 'opacity-70'} hover:bg-white/5 hover:opacity-100 transition-all`}
                variants={languageItemVariants}
                whileHover={{ scale: 1.02 }}
                role="option"
                aria-selected={language === langCode}
                aria-label={langCode === 'es' ? 'Español' : langCode === 'en' ? 'English' : 'Português'}
              >
                {/* Bandera eliminada del dropdown de idiomas */}
                <span className="text-[14px] font-medium text-white uppercase tracking-wider">
                  {langCode === 'es' ? 'ES' : langCode === 'en' ? 'EN' : 'PT'}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Estado para detectar si es móvil (evita acceso a window en SSR)
  const [isMobileNav, setIsMobileNav] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobileNav(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Componente para el menú de navegación
   */
  const NavigationMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          id="navigation-menu"
          role="navigation"
          aria-label="Menú principal"
          className="fixed left-0 right-0 z-40"
          style={{ 
            top: isMobileNav ? `${MOBILE_NAV_HEIGHT}px` : `${FIXED_NAV_HEIGHT}px` 
          }}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="px-2 sm:px-8">
            <div 
              className="rounded-2xl overflow-hidden border border-gray-600/30 shadow-xl backdrop-blur-xl bg-primary-black/70 2xl:max-w-[1280px] w-full mx-auto"
              style={{
                WebkitBackdropFilter: 'blur(16px)',
                marginTop: '0px',
              }}
            >
              <div className="py-4 px-2">
                {sections.map((section) => (
                  section.isExternal ? (
                    <motion.div key={section.id} variants={itemVariants}>
                      <Link
                        href="/faq"
                        className="flex items-center py-3 px-4 text-white text-[16px] sm:text-[18px] hover:bg-white/10 rounded-lg transition-all duration-200 font-semibold min-h-[44px]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {section.name}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={section.id}
                      href={`#${section.id}`}
                      variants={itemVariants}
                      onClick={(e) => handleNavigation(e, section.id)}
                      className="flex items-center py-3 px-4 text-white text-[16px] sm:text-[18px] hover:bg-white/10 rounded-lg transition-all duration-200 font-semibold min-h-[44px]"
                    >
                      {section.name}
                    </motion.a>
                  )
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ----- RENDERIZADO PRINCIPAL -----
  return (
    <>
      {/* Barra de navegación principal */}
      <motion.nav
        ref={navRef}
        variants={navVariants}
        initial='hidden'
        whileInView='show'
        style={{
          height: `${FIXED_NAV_HEIGHT}px`,
          display: "flex",
          alignItems: "center"
        }}
        className={`sm:px-16 px-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-primary-black/80 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/60 to-transparent'}`}
      >
        {/* Gradiente de fondo */}
        <div className={`absolute w-[50%] inset-0 gradient-01 ${hasScrolled ? 'opacity-30' : 'opacity-100'}`} />
        
        {/* Contenido de la barra de navegación */}
        <div className='2xl:max-w-[1280px] w-full mx-auto flex justify-between items-center'>
          
          {/* LEFT: Logo principal (más grande y limpio) */}
          <Link href="/" className="relative z-40">
            <img
              src="/pressurepro-latam-logo.png"
              alt="Pressure Pro LATAM"
              className="h-[48px] sm:h-[60px] w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
            />
          </Link>
          
          {/* RIGHT: Grupo de Acciones (País + Idioma + Menú) */}
          <div className="flex items-center gap-3 sm:gap-5 relative z-40">
            
            {/* 1. Selector de País (Badge) */}
            <div className="relative flex items-center">
              <button
                onClick={() => setIsCountrySliderOpen(!isCountrySliderOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer group backdrop-blur-sm"
                aria-label={`Seleccionar país. País actual: ${currentCountry ? (COUNTRIES[currentCountry]?.name || '') : 'No seleccionado'}`}
                aria-expanded={isCountrySliderOpen}
              >
                {countryFlag ? (
                  <img
                    src={countryFlag}
                    alt={COUNTRIES[currentCountry]?.name || ''}
                    className="w-[16px] h-[12px] sm:w-[20px] sm:h-[15px] rounded-[1px] object-cover shadow-sm"
                  />
                ) : (
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="opacity-40">
                    <rect width="14" height="10" rx="1" fill="white" fillOpacity="0.3"/>
                  </svg>
                )}
                <span className="hidden sm:block text-[11px] sm:text-[12px] text-white/90 font-medium tracking-wider uppercase group-hover:text-white transition-colors">
                  {currentCountry ? (COUNTRIES[currentCountry]?.name || '') : (language === 'en' ? 'English' : language === 'pt' ? 'Português' : 'España')}
                </span>
                <motion.div
                  animate={{ rotate: isCountrySliderOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="10" height="6" viewBox="0 0 8 5" fill="none">
                    <path d="M1 1L4 4L7 1" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </button>
              
              {/* Country Slider injection */}
              <CountrySlider 
                isOpen={isCountrySliderOpen} 
                onClose={() => setIsCountrySliderOpen(false)} 
              />
            </div>

            {/* 2. Selector de Idioma */}
            <LanguageSelector />
            
            {/* 3. Botón de menú */}
            <motion.div
              className="relative"
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] bg-white/5 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
                aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
                aria-expanded={isMenuOpen}
                aria-controls="navigation-menu"
              >
                <motion.img
                  src='/menu.svg'
                  alt='menu'
                  className='w-[24px] h-[24px] object-contain'
                  animate={{
                    rotate: isMenuOpen ? 90 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Menú desplegable de navegación */}
      <NavigationMenu />
    </>
  );
};

export default Navbar;