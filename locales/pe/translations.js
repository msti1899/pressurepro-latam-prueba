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

// Hero optimizado para Perú con keywords
peTranslations.hero = {
  ...peTranslations.hero,
  title: "Monitoreo TPMS de Neumáticos para Minería Perú",
  subtitle: "Sistema de Presión y Temperatura para Flotas Mineras | PressurePro"
};

peTranslations.explore = {
  ...peTranslations.explore,
  title: "Industrias",
  subtitle: "Sistemas TPMS para Minería y Transporte en Perú"
};

peTranslations.getStarted = {
  ...peTranslations.getStarted,
  title: "Beneficios del Sistema TPMS en Minería",
  subtitle: "Descubra cómo PressurePro optimiza sus operaciones mineras peruanas"
};

peTranslations.whatsNew = {
  ...peTranslations.whatsNew,
  title2: "Ventajas del Monitoreo TPMS en Minería Peruana"
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
