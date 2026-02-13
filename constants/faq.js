// Preguntas frecuentes con keywords optimizadas para SEO

export const getFAQsByLanguage = (language = 'es') => {
  const faqs = {
    es: [
      {
        question: "¿Qué es un sistema TPMS y cómo funciona?",
        answer: "Un sistema TPMS (Tire Pressure Monitoring System) es un sistema de monitoreo de presión de neumáticos en tiempo real. Los sensores TPMS de PressurePro se instalan en cada neumático y transmiten datos continuos de presión y temperatura a un monitor central. Esto permite detectar pérdidas de presión, sobrecalentamiento y prevenir reventones antes de que ocurran accidentes.",
        keywords: ["TPMS", "monitoreo de presión", "sensores de neumáticos", "prevención de reventones"]
      },
      {
        question: "¿Cuánto combustible puedo ahorrar con un sistema TPMS?",
        answer: "Con el sistema TPMS de PressurePro, las flotas pueden ahorrar hasta 15% en consumo de combustible al mantener la presión óptima de los neumáticos. La presión incorrecta de neumáticos aumenta la resistencia al rodamiento, lo que incrementa el consumo de combustible y el desgaste prematuro. El monitoreo en tiempo real asegura que todos los neumáticos mantengan la presión ideal.",
        keywords: ["ahorro de combustible", "eficiencia operativa", "presión óptima", "reducción de costos"]
      },
      {
        question: "¿El sistema TPMS funciona en operaciones mineras de altura?",
        answer: "Sí, los sensores TPMS PressurePro están diseñados para operaciones en condiciones extremas, incluyendo minería a gran altura en los Andes (Chile, Perú, Bolivia). Los sensores funcionan en rangos de temperatura de -40°C a +125°C y están certificados para equipos mineros, camiones de alto tonelaje y maquinaria pesada.",
        keywords: ["TPMS minería", "operaciones altura", "neumáticos mineros", "condiciones extremas"]
      },
      {
        question: "¿Cómo se instalan los sensores TPMS en los neumáticos?",
        answer: "Los sensores TPMS de PressurePro se instalan directamente en el vástago de la válvula del neumático, sin necesidad de desmontar el neumático. La instalación es rápida (15-20 minutos por vehículo) y no requiere herramientas especiales. Cada sensor se conecta de forma inalámbrica al monitor central, permitiendo monitoreo en tiempo real desde la cabina.",
        keywords: ["instalación TPMS", "sensores inalámbricos", "instalación rápida", "vástago válvula"]
      },
      {
        question: "¿Qué industrias se benefician más del sistema TPMS?",
        answer: "El sistema TPMS de PressurePro es ideal para: minería (camiones mineros, equipos pesados), transporte de carga (flotillas comerciales, logística), operaciones portuarias (reach stackers, grúas móviles), industria forestal (harvester, forwarder), agricultura (tractores, cosechadoras) y construcción. Cualquier operación con flotas vehiculares se beneficia de la prevención de fallas y optimización de costos.",
        keywords: ["TPMS minería", "TPMS transporte", "TPMS flotas", "industrias TPMS"]
      },
      {
        question: "¿El sistema TPMS previene realmente accidentes?",
        answer: "Sí, el sistema TPMS reduce hasta 80% los accidentes por fallas de neumáticos. Los sensores detectan pérdidas lentas de presión, sobrecalentamiento y condiciones anormales antes de que provoquen un reventón. Las alertas en tiempo real permiten al conductor tomar acción preventiva, evitando accidentes graves, volcamientos y daños a la carga.",
        keywords: ["prevención accidentes", "seguridad vehicular", "alertas tiempo real", "reventones neumáticos"]
      },
      {
        question: "¿Cuánto dura la batería de los sensores TPMS?",
        answer: "Los sensores TPMS PressurePro tienen una vida útil de batería de 5-7 años con uso continuo, equivalente a más de 500,000 km de operación. Las baterías son reemplazables y cada sensor incluye indicador de batería baja en el monitor. No requieren mantenimiento durante su vida útil.",
        keywords: ["duración batería TPMS", "mantenimiento sensores", "vida útil TPMS"]
      },
      {
        question: "¿El sistema TPMS funciona en acoplados y remolques?",
        answer: "Sí, el sistema TPMS PressurePro incluye modelos específicos (LINK) para configuraciones de acople y desacople, permitiendo monitorear hasta 34 neumáticos simultáneamente (tractor + acoplado). Los sensores en el remolque se comunican con el monitor en la cabina del tractor a través de repetidores, ideal para transporte de carga de larga distancia.",
        keywords: ["TPMS acoplados", "TPMS remolques", "flotas transporte", "monitoreo múltiple"]
      },
      {
        question: "¿Qué diferencia al sistema TPMS PressurePro de otros?",
        answer: "PressurePro se diferencia por: (1) Tecnología patentada de alta frecuencia de muestreo (actualización cada 6 segundos vs 60 segundos de otros sistemas), (2) Sensores con certificación para equipos pesados y minería, (3) Funciona en temperaturas extremas (-40°C a +125°C), (4) Fabricado en USA con 30+ años de experiencia, (5) Soporte técnico local en toda América Latina.",
        keywords: ["tecnología TPMS", "PressurePro ventajas", "sensores profesionales", "calidad USA"]
      },
      {
        question: "¿Cómo afecta la presión incorrecta al desgaste de neumáticos?",
        answer: "Los neumáticos con presión incorrecta sufren desgaste irregular y prematuro: baja presión provoca desgaste en los bordes y sobrecalentamiento (reduciendo vida útil hasta 25%), mientras que alta presión causa desgaste central y menor tracción. El sistema TPMS mantiene presión óptima, extendiendo la vida útil de neumáticos hasta 20% y reduciendo costos de reemplazo.",
        keywords: ["desgaste neumáticos", "vida útil neumáticos", "presión correcta", "ahorro mantenimiento"]
      }
    ],
    en: [
      {
        question: "What is a TPMS system and how does it work?",
        answer: "A TPMS (Tire Pressure Monitoring System) is a real-time tire pressure monitoring system. PressurePro TPMS sensors are installed on each tire and continuously transmit pressure and temperature data to a central monitor. This allows detection of pressure loss, overheating, and prevents blowouts before accidents occur.",
        keywords: ["TPMS", "pressure monitoring", "tire sensors", "blowout prevention"]
      },
      {
        question: "How much fuel can I save with a TPMS system?",
        answer: "With PressurePro's TPMS system, fleets can save up to 15% in fuel consumption by maintaining optimal tire pressure. Incorrect tire pressure increases rolling resistance, which raises fuel consumption and premature wear. Real-time monitoring ensures all tires maintain ideal pressure.",
        keywords: ["fuel savings", "operational efficiency", "optimal pressure", "cost reduction"]
      },
      {
        question: "Does the TPMS system work in high-altitude mining operations?",
        answer: "Yes, PressurePro TPMS sensors are designed for extreme conditions, including high-altitude mining in the Andes (Chile, Peru, Bolivia). Sensors operate in temperature ranges from -40°C to +125°C and are certified for mining equipment, high-tonnage trucks, and heavy machinery.",
        keywords: ["mining TPMS", "high altitude operations", "mining tires", "extreme conditions"]
      },
      {
        question: "How are TPMS sensors installed on tires?",
        answer: "PressurePro TPMS sensors install directly onto the tire valve stem, without needing to dismount the tire. Installation is quick (15-20 minutes per vehicle) and requires no special tools. Each sensor connects wirelessly to the central monitor, enabling real-time monitoring from the cabin.",
        keywords: ["TPMS installation", "wireless sensors", "quick install", "valve stem"]
      },
      {
        question: "Which industries benefit most from TPMS systems?",
        answer: "PressurePro's TPMS system is ideal for: mining (mining trucks, heavy equipment), freight transport (commercial fleets, logistics), port operations (reach stackers, mobile cranes), forestry (harvesters, forwarders), agriculture (tractors, harvesters), and construction. Any operation with vehicle fleets benefits from failure prevention and cost optimization.",
        keywords: ["mining TPMS", "transport TPMS", "fleet TPMS", "TPMS industries"]
      }
    ],
    pt: [
      {
        question: "O que é um sistema TPMS e como funciona?",
        answer: "Um sistema TPMS (Tire Pressure Monitoring System) é um sistema de monitoramento de pressão de pneus em tempo real. Os sensores TPMS da PressurePro são instalados em cada pneu e transmitem dados contínuos de pressão e temperatura para um monitor central. Isso permite detectar perdas de pressão, superaquecimento e prevenir estouros antes que ocorram acidentes.",
        keywords: ["TPMS", "monitoramento de pressão", "sensores de pneus", "prevenção de estouros"]
      },
      {
        question: "Quanto combustível posso economizar com um sistema TPMS?",
        answer: "Com o sistema TPMS da PressurePro, as frotas podem economizar até 15% no consumo de combustível mantendo a pressão ideal dos pneus. A pressão incorreta aumenta a resistência ao rolamento, o que aumenta o consumo de combustível e o desgaste prematuro. O monitoramento em tempo real garante que todos os pneus mantenham a pressão ideal.",
        keywords: ["economia de combustível", "eficiência operacional", "pressão ideal", "redução de custos"]
      },
      {
        question: "O sistema TPMS funciona em operações de mineração em altitude?",
        answer: "Sim, os sensores TPMS PressurePro são projetados para operações em condições extremas, incluindo mineração em alta altitude nos Andes (Chile, Peru, Bolívia). Os sensores funcionam em faixas de temperatura de -40°C a +125°C e são certificados para equipamentos de mineração, caminhões de alta tonelagem e maquinário pesado.",
        keywords: ["TPMS mineração", "operações altitude", "pneus mineração", "condições extremas"]
      },
      {
        question: "Como os sensores TPMS são instalados nos pneus?",
        answer: "Os sensores TPMS da PressurePro são instalados diretamente na haste da válvula do pneu, sem necessidade de desmontar o pneu. A instalação é rápida (15-20 minutos por veículo) e não requer ferramentas especiais. Cada sensor se conecta sem fio ao monitor central, permitindo monitoramento em tempo real da cabine.",
        keywords: ["instalação TPMS", "sensores sem fio", "instalação rápida", "haste válvula"]
      },
      {
        question: "Quais indústrias se beneficiam mais do sistema TPMS?",
        answer: "O sistema TPMS da PressurePro é ideal para: mineração (caminhões de mineração, equipamentos pesados), transporte de carga (frotas comerciais, logística), operações portuárias (reach stackers, guindastes móveis), indústria florestal (harvesters, forwarders), agricultura (tratores, colheitadeiras) e construção. Qualquer operação com frotas de veículos se beneficia da prevenção de falhas e otimização de custos.",
        keywords: ["TPMS mineração", "TPMS transporte", "TPMS frotas", "indústrias TPMS"]
      }
    ]
  };

  return faqs[language] || faqs.es;
};
