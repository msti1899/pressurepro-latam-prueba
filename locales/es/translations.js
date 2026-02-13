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
        feedback: 'Contacto'
    },
    hero: {
        title: "Monitoreo TPMS de Neumáticos en Tiempo Real",
        subtitle: "Sistema de Presión y Temperatura para Flotas | PressurePro LATAM"
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
        // Contenido de industrias importado de constants/industries.js
        ...industryData,
    },
    getStarted: {
        title: "Beneficios del Sistema TPMS",
        subtitle: "Descubra cómo PressurePro optimiza su flota"
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
        title: '¿Listo para Optimizar su Flota con TPMS?'
    },
    footer: {
        contact: "Contáctanos",
    },
};