import { useRouter } from 'next/router';
import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, textVariant } from '../utils/motion';
import { TypingText, TitleText } from '../components/CustomTexts';
import { Navbar, Footer, WhatsAppButton, Breadcrumbs } from '../components';
import { LanguageContext } from '../context/LanguageContext';
import { COUNTRIES, LANGUAGES } from '../config/countries';

// ─── Contenido del artículo por idioma ───────────────────────
const ARTICLE_CONTENT = {
  es: {
    seoTitle: 'La Presión de Neumáticos Ahorra Combustible | Estudio PressurePro TPMS',
    seoDescription: 'Estudio real que demuestra cómo la presión correcta de neumáticos reduce hasta un 8.5% el consumo de combustible en camiones. Datos verificados con sistema TPMS PressurePro.',
    breadcrumb: 'Ahorro de Combustible',
    typingText: 'Caso de Estudio',
    heroTitle: '¿La presión de neumáticos ahorra combustible?',
    heroSubtitle: 'Hemos probado y demostrado la dependencia del consumo de combustible respecto a la presión de los neumáticos.',
    // Intro
    introTitle: 'Lo que todos saben, pero pocos miden',
    introText1: 'La relación entre el consumo de combustible y la presión de los neumáticos es conocida desde hace mucho tiempo. Tanto conductores profesionales como aficionados aplican la regla simple: "si quieres ahorrar combustible, infla bien las ruedas". Pero muchas veces se inflan de más.',
    introText2: 'Algunos están dispuestos a sacrificar confort y seguridad: los baches se sienten mucho más en neumáticos sobreinflados, la superficie de contacto con el camino disminuye y la distancia de frenado aumenta. Olvidan que al buscar ahorro de combustible pierden vida útil del neumático.',
    introText3: 'La situación opuesta también es frecuente: neumáticos sin monitorear que visualmente se ven desinflados. Es un caso extremo, pero los conductores muchas veces no saben qué presión tienen. Visualmente, un neumático de camión inflado a 115 PSI es indistinguible de uno a 90 PSI.',
    introHighlight: 'Esta diferencia de presión —115 PSI vs 90 PSI— es la que elegimos para nuestro experimento.',
    // Experimento
    experimentTitle: '¿En qué consiste el experimento?',
    experimentText1: 'Una noche nos reunimos con representantes de una conocida empresa de alimentos que accedió a proporcionar su transporte para el experimento en una autopista de circunvalación. Decidimos hacer las mediciones de noche para evitar el tráfico.',
    experimentText2: 'Se utilizaron dos camiones MAN TGS 4×2 con semirremolques de tres ejes idénticos.',
    experimentText3: 'Por supuesto, entendíamos perfectamente que no existen vehículos con exactamente el mismo consumo de combustible. Además, nuestros camiones ya tenían 4 años. Es una edad considerable para vehículos comerciales, lo que también afecta el consumo. Pero no íbamos a comparar el consumo entre vehículos, solo necesitábamos encontrar cómo la presión de neumáticos lo afecta.',
    experimentText4: 'Verificamos e igualamos la presión de los neumáticos a 115 PSI (en frío), llenamos completamente los tanques de combustible e instalamos rastreadores GPS GalileoSKY y el sistema TPMS PressurePro.',
    tireInfo: 'Ambos camiones estaban equipados con neumáticos de camión con 10% de desgaste en el eje de dirección y aproximadamente 50% en las demás ruedas.',
    // Etapa 1
    stage1Label: 'Etapa',
    stage1Title: 'Primera vuelta: línea base',
    stage1Ready: '¡A rodar!',
    stage1ReadyText: 'Los conductores están listos con todas las instrucciones necesarias. Se prepararon 14 bidones de diésel pesados y marcados para reabastecer los camiones al regreso. Balanzas electrónicas con precisión de 5 gramos permitieron determinar el volumen de diésel en litros.',
    stage1ResultTitle: 'La primera etapa terminó, los camiones MAN están de vuelta.',
    stage1ResultText: 'Ambos camiones recorrieron 142 km con una velocidad promedio de 77 km/h, pero el consumo de combustible fue diferente.',
    stage1Truck1: 'Camión 1: reabastecido con 33.575 kg de combustible = 39.5 litros',
    stage1Truck2: 'Camión 2: reabastecido con 35.335 kg = 41.57 litros',
    stage1Consumption: 'El consumo fue de 27.81 y 29.27 l/100 km respectivamente.',
    stage1Note: 'Hay una diferencia clara entre vehículos.',
    // Cambio de presión
    pressureChangeTitle: 'Modificación de presión',
    pressureChangeText1: 'Dejamos a los conductores descansar y que los vehículos se enfriaran. Luego revisamos la presión y realizamos ajustes.',
    pressureChangeText2: 'Reducimos la presión de neumáticos solo en 4 ruedas de las 12 en el eje motriz del primer camión, bajándola a 90 PSI.',
    pressureChangeHighlight: 'Estas 4 ruedas son visualmente indistinguibles de las demás, que siguen infladas a 115 PSI.',
    pressureChangeText3: 'La presión del segundo camión se mantiene sin cambios.',
    pressureChangeText4: 'Esperamos que el consumo de combustible de ambos camiones cambie por condiciones de carretera, clima, estilo de conducción, etc. Pero para el primer camión, el cambio también será causado por la menor presión en el eje motriz.',
    // Etapa 2
    stage2Title: 'Segunda vuelta: el momento de la verdad',
    stage2ResultText: 'El kilometraje y la velocidad promedio se mantuvieron iguales. Pero el primer camión, que mostró la mejor economía en la primera etapa, ahora se convirtió en el perdedor.',
    stage2Truck1: 'Camión 1: reabastecido con 36.428 kg = 42.85 litros',
    stage2Truck2: 'Camión 2: reabastecido con 35.875 kg = 42.18 litros',
    stage2Consumption: 'El consumo del primer caso aumentó a 30.18 l/100 km, y en el segundo caso casi no cambió: 29.7 l/100 km.',
    // Resultados
    resultsTitle: 'Resultados del experimento',
    resultsPercentage: 'En porcentaje: +1.5% por errores de medición y +8.5% por la disminución de presión.',
    resultsHighlight: '+8.5% de aumento en consumo de combustible',
    resultsSubtext: 'Solo por reducir la presión de 115 PSI a 90 PSI en 4 de 12 neumáticos del eje motriz.',
    // Impacto
    impactTitle: 'El impacto real en su operación',
    impactText1: 'A primera vista, 7% no parece una cifra grande.',
    impactText2: 'Pero imagine una empresa de transporte promedio con 100 vehículos, recorriendo 100.000 km al año (no es una gran distancia para camiones comerciales). Considerando que los camiones van pesados y las carreteras a menudo son peores que las autopistas, el consumo será mayor que en el experimento, digamos 35 l/100 km.',
    impactCalculation: 'Así, cada camión consume alrededor de 35.000 litros de combustible al año.',
    impactMultiply: 'Multiplíquelo por 100 camiones y los precios crecientes del combustible.',
    impactConclusion: 'Y eso sin incluir las pérdidas por reducción de vida útil de los neumáticos y la seguridad del transporte.',
    impactQuestion: '¿Realmente está dispuesto a pagar ese precio?',
    // Stats
    statDistance: 'km recorridos',
    statSpeed: 'km/h promedio',
    statWheels: 'ruedas modificadas',
    statTotal: 'del total de ruedas',
    // CTA
    ctaTitle: 'Controle la presión. Controle los costos.',
    ctaSubtitle: 'PressurePro TPMS le permite monitorear en tiempo real la presión de cada neumático de su flota, previniendo pérdidas silenciosas de combustible y extendiendo la vida útil de sus neumáticos.',
    ctaButton: 'Solicitar demostración',
    // Table
    tableTitle: 'Comparativa de consumo',
    tableHeader: ['', 'Camión 1', 'Camión 2'],
    tableStage1: 'Etapa 1 (115 PSI)',
    tableStage2: 'Etapa 2',
    tableChange: 'Variación',
    tablePressure: 'Presión etapa 2',
    tableStage1Values: ['27.81 l/100km', '29.27 l/100km'],
    tableStage2Values: ['30.18 l/100km', '29.70 l/100km'],
    tableChangeValues: ['+8.5%', '+1.5%'],
    tablePressureValues: ['90 PSI (4 ruedas)', '115 PSI (sin cambio)'],
  },
  en: {
    seoTitle: 'Tire Pressure Saves Fuel | PressurePro TPMS Study',
    seoDescription: 'Real study demonstrating how correct tire pressure reduces fuel consumption by up to 8.5% in trucks. Data verified with PressurePro TPMS system.',
    breadcrumb: 'Fuel Savings',
    typingText: 'Case Study',
    heroTitle: 'Does tire pressure save fuel?',
    heroSubtitle: 'We tested and demonstrated the dependency of fuel consumption on tire pressure.',
    introTitle: 'What everyone knows, but few measure',
    introText1: 'The relationship between fuel consumption and tire pressure has been known for a long time. Both professional and amateur drivers follow the simple rule: "if you want to save fuel, pump up the wheels." But they often overpump them.',
    introText2: 'Some are willing to sacrifice both comfort and safety: bumps are felt much more on overpumped tires, the contact patch decreases and braking distance increases. They forget that in pursuit of fuel economy, tire service life is lost.',
    introText3: 'The opposite situation is also common: unmonitored tires that visually look half-flat. It\'s an extreme case, but drivers often don\'t know what pressure they have. Visually, a truck tire inflated to 115 PSI is indistinguishable from one at 90 PSI.',
    introHighlight: 'This pressure difference — 115 PSI vs 90 PSI — is what we chose for our experiment.',
    experimentTitle: 'What\'s the experiment about?',
    experimentText1: 'One night we met with representatives of a well-known food company that agreed to provide their trucks for the experiment on a city ring road. We decided to run our measurements at night to avoid traffic.',
    experimentText2: 'Two MAN TGS 4×2 trucks with identical three-axle semi-trailers were used.',
    experimentText3: 'Of course, we understood perfectly well that no two vehicles have exactly the same fuel consumption. Moreover, our trucks were already 4 years old — a mature age for commercial vehicles that also affects fuel consumption. But we weren\'t comparing fuel consumption between vehicles; we just needed to find how tire pressure affects it.',
    experimentText4: 'We checked and equalized tire pressure to 115 PSI (cold state), fully refueled the trucks, and set up GalileoSKY GPS trackers and PressurePro TPMS.',
    tireInfo: 'Both trucks were equipped with truck tires with 10% tread wear on the steering axle and around 50% on other wheels.',
    stage1Label: 'Stage',
    stage1Title: 'First lap: baseline',
    stage1Ready: 'Let\'s go!',
    stage1ReadyText: 'Drivers are ready with all necessary instructions. 14 weighed and marked diesel fuel cans were prepared to refuel the trucks upon return. Electronic scales with 5-gram accuracy allowed us to determine the diesel volume in liters.',
    stage1ResultTitle: 'The first stage is over, the MAN trucks are back.',
    stage1ResultText: 'Both trucks covered 142 km at an average speed of 77 km/h, but fuel consumption was different.',
    stage1Truck1: 'Truck 1: refueled with 33.575 kg of fuel = 39.5 liters',
    stage1Truck2: 'Truck 2: refueled with 35.335 kg = 41.57 liters',
    stage1Consumption: 'Fuel consumption was 27.81 and 29.27 l/100 km respectively.',
    stage1Note: 'There is a clear difference between vehicles.',
    pressureChangeTitle: 'Pressure modification',
    pressureChangeText1: 'We let the drivers rest and the vehicles cool down. Then we checked tire pressure again and made adjustments.',
    pressureChangeText2: 'We decreased tire pressure on only 4 out of 12 wheels on the driving axle of the first truck, down to 90 PSI.',
    pressureChangeHighlight: 'These 4 wheels are visually indistinguishable from the others, still inflated to 115 PSI.',
    pressureChangeText3: 'The second truck\'s tire pressure remains the same.',
    pressureChangeText4: 'We expect fuel consumption of both trucks to change due to road conditions, weather, driving style, etc. But for the first truck, the change will also be caused by decreased tire pressure on the driving axle.',
    stage2Title: 'Second lap: the moment of truth',
    stage2ResultText: 'Mileage and average speed remained the same. But the first truck, which showed the best economy in the first stage, became the outsider this time.',
    stage2Truck1: 'Truck 1: refueled with 36.428 kg = 42.85 liters',
    stage2Truck2: 'Truck 2: refueled with 35.875 kg = 42.18 liters',
    stage2Consumption: 'Consumption in the first case increased to 30.18 l/100 km, and in the second case it almost didn\'t change: 29.7 l/100 km.',
    resultsTitle: 'Experiment results',
    resultsPercentage: 'In percentage: +1.5% for measurement errors and +8.5% for tire pressure decrease.',
    resultsHighlight: '+8.5% increase in fuel consumption',
    resultsSubtext: 'Just by reducing pressure from 115 PSI to 90 PSI on 4 out of 12 tires on the driving axle.',
    impactTitle: 'The real impact on your operation',
    impactText1: 'At first glance, 7% doesn\'t seem like a big number.',
    impactText2: 'But imagine an average transport company with 100 vehicles, covering 100,000 km per year (not a big distance for commercial trucks). Taking into account that trucks are heavily loaded and roads are often much worse than ring roads, fuel consumption will be higher — say, 35 l/100 km.',
    impactCalculation: 'Thus, each truck consumes about 35,000 liters of fuel per year.',
    impactMultiply: 'Multiply that by 100 trucks and increasing fuel prices.',
    impactConclusion: 'And that doesn\'t include losses due to decreased tire service life and transportation safety.',
    impactQuestion: 'Are you really willing to pay that price?',
    statDistance: 'km covered',
    statSpeed: 'km/h average',
    statWheels: 'wheels modified',
    statTotal: 'of total wheels',
    ctaTitle: 'Control pressure. Control costs.',
    ctaSubtitle: 'PressurePro TPMS lets you monitor each tire\'s pressure in real-time across your fleet, preventing silent fuel losses and extending tire life.',
    ctaButton: 'Request a demo',
    tableTitle: 'Consumption comparison',
    tableHeader: ['', 'Truck 1', 'Truck 2'],
    tableStage1: 'Stage 1 (115 PSI)',
    tableStage2: 'Stage 2',
    tableChange: 'Change',
    tablePressure: 'Stage 2 pressure',
    tableStage1Values: ['27.81 l/100km', '29.27 l/100km'],
    tableStage2Values: ['30.18 l/100km', '29.70 l/100km'],
    tableChangeValues: ['+8.5%', '+1.5%'],
    tablePressureValues: ['90 PSI (4 wheels)', '115 PSI (unchanged)'],
  },
  pt: {
    seoTitle: 'Pressão dos Pneus Economiza Combustível | Estudo PressurePro TPMS',
    seoDescription: 'Estudo real que demonstra como a pressão correta dos pneus reduz até 8,5% o consumo de combustível em caminhões. Dados verificados com sistema TPMS PressurePro.',
    breadcrumb: 'Economia de Combustível',
    typingText: 'Caso de Estudo',
    heroTitle: 'A pressão dos pneus economiza combustível?',
    heroSubtitle: 'Testamos e demonstramos a dependência do consumo de combustível em relação à pressão dos pneus.',
    introTitle: 'O que todos sabem, mas poucos medem',
    introText1: 'A relação entre consumo de combustível e pressão dos pneus é conhecida há muito tempo. Tanto motoristas profissionais quanto amadores seguem a regra simples: "se quer economizar combustível, calibre bem os pneus." Mas muitas vezes calibram demais.',
    introText2: 'Alguns estão dispostos a sacrificar conforto e segurança: buracos são sentidos muito mais em pneus supercalibrados, a área de contato diminui e a distância de frenagem aumenta. Esquecem que ao buscar economia de combustível, perdem vida útil do pneu.',
    introText3: 'A situação oposta também é frequente: pneus sem monitoramento que visualmente parecem murchos. É um caso extremo, mas os motoristas muitas vezes não sabem qual pressão têm. Visualmente, um pneu de caminhão calibrado a 115 PSI é indistinguível de um a 90 PSI.',
    introHighlight: 'Esta diferença de pressão — 115 PSI vs 90 PSI — é a que escolhemos para nosso experimento.',
    experimentTitle: 'Qual é o experimento?',
    experimentText1: 'Uma noite nos reunimos com representantes de uma conhecida empresa de alimentos que concordou em fornecer seu transporte para o experimento em um anel viário. Decidimos fazer as medições à noite para evitar o trânsito.',
    experimentText2: 'Foram utilizados dois caminhões MAN TGS 4×2 com semirreboques de três eixos idênticos.',
    experimentText3: 'Claro, entendíamos perfeitamente que não existem veículos com exatamente o mesmo consumo de combustível. Além disso, nossos caminhões já tinham 4 anos — uma idade considerável para veículos comerciais que também afeta o consumo. Mas não íamos comparar o consumo entre veículos; apenas precisávamos encontrar como a pressão dos pneus o afeta.',
    experimentText4: 'Verificamos e igualamos a pressão dos pneus a 115 PSI (a frio), abastecemos completamente os caminhões e instalamos rastreadores GPS GalileoSKY e o sistema TPMS PressurePro.',
    tireInfo: 'Ambos os caminhões estavam equipados com pneus de caminhão com 10% de desgaste no eixo de direção e aproximadamente 50% nas demais rodas.',
    stage1Label: 'Etapa',
    stage1Title: 'Primeira volta: linha de base',
    stage1Ready: 'Vamos lá!',
    stage1ReadyText: 'Os motoristas estão prontos com todas as instruções necessárias. 14 galões de diesel pesados e marcados foram preparados para reabastecer os caminhões no retorno. Balanças eletrônicas com precisão de 5 gramas permitiram determinar o volume de diesel em litros.',
    stage1ResultTitle: 'A primeira etapa terminou, os caminhões MAN estão de volta.',
    stage1ResultText: 'Ambos os caminhões percorreram 142 km com velocidade média de 77 km/h, mas o consumo de combustível foi diferente.',
    stage1Truck1: 'Caminhão 1: reabastecido com 33,575 kg de combustível = 39,5 litros',
    stage1Truck2: 'Caminhão 2: reabastecido com 35,335 kg = 41,57 litros',
    stage1Consumption: 'O consumo foi de 27,81 e 29,27 l/100 km respectivamente.',
    stage1Note: 'Há uma diferença clara entre os veículos.',
    pressureChangeTitle: 'Modificação de pressão',
    pressureChangeText1: 'Deixamos os motoristas descansarem e os veículos esfriarem. Depois verificamos a pressão novamente e fizemos ajustes.',
    pressureChangeText2: 'Reduzimos a pressão dos pneus apenas em 4 rodas das 12 no eixo motriz do primeiro caminhão, baixando para 90 PSI.',
    pressureChangeHighlight: 'Estas 4 rodas são visualmente indistinguíveis das demais, que continuam calibradas a 115 PSI.',
    pressureChangeText3: 'A pressão do segundo caminhão permanece inalterada.',
    pressureChangeText4: 'Esperamos que o consumo de combustível de ambos os caminhões mude devido às condições da estrada, clima, estilo de condução, etc. Mas para o primeiro caminhão, a mudança também será causada pela menor pressão no eixo motriz.',
    stage2Title: 'Segunda volta: o momento da verdade',
    stage2ResultText: 'A quilometragem e a velocidade média permaneceram iguais. Mas o primeiro caminhão, que mostrou a melhor economia na primeira etapa, agora se tornou o perdedor.',
    stage2Truck1: 'Caminhão 1: reabastecido com 36,428 kg = 42,85 litros',
    stage2Truck2: 'Caminhão 2: reabastecido com 35,875 kg = 42,18 litros',
    stage2Consumption: 'O consumo no primeiro caso aumentou para 30,18 l/100 km, e no segundo caso quase não mudou: 29,7 l/100 km.',
    resultsTitle: 'Resultados do experimento',
    resultsPercentage: 'Em porcentagem: +1,5% por erros de medição e +8,5% pela diminuição da pressão.',
    resultsHighlight: '+8,5% de aumento no consumo de combustível',
    resultsSubtext: 'Apenas por reduzir a pressão de 115 PSI para 90 PSI em 4 de 12 pneus do eixo motriz.',
    impactTitle: 'O impacto real na sua operação',
    impactText1: 'À primeira vista, 7% não parece um número grande.',
    impactText2: 'Mas imagine uma empresa de transporte média com 100 veículos, percorrendo 100.000 km por ano (não é uma grande distância para caminhões comerciais). Considerando que os caminhões estão pesados e as estradas são frequentemente piores que os anéis viários, o consumo será maior — digamos, 35 l/100 km.',
    impactCalculation: 'Assim, cada caminhão consome cerca de 35.000 litros de combustível por ano.',
    impactMultiply: 'Multiplique isso por 100 caminhões e os preços crescentes do combustível.',
    impactConclusion: 'E isso sem incluir as perdas por redução da vida útil dos pneus e da segurança do transporte.',
    impactQuestion: 'Você realmente está disposto a pagar esse preço?',
    statDistance: 'km percorridos',
    statSpeed: 'km/h média',
    statWheels: 'rodas modificadas',
    statTotal: 'do total de rodas',
    ctaTitle: 'Controle a pressão. Controle os custos.',
    ctaSubtitle: 'O PressurePro TPMS permite monitorar em tempo real a pressão de cada pneu da sua frota, prevenindo perdas silenciosas de combustível e estendendo a vida útil dos pneus.',
    ctaButton: 'Solicitar demonstração',
    tableTitle: 'Comparativo de consumo',
    tableHeader: ['', 'Caminhão 1', 'Caminhão 2'],
    tableStage1: 'Etapa 1 (115 PSI)',
    tableStage2: 'Etapa 2',
    tableChange: 'Variação',
    tablePressure: 'Pressão etapa 2',
    tableStage1Values: ['27,81 l/100km', '29,27 l/100km'],
    tableStage2Values: ['30,18 l/100km', '29,70 l/100km'],
    tableChangeValues: ['+8,5%', '+1,5%'],
    tablePressureValues: ['90 PSI (4 rodas)', '115 PSI (sem mudança)'],
  },
};

