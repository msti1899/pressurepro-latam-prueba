// Configuracion de paises y regiones para SEO internacional

export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/us.svg',
    hreflang: 'en'
  },
  pt: {
    code: 'pt',
    name: 'Português',
    flag: 'https://flagcdn.com/br.svg',
    hreflang: 'pt'
  }
};

export const COUNTRIES = {
  mx: {
    code: 'mx',
    name: 'México',
    language: 'es',
    flag: 'https://flagcdn.com/mx.svg',
    currency: 'MXN',
    timezone: 'America/Mexico_City',
    hreflang: 'es-MX',
    whatsapp: '+59899000000',
    terminology: {
      tires: 'Llantas',
      truck: 'Camión',
      fleet: 'Flotilla'
    },
    priorityIndustries: ['transport', 'industrial', 'mining'],
    regionalClients: [],
    seoKeywords: ['monitoreo de llantas', 'TPMS México', 'presión de llantas']
  },
  ar: {
    code: 'ar',
    name: 'Argentina',
    language: 'es',
    flag: 'https://flagcdn.com/ar.svg',
    currency: 'ARS',
    timezone: 'America/Argentina/Buenos_Aires',
    hreflang: 'es-AR',
    whatsapp: '+59899000000',
    terminology: {
      tires: 'Neumáticos',
      truck: 'Camión',
      fleet: 'Flota'
    },
    priorityIndustries: ['agriculture', 'transport', 'mining'],
    regionalClients: [],
    seoKeywords: ['monitoreo de neumáticos', 'TPMS Argentina', 'presión de neumáticos']
  },
  br: {
    code: 'br',
    name: 'Brasil',
    language: 'pt',
    flag: 'https://flagcdn.com/br.svg',
    currency: 'BRL',
    timezone: 'America/Sao_Paulo',
    hreflang: 'pt-BR',
    whatsapp: '+59899000000',
    terminology: {
      tires: 'Pneus',
      truck: 'Caminhão',
      fleet: 'Frota'
    },
    priorityIndustries: ['agriculture', 'transport', 'mining'],
    regionalClients: [],
    seoKeywords: ['monitoramento de pneus', 'TPMS Brasil', 'pressão dos pneus']
  },
  pe: {
    code: 'pe',
    name: 'Perú',
    language: 'es',
    flag: 'https://flagcdn.com/pe.svg',
    currency: 'PEN',
    timezone: 'America/Lima',
    hreflang: 'es-PE',
    whatsapp: '+59899000000',
    terminology: {
      tires: 'Neumáticos',
      truck: 'Camión',
      fleet: 'Flota'
    },
    priorityIndustries: ['mining', 'transport', 'agriculture'],
    regionalClients: [],
    seoKeywords: ['monitoreo de neumáticos', 'TPMS Perú', 'presión de neumáticos']
  },
  cl: {
    code: 'cl',
    name: 'Chile',
    language: 'es',
    flag: 'https://flagcdn.com/cl.svg',
    currency: 'CLP',
    timezone: 'America/Santiago',
    hreflang: 'es-CL',
    whatsapp: '+59899000000',
    terminology: {
      tires: 'Neumáticos',
      truck: 'Camión',
      fleet: 'Flota'
    },
    priorityIndustries: ['mining', 'forestry', 'transport'],
    regionalClients: [],
    seoKeywords: ['monitoreo de neumáticos', 'TPMS Chile', 'presión de neumáticos']
  },
  co: {
    code: 'co',
    name: 'Colombia',
    language: 'es',
    flag: 'https://flagcdn.com/co.svg',
    currency: 'COP',
    timezone: 'America/Bogota',
    hreflang: 'es-CO',
    whatsapp: '+59899000000',
    terminology: {
      tires: 'Llantas',
      truck: 'Camión',
      fleet: 'Flota'
    },
    priorityIndustries: ['transport', 'mining', 'port'],
    regionalClients: [],
    seoKeywords: ['monitoreo de llantas', 'TPMS Colombia', 'presión de llantas']
  },
  bo: {
    code: 'bo',
    name: 'Bolivia',
    language: 'es',
    flag: 'https://flagcdn.com/bo.svg',
    currency: 'BOB',
    timezone: 'America/La_Paz',
    hreflang: 'es-BO',
    whatsapp: '+59899000000',
    terminology: {
      tires: 'Neumáticos',
      truck: 'Camión',
      fleet: 'Flota'
    },
    priorityIndustries: ['mining', 'transport', 'agriculture'],
    regionalClients: [],
    seoKeywords: ['monitoreo de neumáticos', 'TPMS Bolivia', 'presión de neumáticos']
  },
  es: {
    code: 'es',
    name: 'España',
    language: 'es',
    flag: 'https://flagcdn.com/es.svg',
    currency: 'EUR',
    timezone: 'Europe/Madrid',
    hreflang: 'es-ES',
    whatsapp: '+59899000000',
    terminology: {
      tires: 'Neumáticos',
      truck: 'Camión',
      fleet: 'Flota'
    },
    priorityIndustries: ['transport', 'industrial', 'port'],
    regionalClients: [],
    seoKeywords: ['monitoreo de neumáticos', 'TPMS España', 'presión de neumáticos']
  }
};

// Mapeo de codigos de pais ISO a nuestros codigos
export const ISO_TO_COUNTRY = {
  'MX': 'mx',
  'AR': 'ar',
  'BR': 'br',
  'PE': 'pe',
  'CL': 'cl',
  'CO': 'co',
  'BO': 'bo',
  'ES': 'es',
  'US': 'en',
  'GB': 'en',
  'CA': 'en',
  'PT': 'pt',
  'EC': 'mx',
  'VE': 'mx',
  'PY': 'mx',
  'UY': 'mx'
};

// Obtener pais por defecto basado en idioma
export const getDefaultCountryForLanguage = (language) => {
  const defaults = {
    es: 'mx',
    en: null,
    pt: 'br'
  };
  return defaults[language] || null;
};

// Obtener todos los paises por idioma
export const getCountriesByLanguage = (language) => {
  return Object.values(COUNTRIES).filter(country => country.language === language);
};

// Generar todas las rutas posibles para SSG
export const getAllRoutes = () => {
  const routes = [];
  Object.keys(LANGUAGES).forEach(lang => {
    routes.push({ lang, country: null });
  });
  Object.keys(COUNTRIES).forEach(countryCode => {
    const country = COUNTRIES[countryCode];
    routes.push({ lang: country.language, country: countryCode });
  });
  return routes;
};
