'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES, LANGUAGES } from '../config/countries';

/**
 * Selector de país/idioma avanzado para la navbar
 * Muestra banderas y permite cambiar entre países e idiomas
 */
const CountryLanguageSelector = () => {
  const { 
    language, 
    country, 
    countryConfig,
    changeLanguage, 
    changeCountry 
  } = useLocale();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('countries'); // 'countries' | 'languages'
  const selectorRef = useRef(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Obtener la bandera actual
  const getCurrentFlag = () => {
    if (country && COUNTRIES[country]) {
      return COUNTRIES[country].flag;
    }
    if (LANGUAGES[language]) {
      return LANGUAGES[language].flag;
    }
    return 'https://flagcdn.com/es.svg';
  };

  // Obtener el nombre actual
  const getCurrentName = () => {
    if (country && COUNTRIES[country]) {
      return COUNTRIES[country].name;
    }
    if (LANGUAGES[language]) {
      return LANGUAGES[language].name;
    }
    return 'Español';
  };

  // Agrupar países por idioma
  const countriesByLanguage = {
    es: Object.entries(COUNTRIES).filter(([_, c]) => c.language === 'es'),
    pt: Object.entries(COUNTRIES).filter(([_, c]) => c.language === 'pt'),
    en: [] // No hay países específicos en inglés aún
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.15 }
    }
  };

  const handleCountrySelect = (countryCode) => {
    changeCountry(countryCode);
    setIsOpen(false);
  };

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode, null);
    setIsOpen(false);
  };

  return (
    <div ref={selectorRef} className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
      >
        <img
          src={getCurrentFlag()}
          alt={getCurrentName()}
          className="w-6 h-6 rounded-sm object-cover"
        />
        <span className="text-white text-sm font-medium hidden sm:inline">
          {getCurrentName()}
        </span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-white/70"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-2 w-72 bg-[#1A232E] rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
          >
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('countries')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'countries' 
                    ? 'text-white bg-white/5 border-b-2 border-purple-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🌎 Países
              </button>
              <button
                onClick={() => setActiveTab('languages')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'languages' 
                    ? 'text-white bg-white/5 border-b-2 border-purple-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🗣️ Idiomas
              </button>
            </div>

            {/* Contenido */}
            <div className="max-h-80 overflow-y-auto">
              {activeTab === 'countries' ? (
                <div className="p-2">
                  {/* Países de habla hispana */}
                  <div className="mb-3">
                    <p className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">
                      Español
                    </p>
                    {countriesByLanguage.es.map(([code, config]) => (
                      <button
                        key={code}
                        onClick={() => handleCountrySelect(code)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          country === code 
                            ? 'bg-purple-500/20 text-white' 
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        <img
                          src={config.flag}
                          alt={config.name}
                          className="w-6 h-5 rounded-sm object-cover"
                        />
                        <span className="flex-1 text-left text-sm">{config.name}</span>
                        {country === code && (
                          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Países de habla portuguesa */}
                  {countriesByLanguage.pt.length > 0 && (
                    <div>
                      <p className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">
                        Português
                      </p>
                      {countriesByLanguage.pt.map(([code, config]) => (
                        <button
                          key={code}
                          onClick={() => handleCountrySelect(code)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                            country === code 
                              ? 'bg-purple-500/20 text-white' 
                              : 'hover:bg-white/5 text-gray-300'
                          }`}
                        >
                          <img
                            src={config.flag}
                            alt={config.name}
                            className="w-6 h-5 rounded-sm object-cover"
                          />
                          <span className="flex-1 text-left text-sm">{config.name}</span>
                          {country === code && (
                            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-2">
                  {Object.entries(LANGUAGES).map(([code, config]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageSelect(code)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        language === code && !country
                          ? 'bg-purple-500/20 text-white' 
                          : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <img
                        src={config.flag}
                        alt={config.name}
                        className="w-6 h-5 rounded-sm object-cover"
                      />
                      <span className="flex-1 text-left text-sm">{config.name}</span>
                      {language === code && !country && (
                        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryLanguageSelector;
