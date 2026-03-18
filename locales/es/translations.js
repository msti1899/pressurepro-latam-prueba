import { insights } from "@/constants/data";
import { getIndustryTranslations } from "@/constants/industries";

const industryData = getIndustryTranslations('es');

export default {
    navbar: {
        about: 'Acerca de PressurePro LATAM',
        explore: 'Mercados',
        getStarted: 'Comenzar',
        whatsNew: 'Por qué PressurePro',
        world: 'Representación',
        insights: 'Productos',
        feedback: 'Contacto',
        faq: 'FAQ',
        languageSelectorPrefix: 'Cambiar idioma. Idioma actual',
        selectLanguageAria: 'Seleccionar idioma',
        openMenuAria: 'Abrir menú de navegación',
        closeMenuAria: 'Cerrar menú de navegación',
        countrySelectorPrefix: 'Seleccionar país. País actual',
        noCountrySelected: 'No seleccionado',
    },
    hero: {
        title: "Monitoreo TPMS de Neumáticos en Tiempo Real",
        subtitle: "Sistema de Presión y Temperatura para Flotas | PressurePro LATAM",
        defaultTireTerm: "Neumáticos",
        tpmsIconAlt: "Icono sistema TPMS PressurePro",
        stampAlt: "Sello certificación PressurePro TPMS",
        stampAriaLabel: "Ver industrias",
    },
    about: {
        title: "Acerca de PressurePro LATAM",
        companyName: "PressurePro LATAM",
        text: "PressurePro LATAM revoluciona el sistema de monitoreo TPMS para flotas comerciales, brindando a conductores y gerentes de flota datos en tiempo real sobre presión y temperatura de neumáticos. Nuestro sistema de sensores TPMS permite prevenir reventones, reducir costos operativos y mejorar la seguridad vehicular en industrias como minería, transporte de carga y logística portuaria. Desde 1991, PressurePro es líder global en tecnología de monitoreo de neumáticos, y PressurePro LATAM es el distribuidor exclusivo en América Latina, ofreciendo soluciones TPMS innovadoras para la optimización de flotas."
    },
    explore: {
        title: "Industrias",
        subtitle: "Sistemas TPMS para Cada Sector Industrial",
        showInfo: "+ Info",
        closeInfo: "Cerrar",
        viewMore: "Ver más",
        viewAllIndustries: "Ver todas las industrias →",
        // Contenido de industrias importado de constants/industries.js
        ...industryData,
    },
    getStarted: {
        title: "Beneficios del Sistema TPMS",
        subtitle: "Descubra cómo PressurePro optimiza su flota",
        features: [
            'Fácil instalación y mantenimiento',
            'Alertas y notificaciones personalizadas',
            'Monitoreo en tiempo real en cabina o remoto',
        ],
    },
    whatsNew: {
        title: "¿Por qué elegirnos?",
        title2: "Ventajas del Monitoreo TPMS en Tiempo Real",
        newFeatures: [
            {
                imgUrl: '/pp-white.png',
                title: "Seguridad Vehicular Mejorada",
                subtitle: "Previene accidentes detectando variaciones de presión, mejorando el control, la estabilidad y la confiabilidad del vehículo."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Ahorro Operativo hasta 15%",
                subtitle: "Optimiza el consumo de combustible, reduce el desgaste de los neumáticos y minimiza los costos de mantenimiento y reemplazo."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Hecho en USA",
                subtitle: "Diseñado y fabricado en Estados Unidos, cumpliendo con los más altos estándares de calidad y tecnología."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Medio Ambiente",
                subtitle: "Contribuye a la sostenibilidad, reduciendo la huella de carbono y el impacto ambiental de la operación de flotas."
            }
        ]
    },
    world: {
        typingTex: "Tecnología TPMS de punta para Latinoamérica",
        title: "Distribuidor Exclusivo de Sistemas TPMS PressurePro en América Latina",
        description: "Somos líderes en tecnología de monitoreo de presión y temperatura de neumáticos en tiempo real, con presencia en Chile, Perú, Brasil, México, Argentina, Colombia, Uruguay y España. Nuestras soluciones TPMS brindan seguridad vehicular, ahorro de combustible hasta 15% y optimización operativa para flotas comerciales, minería y transporte pesado."
    },
    insights: {
        typingTex: "Productos",
        imageAltPrefix: "TPMS",
        title: "Nuestros Productos",
        downloadSpecs: "Descargar especificaciones",
        products: [
            {
                imgUrl: '/planet-06.png',
                title: '{ Sensors }',
                description:
                    'Se instalan ajustándolos al vástago de la válvula del neumático. El monitoreo avanzado incluye una lógica de detección dinámica única en el mercado con altas tasas de muestreo y una protección inigualable.',
                specs: 'Descargar Especificaciones',
                specsUrl: '/OEM-SEN-205 Spec Sheet.pdf',
            },
            {
                imgUrl: '/planet-07.png',
                title: '{ Pulse TMPMS + Display }',
                description:
                    'El primer dispositivo de la línea TPMS+ de PressurePro, PULSE, ofrece a los usuarios una opción de visualización dentro de la cabina, integrando nuestra lista completa de funciones avanzadas en un diseño atractivo y fácil de usar.',
                specs: 'Descargar Especificaciones',
                specsUrl: '/PLS-100-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-08.png',
                title: '{ Link - HD, LT y UR }',
                description:
                    'Un componente clave para aplicaciones en flotas y fabricantes de equipos originales (OE), así como para configuraciones de acople y desacople, ya sean independientes o integradas. Los productos LINK cuentan con un resistente y avanzado gabinete certificado.',
                specs: 'Descargar Especificaciones',
                specsUrl: '/LNK-101-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-088.png',
                title: '{ Fx }',
                description:
                    'FX brinda a los usuarios una gestión de neumáticos líder en el mercado, con un valor inigualable. Aprovecha dispositivos inteligentes existentes y las aplicaciones personalizadas de TPMS de PressurePro para ofrecer un monitoreo de neumáticos potente.',
                specs: 'Descargar Especificaciones',
                specsUrl: '/FX-Fleet.pdf',
            },
        ],
    },
    feedback: {
        text: 'Desde 1991, PressurePro revoluciona el monitoreo TPMS de neumáticos con sistemas de sensores inteligentes que previenen accidentes, optimizan el consumo de combustible y reducen costos operativos. Tecnología de monitoreo en tiempo real que transforma la gestión de flotas comerciales en toda América Latina.',
        title: '¿Listo para Optimizar su Flota con TPMS?',
        subtitle: 'PressurePro | LATAM',
    },
    clients: {
        title: 'Empresas que confían en nosotros',
    },
    contact: {
        whatsappButton: 'Contáctanos',
        whatsappDefaultMessage: '¡Hola! Me interesa conocer más sobre los sistemas de monitoreo de neumáticos PressurePro.',
    },
    common: {
        close: 'Cerrar',
    },
    footer: {
        contact: "Contáctanos",
        industriesTitle: "Industrias",
        productsTitle: "Productos",
        resourcesTitle: "Recursos",
        contactTitle: "Contacto",
        mining: "Minería",
        transport: "Transporte y Aeronáutico",
        agriculture: "Agricultura",
        forestry: "Forestal",
        port: "Portuario",
        industrial: "Industrial",
        tpmsSensors: "Sensores TPMS",
        pulseDisplay: "Pulse Display",
        linkHDLTUR: "Link HD/LT/UR",
        fxFleet: "Fx Fleet",
        faq: "Preguntas Frecuentes",
        benefits: "Beneficios TPMS",
        whyPressurePro: "Por qué PressurePro",
        aboutUs: "Acerca de Nosotros",
        requestQuote: "Solicitar Cotización",
        coverage: "Cobertura",
    },
    industryPage: {
        notFound: "Industria no encontrada",
        backToHome: "Volver al inicio",
        relatedIndustries: "Industrias Relacionadas",
        relatedSubtitle: "Descubra cómo PressurePro optimiza operaciones en diferentes sectores industriales",
        specializedSolutions: "Soluciones Especializadas",
        keyBenefits: "Beneficios Clave",
        readyToOptimize: "¿Listo para optimizar su flota?",
        contactForSolution: "Contacte con nosotros para una solución personalizada",
        h1Template: "Sistema TPMS para {industry} en {country} | Monitoreo de {tireTerm}",
        seoTitleTemplate: "{industry} - PressurePro LATAM | Monitoreo TPMS",
        seoDescriptionTemplate: "Soluciones PressurePro TPMS para el sector {industry}",
        seoKeywordsTemplate: "TPMS, {industry}, monitoreo neumaticos, PressurePro, presion neumaticos, {slug}",
        relatedCardAriaLabel: "Ver soluciones TPMS para {industry}",
        relatedCardAltTemplate: "Sistemas TPMS PressurePro para {industry}",
    },
    partners: {
        breadcrumb: "Partners OEM",
        typingText: "Partners OEM",
        heroTitle: "Nuestros Partners OEM",
        heroSubtitle: "PressurePro integra su tecnología TPMS directamente en los equipos de fábrica de los principales fabricantes mundiales. Nuestras alianzas OEM garantizan una integración perfecta y rendimiento óptimo desde el primer día.",
        seoTitle: "Partners OEM - PressurePro LATAM | Integración TPMS de Fábrica",
        seoDescription: "Conozca nuestros partners OEM. PressurePro integra tecnología TPMS directamente en equipos de fábrica de los principales fabricantes mundiales como CAT, Sandvik, Kalmar, Hyster-Yale y más.",
        allPartnersTitle: "Partners de Integración OEM",
        allPartnersSubtitle: "Fabricantes que confían en PressurePro para equipar sus vehículos y equipos con tecnología TPMS de fábrica",
        byIndustryTitle: "Partners por Industria",
        byIndustrySubtitle: "Descubra qué fabricantes integran PressurePro en cada sector",
        oemPartnersTitle: "Partners OEM",
        oemIndustrySubtitle: "Integramos nuestra tecnología TPMS directamente en equipos de fábrica de los principales fabricantes del sector {industry}",
        viewAllPartners: "Ver todos los Partners OEM",
        viewIndustry: "Ver industria",
        ctaTitle: "¿Interesado en ser Partner OEM?",
        ctaSubtitle: "Contáctenos para explorar cómo integrar la tecnología TPMS de PressurePro en sus equipos de fábrica",
        navLabel: "Partners",
        seoKeywords: "OEM, partners, TPMS, PressurePro, CAT, Sandvik, Kalmar, Hyster-Yale, integracion fabrica",
        oemPartnerLabel: "Partner OEM",
    },
    faqPage: {
        home: "Inicio",
        breadcrumb: "Preguntas Frecuentes",
        moreQuestions: "¿Tiene más preguntas?",
        moreQuestionsSubtitle: "Nuestro equipo de expertos está listo para ayudarlo a optimizar su flota con la mejor tecnología TPMS",
        contactNow: "Contactar Ahora",
    },
    countryBanner: {
        title: 'Selecciona tu país',
    },
};