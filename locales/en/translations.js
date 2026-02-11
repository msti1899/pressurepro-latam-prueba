import { insights } from "@/constants/data";
import { getIndustryTranslations } from "@/constants/industries";

const industryData = getIndustryTranslations('en');

export default {
    navbar: {
        about: 'About PressurePro LATAM',
        explore: 'Markets',
        getStarted: 'Get Started',
        whatsNew: 'Why PressurePro',
        world: 'Representation',
        insights: 'Products',
        feedback: 'Contact'
    },
    hero: {
        title: "PressurePro LATAM",
        subtitle: "Real-time tire monitoring"
    },
    about: {
        title: "About PressurePro LATAM",
        companyName: "PressurePro LATAM",
        text: "PressurePro LATAM is revolutionizing tire maintenance, providing drivers and fleet managers with all kinds of real-time data on tire performance. PressurePro LATAM adds safety and savings to any road you travel. Since 1991, PressurePro has been a leader in tire monitoring technology, providing innovative solutions for the safety and efficiency of your fleet. PressurePro LATAM is the exclusive distributor for Latin America of PressurePro, a leader in tire pressure monitoring technology."
    },
    explore: {
        title: "Markets",
        subtitle: "A solution for every industry",
        showInfo: "+ Info",
        closeInfo: "Close",
        // Contenido de industrias importado de constants/industries.js
        ...industryData,
    },
    getStarted: {
        title: "Get started now",
        subtitle: "Discover how PressurePro LATAM can help you maintain your tires"
    },
    whatsNew: {
        title: "Why choose us?",
        title2: "Why choose PressurePro?",
        newFeatures: [
            {
                imgUrl: '/pp-white.png',
                title: "Safety",
                subtitle: "Prevents accidents by detecting pressure variations, improving vehicle control, stability, and reliability."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Savings",
                subtitle: "Optimizes fuel consumption, reduces tire wear, and minimizes maintenance and replacement costs."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Made in USA",
                subtitle: "Designed and manufactured in the United States, meeting the highest standards of quality and technology."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Environment",
                subtitle: "Contributes to sustainability by reducing the carbon footprint and environmental impact of fleet operations."
            }
        ]
    },
    world: {
        typingTex: "Cutting-edge technology for Latin America",
        title: "PressurePro LATAM exclusive distributor for Latin America of PressurePro",
        description: "We are leaders in tire pressure monitoring technology, providing innovative solutions for the safety and efficiency of your fleet."
    },
    insights: {
        typingTex: "Products",
        title: "Our Products",
        downloadSpecs: "Download Specifications",
        products: [
            {
                imgUrl: '/planet-06.png',
                title: '{ Sensors }',
                description:
                    'They are installed by adjusting them to the tire valve stem. Advanced monitoring includes a unique dynamic detection logic in the market with high sampling rates and unparalleled protection.',
                specs: 'Download Specifications',
                specsUrl: '/OEM-SEN-205 Spec Sheet.pdf',
            },
            {
                imgUrl: '/planet-07.png',
                title: '{ Pulse TMPMS + Display }',
                description:
                    'The Pulse TMPMS is a tire pressure and temperature monitoring system that offers a real-time tire pressure monitoring solution for passenger vehicles, trucks, and buses.',
                specs: 'Download Specifications',
                specsUrl: '/PLS-100-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-08.png',
                title: '{ Link - HD, LT y UR }',
                description:
                    'The Gateway is a device that allows the Pulse system to communicate with the vehicle’s telematics system, providing real-time tire data to the fleet manager.',
                specs: 'Download Specifications',
                specsUrl: 'LNK-101-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-088.png',
                title: '{ Fx }',
                description:
                    'The Fx is a tire pressure and temperature monitoring system that offers a real-time tire pressure monitoring solution for passenger vehicles, trucks, and buses.',
                specs: 'Download Specifications',
                specsUrl: '/FX-Fleet.pdf',
            },
        ],
    },
    feedback: {
        text: "Since 1991 PressurePro has been revolutionizing tire maintenance through innovative solutions that enhance tire performance."
    },
    footer: {
        contact: "Contact us",
    },
}