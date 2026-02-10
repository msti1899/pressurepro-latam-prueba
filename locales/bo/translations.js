// Traducciones específicas para Bolivia
// Énfasis en minería y transporte

import esBase from '../es/translations';

const boTranslations = JSON.parse(JSON.stringify(esBase));

boTranslations.terminology = {
  tires: 'Neumáticos',
  tire: 'Neumático',
  truck: 'Camión',
  fleet: 'Flota',
  pressure: 'Presión',
  monitoring: 'Monitoreo'
};

// SEO específico para Bolivia
boTranslations.seo = {
  title: "PressurePro Bolivia - TPMS para Minería y Transporte",
  description: "Sistema de monitoreo de presión de neumáticos para minería y flotas de transporte en Bolivia. Distribuidor oficial para LATAM.",
  keywords: ["TPMS Bolivia", "monitoreo neumáticos", "sensores minería", "presión neumáticos"]
};

// Industrias prioritarias para Bolivia
boTranslations.priorityIndustries = ['mining', 'transport', 'agriculture'];

// Contacto específico para Bolivia
boTranslations.contact = {
  whatsapp: "+59899000000",
  email: "info@pressurepro-latam.com",
  distributor: "PressurePro LATAM - Bolivia"
};

export default boTranslations;
