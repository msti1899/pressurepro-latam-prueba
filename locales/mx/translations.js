// Traducciones específicas para México
// Extiende las traducciones base en español con terminología local

import esBase from '../es/translations';

// Crear una copia profunda de las traducciones base
const mxTranslations = JSON.parse(JSON.stringify(esBase));

// Sobrescribir términos específicos de México
mxTranslations.terminology = {
  tires: 'Llantas',
  tire: 'Llanta',
  truck: 'Camión',
  fleet: 'Flotilla',
  pressure: 'Presión',
  monitoring: 'Monitoreo'
};

// Actualizar textos con terminología mexicana
mxTranslations.hero = {
  ...mxTranslations.hero,
  subtitle: "Monitoreo de llantas en tiempo real"
};

mxTranslations.about = {
  ...mxTranslations.about,
  text: "PressurePro LATAM revoluciona el mantenimiento de llantas, brindando a los conductores y los responsables de flotillas todo tipo de datos en tiempo real sobre el rendimiento de las llantas. PressurePro LATAM agrega seguridad y ahorro en cualquier camino que recorra. Desde 1991, PressurePro ha sido líder en tecnología de monitoreo de llantas, brindando soluciones innovadoras para la seguridad y eficiencia de su flotilla. PressurePro LATAM es el distribuidor exclusivo para América Latina de PressurePro, líder en tecnología de monitoreo de presión de llantas."
};

// SEO específico para México
mxTranslations.seo = {
  title: "PressurePro México - Sistema TPMS para Llantas",
  description: "Sistema de monitoreo de presión y temperatura de llantas en tiempo real. Líder en tecnología TPMS para flotillas en México.",
  keywords: ["monitoreo de llantas", "TPMS México", "presión de llantas", "flotillas", "sensores de llantas"]
};

// Contacto específico para México
mxTranslations.contact = {
  whatsapp: "+59899000000",
  email: "mexico@pressurepro-latam.com",
  distributor: "Distribuidor México"
};

export default mxTranslations;
