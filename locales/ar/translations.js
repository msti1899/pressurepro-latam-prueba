// Traducciones específicas para Argentina
// Énfasis en agro y transporte

import esBase from '../es/translations';

const arTranslations = JSON.parse(JSON.stringify(esBase));

arTranslations.terminology = {
  tires: 'Neumáticos',
  tire: 'Neumático',
  truck: 'Camión',
  fleet: 'Flota',
  pressure: 'Presión',
  monitoring: 'Monitoreo'
};

// SEO específico para Argentina
arTranslations.seo = {
  title: "PressurePro Argentina - TPMS para Agro y Transporte",
  description: "Sistema de monitoreo de presión de neumáticos para maquinaria agrícola y flotas de transporte en Argentina. Tecnología TPMS líder.",
  keywords: ["TPMS Argentina", "monitoreo neumáticos agro", "sensores maquinaria agrícola", "presión neumáticos transporte"]
};

// Industrias prioritarias para Argentina
arTranslations.priorityIndustries = ['agriculture', 'transport', 'mining'];

// Contacto específico para Argentina
arTranslations.contact = {
  whatsapp: "+59899000000",
  email: "argentina@pressurepro-latam.com",
  distributor: "Distribuidor Argentina"
};

export default arTranslations;
