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
        roiCalculator: 'Calculadora de ROI',
        featuredProjects: 'Projetos em Destaque',
        languageSelectorPrefix: 'Mudar idioma. Idioma atual',
        selectLanguageAria: 'Selecionar idioma',
        openMenuAria: 'Abrir menu de navegação',
        closeMenuAria: 'Fechar menu de navegação',
        countrySelectorPrefix: 'Selecionar país. País atual',
        noCountrySelected: 'Não selecionado',
        blog: 'Blog',
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
                title: "Economia Operacional até 30%",
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
                title: 'Sensores',
                description:
                    'Eles são instalados ajustando-os à haste da válvula do pneu. O monitoramento avançado inclui uma lógica de detecção dinâmica única no mercado com altas taxas de amostragem e proteção incomparável.',
                specs: 'Baixar Especificações',
                specsUrl: '/OEM-SEN-205 Spec Sheet.pdf',
            },
            {
                imgUrl: '/planet-07.png',
                title: 'Pulse TMPMS + Display',
                description:
                    'O Pulse TMPMS é um sistema de monitoramento de pressão de pneus e temperatura que oferece uma solução de monitoramento de pressão de pneus em tempo real para veículos de passeio, caminhões e ônibus.',
                specs: 'Baixar Especificações',
                specsUrl: '/PLS-100-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-08.png',
                title: 'Link - HD, LT e UR',
                description:
                    'O Link é um dispositivo de comunicação que permite a integração de sensores de pressão de pneus com sistemas de telemática de veículos.',
                specs: 'Baixar Especificações',
                specsUrl: '/LNK-101-Spec-Sheet.pdf',
            },
            {
                imgUrl: '/planet-088.png',
                title: 'Fx',
                description:
                    'O Fx é um sistema de monitoramento de pressão de pneus e temperatura que oferece uma solução de monitoramento de pressão de pneus em tempo real para veículos de passeio, caminhões e ônibus.',
                specs: 'Baixar Especificações',
                specsUrl: '/FX-Fleet.pdf',
            },
            {
                imgUrl: '/connect-2.0.png',
                title: 'Connect 2.0',
                description:
                    'Plataforma cloud de gestão inteligente de pneus que oferece visibilidade em tempo real e análise preditiva para toda a frota. Converte dados de pressão e desempenho em ações concretas para reduzir o downtime, estender a vida útil dos pneus e melhorar a segurança operacional em mineração, portos e indústria.',
                specs: 'Baixar apresentação',
                specsUrl: '/Introducing Connect 2.0 - Tire Intelligence for Ports Fleets.pptx',
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
        whatsappForm: {
            title: 'Olá! Em que tipo de veículo você tem interesse em implementar nossa tecnologia?',
            options: [
                '6 rodas, semirreboque',
                '12 rodas, cavalo mecânico + semirreboque',
                '14 rodas, cavalo mecânico + semirreboque'
            ],
            close: 'Fechar',
            placeholder: 'Escreva uma mensagem adicional...',
            send: 'Enviar'
        }
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
        roiCalculator: "Calculadora de ROI",
        featuredProjects: "Projetos em Destaque",
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
    featuredProjects: {
        eyebrow: 'Projetos no mundo',
        title: 'Projetos em Destaque',
        subtitle: 'A PressurePro opera em ambientes críticos ao redor do mundo, demonstrando sua confiabilidade nas aplicações mais exigentes.',
        projects: [
            {
                countryCode: 'br',
                countryName: 'Brasil',
                image: '/mining-maintenance.jpg',
                title: 'Metrô de São Paulo',
                description: 'A PressurePro está implementada no sistema de monotrilho do Metrô de São Paulo, uma das aplicações mais exigentes em termos de operação e segurança. Nossa solução é o único sistema TPMS aprovado pelo governo de São Paulo para esta aplicação, graças à sua capacidade de operar de forma confiável em condições de alta pressão, como as dos pneus do monotrilho (aprox. 190 psi). Este caso valida a robustez, precisão e confiabilidade da PressurePro em ambientes críticos onde o desempenho e a segurança não podem falhar.',
            },
            {
                countryCode: 'be',
                countryName: 'Bélgica',
                image: '/port-overhead.jpg',
                title: 'Porto de Antuérpia',
                description: 'A PressurePro está implementada no Porto de Antuérpia, um dos mais importantes hubs logísticos da Europa, onde nossa tecnologia monitora atualmente 56 straddle carriers em operação. A solução permite o monitoramento em tempo real de pressão, temperatura e alertas, garantindo a continuidade operacional de equipamentos críticos e reduzindo significativamente o risco de falhas inesperadas. Graças à sua confiabilidade em ambientes exigentes, a PressurePro se consolida como uma solução chave para operações portuárias de alta intensidade.',
            },
            {
                countryCode: 'cl',
                countryName: 'Chile',
                image: '/mineria.jpeg',
                title: 'Transporte da Mina Escondida',
                description: 'A PressurePro está implementada em uma frota de mais de 120 ônibus responsáveis pelo transporte de pessoal de e para a Mina Escondida, uma das operações de mineração mais importantes do mundo. A solução permite o monitoramento em tempo real de pressão, temperatura e alertas, melhorando a segurança dos passageiros, reduzindo o risco de falhas e otimizando a operação em condições exigentes. Este caso demonstra a confiabilidade da PressurePro em aplicações críticas onde a segurança e a continuidade operacional são fundamentais.',
            },
        ],
    },
    roiCalculator: {
        eyebrow: 'Ferramenta interativa',
        title: 'Calculadora de ROI',
        subtitle: 'Descubra quanto a sua frota pode economizar ao implementar a PressurePro. Ajuste os parâmetros da sua operação e obtenha uma estimativa de retorno sobre o investimento.',
        currencyLabel: 'Moeda:',
        inputs: {
            fleetSize: 'Veículos na frota',
            tiresPerVehicle: 'Pneus por veículo',
            tireCost: 'Custo por pneu',
            tireCostHint: 'Preço médio de substituição de um pneu',
            fuelCostPerKm: 'Custo de combustível por km',
            kmPerYear: 'Quilômetros por veículo por ano',
            flatTireCost: 'Custo por pneu furado / avaria',
            flatTireCostHint: 'Inclui mão de obra, tempo parado e pneu de reposição',
            flatTiresRate: 'Avarias por 100 veículos por ano',
            flatTiresRateUnit: 'eventos',
            flatTiresRateHint: 'Média de furos ou perdas graves de pressão por ano',
        },
        results: {
            roiLabel: 'ROI estimado — primeiro ano',
            paybackLabel: 'Retorno do investimento em {n} meses',
            roiNote: 'Benefício líquido ÷ investimento inicial × 100. Estimativa baseada em médias do setor (NHTSA, ATRI).',
            annualSavingsLabel: 'Economias anuais',
            annualSavingsNote: 'O que sua frota deixa de gastar por ano',
            investmentLabel: 'Resumo do investimento',
            investmentNote: 'Custo único para equipar toda a frota',
            tireWearSaving: 'Desgaste de pneus — 15% a menos',
            fuelSaving: 'Combustível — 3% mais eficiente',
            flatTiresSaving: 'Avarias / furos — 80% a menos',
            tpmsCost: 'Investimento total em TPMS (único)',
            totalSaving: 'Economia total anual',
            netBenefit: 'Benefício líquido primeiro ano',
        },
        disclaimer: '* Estimativa de referência. Economias calculadas em base anual; o investimento em TPMS é um custo único para toda a frota (sensor $35 USD/pneu + instalação $150 USD/veículo). Desgaste: redução 15% (NHTSA); combustível: melhoria 3% (Dept. of Energy); avarias: redução 80% (dados PressurePro). Os resultados reais podem variar.',
    },
    countryBanner: {
        title: 'Selecione seu país',
    },
};