// Traducciones específicas para Chile
// Énfasis en minería

import esBase from '../es/translations';

const clTranslations = JSON.parse(JSON.stringify(esBase));

clTranslations.terminology = {
  tires: 'Neumáticos',
  tire: 'Neumático',
  truck: 'Camión',
  fleet: 'Flota',
  pressure: 'Presión',
  monitoring: 'Monitoreo'
};

// Hero optimizado para Chile con keywords
clTranslations.hero = {
  ...clTranslations.hero,
  title: "Monitoreo TPMS de Neumáticos para Minería Chile",
  subtitle: "Sistema de Presión y Temperatura para Flotas Mineras | PressurePro"
};

clTranslations.explore = {
  ...clTranslations.explore,
  title: "Industrias",
  subtitle: "Sistemas TPMS para Minería y Transporte en Chile"
};

clTranslations.getStarted = {
  ...clTranslations.getStarted,
  title: "Beneficios del Sistema TPMS Minero",
  subtitle: "Descubra cómo PressurePro optimiza sus operaciones mineras"
};

clTranslations.whatsNew = {
  ...clTranslations.whatsNew,
  title2: "Ventajas del Monitoreo TPMS en Operaciones Mineras"
};

// SEO específico para Chile - Énfasis en minería
clTranslations.seo = {
  title: "PressurePro Chile - TPMS para Minería y Transporte",
  description: "Sistema de monitoreo de presión de neumáticos para operaciones mineras en Chile. Tecnología TPMS para camiones mineros y flotas de transporte.",
  keywords: ["TPMS minería Chile", "monitoreo neumáticos mineros", "sensores camiones mineros", "presión neumáticos Chile"]
};

// Industrias prioritarias para Chile
clTranslations.priorityIndustries = ['mining', 'forestry', 'transport'];

// Contacto específico para Chile
clTranslations.contact = {
  whatsapp: "+59899000000",
  email: "chile@pressurepro-latam.com",
  distributor: "Distribuidor Chile"
};

export default clTranslations;
