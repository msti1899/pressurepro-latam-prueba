/**
 * ============================================================
 *  CONFIGURACIÓN DE INDUSTRIAS - PressurePro LATAM
 * ============================================================
 * 
 *  Este es el ÚNICO archivo que necesitás editar para cambiar
 *  el contenido de las páginas de industrias.
 * 
 *  Para agregar una nueva industria:
 *    1. Agregá una entrada nueva a INDUSTRIES más abajo
 *    2. Subí la imagen a /public/
 *    3. Listo — la página, el carrusel, el sitemap y el SEO
 *       se generan automáticamente
 * 
 *  Para editar contenido existente:
 *    Buscá la industria por su slug (ej: 'mineria') y editá
 *    los textos en es/en/pt.
 * 
 * ============================================================
 */

// ─── Iconos SVG reutilizables ────────────────────────────────
// Podés cambiar los iconos de cada beneficio aquí
export const BENEFIT_ICONS = {
  efficiency: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
  savings: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
    </svg>
  ),
  safety: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  innovation: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
    </svg>
  ),
};

// ─── Definición de industrias ────────────────────────────────
// Cada industria tiene: slug, imagen, y contenido en 3 idiomas
export const INDUSTRIES = [
  {
    id: 'world-1',
    slug: 'mineria',
    imgUrl: '/mineria.jpeg',
    // Iconos de beneficios (referencia a BENEFIT_ICONS)
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    // ── Contenido por idioma ──
    es: {
      name: 'Minería',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'En minería, nuestro sistema de monitoreo de neumáticos optimiza la vida útil de equipos de alto costo y mejora la seguridad operacional en entornos extremos.',
      pageTitle: 'Minería - Soluciones Avanzadas',
      description: 'Nuestras soluciones avanzadas para el sector minero detectan problemas de presión y temperatura en tiempo real, anticipando riesgos potenciales en neumáticos de equipos críticos. Este monitoreo constante permite intervenir antes de que ocurran averías mayores, extendiendo la vida útil del caucho y protegiendo inversiones significativas.',
      additional: 'La tecnología PressurePro permite configurar parámetros específicos para cada tipo de maquinaria minera, considerando factores como carga, velocidad y condiciones del terreno. Este enfoque personalizado maximiza el retorno de inversión al reducir hasta un 20% el gasto en neumáticos, uno de los mayores costos operativos en la industria minera después del combustible.',
    },
    en: {
      name: 'Mining',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'In mining, our tire monitoring system optimizes the lifespan of high-cost equipment and enhances operational safety in extreme environments.',
      pageTitle: 'Mining - Advanced Solutions',
      description: 'Our advanced solutions for the mining sector detect pressure and temperature issues in real time, anticipating potential risks in critical equipment tires. This constant monitoring allows intervention before major breakdowns occur, extending rubber life and protecting significant investments.',
      additional: 'PressurePro technology allows configuring specific parameters for each type of mining machinery, considering factors such as load, speed, and terrain conditions. This customized approach maximizes return on investment by reducing tire expenses by up to 20%, one of the largest operating costs in the mining industry after fuel.',
    },
    pt: {
      name: 'Mineração',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'Na mineração, nosso sistema de monitoramento de pneus otimiza a vida útil de equipamentos de alto custo e melhora a segurança operacional em ambientes extremos.',
      pageTitle: 'Mineração - Soluções Avançadas',
      description: 'Nossas soluções avançadas para o setor de mineração detectam problemas de pressão e temperatura em tempo real, antecipando riscos potenciais em pneus de equipamentos críticos. Este monitoramento constante permite intervenção antes que ocorram avarias maiores, estendendo a vida útil da borracha e protegendo investimentos significativos.',
      additional: 'A tecnologia PressurePro permite configurar parâmetros específicos para cada tipo de maquinário de mineração, considerando fatores como carga, velocidade e condições do terreno. Esta abordagem personalizada maximiza o retorno do investimento ao reduzir as despesas com pneus em até 20%, um dos maiores custos operacionais na indústria de mineração depois do combustível.',
    },
  },
  {
    id: 'world-2',
    slug: 'agricultura',
    imgUrl: '/agricultura.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    es: {
      name: 'Agricultura',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'Para el sector agrícola, ofrecemos soluciones que maximizan el rendimiento de maquinaria y reducen tiempos de inactividad durante periodos críticos de siembra y cosecha.',
      pageTitle: 'Agricultura - Tecnología de Precisión',
      description: 'La tecnología PressurePro proporciona datos críticos para la maquinaria agrícola, permitiendo ajustes precisos que protegen los cultivos y optimizan el rendimiento del equipo. Nuestros sistemas monitorean constantemente la presión durante labores intensivas, donde cada hora de operación es crucial para el éxito de la temporada.',
      additional: 'Nuestros dispositivos ayudan a prevenir la dañina compactación del suelo causada por neumáticos con presión incorrecta, protegiendo tanto la tierra cultivable como la inversión en maquinaria. Los agricultores que utilizan PressurePro reportan hasta un 15% de mejora en la tracción y significativa reducción en el desgaste prematuro de componentes mecánicos.',
    },
    en: {
      name: 'Agriculture',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'For the agricultural sector, we offer solutions that maximize machinery performance and reduce downtime during critical planting and harvesting periods.',
      pageTitle: 'Agriculture - Precision Technology',
      description: 'PressurePro technology provides critical data for agricultural machinery, allowing precise adjustments that protect crops and optimize equipment performance. Our systems constantly monitor pressure during intensive work, where every hour of operation is crucial for the success of the season.',
      additional: 'Our devices help prevent harmful soil compaction caused by tires with incorrect pressure, protecting both arable land and machinery investment. Farmers using PressurePro report up to 15% improvement in traction and significant reduction in premature wear of mechanical components.',
    },
    pt: {
      name: 'Agricultura',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'Para o setor agrícola, oferecemos soluções que maximizam o desempenho de máquinas e reduzem o tempo de inatividade durante períodos críticos de plantio e colheita.',
      pageTitle: 'Agricultura - Tecnologia de Precisão',
      description: 'A tecnologia PressurePro fornece dados críticos para maquinaria agrícola, permitindo ajustes precisos que protegem as culturas e otimizam o desempenho do equipamento. Nossos sistemas monitoram constantemente a pressão durante trabalhos intensivos, onde cada hora de operação é crucial para o sucesso da temporada.',
      additional: 'Nossos dispositivos ajudam a prevenir a prejudicial compactação do solo causada por pneus com pressão incorreta, protegendo tanto a terra arável quanto o investimento em maquinaria. Agricultores que utilizam o PressurePro relatam até 15% de melhoria na tração e redução significativa no desgaste prematuro de componentes mecânicos.',
    },
  },
  {
    id: 'world-3',
    slug: 'forestal',
    imgUrl: '/forestal.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    es: {
      name: 'Forestal',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'En entornos forestales, nuestros sensores resisten condiciones difíciles y ayudan a mantener equipos funcionando en terrenos remotos y desafiantes.',
      pageTitle: 'Forestal - Monitoreo para Terrenos Difíciles',
      description: 'Desarrollamos tecnología especializada que soporta las exigencias únicas del trabajo forestal, donde los neumáticos enfrentan obstáculos constantes y superficies irregulares. Nuestro sistema de monitoreo mantiene la productividad en zonas donde una falla puede significar largos tiempos de espera y altos costos de recuperación.',
      additional: 'La conectividad avanzada de nuestros sistemas permite el monitoreo incluso en zonas de difícil acceso, enviando alertas tempranas antes de que los neumáticos sufran daños irreversibles. Esta capacidad es especialmente valiosa en operaciones forestales donde las máquinas trabajan en lugares remotos con limitado acceso a servicios de mantenimiento.',
    },
    en: {
      name: 'Forestry',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'In forestry environments, our sensors withstand tough conditions and help keep equipment running in remote and challenging terrains.',
      pageTitle: 'Forestry - Monitoring for Difficult Terrains',
      description: 'We develop specialized technology that supports the unique demands of forestry work, where tires face constant obstacles and irregular surfaces. Our monitoring system maintains productivity in areas where a failure can mean long waiting times and high recovery costs.',
      additional: 'The advanced connectivity of our systems allows monitoring even in hard-to-reach areas, sending early alerts before tires suffer irreversible damage. This capability is especially valuable in forestry operations where machines work in remote locations with limited access to maintenance services.',
    },
    pt: {
      name: 'Florestal',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'Em ambientes florestais, nossos sensores resistem a condições difíceis e ajudam a manter os equipamentos funcionando em terrenos remotos e desafiadores.',
      pageTitle: 'Florestal - Monitoramento para Terrenos Difíceis',
      description: 'Desenvolvemos tecnologia especializada que suporta as exigências únicas do trabalho florestal, onde os pneus enfrentam obstáculos constantes e superfícies irregulares. Nosso sistema de monitoramento mantém a produtividade em áreas onde uma falha pode significar longos tempos de espera e altos custos de recuperação.',
      additional: 'A conectividade avançada de nossos sistemas permite o monitoramento mesmo em áreas de difícil acesso, enviando alertas precoces antes que os pneus sofram danos irreversíveis. Esta capacidade é especialmente valiosa em operações florestais onde as máquinas trabalham em locais remotos com acesso limitado a serviços de manutenção.',
    },
  },
  {
    id: 'world-4',
    slug: 'portuario',
    imgUrl: '/portuario.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    es: {
      name: 'Portuario',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'La operación portuaria se beneficia con nuestro sistema, optimizando flotas de manejo de carga donde el tiempo de inactividad representa costos significativos.',
      pageTitle: 'Portuario - Optimización de Operaciones',
      description: 'Nuestra tecnología responde a las exigencias de la industria portuaria moderna, donde los equipos de manejo de carga operan bajo presión constante. El monitoreo en tiempo real permite a los operadores identificar problemas potenciales antes de que afecten los estrictos cronogramas de carga y descarga, reduciendo significativamente los costos por retrasos.',
      additional: 'Adaptamos nuestras soluciones a la variedad de equipos utilizados en terminales portuarias, desde reach stackers hasta RTGs, donde cada tipo de máquina enfrenta diferentes patrones de desgaste. La implementación de PressurePro en entornos portuarios ha demostrado reducir hasta un 30% los incidentes relacionados con neumáticos en flotas de alta exigencia.',
    },
    en: {
      name: 'Port',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'Port operation benefits from our system, optimizing cargo handling fleets where downtime represents significant costs.',
      pageTitle: 'Port - Operations Optimization',
      description: 'Our technology responds to the demands of the modern port industry, where cargo handling equipment operates under constant pressure. Real-time monitoring allows operators to identify potential problems before they affect strict loading and unloading schedules, significantly reducing costs due to delays.',
      additional: 'We adapt our solutions to the variety of equipment used in port terminals, from reach stackers to RTGs, where each type of machine faces different wear patterns. PressurePro implementation in port environments has been shown to reduce tire-related incidents in high-demand fleets by up to 30%.',
    },
    pt: {
      name: 'Portuário',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'A operação portuária se beneficia de nosso sistema, otimizando frotas de manuseio de carga onde o tempo de inatividade representa custos significativos.',
      pageTitle: 'Portuário - Otimização de Operações',
      description: 'Nossa tecnologia responde às exigências da indústria portuária moderna, onde equipamentos de movimentação de carga operam sob pressão constante. O monitoramento em tempo real permite aos operadores identificar problemas potenciais antes que afetem os rígidos cronogramas de carga e descarga, reduzindo significativamente os custos devido a atrasos.',
      additional: 'Adaptamos nossas soluções à variedade de equipamentos utilizados em terminais portuários, desde reach stackers até RTGs, onde cada tipo de máquina enfrenta diferentes padrões de desgaste. A implementação do PressurePro em ambientes portuários demonstrou reduzir incidentes relacionados a pneus em frotas de alta demanda em até 30%.',
    },
  },
  {
    id: 'world-5',
    slug: 'industrial',
    imgUrl: '/industrial.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    es: {
      name: 'Industrial',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'En ambientes industriales, nuestras soluciones mejoran la confiabilidad de equipos y reducen riesgos en operaciones continuas donde la seguridad es prioritaria.',
      pageTitle: 'Industrial - Eficiencia y Seguridad',
      description: 'Las instalaciones industriales modernas requieren soluciones de monitoreo que mantengan la continuidad operativa. Nuestra tecnología se integra perfectamente en los protocolos de mantenimiento preventivo, alertando sobre variaciones de presión que podrían comprometer la seguridad del personal y la integridad de los equipos especializados.',
      additional: 'En ambientes industriales con operación continua, nuestro sistema se integra con plataformas IoT existentes, centralizando la información para una gestión eficiente de activos. Esta conectividad permite análisis predictivos que identifican patrones de desgaste antes de que comprometan la producción, especialmente valioso en operaciones de tres turnos.',
    },
    en: {
      name: 'Industrial',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'In industrial settings, our solutions enhance equipment reliability and reduce risks in continuous operations where safety is a priority.',
      pageTitle: 'Industrial - Efficiency and Safety',
      description: 'Modern industrial facilities require monitoring solutions that maintain operational continuity. Our technology integrates perfectly into preventive maintenance protocols, alerting about pressure variations that could compromise personnel safety and the integrity of specialized equipment.',
      additional: 'In industrial environments with continuous operation, our system integrates with existing IoT platforms, centralizing information for efficient asset management. This connectivity enables predictive analysis that identifies wear patterns before they compromise production, especially valuable in three-shift operations.',
    },
    pt: {
      name: 'Industrial',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'Em ambientes industriais, nossas soluções melhoram a confiabilidade dos equipamentos e reduzem riscos em operações contínuas onde a segurança é prioritária.',
      pageTitle: 'Industrial - Eficiência e Segurança',
      description: 'Instalações industriais modernas requerem soluções de monitoramento que mantenham a continuidade operacional. Nossa tecnologia se integra perfeitamente aos protocolos de manutenção preventiva, alertando sobre variações de pressão que poderiam comprometer a segurança do pessoal e a integridade dos equipamentos especializados.',
      additional: 'Em ambientes industriais com operação contínua, nosso sistema se integra com plataformas IoT existentes, centralizando informações para uma gestão eficiente de ativos. Esta conectividade permite análises preditivas que identificam padrões de desgaste antes que comprometam a produção, especialmente valioso em operações de três turnos.',
    },
  },
  {
    id: 'world-6',
    slug: 'transporte',
    imgUrl: '/transport.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    es: {
      name: 'Transporte',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'En el transporte, nuestro sistema de monitoreo de neumáticos optimiza la vida útil de equipos de alto costo y mejora la seguridad operacional en entornos extremos.',
      pageTitle: 'Transporte - Sistemas de Monitoreo',
      description: 'Los profesionales del transporte enfrentan desafíos constantes en carreteras que ponen a prueba sus vehículos. Nuestro sistema proporciona información crucial que ayuda a programar mantenimientos sin interrumpir las rutas planificadas, garantizando entregas puntuales mientras se extiende la vida útil de la flota.',
      additional: 'Ofrecemos configuraciones específicas para diferentes tipos de vehículos de transporte, desde camiones de larga distancia hasta flotas de distribución urbana. Los gestores de flota pueden establecer parámetros personalizados para cada ruta y carga, recibiendo alertas específicas que permiten decisiones informadas para optimizar cada kilómetro recorrido.',
    },
    en: {
      name: 'Transport',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'In transportation, our tire monitoring system optimizes the lifespan of high-cost equipment and enhances operational safety in extreme environments.',
      pageTitle: 'Transport - Monitoring Systems',
      description: 'Transportation professionals face constant challenges on roads that test their vehicles. Our system provides crucial information that helps schedule maintenance without interrupting planned routes, ensuring timely deliveries while extending the fleet\'s useful life.',
      additional: 'We offer specific configurations for different types of transport vehicles, from long-distance trucks to urban distribution fleets. Fleet managers can establish customized parameters for each route and load, receiving specific alerts that allow informed decisions to optimize every kilometer traveled.',
    },
    pt: {
      name: 'Transporte',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'No transporte, nosso sistema de monitoramento de pneus otimiza a vida útil de equipamentos de alto custo e melhora a segurança operacional em ambientes extremos.',
      pageTitle: 'Transporte - Sistemas de Monitoramento',
      description: 'Os profissionais de transporte enfrentam desafios constantes em estradas que testam seus veículos. Nosso sistema fornece informações cruciais que ajudam a programar manutenções sem interromper rotas planejadas, garantindo entregas pontuais enquanto estende a vida útil da frota.',
      additional: 'Oferecemos configurações específicas para diferentes tipos de veículos de transporte, desde caminhões de longa distância até frotas de distribuição urbana. Os gestores de frota podem estabelecer parâmetros personalizados para cada rota e carga, recebendo alertas específicos que permitem decisões informadas para otimizar cada quilômetro percorrido.',
    },
  },
];