export default function FuelArticlePage() {
  const router = useRouter();
  const { translations } = useContext(LanguageContext);
  const locale = router.locale || 'es';
  const langBase = COUNTRIES[locale]?.language || locale;

  const t = ARTICLE_CONTENT[langBase] || ARTICLE_CONTENT.es;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com';
  const pageUrl = `${baseUrl}/${locale}/fuel`;

  const alternates = [
    ...Object.keys(LANGUAGES).map(langCode => ({
      hreflang: LANGUAGES[langCode].hreflang,
      href: `${baseUrl}/${langCode}/fuel`
    })),
    ...Object.keys(COUNTRIES).map(countryCode => ({
      hreflang: COUNTRIES[countryCode].hreflang,
      href: `${baseUrl}/${countryCode}/fuel`
    })),
    { hreflang: 'x-default', href: `${baseUrl}/es/fuel` }
  ];

  // Structured Data - Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.heroTitle,
    "description": t.seoDescription,
    "author": {
      "@type": "Organization",
      "name": "PressurePro LATAM"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PressurePro LATAM",
      "url": baseUrl
    },
    "mainEntityOfPage": pageUrl,
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-01"
  };

  return (
    <>
      <Head>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDescription} />
        <meta name="keywords" content="ahorro combustible, presión neumáticos, TPMS, consumo diésel, flota camiones, PressurePro, caso de estudio" />
        <link rel="canonical" href={pageUrl} />

        {alternates.map(({ hreflang, href }) => (
          <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
        ))}

        <meta property="og:type" content="article" />
        <meta property="og:title" content={t.seoTitle} />
        <meta property="og:description" content={t.seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${baseUrl}/camion-neon.png`} />
        <meta property="og:site_name" content="PressurePro LATAM" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.seoTitle} />
        <meta name="twitter:description" content={t.seoDescription} />
        <meta name="twitter:image" content={`${baseUrl}/camion-neon.png`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <div className="bg-primary-black tech-bg overflow-hidden min-h-screen">
        <Navbar />

        {/* ═══ HERO ═══ */}
        <section className="relative w-full pt-[95px] sm:pt-[110px] pb-16 md:pb-24 px-6 sm:px-16 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img src="/camion-neon.png" alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-black via-primary-black/80 to-primary-black" />
          </div>

          <div className="absolute top-[77px] sm:top-[95px] left-0 w-full z-20">
            <Breadcrumbs items={[
              { label: translations?.navbar?.about || 'Inicio', href: '/' },
              { label: t.breadcrumb, href: null }
            ]} />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 2xl:max-w-[1280px] mx-auto pt-16 md:pt-20"
          >
            <motion.div variants={textVariant(0.3)}>
              <TypingText title={`| ${t.typingText}`} textStyles="text-center" />
            </motion.div>
            <motion.h1
              variants={textVariant(0.5)}
              className="font-bold text-[28px] sm:text-[38px] md:text-[52px] text-white leading-tight text-center max-w-[900px] mx-auto mt-4"
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p
              variants={fadeIn('up', 'tween', 0.6, 1)}
              className="text-secondary-white text-lg md:text-xl max-w-[650px] mx-auto text-center mt-6"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Stats rápidas */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.8, 1)}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-[800px] mx-auto"
            >
              {[
                { value: '142', label: t.statDistance, icon: '🛣️' },
                { value: '77', label: t.statSpeed, icon: '⚡' },
                { value: '4', label: t.statWheels, icon: '🔧' },
                { value: '33%', label: t.statTotal, icon: '📊' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl mb-1 block">{stat.icon}</span>
                  <span className="text-white font-bold text-2xl md:text-3xl block">{stat.value}</span>
                  <span className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ INTRODUCCIÓN ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8">
              {t.introTitle}
            </motion.h2>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6 text-secondary-white text-[16px] md:text-[18px] leading-relaxed">
              <p>{t.introText1}</p>
              <p>{t.introText2}</p>
              <p>{t.introText3}</p>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl border border-purple-500/30"
            >
              <p className="text-white font-semibold text-lg md:text-xl text-center">
                {t.introHighlight}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ EXPERIMENTO ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16 bg-white/[0.02]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8">
              {t.experimentTitle}
            </motion.h2>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6 text-secondary-white text-[16px] md:text-[18px] leading-relaxed">
              <p>{t.experimentText1}</p>
              <p className="font-medium text-white">{t.experimentText2}</p>
              <p>{t.experimentText3}</p>
              <p>{t.experimentText4}</p>
            </motion.div>

            {/* Info de neumáticos */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="mt-8 flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10"
            >
              <span className="text-3xl">🛞</span>
              <p className="text-secondary-white text-[15px] md:text-[16px] leading-relaxed">
                {t.tireInfo}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ ETAPA 1 ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            {/* Badge de etapa */}
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h2 className="font-bold text-[24px] md:text-[36px] text-white">
                {t.stage1Title}
              </h2>
            </motion.div>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6">
              <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-white font-semibold text-lg mb-3">{t.stage1Ready}</h3>
                <p className="text-secondary-white text-[15px] md:text-[16px] leading-relaxed">
                  {t.stage1ReadyText}
                </p>
              </div>

              <p className="text-white font-medium text-lg">{t.stage1ResultTitle}</p>
              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.stage1ResultText}</p>

              {/* Resultados etapa 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-cyan-900/20 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t.tableHeader[1]}</span>
                  </div>
                  <p className="text-white text-[15px]">{t.stage1Truck1}</p>
                  <p className="text-white font-bold text-2xl mt-2">27.81 <span className="text-sm font-normal text-white/60">l/100km</span></p>
                </div>
                <div className="p-5 bg-amber-900/20 rounded-xl border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">{t.tableHeader[2]}</span>
                  </div>
                  <p className="text-white text-[15px]">{t.stage1Truck2}</p>
                  <p className="text-white font-bold text-2xl mt-2">29.27 <span className="text-sm font-normal text-white/60">l/100km</span></p>
                </div>
              </div>

              <p className="text-secondary-white text-[15px] italic">{t.stage1Note}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ CAMBIO DE PRESIÓN ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16 bg-white/[0.02]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8">
              {t.pressureChangeTitle}
            </motion.h2>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6">
              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.pressureChangeText1}</p>

              {/* Diagrama visual de ruedas */}
              <div className="p-6 bg-gradient-to-b from-red-900/20 to-transparent rounded-2xl border border-red-500/20">
                <p className="text-white text-[16px] md:text-[18px] font-medium mb-4">{t.pressureChangeText2}</p>

                {/* Representación visual del eje motriz */}
                <div className="flex justify-center my-6">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-white/40 text-xs uppercase tracking-wider mb-2">{t.tableHeader[1]}</span>
                    <div className="flex gap-6">
                      {/* Eje dirección */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-8">
                          <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                            <span className="text-[9px] text-green-300 font-bold">115</span>
                          </div>
                          <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                            <span className="text-[9px] text-green-300 font-bold">115</span>
                          </div>
                        </div>
                        <div className="w-16 h-1 bg-white/20 rounded" />
                      </div>
                      {/* Eje motriz */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-8">
                          <div className="flex flex-col gap-1">
                            <div className="w-8 h-14 rounded-md bg-red-500/50 border border-red-500/70 flex items-center justify-center animate-pulse">
                              <span className="text-[9px] text-red-300 font-bold">90</span>
                            </div>
                            <div className="w-8 h-14 rounded-md bg-red-500/50 border border-red-500/70 flex items-center justify-center animate-pulse">
                              <span className="text-[9px] text-red-300 font-bold">90</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="w-8 h-14 rounded-md bg-red-500/50 border border-red-500/70 flex items-center justify-center animate-pulse">
                              <span className="text-[9px] text-red-300 font-bold">90</span>
                            </div>
                            <div className="w-8 h-14 rounded-md bg-red-500/50 border border-red-500/70 flex items-center justify-center animate-pulse">
                              <span className="text-[9px] text-red-300 font-bold">90</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-16 h-1 bg-white/20 rounded" />
                      </div>
                      {/* Eje trailer */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-8">
                          <div className="flex flex-col gap-1">
                            <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                              <span className="text-[9px] text-green-300 font-bold">115</span>
                            </div>
                            <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                              <span className="text-[9px] text-green-300 font-bold">115</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                              <span className="text-[9px] text-green-300 font-bold">115</span>
                            </div>
                            <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                              <span className="text-[9px] text-green-300 font-bold">115</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-16 h-1 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-6 mt-2">
                      <span className="text-[10px] text-white/40 w-[70px] text-center">PSI</span>
                      <span className="text-[10px] text-red-400 w-[70px] text-center font-bold">⚠ 90 PSI</span>
                      <span className="text-[10px] text-white/40 w-[70px] text-center">PSI</span>
                    </div>
                  </div>
                </div>

                <p className="text-red-300 font-semibold text-center text-[15px]">{t.pressureChangeHighlight}</p>
              </div>

              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.pressureChangeText3}</p>
              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed italic">{t.pressureChangeText4}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ ETAPA 2 ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h2 className="font-bold text-[24px] md:text-[36px] text-white">
                {t.stage2Title}
              </h2>
            </motion.div>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6">
              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.stage2ResultText}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-red-900/20 rounded-xl border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">{t.tableHeader[1]} — 90 PSI</span>
                  </div>
                  <p className="text-white text-[15px]">{t.stage2Truck1}</p>
                  <p className="text-red-400 font-bold text-2xl mt-2">30.18 <span className="text-sm font-normal text-red-300/60">l/100km</span></p>
                  <p className="text-red-400 text-sm mt-1 font-semibold">↑ +8.5%</p>
                </div>
                <div className="p-5 bg-green-900/20 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">{t.tableHeader[2]} — 115 PSI</span>
                  </div>
                  <p className="text-white text-[15px]">{t.stage2Truck2}</p>
                  <p className="text-green-400 font-bold text-2xl mt-2">29.70 <span className="text-sm font-normal text-green-300/60">l/100km</span></p>
                  <p className="text-green-400/60 text-sm mt-1">~ +1.5%</p>
                </div>
              </div>

              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.stage2Consumption}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ RESULTADOS ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8 text-center">
              {t.resultsTitle}
            </motion.h2>

            {/* Resultado destacado */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-center p-8 md:p-12 bg-gradient-to-r from-red-900/30 via-orange-900/20 to-red-900/30 rounded-3xl border border-red-500/20 mb-8"
            >
              <p className="text-red-400 font-bold text-[48px] md:text-[72px] leading-none">
                +8.5%
              </p>
              <p className="text-white font-semibold text-lg md:text-xl mt-4">
                {t.resultsHighlight}
              </p>
              <p className="text-white/60 text-sm md:text-base mt-2 max-w-[500px] mx-auto">
                {t.resultsSubtext}
              </p>
            </motion.div>

            <motion.p variants={fadeIn('up', 'tween', 0.4, 1)} className="text-secondary-white text-center text-[16px] md:text-[18px] leading-relaxed">
              {t.resultsPercentage}
            </motion.p>

            {/* Tabla comparativa */}
            <motion.div variants={fadeIn('up', 'tween', 0.5, 1)} className="mt-10">
              <h3 className="text-white font-semibold text-xl mb-4 text-center">{t.tableTitle}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {t.tableHeader.map((h, i) => (
                        <th key={i} className={`p-3 md:p-4 text-left text-sm uppercase tracking-wider ${i === 0 ? 'text-white/40' : 'text-white font-semibold'} border-b border-white/10`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-3 md:p-4 text-white/60 text-sm font-medium">{t.tableStage1}</td>
                      <td className="p-3 md:p-4 text-white text-sm">{t.tableStage1Values[0]}</td>
                      <td className="p-3 md:p-4 text-white text-sm">{t.tableStage1Values[1]}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-3 md:p-4 text-white/60 text-sm font-medium">{t.tablePressure}</td>
                      <td className="p-3 md:p-4 text-red-400 text-sm font-semibold">{t.tablePressureValues[0]}</td>
                      <td className="p-3 md:p-4 text-green-400 text-sm">{t.tablePressureValues[1]}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-3 md:p-4 text-white/60 text-sm font-medium">{t.tableStage2}</td>
                      <td className="p-3 md:p-4 text-white text-sm">{t.tableStage2Values[0]}</td>
                      <td className="p-3 md:p-4 text-white text-sm">{t.tableStage2Values[1]}</td>
                    </tr>
                    <tr>
                      <td className="p-3 md:p-4 text-white/60 text-sm font-medium">{t.tableChange}</td>
                      <td className="p-3 md:p-4 text-red-400 text-sm font-bold">{t.tableChangeValues[0]}</td>
                      <td className="p-3 md:p-4 text-white/40 text-sm">{t.tableChangeValues[1]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ IMPACTO REAL ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16 bg-white/[0.02]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8">
              {t.impactTitle}
            </motion.h2>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6 text-secondary-white text-[16px] md:text-[18px] leading-relaxed">
              <p>{t.impactText1}</p>
              <p>{t.impactText2}</p>

              {/* Cálculo visual */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⛽</span>
                  <p className="text-white font-medium">{t.impactCalculation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚛</span>
                  <p className="text-white font-medium">{t.impactMultiply}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-white/80">{t.impactConclusion}</p>
                </div>
              </div>

              {/* Cálculo concreto */}
              <div className="p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl border border-red-500/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/50 text-sm">100 {langBase === 'pt' ? 'caminhões' : langBase === 'en' ? 'trucks' : 'camiones'} × 35,000 L</p>
                    <p className="text-white font-bold text-xl mt-1">3,500,000 L/{langBase === 'pt' ? 'ano' : langBase === 'en' ? 'year' : 'año'}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">× 8.5%</p>
                    <p className="text-red-400 font-bold text-xl mt-1">297,500 L</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">{langBase === 'pt' ? 'perdidos' : langBase === 'en' ? 'wasted' : 'desperdiciados'}</p>
                    <p className="text-red-400 font-bold text-xl mt-1">💸</p>
                  </div>
                </div>
              </div>

              <p className="text-white font-bold text-xl text-center pt-4">
                {t.impactQuestion}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="2xl:max-w-[1280px] mx-auto"
          >
            <motion.div
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src="/camion-neon.png"
                alt=""
                className="w-full h-[280px] sm:h-[320px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-black/70 flex flex-col items-center justify-center text-center px-6">
                <h3 className="text-white font-bold text-2xl md:text-4xl mb-4">
                  {t.ctaTitle}
                </h3>
                <p className="text-white/80 text-sm md:text-base max-w-[550px] mb-8">
                  {t.ctaSubtitle}
                </p>
                <Link
                  href="/#feedback"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold text-base md:text-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 min-h-[48px] flex items-center active:scale-95"
                >
                  {t.ctaButton}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
