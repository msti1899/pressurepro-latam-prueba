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
        title: "PressurePro LATAM",
        subtitle: "Monitoreo de neumáticos en tiempo real"
    },
    about: {
        title: "Acerca de PressurePro LATAM",
        companyName: "PressurePro LATAM",
        text: "PressurePro LATAM revoluciona el mantenimiento de neumáticos, brindando a los conductores y los responsables de flotas todo tipo de datos en tiempo real sobre el rendimiento de los neumáticos. PressurePro LATAM agrega seguridad y ahorro en cualquier camino que recorra. Desde 1991, PressurePro ha sido líder en tecnología de monitoreo de neumáticos, brindando soluciones innovadoras para la seguridad y eficiencia de su flota. PressurePro LATAM es el distribuidor exclusivo para América Latina de PressurePro, líder en tecnología de monitoreo de presión de neumáticos."
    },
    explore: {
        title: "Mercados",
        subtitle: "Una solución para cada industria",
        showInfo: "+ Info",
        closeInfo: "Cerrar",
        // Contenido de industrias importado de constants/industries.js
        ...industryData,
    },
    getStarted: {
        title: "Comience ahora",
        subtitle: "Descubra cómo PressurePro LATAM lo ayuda a mantener sus neumáticos"
    },
    whatsNew: {
        title: "¿Por qué elegirnos?",
        title2: "¿Por qué elegir PressurePro?",
        newFeatures: [
            {
                imgUrl: '/pp-white.png',
                title: "Seguridad",
                subtitle: "Previene accidentes detectando variaciones de presión, mejorando el control, la estabilidad y la confiabilidad del vehículo."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Ahorro",
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
        typingTex: "Tecnología de punta para latinoamérica",
        title: "PressurePro LATAM distribuidor exclusivo para América Latina de PressurePro",
        description: "Somos líderes en tecnología de monitoreo de presión de neumáticos, brindando soluciones innovadoras para la seguridad y eficiencia de su flota."
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
        text: 'Desde 1991 PressurePro revoluciona el mantenimiento de neumáticos a través de soluciones innovadores potenciando el rendimiento de los neumáticos'
    },
    footer: {
        contact: "Contáctanos",
    },
};