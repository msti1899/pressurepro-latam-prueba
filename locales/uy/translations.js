// Traducciones específicas para Uruguay
// Énfasis en agro y transporte

import esBase from '../es/translations';

const uyTranslations = JSON.parse(JSON.stringify(esBase));

uyTranslations.terminology = {
  tires: 'Neumáticos',
  tire: 'Neumático',
  truck: 'Camión',
  fleet: 'Flota',
  pressure: 'Presión',
  monitoring: 'Monitoreo'
};

// SEO específico para Uruguay
uyTranslations.seo = {
  title: "PressurePro Uruguay - TPMS para Agro y Transporte",
  description: "Sistema de monitoreo de presión de neumáticos para maquinaria agrícola y flotas de transporte en Uruguay. Partner oficial para LATAM.",
  keywords: ["TPMS Uruguay", "monitoreo neumáticos", "sensores maquinaria agrícola", "presión neumáticos"]
};

// Industrias prioritarias para Uruguay
uyTranslations.priorityIndustries = ['agriculture', 'transport', 'forestry'];

// Renombrar "Minería" como "Construcción / Canteras" para Uruguay
uyTranslations.explore = {
  ...uyTranslations.explore,
  industries: {
    ...uyTranslations.explore?.industries,
    'world-1': 'Construcción / Canteras',
  },
};

// Contacto específico para Uruguay (sede principal)
uyTranslations.contact = {
  whatsapp: "+59898596735",
  email: "info@pressurepro-latam.com",
  distributor: "PressurePro LATAM - Sede Central"
};

uyTranslations.navbar = { ...uyTranslations.navbar, blog: 'Blog' };

export default uyTranslations;
