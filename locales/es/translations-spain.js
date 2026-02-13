// Traducciones específicas para España
// Énfasis en mercado europeo, normativas CE, y transporte

import esBase from '../es/translations';

const esSpainTranslations = JSON.parse(JSON.stringify(esBase));

// Sobrescribir contenido específico para España

esSpainTranslations.about = {
  title: "Acerca de PressurePro España",
  companyName: "PressurePro España",
  text: "PressurePro España es el distribuidor oficial de sistemas TPMS en la Península Ibérica, ofreciendo tecnología de monitorización de neumáticos que cumple con normativas europeas CE. Desde 1991, PressurePro lidera el mercado global en sistemas de control de presión y temperatura para flotas de transporte comercial, vehículos industriales y operaciones logísticas. Nuestras soluciones TPMS reducen costes operativos hasta un 15%, mejoran la seguridad vial y contribuyen a la sostenibilidad ambiental en el sector del transporte europeo."
};

esSpainTranslations.world = {
  typingTex: "Tecnología TPMS certificada para el mercado europeo",
  title: "Distribuidor Oficial PressurePro para España y Portugal",
  description: "Especialistas en sistemas de monitorización de presión de neumáticos para flotas comerciales en España. Soluciones TPMS certificadas CE que cumplen con las normativas europeas de seguridad vial y medio ambiente. Reducción demostrada de costes operativos, mejora en eficiencia de combustible y minimización de la huella de carbono en el transporte por carretera."
};

esSpainTranslations.seo = {
  title: "PressurePro España - Sistemas TPMS Certificados CE para Flotas",
  description: "Distribuidor oficial de sistemas TPMS en España. Monitorización profesional de neumáticos certificada CE para transporte comercial, flotas industriales y logística. Ahorro hasta 15% en costes operativos con tecnología americana.",
  keywords: ["TPMS España", "monitorización neumáticos", "sistemas presión certificados CE", "flotas transporte España", "control neumáticos Europa", "TPMS homologado", "seguridad vial Europa"]
};

esSpainTranslations.terminology = {
  tires: 'Neumáticos',
  tire: 'Neumático',
  truck: 'Camión',
  fleet: 'Flota',
  pressure: 'Presión',
  monitoring: 'Monitorización',
  sensor: 'Sensor',
  system: 'Sistema'
};

// Características específicas para el mercado español
esSpainTranslations.europeanFeatures = {
  title: "Ventajas para el Mercado Español",
  items: [
    "Certificación CE y cumplimiento normativa europea",
    "Compatible con normativas de transporte de mercancías",
    "Reducción huella de carbono según directivas UE",
    "Integración con tacógrafos digitales",
    "Soporte técnico en península ibérica"
  ]
};

esSpainTranslations.priorityIndustries = ['transport', 'industrial', 'port'];

esSpainTranslations.contact = {
  whatsapp: "+59899000000",
  email: "espana@pressurepro-latam.com",
  distributor: "PressurePro España - Distribuidor Oficial"
};

export default esSpainTranslations;
