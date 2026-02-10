// Servicio de geolocalización para detección automática de país

import { ISO_TO_COUNTRY, COUNTRIES, LANGUAGES } from '../config/countries';

/**
 * Detecta el país del usuario usando una API de geolocalización gratuita
 * @returns {Promise<{countryCode: string, country: string, city: string}>}
 */
export const detectUserCountry = async () => {
  try {
    // Usamos ipapi.co que es gratuito y confiable
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Error en la respuesta de geolocalización');
    }
    
    const data = await response.json();
    
    return {
      countryCode: data.country_code, // Código ISO (ej: "MX", "AR", "BR")
      country: data.country_name,
      city: data.city,
      region: data.region,
      timezone: data.timezone
    };
  } catch (error) {
    console.error('Error detectando país:', error);
    return null;
  }
};

/**
 * Obtiene la configuración del país basada en el código ISO
 * @param {string} isoCode - Código ISO del país (ej: "MX", "AR")
 * @returns {Object|null} - Configuración del país o null
 */
export const getCountryConfig = (isoCode) => {
  const countryKey = ISO_TO_COUNTRY[isoCode];
  
  if (countryKey && COUNTRIES[countryKey]) {
    return COUNTRIES[countryKey];
  }
  
  return null;
};

/**
 * Determina la mejor ruta para redirigir al usuario
 * @param {string} isoCode - Código ISO del país detectado
 * @returns {Object} - { path: string, language: string, country: string|null }
 */
export const getRecommendedRoute = (isoCode) => {
  const countryKey = ISO_TO_COUNTRY[isoCode];
  
  if (!countryKey) {
    // País no mapeado, por defecto español
    return {
      path: '/es',
      language: 'es',
      country: 'es',
      countryName: 'España'
    };
  }

  // Si el key corresponde a un país en COUNTRIES
  if (COUNTRIES[countryKey]) {
    return {
      path: `/${countryKey}`,
      language: COUNTRIES[countryKey].language,
      country: countryKey,
      countryName: COUNTRIES[countryKey].name
    };
  }
  
  // Si el key corresponde a un idioma en LANGUAGES (ej: 'en', 'pt')
  if (LANGUAGES[countryKey]) {
    return {
      path: `/${countryKey}`,
      language: countryKey,
      country: null,
      countryName: null
    };
  }
  
  // Fallback por defecto: español (España)
  return {
    path: '/es',
    language: 'es',
    country: 'es',
    countryName: 'España'
  };
};

/**
 * Guarda la preferencia del usuario en localStorage
 * @param {string} language - Código de idioma
 * @param {string|null} country - Código de país
 */
export const saveUserPreference = (language, country = null) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferredLanguage', language);
    if (country) {
      localStorage.setItem('preferredCountry', country);
    }
    localStorage.setItem('geoPreferenceDismissed', 'false');
  }
};

/**
 * Obtiene la preferencia guardada del usuario
 * @returns {Object|null} - { language: string, country: string|null }
 */
export const getUserPreference = () => {
  if (typeof window === 'undefined') return null;
  
  const language = localStorage.getItem('preferredLanguage');
  const country = localStorage.getItem('preferredCountry');
  
  if (language) {
    return { language, country };
  }
  
  return null;
};

/**
 * Marca que el usuario descartó el banner de geolocalización
 */
export const dismissGeoBanner = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('geoPreferenceDismissed', 'true');
  }
};

/**
 * Verifica si el usuario ya descartó el banner
 * @returns {boolean}
 */
export const isGeoBannerDismissed = () => {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem('geoPreferenceDismissed') === 'true';
};
