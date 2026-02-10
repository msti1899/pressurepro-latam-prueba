// Traducciones específicas para Perú
// Énfasis en minería

import esBase from '../es/translations';

const peTranslations = JSON.parse(JSON.stringify(esBase));

peTranslations.terminology = {
  tires: 'Neumáticos',
  tire: 'Neumático',
  truck: 'Camión',
  fleet: 'Flota',
  pressure: 'Presión',
  monitoring: 'Monitoreo'
};

// SEO específico para Perú - Énfasis en minería
peTranslations.seo = {
  title: "PressurePro Perú - TPMS para Minería",
  description: "Sistema de monitoreo de presión de neumáticos para operaciones mineras en Perú. Tecnología TPMS para camiones mineros y equipos pesados.",
  keywords: ["TPMS minería Perú", "monitoreo neumáticos mineros", "sensores presión Perú", "neumáticos minería"]
};

// Industrias prioritarias para Perú
peTranslations.priorityIndustries = ['mining', 'transport', 'agriculture'];

// Contacto específico para Perú
peTranslations.contact = {
  whatsapp: "+59899000000",
  email: "peru@pressurepro-latam.com",
  distributor: "Distribuidor Perú"
};

export default peTranslations;
