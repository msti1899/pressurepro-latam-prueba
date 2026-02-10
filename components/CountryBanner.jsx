'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  detectUserCountry, 
  getRecommendedRoute, 
  saveUserPreference,
  getUserPreference,
  dismissGeoBanner,
  isGeoBannerDismissed
} from '../lib/geolocation';
import { COUNTRIES, LANGUAGES } from '../config/countries';

const CountryBanner = ({ currentLanguage, currentCountry }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [recommendedRoute, setRecommendedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLocation = async () => {
      // Verificar si ya se descartó el banner en esta sesión
      if (isGeoBannerDismissed()) {
        setIsLoading(false);
        return;
      }

      // Si el usuario ya eligió un país (tiene cookie NEXT_LOCALE), no molestar
      const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith('NEXT_LOCALE='));
      if (hasCookie) {
        setIsLoading(false);
        return;
      }

      try {
        const location = await detectUserCountry();
        
        if (location && location.countryCode) {
          const recommended = getRecommendedRoute(location.countryCode);
          
          // Locale actual del router
          const currentLocale = router.locale || 'es';
          
          // No mostrar banner si:
          // 1. Ya estamos en el locale exacto recomendado
          if (recommended.country === currentLocale || recommended.language === currentLocale) {
            setIsLoading(false);
            return;
          }
          
          // 2. El locale actual es un país del mismo idioma que el recomendado
          //    (ej: estás en /mx y se detecta /co — ambos español, no molestar)
          const currentLang = COUNTRIES[currentLocale]?.language || 
                             (LANGUAGES[currentLocale] ? currentLocale : null);
          const recommendedLang = recommended.language;
          
          if (currentLang && recommendedLang && currentLang === recommendedLang) {
            setIsLoading(false);
            return;
          }
          
          // Solo mostrar si el idioma es diferente (ej: estás en /en y se detecta Uruguay/es)
          setDetectedLocation(location);
          setRecommendedRoute(recommended);
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error en detección de ubicación:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = () => {
    const newLocale = recommendedRoute.country || recommendedRoute.language;
    saveUserPreference(recommendedRoute.language, recommendedRoute.country);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setShowBanner(false);
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  const handleDismiss = () => {
    dismissGeoBanner();
    saveUserPreference(currentLanguage, currentCountry);
    setShowBanner(false);
  };

  const getCountryFlag = () => {
    if (recommendedRoute?.country && COUNTRIES[recommendedRoute.country]) {
      return COUNTRIES[recommendedRoute.country].flag;
    }
    if (recommendedRoute?.language && LANGUAGES[recommendedRoute.language]) {
      return LANGUAGES[recommendedRoute.language].flag;
    }
    return 'https://flagcdn.com/es.svg';
  };

  const getMessage = () => {
    const messages = {
      es: {
        detected: `Detectamos que estás en ${detectedLocation?.country || 'Latinoamérica'}`,
        suggestion: recommendedRoute?.countryName 
          ? `¿Te gustaría ver la versión para ${recommendedRoute.countryName}?`
          : '¿Te gustaría ver el contenido en español?',
        accept: 'Sí, cambiar',
        dismiss: 'No, gracias'
      },
      en: {
        detected: `We detected you're in ${detectedLocation?.country || 'your region'}`,
        suggestion: 'Would you like to see the English version?',
        accept: 'Yes, switch',
        dismiss: 'No, thanks'
      },
      pt: {
        detected: `Detectamos que você está em ${detectedLocation?.country || 'sua região'}`,
        suggestion: recommendedRoute?.countryName 
          ? `Gostaria de ver a versão para ${recommendedRoute.countryName}?`
          : 'Gostaria de ver o conteúdo em português?',
        accept: 'Sim, mudar',
        dismiss: 'Não, obrigado'
      }
    };

    return messages[currentLanguage] || messages.es;
  };

  if (isLoading || !showBanner) return null;

  const message = getMessage();

  return (
    <AnimatePresence>
      {/* Overlay difuminado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleDismiss}
      >
        {/* Popup */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1A232E] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-6 py-4 flex items-center gap-3">
            <img 
              src={getCountryFlag()} 
              alt="flag" 
              className="w-10 h-7 object-cover rounded shadow-md"
            />
            <div className="text-white">
              <p className="text-base font-semibold leading-tight">{message.detected}</p>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="px-6 py-5">
            <p className="text-secondary-white text-sm mb-6">
              {message.suggestion}
            </p>

            {/* Botones */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleAccept}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all active:scale-[0.98]"
              >
                {message.accept}
              </button>
              <button
                onClick={handleDismiss}
                className="w-full py-2.5 bg-white/5 border border-white/10 text-white/70 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
              >
                {message.dismiss}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountryBanner;
