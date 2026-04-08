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
        feedback: 'Contact',
        faq: 'FAQ',
        languageSelectorPrefix: 'Change language. Current language',
        selectLanguageAria: 'Select language',
        openMenuAria: 'Open navigation menu',
        closeMenuAria: 'Close navigation menu',
        countrySelectorPrefix: 'Select country. Current country',
        noCountrySelected: 'Not selected',
        blog: 'Blog',
    },
    hero: {
        title: "PressurePro LATAM",
        subtitle: "Real-time tire monitoring",
        defaultTireTerm: "Tires",
        tpmsIconAlt: "PressurePro TPMS system icon",
        stampAlt: "PressurePro TPMS certification seal",
        stampAriaLabel: "View industries",
    },
    about: {
        title: "About Us",
        companyName: "PressurePro LATAM",
        text: "PressurePro LATAM is revolutionizing tire maintenance, providing drivers and fleet managers with all kinds of real-time data on tire performance. PressurePro LATAM adds safety and savings to any road you travel. Since 1991, PressurePro has been a leader in tire monitoring technology, providing innovative solutions for the safety and efficiency of your fleet. PressurePro LATAM is the exclusive distributor for Latin America of PressurePro, a leader in tire pressure monitoring technology."
    },
    explore: {
        title: "Markets",
        subtitle: "A solution for every industry",
        showInfo: "+ Info",
        closeInfo: "Close",
        viewMore: "Learn more",
        viewAllIndustries: "View all industries →",
        // Contenido de industrias importado de constants/industries.js
        ...industryData,
    },
    getStarted: {
        title: "Get started now",
        subtitle: "Discover how PressurePro LATAM can help you maintain your tires",
        features: [
            'Easy installation and maintenance',
            'Custom alerts and notifications',
            'Real-time monitoring in-cabin or remotely',
        ],
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
        imageAltPrefix: "TPMS",
        title: "Our Products",
        downloadSpecs: "Download Specifications",
        products: [
            {
                imgUrl: '/planet-06.png',
                title: 'Sensors',
                description:
                    'They are installed by adjusting them to the tire valve stem. Advanced monitoring includes a unique dynamic detection logic in the market with high sampling rates and unparalleled protection.',
                specs: 'Download Specifications',
                specsUrl: '/OEM-SEN-205 Spec Sheet.pdf',
            },
            {
                imgUrl: '/planet-07.png',
                title: 'Pulse TMPMS + Display',
                description:
                    'The Pulse TMPMS is a tire pressure and temperature monitoring system that offers a real-time tire pressure monitoring solution for passenger vehicles, trucks, and buses.',
                specs: 'Download Specifications',
                specsUrl: '/PLS-100-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-08.png',
                title: 'Link - HD, LT y UR',
                description:
                    'The Gateway is a device that allows the Pulse system to communicate with the vehicle’s telematics system, providing real-time tire data to the fleet manager.',
                specs: 'Download Specifications',
                specsUrl: 'LNK-101-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-088.png',
                title: 'Fx',
                description:
                    'The Fx is a tire pressure and temperature monitoring system that offers a real-time tire pressure monitoring solution for passenger vehicles, trucks, and buses.',
                specs: 'Download Specifications',
                specsUrl: '/FX-Fleet.pdf',
            },
            {
                imgUrl: '/connect-2.0.png',
                title: 'Connect 2.0',
                description:
                    'Cloud platform for intelligent tire management that delivers real-time fleet visibility and predictive analytics. Converts pressure and performance data into actionable insights to reduce downtime, extend tire lifespan, and improve operational safety across mining, port, and industrial fleets.',
                specs: 'Download presentation',
                specsUrl: '/Introducing Connect 2.0 - Tire Intelligence for Ports Fleets.pptx',
            },
        ],
    },
    feedback: {
        text: "Since 1991 PressurePro has been revolutionizing tire maintenance through innovative solutions that enhance tire performance.",
        title: "Ready to Optimize Your Fleet with TPMS?",
        subtitle: 'PressurePro | LATAM',
    },
    clients: {
        title: 'Companies that trust us',
    },
    contact: {
        whatsappButton: 'Contact us',
        whatsappDefaultMessage: 'Hello! I am interested in learning more about PressurePro tire monitoring systems.',
        whatsappForm: {
            title: 'Hello! What type of vehicle are you interested in implementing our technology in?',
            options: [
                '6 wheels, semi-trailer',
                '12 wheels, tractor unit + semi-trailer',
                '14 wheels, tractor unit + semi-trailer'
            ],
            close: 'Close',
            placeholder: 'Write an additional message...',
            send: 'Send'
        }
    },
    common: {
        close: 'Close',
    },
    footer: {
        contact: "Contact us",
        industriesTitle: "Industries",
        productsTitle: "Products",
        resourcesTitle: "Resources",
        contactTitle: "Contact",
        mining: "Mining",
        transport: "Transport & Aeronautics",
        agriculture: "Agriculture",
        forestry: "Forestry",
        port: "Port",
        industrial: "Industrial",
        tpmsSensors: "TPMS Sensors",
        pulseDisplay: "Pulse Display",
        linkHDLTUR: "Link HD/LT/UR",
        fxFleet: "Fx Fleet",
        faq: "FAQ",
        benefits: "TPMS Benefits",
        whyPressurePro: "Why PressurePro",
        aboutUs: "About Us",
        requestQuote: "Request a Quote",
        coverage: "Coverage",
    },
    industryPage: {
        notFound: "Industry not found",
        backToHome: "Back to home",
        relatedIndustries: "Related Industries",
        relatedSubtitle: "Discover how PressurePro optimizes operations across different industrial sectors",
        specializedSolutions: "Specialized Solutions",
        keyBenefits: "Key Benefits",
        readyToOptimize: "Ready to optimize your fleet?",
        contactForSolution: "Contact us for a customized solution",
        h1Template: "TPMS System for {industry} in {country} | {tireTerm} Monitoring",
        seoTitleTemplate: "{industry} - PressurePro LATAM | TPMS Monitoring",
        seoDescriptionTemplate: "PressurePro TPMS solutions for the {industry} industry",
        seoKeywordsTemplate: "TPMS, {industry}, tire monitoring, PressurePro, tire pressure, {slug}",
        relatedCardAriaLabel: "See TPMS solutions for {industry}",
        relatedCardAltTemplate: "PressurePro TPMS systems for {industry}",
    },
    partners: {
        breadcrumb: "OEM Partners",
        typingText: "OEM Partners",
        heroTitle: "Our OEM Partners",
        heroSubtitle: "PressurePro integrates its TPMS technology directly into factory equipment from the world's leading manufacturers. Our OEM partnerships ensure seamless integration and optimal performance from day one.",
        seoTitle: "OEM Partners - PressurePro LATAM | Factory TPMS Integration",
        seoDescription: "Meet our OEM partners. PressurePro integrates TPMS technology directly into factory equipment from leading global manufacturers like CAT, Sandvik, Kalmar, Hyster-Yale and more.",
        allPartnersTitle: "OEM Integration Partners",
        allPartnersSubtitle: "Manufacturers that trust PressurePro to equip their vehicles and equipment with factory TPMS technology",
        byIndustryTitle: "Partners by Industry",
        byIndustrySubtitle: "Discover which manufacturers integrate PressurePro in each sector",
        oemPartnersTitle: "OEM Partners",
        oemIndustrySubtitle: "We integrate our TPMS technology directly into factory equipment from leading manufacturers in the {industry} sector",
        viewAllPartners: "View all OEM Partners",
        viewIndustry: "View industry",
        ctaTitle: "Interested in becoming an OEM Partner?",
        ctaSubtitle: "Contact us to explore how to integrate PressurePro TPMS technology into your factory equipment",
        navLabel: "Partners",
        seoKeywords: "OEM, partners, TPMS, PressurePro, CAT, Sandvik, Kalmar, Hyster-Yale, factory integration",
        oemPartnerLabel: "OEM Partner",
    },
    faqPage: {
        home: "Home",
        breadcrumb: "FAQ",
        moreQuestions: "Have more questions?",
        moreQuestionsSubtitle: "Our team of experts is ready to help you optimize your fleet with the best TPMS technology",
        contactNow: "Contact Now",
    },
    countryBanner: {
        title: 'Select your country',
    },
    blog: 'Blog',
}