// ─── Helpers (no tocar) ──────────────────────────────────────

/** Mapa slug → industry object */
export const INDUSTRY_BY_SLUG = Object.fromEntries(
  INDUSTRIES.map(ind => [ind.slug, ind])
);

/** Mapa id → industry object */
export const INDUSTRY_BY_ID = Object.fromEntries(
  INDUSTRIES.map(ind => [ind.id, ind])
);

/** Mapa slug → id interno */
export const SLUG_MAP = Object.fromEntries(
  INDUSTRIES.map(ind => [ind.slug, ind.id])
);

/** Mapa id → slug */
export const ID_TO_SLUG = Object.fromEntries(
  INDUSTRIES.map(ind => [ind.id, ind.slug])
);

/** Lista de slugs (para getStaticPaths y sitemap) */
export const INDUSTRY_SLUGS = INDUSTRIES.map(ind => ind.slug);

/**
 * Obtener el contenido de una industria en un idioma.
 * Si el idioma no existe, cae a 'es'.
 * 
 * @param {string} slugOrId - slug ('mineria') o id ('world-1')
 * @param {string} lang - 'es' | 'en' | 'pt'
 * @returns {{ industry, content }} | null
 */
export function getIndustryContent(slugOrId, lang = 'es') {
  const industry = INDUSTRY_BY_SLUG[slugOrId] || INDUSTRY_BY_ID[slugOrId];
  if (!industry) return null;

  const content = industry[lang] || industry.es;
  return { industry, content };
}

