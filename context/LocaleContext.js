import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';

import { COUNTRIES, LANGUAGES } from '../config/countries';
import { WHATSAPP_NUMBER } from '../config/whatsapp';
import { getUserPreference, saveUserPreference } from '../lib/geolocation';
import countryOverrides from '../config/countryOverrides';
import {
  resolveLocaleState,
  getTranslationsForMarket,
  getMarketContentForLocale,
} from '../config/localization';

export const LocaleContext = createContext();

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
      const { language: nextLanguage, country: nextCountry } = resolveLocaleState(router.locale);
      const preference = getUserPreference();

      let effectiveLanguage = nextLanguage;

      // Si estamos en un locale de idioma global (/en, /pt, /es),
      // restaurar país preferido para mantener el contexto de mercado.
      let effectiveCountry = nextCountry;
      if (!effectiveCountry && LANGUAGES[router.locale]) {
        const preferredCountry = preference?.country;
        if (preferredCountry && COUNTRIES[preferredCountry]) {
          effectiveCountry = preferredCountry;
        }
      }

      // En rutas de país, mantener país en URL y usar el idioma guardado
      // solo como preferencia UX del usuario.
      if (effectiveCountry && preference?.country === effectiveCountry && LANGUAGES[preference?.language]) {
        effectiveLanguage = preference.language;
      }

      setLanguage(effectiveLanguage);
      setCountry(effectiveCountry);
      setCountryConfig(effectiveCountry ? COUNTRIES[effectiveCountry] : null);
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

  const currentTranslations = getTranslationsForMarket(language, country);
  const marketContent = getMarketContentForLocale(language, country);

  // Aplicar overrides por país (textos específicos por región)
  const withOverrides = applyCountryOverrides(currentTranslations, country, language);

  // Aplicar terminología local a las traducciones
  const localizedTranslations = applyLocalTerminology(withOverrides, countryConfig);

  /**
   * Cambia el idioma y opcionalmente el país usando el sistema i18n de Next.js
   */
  const changeLanguage = useCallback((newLanguage, newCountry = country) => {
    // Mantener la URL del país cuando existe contexto de mercado.
    // El idioma alternativo se guarda como preferencia UX.
    const effectiveCountry = newCountry || country;
    saveUserPreference(newLanguage, effectiveCountry);

    setLanguage(newLanguage);

    if (effectiveCountry && COUNTRIES[effectiveCountry]) {
      setCountry(effectiveCountry);
      setCountryConfig(COUNTRIES[effectiveCountry]);
      return;
    }

    // En ausencia de país, conservar comportamiento por locale de idioma.
    router.push(router.pathname, router.asPath, { locale: newLanguage });
  }, [country, router]);

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
    return (countryConfig?.whatsapp || `+${WHATSAPP_NUMBER}`).replace('+', '');
  }, [countryConfig]);

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
    if (localizedTranslations?.seo?.keywords && Array.isArray(localizedTranslations.seo.keywords)) {
      return localizedTranslations.seo.keywords;
    }
    return ['monitoreo de neumáticos', 'TPMS', 'presión de neumáticos'];
  }, [countryConfig, localizedTranslations]);

  /**
   * Obtiene los clientes regionales para mostrar como prueba social
   */
  const getRegionalClients = useCallback(() => {
    if (countryConfig?.regionalClients?.length > 0) {
      return countryConfig.regionalClients;
    }
    return [];
  }, [countryConfig]);

  return (
    <LocaleContext.Provider value={{
      // Estado actual
      language,
      country,
      countryConfig,
      translations: localizedTranslations,
      marketContent,

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
 * Aplica overrides de contenido por país
 * Mezcla recursivamente los overrides sobre las traducciones base
 * Solo sobreescribe las claves que existen en el override
 */
function applyCountryOverrides(translations, countryCode, languageCode) {
  if (!countryCode || !countryOverrides[countryCode]) {
    return translations;
  }

  const countryLanguage = COUNTRIES[countryCode]?.language;
  if (!countryLanguage || languageCode !== countryLanguage) {
    return translations;
  }

  const overrides = countryOverrides[countryCode];

  // Deep merge: override sobreescribe solo las claves que trae
  return deepMerge(
    JSON.parse(JSON.stringify(translations)),
    overrides
  );
}

/**
 * Merge profundo de dos objetos
 * target = traducciones base, source = overrides del país
 */
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

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
    console.warn('useLocale must be used within a LocaleProvider');
    // Return default context to prevent crash during build/SSR specific edge cases
    return {
      language: 'es',
      country: null,
      countryConfig: null,
      translations: getTranslationsForMarket('es', null),
      marketContent: getMarketContentForLocale('es', null),
      changeLanguage: () => { },
      changeCountry: () => { },
      getLocalTerm: (t) => t,
      getWhatsAppNumber: () => WHATSAPP_NUMBER,
      getPriorityIndustries: () => [],
      getSeoKeywords: () => [],
      getRegionalClients: () => [],
      availableLanguages: LANGUAGES,
      availableCountries: COUNTRIES
    };
  }
  return context;
};

// Mantener compatibilidad con el contexto anterior
export { LocaleContext as LanguageContext, LocaleProvider as LanguageProvider };
