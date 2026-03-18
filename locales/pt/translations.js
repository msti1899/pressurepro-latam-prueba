import { insights } from "@/constants/data";
import { getIndustryTranslations } from "@/constants/industries";

const industryData = getIndustryTranslations('pt');

export default {
    navbar: {
        about: "Sobre a PressurePro LATAM",
        explore: "Mercados",
        getStarted: "Começar",
        whatsNew: "Por que PressurePro",
        world: "Representação",
        insights: "Produtos",
        feedback: "Contato",
        faq: 'FAQ',
        languageSelectorPrefix: 'Mudar idioma. Idioma atual',
        selectLanguageAria: 'Selecionar idioma',
        openMenuAria: 'Abrir menu de navegação',
        closeMenuAria: 'Fechar menu de navegação',
        countrySelectorPrefix: 'Selecionar país. País atual',
        noCountrySelected: 'Não selecionado',
    },
    hero: {
        title: "Monitoramento TPMS de Pneus em Tempo Real Brasil",
        subtitle: "Sistema de Pressão e Temperatura para Frotas | PressurePro",
        defaultTireTerm: "Pneus",
        tpmsIconAlt: "Ícone do sistema TPMS PressurePro",
        stampAlt: "Selo de certificação TPMS PressurePro",
        stampAriaLabel: "Ver indústrias",
    },
    about: {
        title: "Sobre a PressurePro LATAM",
        companyName: "PressurePro LATAM",
        text: "A PressurePro LATAM revoluciona a manutenção de pneus, fornecendo aos motoristas e gestores de frotas todos os tipos de dados em tempo real sobre o desempenho dos pneus. A PressurePro LATAM adiciona segurança e economia em qualquer caminho que você percorra. Desde 1991, a PressurePro tem sido líder em tecnologia de monitoramento de pneus, fornecendo soluções inovadoras para a segurança e eficiência de sua frota. A PressurePro LATAM é o distribuidor exclusivo para a América Latina da PressurePro, líder em tecnologia de monitoramento de pressão de pneus."
    },
    explore: {
        title: "Setores",
        subtitle: "Sistemas TPMS para Cada Indústria Brasileira",
        showInfo: "+ Info",
        closeInfo: "Fechar",
        viewMore: "Saiba mais",
        viewAllIndustries: "Ver todas as indústrias →",
        // Contenido de industrias importado de constants/industries.js
        ...industryData,
    },
    getStarted: {
        title: "Benefícios do Sistema TPMS",
        subtitle: "Descubra como a PressurePro otimiza sua frota brasileira",
        features: [
            'Instalação e manutenção fáceis',
            'Alertas e notificações personalizadas',
            'Monitoramento em tempo real na cabine ou remotamente',
        ],
    },
    whatsNew: {
        title: "Por que nos escolher?",
        title2: "Vantagens do Monitoramento TPMS em Tempo Real",
        newFeatures: [
            {
                imgUrl: '/pp-white.png',
                title: "Segurança Veicular Aprimorada",
                subtitle: "Previne acidentes ao detectar variações de pressão, melhorando o controle, a estabilidade e a confiabilidade do veículo."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Economia Operacional até 15%",
                subtitle: "Otimiza o consumo de combustível, reduz o desgaste dos pneus e minimiza os custos de manutenção e substituição."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Feito nos EUA",
                subtitle: "Projetado e fabricado nos Estados Unidos, atendendo aos mais altos padrões de qualidade e tecnologia."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Meio Ambiente",
                subtitle: "Contribui para a sustentabilidade, reduzindo a pegada de carbono e o impacto ambiental da operação de frotas."
            }
        ]
    },
    world: {
        typingTex: "Tecnologia de ponta para a América Latina",
        title: "PressurePro LATAM distribuidor exclusivo para América Latina da PressurePro",
        description: "Somos líderes em tecnologia de monitoramento de pressão de pneus, fornecendo soluções inovadoras para a segurança e eficiência de sua frota."
    },
    insights: {
        typingTex: "Produtos",
        imageAltPrefix: "TPMS",
        title: "Nossos Produtos",
        downloadSpecs: "Baixar Especificações",
        products: [
            {
                imgUrl: '/planet-06.png',
                title: '{ Sensores }',
                description:
                    'Eles são instalados ajustando-os à haste da válvula do pneu. O monitoramento avançado inclui uma lógica de detecção dinâmica única no mercado com altas taxas de amostragem e proteção incomparável.',
                specs: 'Baixar Especificações',
                specsUrl: '/OEM-SEN-205 Spec Sheet.pdf',
            },
            {
                imgUrl: '/planet-07.png',
                title: '{ Pulse TMPMS + Display }',
                description:
                    'O Pulse TMPMS é um sistema de monitoramento de pressão de pneus e temperatura que oferece uma solução de monitoramento de pressão de pneus em tempo real para veículos de passeio, caminhões e ônibus.',
                specs: 'Baixar Especificações',
                specsUrl: '/PLS-100-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-08.png',
                title: '{ Link - HD, LT y UR }',
                description:
                    'O Link é um dispositivo de comunicação que permite a integração de sensores de pressão de pneus com sistemas de telemática de veículos.',
                specs: 'Baixar Especificações',
                specsUrl: '/LNK-101-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-088.png',
                title: '{ Fx }',
                description:
                    'O Fx é um sistema de monitoramento de pressão de pneus e temperatura que oferece uma solução de monitoramento de pressão de pneus em tempo real para veículos de passeio, caminhões e ônibus.',
                specs: 'Baixar Especificações',
                specsUrl: '/FX-Fleet.pdf',
            },
        ],
    },
    feedback: {
        text: "Desde 1991, a PressurePro revoluciona a manutenção de pneus por meio de soluções inovadoras que potencializam o desempenho dos pneus.",
        title: "Pronto para Otimizar sua Frota com TPMS?",
        subtitle: 'PressurePro | LATAM',
    },
    clients: {
        title: 'Empresas que confiam em nós',
    },
    contact: {
        whatsappButton: 'Fale conosco',
        whatsappDefaultMessage: 'Olá! Tenho interesse em saber mais sobre os sistemas de monitoramento de pneus PressurePro.',
    },
    common: {
        close: 'Fechar',
    },
    footer: {
        contact: "Contato",
        industriesTitle: "Indústrias",
        productsTitle: "Produtos",
        resourcesTitle: "Recursos",
        contactTitle: "Contato",
        mining: "Mineração",
        transport: "Transporte e Aeronáutico",
        agriculture: "Agricultura",
        forestry: "Florestal",
        port: "Portuário",
        industrial: "Industrial",
        tpmsSensors: "Sensores TPMS",
        pulseDisplay: "Pulse Display",
        linkHDLTUR: "Link HD/LT/UR",
        fxFleet: "Fx Fleet",
        faq: "Perguntas Frequentes",
        benefits: "Benefícios TPMS",
        whyPressurePro: "Por que PressurePro",
        aboutUs: "Sobre Nós",
        requestQuote: "Solicitar Orçamento",
        coverage: "Cobertura",
    },
    industryPage: {
        notFound: "Indústria não encontrada",
        backToHome: "Voltar ao início",
        relatedIndustries: "Indústrias Relacionadas",
        relatedSubtitle: "Descubra como a PressurePro otimiza operações em diferentes setores industriais",
        specializedSolutions: "Soluções Especializadas",
        keyBenefits: "Benefícios Principais",
        readyToOptimize: "Pronto para otimizar sua frota?",
        contactForSolution: "Entre em contato para uma solução personalizada",
        h1Template: "Sistema TPMS para {industry} em {country} | Monitoramento de {tireTerm}",
        seoTitleTemplate: "{industry} - PressurePro LATAM | Monitoramento TPMS",
        seoDescriptionTemplate: "Soluções PressurePro TPMS para o setor {industry}",
        seoKeywordsTemplate: "TPMS, {industry}, monitoramento de pneus, PressurePro, pressao dos pneus, {slug}",
        relatedCardAriaLabel: "Ver solucoes TPMS para {industry}",
        relatedCardAltTemplate: "Sistemas TPMS PressurePro para {industry}",
    },
    partners: {
        breadcrumb: "Partners OEM",
        typingText: "Partners OEM",
        heroTitle: "Nossos Partners OEM",
        heroSubtitle: "A PressurePro integra sua tecnologia TPMS diretamente nos equipamentos de fábrica dos principais fabricantes mundiais. Nossas parcerias OEM garantem uma integração perfeita e desempenho ideal desde o primeiro dia.",
        seoTitle: "Partners OEM - PressurePro LATAM | Integração TPMS de Fábrica",
        seoDescription: "Conheça nossos partners OEM. A PressurePro integra tecnologia TPMS diretamente em equipamentos de fábrica dos principais fabricantes mundiais como CAT, Sandvik, Kalmar, Hyster-Yale e mais.",
        allPartnersTitle: "Partners de Integração OEM",
        allPartnersSubtitle: "Fabricantes que confiam na PressurePro para equipar seus veículos e equipamentos com tecnologia TPMS de fábrica",
        byIndustryTitle: "Partners por Indústria",
        byIndustrySubtitle: "Descubra quais fabricantes integram a PressurePro em cada setor",
        oemPartnersTitle: "Partners OEM",
        oemIndustrySubtitle: "Integramos nossa tecnologia TPMS diretamente em equipamentos de fábrica dos principais fabricantes do setor {industry}",
        viewAllPartners: "Ver todos os Partners OEM",
        viewIndustry: "Ver indústria",
        ctaTitle: "Interessado em ser Partner OEM?",
        ctaSubtitle: "Entre em contato para explorar como integrar a tecnologia TPMS da PressurePro em seus equipamentos de fábrica",
        navLabel: "Partners",
        seoKeywords: "OEM, partners, TPMS, PressurePro, CAT, Sandvik, Kalmar, Hyster-Yale, integracao de fabrica",
        oemPartnerLabel: "Partner OEM",
    },
    faqPage: {
        home: "Início",
        breadcrumb: "Perguntas Frequentes",
        moreQuestions: "Tem mais perguntas?",
        moreQuestionsSubtitle: "Nossa equipe de especialistas está pronta para ajudá-lo a otimizar sua frota com a melhor tecnologia TPMS",
        contactNow: "Contatar Agora",
    },
    countryBanner: {
        title: 'Selecione seu país',
    },
};