/**
 * Generar las traducciones de industrias para inyectar en el objeto
 * de translations existente. Esto mantiene compatibilidad con los
 * componentes que leen translations.explore.industries, etc.
 * 
 * @param {string} lang - 'es' | 'en' | 'pt'
 */
export function getIndustryTranslations(lang = 'es') {
  const industries = {};
  const marketInfo = {};
  const modalTitle = {};
  const modalDescription = {};
  const modalAdditional = {};
  const benefit1 = {};
  const benefit2 = {};
  const benefit3 = {};
  const benefit4 = {};

  INDUSTRIES.forEach(ind => {
    const c = ind[lang] || ind.es;
    industries[ind.id] = c.name;
    marketInfo[ind.id] = c.marketInfo;
    modalTitle[ind.id] = c.pageTitle;
    modalDescription[ind.id] = c.description;
    modalAdditional[ind.id] = c.additional;
    benefit1[ind.id] = c.benefits[0] || '';
    benefit2[ind.id] = c.benefits[1] || '';
    benefit3[ind.id] = c.benefits[2] || '';
    benefit4[ind.id] = c.benefits[3] || '';
  });

  return {
    industries,
    marketInfo,
    modalTitle,
    modalDescription,
    modalAdditional,
    benefit1,
    benefit2,
    benefit3,
    benefit4,
  };
}
