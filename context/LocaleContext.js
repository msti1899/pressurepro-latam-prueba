import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import es from '../locales/es/translations';
import en from '../locales/en/translations';
import pt from '../locales/pt/translations';
import { features } from '../constants/data';
import { COUNTRIES, LANGUAGES } from '../config/countries';
import { WHATSAPP_NUMBER } from '../config/whatsapp';
import { getUserPreference, saveUserPreference } from '../lib/geolocation';

export const LocaleContext = createContext();

const baseTranslations = { es, en, pt };

/**
 * Proveedor de contexto para internacionalización con soporte de país
 * Maneja idioma, país, terminología regional y configuraciones específicas
 */
export const LocaleProvider = ({ children, initialLanguage = 'es', initialCountry = null }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [country, setCountry] = useState(initialCountry);
  const [countryConfig, setCountryConfig] = useState(
    initialCountry && COUNTRIES[initialCountry] ? COUNTRIES[initialCountry] : null
  );
  
  const router = useRouter();

  // Sincronizar con el locale de Next.js
  useEffect(() => {
    if (router.locale) {
      const locale = router.locale;
      const isCountry = COUNTRIES && COUNTRIES[locale];
      
      if (isCountry) {
        setCountry(locale);
        setLanguage(COUNTRIES[locale].language);
        setCountryConfig(COUNTRIES[locale]);
      } else if (LANGUAGES && LANGUAGES[locale]) {
        setCountry(null);
        setLanguage(locale);
        setCountryConfig(null);
      }
    }
  }, [router.locale]);

  // Cargar configuración del país cuando cambia
  useEffect(() => {
    if (country && COUNTRIES[country]) {
      setCountryConfig(COUNTRIES[country]);
    } else {
      setCountryConfig(null);
    }
  }, [country]);

  /**
   * Cambia el idioma y opcionalmente el país usando el sistema i18n de Next.js
   */
  const changeLanguage = useCallback((newLanguage, newCountry = null) => {
    const newLocale = newCountry || newLanguage;
    saveUserPreference(newLanguage, newCountry);
    
    // Usar el sistema de routing de Next.js con locale
    router.push(router.pathname, router.asPath, { locale: newLocale });
  }, [router]);

  /**
   * Cambia solo el país (mantiene o actualiza el idioma según el país)
   */
  const changeCountry = useCallback((newCountry) => {
    if (COUNTRIES[newCountry]) {
      const config = COUNTRIES[newCountry];
      saveUserPreference(config.language, newCountry);
      
      // Usar el sistema de routing de Next.js con locale
      router.push(router.pathname, router.asPath, { locale: newCountry });
    }
  }, [router]);

  /**
   * Obtiene un término localizado según la terminología del país
   * Ej: getLocalTerm('tires') -> 'Llantas' en México, 'Neumáticos' en Argentina
   */
  const getLocalTerm = useCallback((term) => {
    if (countryConfig?.terminology?.[term]) {
      return countryConfig.terminology[term];
    }
    // Valores por defecto en español
    const defaults = {
      tires: 'Neumáticos',
      truck: 'Camión',
      fleet: 'Flota'
    };
    return defaults[term] || term;
  }, [countryConfig]);

  /**
   * Obtiene el número de WhatsApp (centralizado)
   */
  const getWhatsAppNumber = useCallback(() => {
    return WHATSAPP_NUMBER;
  }, []);

  /**
   * Obtiene las industrias prioritarias para el país actual
   */
  const getPriorityIndustries = useCallback(() => {
    if (countryConfig?.priorityIndustries) {
      return countryConfig.priorityIndustries;
    }
    // Por defecto todas las industrias
    return ['mining', 'agriculture', 'forestry', 'port', 'industrial', 'transport'];
  }, [countryConfig]);

  /**
   * Obtiene las keywords SEO para el país actual
   */
  const getSeoKeywords = useCallback(() => {
    if (countryConfig?.seoKeywords) {
      return countryConfig.seoKeywords;
    }
    return ['monitoreo de neumáticos', 'TPMS', 'presión de neumáticos'];
  }, [countryConfig]);

  /**
   * Obtiene los clientes regionales para mostrar como prueba social
   */
  const getRegionalClients = useCallback(() => {
    if (countryConfig?.regionalClients?.length > 0) {
      return countryConfig.regionalClients;
    }
    return [];
  }, [countryConfig]);

  // Combinar traducciones base del idioma con features
  // features mantiene su estructura { es: [...], en: [...], pt: [...] }
  // para compatibilidad con código existente que accede como features[language]
  const currentTranslations = {
    ...baseTranslations[language],
    features: features
  };

  // Aplicar terminología local a las traducciones
  const localizedTranslations = applyLocalTerminology(currentTranslations, countryConfig);

  return (
    <LocaleContext.Provider value={{ 
      // Estado actual
      language, 
      country,
      countryConfig,
      translations: localizedTranslations,
      
      // Métodos de navegación
      changeLanguage,
      changeCountry,
      
      // Helpers de localización
      getLocalTerm,
      getWhatsAppNumber,
      getPriorityIndustries,
      getSeoKeywords,
      getRegionalClients,
      
      // Configuraciones disponibles
      availableLanguages: LANGUAGES,
      availableCountries: COUNTRIES
    }}>
      {children}
    </LocaleContext.Provider>
  );
};

/**
 * Aplica la terminología local a las traducciones
 * Reemplaza términos genéricos por los específicos del país
 */
function applyLocalTerminology(translations, countryConfig) {
  if (!countryConfig?.terminology) {
    return translations;
  }

  // Crear una copia profunda para no mutar el original
  const localized = JSON.parse(JSON.stringify(translations));
  
  // Por ahora retornamos las traducciones sin modificar
  // En una implementación más avanzada, podríamos hacer búsqueda y reemplazo
  // de términos en todas las cadenas de texto
  
  return localized;
}

/**
 * Hook personalizado para acceder al contexto de localización
 */
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

// Mantener compatibilidad con el contexto anterior
export { LocaleContext as LanguageContext, LocaleProvider as LanguageProvider };
