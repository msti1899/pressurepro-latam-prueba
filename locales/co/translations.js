// Traducciones específicas para Colombia
// Extiende las traducciones base en español con terminología local

import esBase from '../es/translations';

// Crear una copia profunda de las traducciones base
const coTranslations = JSON.parse(JSON.stringify(esBase));

// Sobrescribir términos específicos de Colombia
coTranslations.terminology = {
  tires: 'Llantas',
  tire: 'Llanta',
  truck: 'Camión',
  fleet: 'Flota',
  pressure: 'Presión',
  monitoring: 'Monitoreo'
};

// Actualizar textos con terminología colombiana
coTranslations.hero = {
  ...coTranslations.hero,
  subtitle: "Monitoreo de llantas en tiempo real"
};

coTranslations.about = {
  ...coTranslations.about,
  text: "PressurePro LATAM revoluciona el mantenimiento de llantas, brindando a los conductores y los responsables de flotas todo tipo de datos en tiempo real sobre el rendimiento de las llantas. PressurePro LATAM agrega seguridad y ahorro en cualquier camino que recorra. Desde 1991, PressurePro ha sido líder en tecnología de monitoreo de llantas, brindando soluciones innovadoras para la seguridad y eficiencia de su flota. PressurePro LATAM es el distribuidor exclusivo para América Latina de PressurePro, líder en tecnología de monitoreo de presión de llantas."
};

// SEO específico para Colombia
coTranslations.seo = {
  title: "PressurePro Colombia - Sistema TPMS para Llantas",
  description: "Sistema de monitoreo de presión y temperatura de llantas en tiempo real. Líder en tecnología TPMS para flotas en Colombia.",
  keywords: ["monitoreo de llantas", "TPMS Colombia", "presión de llantas", "flotas", "sensores de llantas"]
};

// Industrias prioritarias para Colombia
coTranslations.priorityIndustries = ['transport', 'mining', 'port'];

// Contacto específico para Colombia
coTranslations.contact = {
  whatsapp: "+59899000000",
  email: "colombia@pressurepro-latam.com",
  distributor: "Distribuidor Colombia"
};

export default coTranslations;
