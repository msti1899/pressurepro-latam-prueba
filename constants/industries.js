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

// ─── OEM Partners por industria ──────────────────────────────
// Partners OEM de PressurePro organizados por industria
export const OEM_PARTNERS = {
  mineria: [
    { name: 'CAT', url: 'https://www.caterpillar.com/', logo: '/partners/logo-cat.png' },
    { name: 'Sandvik', url: 'https://www.home.sandvik/', logo: '/partners/logo-sandvik.png' },
    { name: 'BELAZ', url: 'https://belaz.by/en/', logo: '/partners/logo-belaz.png' },
  ],
  agricultura: [
    { name: 'CNH Industrial', url: 'https://www.cnhindustrial.com/', logo: '/partners/logo-cnh-industrial.png' },
  ],
  forestal: [
    { name: 'Tigercat', url: 'https://www.tigercat.com/', logo: '/partners/logo-tigercat.png' },
  ],
  portuario: [
    { name: 'Kalmar', url: 'https://www.kalmarglobal.com/', logo: '/partners/logo-kalmar.png' },
    { name: 'Konecranes', url: 'https://www.konecranes.com/', logo: '/partners/logo-konecranes.png' },
    { name: 'OrangeEV', url: 'https://orangeev.com/', logo: '/partners/logo-orange-ev.png' },
    { name: 'Taylor', url: 'https://www.taylorbigred.com/', logo: '/partners/logo-taylor.png' },
  ],
  industrial: [
    { name: 'Hyster-Yale', url: 'https://www.hyster-yale.com/', logo: '/partners/logo-hyster-yale.png' },
    { name: 'JCB', url: 'https://www.jcb.com/es-ES/', logo: '/partners/logo-jcb.png' },
    { name: 'Hitachi', url: 'https://www.hitachi.com/en/', logo: '/partners/logo-hitachi.png' },
  ],
  transporte: [
    { name: 'Bombardier', url: 'https://bombardier.com/en', logo: '/partners/logo-bombardier.png' },
    { name: 'REV Group', url: 'https://revgroup.com/', logo: '/partners/logo-rev-group.png' },
    { name: 'Tiffin', url: 'https://tiffinmotorhomes.com/', logo: '/partners/logo-tiffin.png' },
    { name: 'Newell', url: 'https://www.newellcoach.com/', logo: '/partners/logo-newell.png' },
  ],
};

// Partners OEM generales (todos combinados, sin duplicados)
export const ALL_OEM_PARTNERS = Object.values(OEM_PARTNERS).flat().filter(
  (partner, index, self) => self.findIndex(p => p.name === partner.name) === index
);

// ─── Partners Tecnológicos y Estratégicos ────────────────────
// Plataformas de telemetría, gestión de flotas y soluciones IoT
// que integran o son compatibles con PressurePro
export const ALL_TECH_PARTNERS = [
  { name: 'Advantech',     url: 'https://www.advantech.com/',      logo: '/partners-plataformas/Advantech-Logo.png' },
  { name: 'Aperia',        url: 'https://www.aperiatechnologies.com/', logo: '/partners-plataformas/Aperia-Logo-1.png' },
  { name: 'DPL',           url: 'https://www.dpltelematics.com/',  logo: '/partners-plataformas/DPL-Logo.png' },
  { name: 'DSR',           url: 'https://dsr-corporation.com/',    logo: '/partners-plataformas/DSR-Logo.png' },
  { name: 'Galileosky',    url: 'https://galileosky.com/',         logo: '/partners-plataformas/Galileosky-Logo-2.png' },
  { name: 'Geotab',        url: 'https://www.geotab.com/',         logo: '/partners-plataformas/Geotab-Logo.png' },
  { name: 'GPS TrackIt',   url: 'https://www.gpstrackit.com/',     logo: '/partners-plataformas/GPS-TrackIt-Logo.png' },
  { name: 'KeepTruckin',   url: 'https://www.motive.com/',         logo: '/partners-plataformas/Keep-Trucking-Logo.png' },
  { name: 'Logimine',      url: 'https://logimine.com/',           logo: '/partners-plataformas/Logimine-Logo.png' },
  { name: 'Maxcess',       url: 'https://www.maxcessintl.com/',    logo: '/partners-plataformas/Maxcess-Logo.png' },
  { name: 'Mix Telematics',url: 'https://www.mixtelematics.com/',  logo: '/partners-plataformas/Mix-Logo-1.png' },
  { name: 'Modular',       url: '#',                               logo: '/partners-plataformas/Modular-Logo.png' },
  { name: 'Omnitracs',     url: 'https://www.omnitracs.com/',      logo: '/partners-plataformas/Omnitracs.png' },
  { name: 'Safety Vision', url: 'https://www.safetyvision.com/',   logo: '/partners-plataformas/Safety-Vision-Logo.png' },
  { name: 'Samtech',       url: '#',                               logo: '/partners-plataformas/Samtech-Logo-1024x791.png' },
  { name: 'Samsara',       url: 'https://www.samsara.com/',        logo: '/partners-plataformas/Samsara-Logo.png' },
  { name: 'SilverLeaf',    url: '#',                               logo: '/partners-plataformas/SilverLeaf-Logo-1.png' },
  { name: 'ToughTech',     url: '#',                               logo: '/partners-plataformas/ToughTech-Logo-1.png' },
  { name: 'Trimble',       url: 'https://www.trimble.com/',        logo: '/partners-plataformas/Trimble-Logo.png' },
  { name: 'Valid',         url: 'https://www.validsolucoes.com.br/', logo: '/partners-plataformas/Valid-Logo-1.png' },
  { name: 'Wenco',         url: 'https://wencomine.com/',          logo: '/partners-plataformas/Wenco-Logo-1.png' },
  { name: 'Xite Solutions',url: '#',                               logo: '/partners-plataformas/Xite-Solutions-Logo.png' },
  { name: 'XscapeEz',      url: '#',                               logo: '/partners-plataformas/XscapeEz-Logo-1.png' },
  { name: 'Zonar',         url: 'https://www.zonarsystems.com/',   logo: '/partners-plataformas/Zonar-Logo.png' },
];

