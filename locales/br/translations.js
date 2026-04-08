// Traduções específicas para o Brasil

import ptBase from '../pt/translations';

const brTranslations = JSON.parse(JSON.stringify(ptBase));

brTranslations.terminology = {
  tires: 'Pneus',
  tire: 'Pneu',
  truck: 'Caminhão',
  fleet: 'Frota',
  pressure: 'Pressão',
  monitoring: 'Monitoramento'
};

// SEO específico para Brasil
brTranslations.seo = {
  title: "PressurePro Brasil - Sistema TPMS para Pneus",
  description: "Sistema de monitoramento de pressão e temperatura de pneus em tempo real. Líder em tecnologia TPMS para frotas no Brasil.",
  keywords: ["monitoramento de pneus", "TPMS Brasil", "pressão de pneus", "frotas", "sensores de pneus"]
};

// Indústrias prioritárias para o Brasil
brTranslations.priorityIndustries = ['agriculture', 'transport', 'mining'];

// Contato específico para o Brasil
brTranslations.contact = {
  whatsapp: "+59898005005",
  email: "brasil@pressurepro-latam.com",
  distributor: "Distribuidor Brasil"
};

// Blog específico para o Brasil
brTranslations.blog = {
  title: "Blog do PressurePro",
  description: "Artigos e notícias sobre monitoramento de pneus e tecnologia TPMS."
};

export default brTranslations;
