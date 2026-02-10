// Traducciones específicas para España
// Énfasis en transporte e industrial

import esBase from '../es/translations';

const epaTranslations = JSON.parse(JSON.stringify(esBase));

epaTranslations.terminology = {
  tires: 'Neumáticos',
  tire: 'Neumático',
  truck: 'Camión',
  fleet: 'Flota',
  pressure: 'Presión',
  monitoring: 'Monitorización'
};

// SEO específico para España
epaTranslations.seo = {
  title: "PressurePro España - TPMS para Transporte y Flotas",
  description: "Sistema de monitorización de presión de neumáticos para flotas de transporte en España. Distribuidor oficial.",
  keywords: ["TPMS España", "monitorización neumáticos", "presión neumáticos", "flotas transporte"]
};

// Industrias prioritarias para España
epaTranslations.priorityIndustries = ['transport', 'industrial', 'port'];

// Contacto específico para España
epaTranslations.contact = {
  whatsapp: "+59899000000",
  email: "info@pressurepro-latam.com",
  distributor: "PressurePro - España"
};

export default epaTranslations;