// ─── Definición de industrias ────────────────────────────────
// Cada industria tiene: slug, imagen, y contenido en 3 idiomas
export const INDUSTRIES = [
  {
    id: 'world-1',
    slug: 'mineria',
    imgUrl: '/miner-trucks.png',
    secondaryImgUrl: '/mining-maintenance.jpg',
    // Iconos de beneficios (referencia a BENEFIT_ICONS)
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    // OEM Partners de esta industria
    oems: OEM_PARTNERS.mineria,
    // ── Contenido por idioma ──
    es: {
      name: 'Minería',
      benefits: ['Menos paradas', 'Mayor vida útil', 'Menor costo/ton', 'Seguridad'],
      marketInfo: 'Plataforma TPMS diseñada para condiciones mineras extremas. Monitoreo continuo que protege la producción y reduce el costo por tonelada.',
      pageTitle: 'PressurePro Connect 2.0 para Operaciones Mineras',
      description: 'Los neumáticos representan el 20-25% del gasto de mantenimiento y causan aproximadamente el 38% de las paradas no planificadas. Un solo incidente puede costar más de USD 100.000, además de los riesgos de seguridad por reventones y mayor distancia de frenado. PressurePro Connect 2.0 es la plataforma TPMS diseñada específicamente para estas condiciones extremas, ofreciendo monitoreo continuo que combate el 70% del desgaste prematuro por subinflación y elimina los puntos ciegos de las inspecciones manuales.',
      additional: 'Nuestra solución ofrece visibilidad total del sitio con alertas inteligentes priorizadas, mapas de localización y análisis predictivo. Compatible con una amplia gama de equipos: camiones de acarreo (ultra/medianos), cargadores frontales, bulldozers, motoniveladoras, camiones cisterna y equipos subterráneos. Los beneficios incluyen una drástica reducción del costo por tonelada, mayor vida útil de los neumáticos y protección continua de la producción mediante mantenimiento predictivo. Somos OEM de CAT, Sandvik y BELAZ, integrando nuestra tecnología directamente en sus equipos de fábrica.',
      structuredContent: {
        problems: {
          title: "Desafíos y Problemas en Minería",
          items: [
            "Neumáticos representan 20–25% del gasto de mantenimiento",
            "~38% de paradas no planificadas son por neumáticos",
            "Un incidente puede costar > USD 100.000",
            "~50% de máquinas operan con neumáticos desinflados",
            "Hasta 70% del desgaste prematuro es por subinflación",
            "Inspecciones manuales generan puntos ciegos y riesgos de seguridad"
          ]
        },
        solution: {
          title: "Solución Tecnológica: Connect 2.0",
          text: "Plataforma TPMS diseñada para soportar las condiciones más extremas de la minería. Ofrece monitoreo continuo global, prevención activa de fallas, protección de la producción y extensión de la vida útil de los activos, convirtiendo datos en acciones inmediatas."
        },
        features: {
          title: "Funcionalidades Principales",
          items: [
            "Alertas inteligentes priorizadas",
            "Localización con mapas del sitio",
            "Agrupación por tipo de equipo",
            "Reportes de rendimiento detallados",
            "Análisis predictivo de tendencias",
            "Dashboards personalizables",
            "Visibilidad total de la flota"
          ]
        },
        equipment: {
          title: "Equipos Compatibles",
          items: [
            "Camiones de acarreo (ultra/medianos)",
            "Cargadores frontales",
            "Bulldozers y motoniveladoras",
            "Camiones cisterna y de servicio",
            "Vehículos livianos (camionetas)",
            "Equipos subterráneos"
          ]
        },
        benefits: {
          title: "Beneficios Operativos",
          items: [
            "Menos paradas no planificadas",
            "Mayor vida útil de neumáticos",
            "Reducción del costo por tonelada",
            "Seguridad mejorada para operadores",
            "Mantenimiento predictivo real",
            "Protección de la producción continua"
          ]
        }
      }
    },
    en: {
      name: 'Mining',
      benefits: ['Less downtime', 'Longer lifespan', 'Lower cost/ton', 'Safety'],
      marketInfo: 'TPMS platform designed for extreme mining conditions. Continuous monitoring that protects production and reduces cost per ton.',
      pageTitle: 'PressurePro Connect 2.0 for Mining Operations',
      description: 'Tires account for 20-25% of maintenance costs and cause approximately 38% of unplanned downtime. A single incident can cost over USD 100,000, in addition to safety risks from blowouts and increased braking distances. PressurePro Connect 2.0 is the TPMS platform specifically designed for these extreme conditions, offering continuous monitoring that combats 70% of premature wear due to under-inflation and eliminates manual inspection blind spots.',
      additional: 'Our solution offers total site visibility with prioritized intelligent alerts, location maps, and predictive analysis. Compatible with a wide range of equipment: haul trucks (ultra/medium), front loaders, bulldozers, graders, tanker trucks, and underground equipment. Benefits include a drastic reduction in cost per ton, longer tire lifespan, and continuous production protection through predictive maintenance. We are OEM partners of CAT, Sandvik and BELAZ, integrating our technology directly into their factory equipment.',
      structuredContent: {
        problems: {
          title: "Mining Challenges & Problems",
          items: [
            "Tires represent 20–25% of maintenance spend",
            "~38% of unplanned downtime caused by tires",
            "A single incident can cost > USD 100,000",
            "~50% of machines operate with under-inflated tires",
            "Up to 70% of premature wear due to under-inflation",
            "Manual inspections create blind spots and safety risks"
          ]
        },
        solution: {
          title: "Technology Solution: Connect 2.0",
          text: "TPMS platform designed to withstand extreme mining conditions. Offers continuous global monitoring, active failure prevention, production protection, and asset lifespan extension, converting data into immediate actions."
        },
        features: {
          title: "Key Features",
          items: [
            "Prioritized intelligent alerts",
            "Location with site maps",
            "Grouping by equipment type",
            "Detailed performance reports",
            "Predictive trend analysis",
            "Customizable dashboards",
            "Total fleet visibility"
          ]
        },
        equipment: {
          title: "Compatible Equipment",
          items: [
            "Haul trucks (ultra/medium)",
            "Front loaders",
            "Bulldozers and graders",
            "Tanker and service trucks",
            "Light vehicles (pickups)",
            "Underground equipment"
          ]
        },
        benefits: {
          title: "Operational Benefits",
          items: [
            "Less unplanned downtime",
            "Longer tire lifespan",
            "Reduced cost per ton",
            "Improved operator safety",
            "Real predictive maintenance",
            "Continuous production protection"
          ]
        }
      }
    },
    pt: {
      name: 'Mineração',
      benefits: ['Menos paradas', 'Maior vida útil', 'Menor custo/ton', 'Segurança'],
      marketInfo: 'Plataforma TPMS projetada para condições extremas de mineração. Monitoramento contínuo que protege a produção e reduz o custo por tonelada.',
      pageTitle: 'PressurePro Connect 2.0 para Operações de Mineração',
      description: 'Pneus representam 20-25% dos custos de manutenção e causam aproximadamente 38% das paradas não planejadas. Um único incidente pode custar mais de USD 100.000, além dos riscos de segurança por estouros e maior distância de frenagem. O PressurePro Connect 2.0 é a plataforma TPMS projetada especificamente para essas condições extremas, oferecendo monitoramento contínuo que combate 70% do desgaste prematuro por subinflação e elimina pontos cegos das inspeções manuais.',
      additional: 'Nossa solução oferece visibilidade total do local com alertas inteligentes priorizados, mapas de localização e análise preditiva. Compatível com uma ampla gama de equipamentos: caminhões de transporte (ultra/médios), carregadeiras frontais, tratores, motoniveladoras, caminhões-tanque e equipamentos subterrâneos. Os benefícios incluem uma redução drástica no custo por tonelada, maior vida útil dos pneus e proteção contínua da produção através de manutenção preditiva. Somos OEM de CAT, Sandvik e BELAZ, integrando nossa tecnologia diretamente em seus equipamentos de fábrica.',
      structuredContent: {
        problems: {
          title: "Desafios e Problemas na Mineração",
          items: [
            "Pneus representam 20–25% dos custos de manutenção",
            "~38% das paradas não planejadas são causadas por pneus",
            "Um incidente pode custar > USD 100.000",
            "~50% das máquinas operam com pneus desinflados",
            "Até 70% do desgaste prematuro devido à subinflação",
            "Inspeções manuais geram pontos cegos e riscos de segurança"
          ]
        },
        solution: {
          title: "Solução Tecnológica: Connect 2.0",
          text: "Plataforma TPMS projetada para suportar condições extremas de mineração. Oferece monitoramento global contínuo, prevenção ativa de falhas, proteção da produção e extensão da vida útil dos ativos, convertendo dados em ações imediatas."
        },
        features: {
          title: "Funcionalidades Principais",
          items: [
            "Alertas inteligentes priorizados",
            "Localização com mapas do local",
            "Agrupamento por tipo de equipamento",
            "Relatórios de desempenho detalhados",
            "Análise preditiva de tendências",
            "Dashboards personalizáveis",
            "Visibilidade total da frota"
          ]
        },
        equipment: {
          title: "Equipamentos Compatíveis",
          items: [
            "Caminhões de transporte (ultra/médios)",
            "Carregadeiras frontais",
            "Bulldozers e motoniveladoras",
            "Caminhões-tanque e de serviço",
            "Veículos leves (pickups)",
            "Equipamentos subterrâneos"
          ]
        },
        benefits: {
          title: "Benefícios Operacionais",
          items: [
            "Menos paradas não planejadas",
            "Maior vida útil dos pneus",
            "Redução do custo por tonelada",
            "Segurança melhorada para operadores",
            "Manutenção preditiva real",
            "Proteção da produção contínua"
          ]
        }
      }
    },
  },
  {
    id: 'world-2',
    slug: 'agricultura',
    imgUrl: '/agricultura.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    oems: OEM_PARTNERS.agricultura,
    es: {
      name: 'Agricultura',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'Para el sector agrícola, ofrecemos soluciones que maximizan el rendimiento de maquinaria y reducen tiempos de inactividad durante periodos críticos de siembra y cosecha.',
      pageTitle: 'Agricultura - Tecnología de Precisión',
      description: 'La tecnología PressurePro proporciona datos críticos para la maquinaria agrícola, permitiendo ajustes precisos que protegen los cultivos y optimizan el rendimiento del equipo. Nuestros sistemas monitorean constantemente la presión durante labores intensivas, donde cada hora de operación es crucial para el éxito de la temporada.',
      additional: 'Nuestros dispositivos ayudan a prevenir la dañina compactación del suelo causada por neumáticos con presión incorrecta, protegiendo tanto la tierra cultivable como la inversión en maquinaria. Los agricultores que utilizan PressurePro reportan hasta un 15% de mejora en la tracción y significativa reducción en el desgaste prematuro de componentes mecánicos. Somos OEM de CNH Industrial, integrando nuestra tecnología TPMS directamente en sus equipos agrícolas de fábrica.',
    },
    en: {
      name: 'Agriculture',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'For the agricultural sector, we offer solutions that maximize machinery performance and reduce downtime during critical planting and harvesting periods.',
      pageTitle: 'Agriculture - Precision Technology',
      description: 'PressurePro technology provides critical data for agricultural machinery, allowing precise adjustments that protect crops and optimize equipment performance. Our systems constantly monitor pressure during intensive work, where every hour of operation is crucial for the success of the season.',
      additional: 'Our devices help prevent harmful soil compaction caused by tires with incorrect pressure, protecting both arable land and machinery investment. Farmers using PressurePro report up to 15% improvement in traction and significant reduction in premature wear of mechanical components. We are OEM partners of CNH Industrial, integrating our TPMS technology directly into their factory agricultural equipment.',
    },
    pt: {
      name: 'Agricultura',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'Para o setor agrícola, oferecemos soluções que maximizam o desempenho de máquinas e reduzem o tempo de inatividade durante períodos críticos de plantio e colheita.',
      pageTitle: 'Agricultura - Tecnologia de Precisão',
      description: 'A tecnologia PressurePro fornece dados críticos para maquinaria agrícola, permitindo ajustes precisos que protegem as culturas e otimizam o desempenho do equipamento. Nossos sistemas monitoram constantemente a pressão durante trabalhos intensivos, onde cada hora de operação é crucial para o sucesso da temporada.',
      additional: 'Nossos dispositivos ajudam a prevenir a prejudicial compactação do solo causada por pneus com pressão incorreta, protegendo tanto a terra arável quanto o investimento em maquinaria. Agricultores que utilizam o PressurePro relatam até 15% de melhoria na tração e redução significativa no desgaste prematuro de componentes mecânicos. Somos OEM de CNH Industrial, integrando nossa tecnologia TPMS diretamente em seus equipamentos agrícolas de fábrica.',
    },
  },
  {
    id: 'world-3',
    slug: 'forestal',
    imgUrl: '/forestal.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    oems: OEM_PARTNERS.forestal,
    // successCases: keyed by locale (uy, ar, cl, etc.)
    // Cada país tiene su propio bloque con texto en el idioma local.
    // Para habilitar un nuevo país, agregá una entrada con su locale.
    successCases: {
      uy: {
        title: 'Clientes que ya lo comprueban',
        subtitle: 'Empresas forestales de Uruguay llevan años optimizando sus operaciones con PressurePro y ven resultados concretos.',
        metric: {
          value: '~1 neumático/mes',
          label: 'ahorro promedio por cliente',
          detail: '≈ USD 35.000 por año',
          footnote: 'Sin contar tiempos de parada, combustible ni costos de mantenimiento.',
        },
        companies: [
          { name: 'Dalfey', location: 'Rivera, Uruguay' },
          { name: 'Regnans Servicios Forestales', location: 'Tacuarembó, Uruguay' },
          { name: 'Timberfor', location: 'Tacuarembó, Uruguay' },
        ],
      },
      // ar: { title: '...', subtitle: '...', metric: { ... }, companies: [...] },
      // cl: { title: '...', subtitle: '...', metric: { ... }, companies: [...] },
    },
    es: {
      name: 'Forestal',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'En entornos forestales, nuestros sensores resisten condiciones difíciles y ayudan a mantener equipos funcionando en terrenos remotos y desafiantes.',
      pageTitle: 'Forestal - Monitoreo para Terrenos Difíciles',
      description: 'Desarrollamos tecnología especializada que soporta las exigencias únicas del trabajo forestal, donde los neumáticos enfrentan obstáculos constantes y superficies irregulares. Nuestro sistema de monitoreo mantiene la productividad en zonas donde una falla puede significar largos tiempos de espera y altos costos de recuperación.',
      additional: 'La conectividad avanzada de nuestros sistemas permite el monitoreo incluso en zonas de difícil acceso, enviando alertas tempranas antes de que los neumáticos sufran daños irreversibles. Esta capacidad es especialmente valiosa en operaciones forestales donde las máquinas trabajan en lugares remotos con limitado acceso a servicios de mantenimiento. Somos OEM de Tigercat, integrando nuestra tecnología TPMS directamente en sus equipos forestales de fábrica.',
    },
    en: {
      name: 'Forestry',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'In forestry environments, our sensors withstand tough conditions and help keep equipment running in remote and challenging terrains.',
      pageTitle: 'Forestry - Monitoring for Difficult Terrains',
      description: 'We develop specialized technology that supports the unique demands of forestry work, where tires face constant obstacles and irregular surfaces. Our monitoring system maintains productivity in areas where a failure can mean long waiting times and high recovery costs.',
      additional: 'The advanced connectivity of our systems allows monitoring even in hard-to-reach areas, sending early alerts before tires suffer irreversible damage. This capability is especially valuable in forestry operations where machines work in remote locations with limited access to maintenance services. We are OEM partners of Tigercat, integrating our TPMS technology directly into their factory forestry equipment.',
    },
    pt: {
      name: 'Florestal',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'Em ambientes florestais, nossos sensores resistem a condições difíceis e ajudam a manter os equipamentos funcionando em terrenos remotos e desafiadores.',
      pageTitle: 'Florestal - Monitoramento para Terrenos Difíceis',
      description: 'Desenvolvemos tecnologia especializada que suporta as exigências únicas do trabalho florestal, onde os pneus enfrentam obstáculos constantes e superfícies irregulares. Nosso sistema de monitoramento mantém a produtividade em áreas onde uma falha pode significar longos tempos de espera e altos custos de recuperação.',
      additional: 'A conectividade avançada de nossos sistemas permite o monitoramento mesmo em áreas de difícil acesso, enviando alertas precoces antes que os pneus sofram danos irreversíveis. Esta capacidade é especialmente valiosa em operações florestais onde as máquinas trabalham em locais remotos com acesso limitado a serviços de manutenção. Somos OEM de Tigercat, integrando nossa tecnologia TPMS diretamente em seus equipamentos florestais de fábrica.',
    },
  },
  {
    id: 'world-4',
    slug: 'portuario',
    imgUrl: '/port-overhead.jpg',
    secondaryImgUrl: '/port-manager.jpg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    oems: OEM_PARTNERS.portuario,
    es: {
      name: 'Portuario',
      benefits: ['Menos fallas', 'Mayor vida útil', 'Menor downtime', 'Seguridad'],
      marketInfo: 'Plataforma TPMS cloud para flotas mixtas portuarias. Monitoreo en tiempo real que previene fallas, reduce el downtime y mejora la seguridad operativa.',
      pageTitle: 'PressurePro Connect 2.0 para Operaciones Portuarias',
      description: 'El 50% de las fallas de neumáticos en puertos se deben a una inflación incorrecta, lo que aumenta peligrosamente la inestabilidad de equipos críticos como RTGs y Straddle carriers. Un incidente puede costar más de USD 5.000 y generar interrupciones en cadena. PressurePro Connect 2.0 es la solución cloud que convierte datos en tareas accionables, previniendo que el 30% de subinflación cause daños permanentes y garantizando la seguridad en el patio.',
      additional: 'Funcionalidades clave incluyen alertas configurables, ubicación con timestamp, agrupación por terminal/equipo y dashboards personalizables para análisis de tendencias. Soporte completo para RTGs, Straddle carriers, Top/side picks, camiones de patio, tractores terminales, Reach stackers y montacargas. Somos OEM de Kalmar, Konecranes, OrangeEV y Taylor, integrando nuestra tecnología TPMS directamente en sus equipos portuarios de fábrica. Optimice su operación reduciendo el downtime, mejorando la seguridad y extendiendo la vida útil de los activos con nuestra arquitectura escalable.',
      structuredContent: {
        problems: {
          title: "Problemas en Entornos Portuarios",
          items: [
            "50% de fallas de neumáticos por inflación incorrecta",
            "Neumáticos desinflados causan inestabilidad en equipos",
            "Un incidente puede costar USD 5.000+",
            "30% de subinflación causa daño permanente",
            "Interrupciones operativas en cadena",
            "Riesgo directo para operadores y carga"
          ]
        },
        solution: {
          title: "Solución Tecnológica: Connect 2.0",
          text: "Plataforma TPMS cloud para flotas mixtas portuarias. Monitoreo en tiempo real, alertas priorizadas y prevención de fallas evitables para un mayor control operativo y reducción de downtime."
        },
        features: {
          title: "Funcionalidades Principales",
          items: [
            "Alertas configurables y priorizadas",
            "Ubicación con timestamp y mapas",
            "Agrupación por vehículo/terminal/equipo",
            "Reportes descargables",
            "Análisis de tendencias",
            "Dashboards personalizables",
            "Visibilidad total de flota"
          ]
        },
        equipment: {
          title: "Equipos Compatibles",
          items: [
            "RTGs (grúas pórtico con ruedas)",
            "Straddle carriers",
            "Top/side picks",
            "Camiones de patio",
            "Tractores terminales",
            "Reach stackers",
            "Montacargas",
            "Camiones pesados"
          ]
        },
        benefits: {
          title: "Beneficios Operativos",
          items: [
            "Menos fallas de neumáticos",
            "Mayor vida útil",
            "Menor downtime",
            "Mejora en seguridad",
            "Reducción de costos",
            "Mantenimiento predictivo"
          ]
        }
      }
    },
    en: {
      name: 'Port',
      benefits: ['Less failures', 'Longer lifespan', 'Less downtime', 'Safety'],
      marketInfo: 'Cloud TPMS platform for mixed port fleets. Real-time monitoring that prevents failures, reduces downtime, and improves operational safety.',
      pageTitle: 'PressurePro Connect 2.0 for Port Operations',
      description: '50% of tire failures in ports are due to incorrect inflation, dangerously increasing the instability of critical equipment like RTGs and Straddle carriers. An incident can cost over USD 5,000 and create chain reaction interruptions. PressurePro Connect 2.0 is the cloud solution that converts data into actionable tasks, preventing 30% under-inflation from causing permanent damage and ensuring yard safety.',
      additional: 'Key features include configurable alerts, timestamped location, grouping by terminal/equipment, and customizable dashboards for trend analysis. Full support for RTGs, Straddle carriers, Top/side picks, yard trucks, terminal tractors, Reach stackers, and forklifts. We are OEM partners of Kalmar, Konecranes, OrangeEV and Taylor, integrating our TPMS technology directly into their factory port equipment. Optimize your operation by reducing downtime, improving safety, and extending asset lifespan with our scalable architecture.',
      structuredContent: {
        problems: {
          title: "Problems in Port Environments",
          items: [
            "50% of tire failures due to incorrect inflation",
            "Under-inflated tires cause equipment instability",
            "An incident can cost USD 5,000+",
            "30% under-inflation causes permanent damage",
            "Chain reaction operational interruptions",
            "Direct risk to operators and cargo"
          ]
        },
        solution: {
          title: "Technology Solution: Connect 2.0",
          text: "Cloud TPMS platform for mixed port fleets. Real-time monitoring, prioritized alerts, and preventable failure prevention for greater operational control and reduced downtime."
        },
        features: {
          title: "Key Features",
          items: [
            "Configurable and prioritized alerts",
            "Location with timestamp and maps",
            "Grouping by vehicle/terminal/equipment",
            "Downloadable reports",
            "Trend analysis",
            "Customizable dashboards",
            "Total fleet visibility"
          ]
        },
        equipment: {
          title: "Compatible Equipment",
          items: [
            "RTGs (Rubber Tyred Gantry cranes)",
            "Straddle carriers",
            "Top/side picks",
            "Yard trucks",
            "Terminal tractors",
            "Reach stackers",
            "Forklifts",
            "Heavy trucks"
          ]
        },
        benefits: {
          title: "Operational Benefits",
          items: [
            "Fewer tire failures",
            "Longer lifespan",
            "Less downtime",
            "Improved safety",
            "Cost reduction",
            "Predictive maintenance"
          ]
        }
      }
    },
    pt: {
      name: 'Portuário',
      benefits: ['Menos falhas', 'Maior vida útil', 'Menor downtime', 'Segurança'],
      marketInfo: 'Plataforma TPMS em nuvem para frotas portuárias mistas. Monitoramento em tempo real que previne falhas, reduz o downtime e melhora a segurança operacional.',
      pageTitle: 'PressurePro Connect 2.0 para Operações Portuárias',
      description: '50% das falhas de pneus em portos devem-se à inflação incorreta, aumentando perigosamente a instabilidade de equipamentos críticos como RTGs e Straddle carriers. Um incidente pode custar mais de USD 5.000 e gerar interrupções em cadeia. O PressurePro Connect 2.0 é a solução em nuvem que converte dados em tarefas acionáveis, prevenindo que 30% de subinflação cause danos permanentes e garantindo a segurança no pátio.',
      additional: 'Funcionalidades principais incluem alertas configuráveis, localização com timestamp, agrupamento por terminal/equipamento e dashboards personalizáveis para análise de tendências. Suporte completo para RTGs, Straddle carriers, Top/side picks, caminhões de pátio, tratores terminais, Reach stackers e empilhadeiras. Somos OEM de Kalmar, Konecranes, OrangeEV e Taylor, integrando nossa tecnologia TPMS diretamente em seus equipamentos portuários de fábrica. Otimize sua operação reduzindo o downtime, melhorando a segurança e estendendo a vida útil dos ativos com nossa arquitetura escalável.',
      structuredContent: {
        problems: {
          title: "Problemas em Ambientes Portuários",
          items: [
            "50% das falhas de pneus devido à inflação incorreta",
            "Pneus desinflados causam instabilidade no equipamento",
            "Um incidente pode custar USD 5.000+",
            "30% de subinflação causa dano permanente",
            "Interrupções operacionais em cadeia",
            "Risco direto para operadores e carga"
          ]
        },
        solution: {
          title: "Solução Tecnológica: Connect 2.0",
          text: "Plataforma TPMS em nuvem para frotas portuárias mistas. Monitoramento em tempo real, alertas priorizados e prevenção de falhas evitáveis para maior controle operacional e redução de downtime."
        },
        features: {
          title: "Funcionalidades Principais",
          items: [
            "Alertas configuráveis e priorizados",
            "Localização com timestamp e mapas",
            "Agrupamento por veículo/terminal/equipamento",
            "Relatórios para download",
            "Análise de tendências",
            "Dashboards personalizáveis",
            "Visibilidade total da frota"
          ]
        },
        equipment: {
          title: "Equipamentos Compatíveis",
          items: [
            "RTGs (guindastes pórticos sobre pneus)",
            "Straddle carriers",
            "Top/side picks",
            "Caminhões de pátio",
            "Tratores terminais",
            "Reach stackers",
            "Empilhadeiras",
            "Caminhões pesados"
          ]
        },
        benefits: {
          title: "Benefícios Operacionais",
          items: [
            "Menos falhas de pneus",
            "Maior vida útil",
            "Menor downtime",
            "Melhoria na segurança",
            "Redução de custos",
            "Manutenção preditiva"
          ]
        }
      }
    },
  },
  {
    id: 'world-5',
    slug: 'industrial',
    imgUrl: '/industrial.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    oems: OEM_PARTNERS.industrial,
    es: {
      name: 'Industrial',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'En ambientes industriales, nuestras soluciones mejoran la confiabilidad de equipos y reducen riesgos en operaciones continuas donde la seguridad es prioritaria.',
      pageTitle: 'Industrial - Eficiencia y Seguridad',
      description: 'Las instalaciones industriales modernas requieren soluciones de monitoreo que mantengan la continuidad operativa. Nuestra tecnología se integra perfectamente en los protocolos de mantenimiento preventivo, alertando sobre variaciones de presión que podrían comprometer la seguridad del personal y la integridad de los equipos especializados.',
      additional: 'En ambientes industriales con operación continua, nuestro sistema se integra con plataformas IoT existentes, centralizando la información para una gestión eficiente de activos. Esta conectividad permite análisis predictivos que identifican patrones de desgaste antes de que comprometan la producción, especialmente valioso en operaciones de tres turnos. Somos OEM de Hyster-Yale, JCB y Hitachi, integrando nuestra tecnología TPMS directamente en sus equipos industriales de fábrica.',
    },
    en: {
      name: 'Industrial',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'In industrial settings, our solutions enhance equipment reliability and reduce risks in continuous operations where safety is a priority.',
      pageTitle: 'Industrial - Efficiency and Safety',
      description: 'Modern industrial facilities require monitoring solutions that maintain operational continuity. Our technology integrates perfectly into preventive maintenance protocols, alerting about pressure variations that could compromise personnel safety and the integrity of specialized equipment.',
      additional: 'In industrial environments with continuous operation, our system integrates with existing IoT platforms, centralizing information for efficient asset management. This connectivity enables predictive analysis that identifies wear patterns before they compromise production, especially valuable in three-shift operations. We are OEM partners of Hyster-Yale, JCB and Hitachi, integrating our TPMS technology directly into their factory industrial equipment.',
    },
    pt: {
      name: 'Industrial',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'Em ambientes industriais, nossas soluções melhoram a confiabilidade dos equipamentos e reduzem riscos em operações contínuas onde a segurança é prioritária.',
      pageTitle: 'Industrial - Eficiência e Segurança',
      description: 'Instalações industriais modernas requerem soluções de monitoramento que mantenham a continuidade operacional. Nossa tecnologia se integra perfeitamente aos protocolos de manutenção preventiva, alertando sobre variações de pressão que poderiam comprometer a segurança do pessoal e a integridade dos equipamentos especializados.',
      additional: 'Em ambientes industriais com operação contínua, nosso sistema se integra com plataformas IoT existentes, centralizando informações para uma gestão eficiente de ativos. Esta conectividade permite análises preditivas que identificam padrões de desgaste antes que comprometam a produção, especialmente valioso em operações de três turnos. Somos OEM de Hyster-Yale, JCB e Hitachi, integrando nossa tecnologia TPMS diretamente em seus equipamentos industriais de fábrica.',
    },
  },
  {
    id: 'world-6',
    slug: 'transporte',
    imgUrl: '/transport.jpeg',
    benefitIcons: ['efficiency', 'savings', 'safety', 'innovation'],
    oems: OEM_PARTNERS.transporte,
    techIntegrations: {
      partners: [
        { name: 'Easymail', url: 'https://easymail.net.uy/', logo: '/partners/logo-easymail.png' },
        { name: 'MobilTrack', url: 'https://www.mobiltrack.com/', logo: '/partners/logo-mobil.track.png' },
      ],
      es: {
        title: 'Integración con Plataformas de Gestión',
        description: 'Estamos integrados con Easymail y MobilTrack, dos de las principales plataformas de gestión de flotas de la región. Esto significa que los clientes que utilizan sus plataformas pueden visualizar directamente la información de presión, temperatura y alertas de los neumáticos proveniente de PressurePro, sin necesidad de sistemas adicionales.',
      },
      en: {
        title: 'Integration with Fleet Management Platforms',
        description: 'We are integrated with Easymail and MobilTrack, two of the leading fleet management platforms in the region. This means that customers using their platforms can directly view tire pressure, temperature and alert information from PressurePro, without the need for additional systems.',
      },
      pt: {
        title: 'Integração com Plataformas de Gestão',
        description: 'Estamos integrados com Easymail e MobilTrack, duas das principais plataformas de gestão de frotas da região. Isso significa que os clientes que utilizam suas plataformas podem visualizar diretamente as informações de pressão, temperatura e alertas dos pneus provenientes do PressurePro, sem necessidade de sistemas adicionais.',
      },
    },
    es: {
      name: 'Transporte y Aeronáutico',
      benefits: ['Eficiencia', 'Ahorro', 'Seguridad', 'Innovación'],
      marketInfo: 'En el transporte terrestre y aeronáutico, nuestro sistema de monitoreo de neumáticos optimiza la vida útil de equipos de alto costo y mejora la seguridad operacional en entornos extremos.',
      pageTitle: 'Transporte y Aeronáutico - Sistemas de Monitoreo',
      description: 'Los profesionales del transporte terrestre y aeronáutico enfrentan desafíos constantes que ponen a prueba sus vehículos. Nuestro sistema proporciona información crucial que ayuda a programar mantenimientos sin interrumpir las rutas planificadas, garantizando entregas puntuales y operaciones seguras mientras se extiende la vida útil de la flota.',
      additional: 'Ofrecemos configuraciones específicas para diferentes tipos de vehículos de transporte y aeronáuticos, desde camiones de larga distancia hasta flotas de distribución urbana y vehículos especializados. Los gestores de flota pueden establecer parámetros personalizados para cada ruta y carga, recibiendo alertas específicas que permiten decisiones informadas para optimizar cada kilómetro recorrido. Somos OEM de Bombardier, REV Group, Tiffin y Newell, integrando nuestra tecnología TPMS directamente en sus vehículos de fábrica.',
    },
    en: {
      name: 'Transport & Aeronautics',
      benefits: ['Efficiency', 'Savings', 'Safety', 'Innovation'],
      marketInfo: 'In ground and aeronautical transportation, our tire monitoring system optimizes the lifespan of high-cost equipment and enhances operational safety in extreme environments.',
      pageTitle: 'Transport & Aeronautics - Monitoring Systems',
      description: 'Ground and aeronautical transportation professionals face constant challenges that test their vehicles. Our system provides crucial information that helps schedule maintenance without interrupting planned routes, ensuring timely deliveries and safe operations while extending the fleet\'s useful life.',
      additional: 'We offer specific configurations for different types of transport and aeronautical vehicles, from long-distance trucks to urban distribution fleets and specialized vehicles. Fleet managers can establish customized parameters for each route and load, receiving specific alerts that allow informed decisions to optimize every kilometer traveled. We are OEM partners of Bombardier, REV Group, Tiffin and Newell, integrating our TPMS technology directly into their factory vehicles.',
    },
    pt: {
      name: 'Transporte e Aeronáutico',
      benefits: ['Eficiência', 'Economia', 'Segurança', 'Inovação'],
      marketInfo: 'No transporte terrestre e aeronáutico, nosso sistema de monitoramento de pneus otimiza a vida útil de equipamentos de alto custo e melhora a segurança operacional em ambientes extremos.',
      pageTitle: 'Transporte e Aeronáutico - Sistemas de Monitoramento',
      description: 'Os profissionais de transporte terrestre e aeronáutico enfrentam desafios constantes que testam seus veículos. Nosso sistema fornece informações cruciais que ajudam a programar manutenções sem interromper rotas planejadas, garantindo entregas pontuais e operações seguras enquanto estende a vida útil da frota.',
      additional: 'Oferecemos configurações específicas para diferentes tipos de veículos de transporte e aeronáuticos, desde caminhões de longa distância até frotas de distribuição urbana e veículos especializados. Os gestores de frota podem estabelecer parâmetros personalizados para cada rota e carga, recebendo alertas específicos que permitem decisões informadas para otimizar cada quilômetro percorrido. Somos OEM de Bombardier, REV Group, Tiffin e Newell, integrando nossa tecnologia TPMS diretamente em seus veículos de fábrica.',
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
    benefit1[ind.id] = c.benefits[0] ?? '';
    benefit2[ind.id] = c.benefits[1] ?? '';
    benefit3[ind.id] = c.benefits[2] ?? '';
    benefit4[ind.id] = c.benefits[3] ?? '';
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
