'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  detectUserCountry, 
  getRecommendedRoute, 
  saveUserPreference,
  dismissGeoBanner,
  isGeoBannerDismissed
} from '../lib/geolocation';
import { COUNTRIES, LANGUAGES } from '../config/countries';

const CountryBanner = ({ currentLanguage, currentCountry }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLocation = async () => {
      // Si ya tiene cookie de preferencia, no hacer nada
      const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith('NEXT_LOCALE='));
      if (hasCookie) {
        setIsLoading(false);
        return;
      }

      // Si ya descartó el banner, no molestar
      if (isGeoBannerDismissed()) {
        setIsLoading(false);
        return;
      }

      // Si ya está en un locale que no es el default (es), significa que
      // el middleware ya lo redirigió correctamente
      const currentLocale = router.locale || 'es';
      if (currentLocale !== 'es') {
        // Guardar cookie para que no pregunte de nuevo
        document.cookie = `NEXT_LOCALE=${currentLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
        setIsLoading(false);
        return;
      }

      // Estamos en /es (default) sin cookie → intentar detectar país
      try {
        const location = await detectUserCountry();
        
        if (location && location.countryCode) {
          const recommended = getRecommendedRoute(location.countryCode);
          
          // País no está en nuestra lista → mostrar picker
          if (!recommended) {
            setShowPicker(true);
            setIsLoading(false);
            return;
          }
          
          const targetLocale = recommended.country || recommended.language;
          
          // Si el país detectado ES España, guardar cookie y quedarse
          if (targetLocale === 'es') {
            document.cookie = `NEXT_LOCALE=es; path=/; max-age=${60 * 60 * 24 * 365}`;
            saveUserPreference('es', 'es');
            setIsLoading(false);
            return;
          }
          
          // País detectado y es diferente a España → redirigir automáticamente
          document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
          saveUserPreference(recommended.language, recommended.country);
          router.push(router.pathname, router.asPath, { locale: targetLocale });
          return;
        }
        
        // No se pudo detectar el país → mostrar selector para elegir
        setShowPicker(true);
      } catch (error) {
        console.error('Error en detección de ubicación:', error);
        // Error en la detección → mostrar selector
        setShowPicker(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectCountry = (countryCode) => {
    document.cookie = `NEXT_LOCALE=${countryCode}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const config = COUNTRIES[countryCode];
    saveUserPreference(config?.language || 'es', countryCode);
    dismissGeoBanner();
    setShowPicker(false);
    router.push(router.pathname, router.asPath, { locale: countryCode });
  };

  if (isLoading || !showPicker) return null;

  // Ordenar países alfabéticamente
  const sortedCountries = Object.values(COUNTRIES)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        {/* Popup */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1A232E] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <img 
                src="/pressurepro-latam-logo.png" 
                alt="PressurePro LATAM" 
                className="h-[28px] w-auto object-contain"
              />
            </div>
            <p className="text-white/90 text-sm mt-2 font-medium">
              Selecciona tu país
            </p>
          </div>

          {/* Grid de países */}
          <div className="px-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              {sortedCountries.map((country) => (
                <motion.button
                  key={country.code}
                  onClick={() => handleSelectCountry(country.code)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-purple-500/30 transition-all"
                >
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-[36px] h-[25px] object-cover rounded-[2px] shadow-sm"
                  />
                  <span className="text-[11px] text-white/70 font-medium whitespace-nowrap">
                    {country.name}
                  </span>
                </motion.button>
              ))}
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountryBanner;
