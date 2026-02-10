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
