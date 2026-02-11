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
        feedback: "Contato"
    },
    hero: {
        title: "PressurePro LATAM",
        subtitle: "Monitoramento de pneus em tempo real"
    },
    about: {
        title: "Sobre a PressurePro LATAM",
        companyName: "PressurePro LATAM",
        text: "A PressurePro LATAM revoluciona a manutenção de pneus, fornecendo aos motoristas e gestores de frotas todos os tipos de dados em tempo real sobre o desempenho dos pneus. A PressurePro LATAM adiciona segurança e economia em qualquer caminho que você percorra. Desde 1991, a PressurePro tem sido líder em tecnologia de monitoramento de pneus, fornecendo soluções inovadoras para a segurança e eficiência de sua frota. A PressurePro LATAM é o distribuidor exclusivo para a América Latina da PressurePro, líder em tecnologia de monitoramento de pressão de pneus."
    },
    explore: {
        title: "Mercados",
        subtitle: "Uma solução para cada setor",
        showInfo: "+ Info",
        closeInfo: "Fechar",
        // Contenido de industrias importado de constants/industries.js
        ...industryData,
    },
    getStarted: {
        title: "Comece agora",
        subtitle: "Descubra como a PressurePro LATAM pode ajudá-lo a manter seus pneus"
    },
    whatsNew: {
        title: "Por que nos escolher?",
        title2: "Por que escolher a PressurePro?",
        newFeatures: [
            {
                imgUrl: '/pp-white.png',
                title: "Segurança",
                subtitle: "Previne acidentes ao detectar variações de pressão, melhorando o controle, a estabilidade e a confiabilidade do veículo."
            },
            {
                imgUrl: '/pp-white.png',
                title: "Economia",
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
        text: "Desde 1991, a PressurePro revoluciona a manutenção de pneus por meio de soluções inovadoras que potencializam o desempenho dos pneus."
    },
    footer: {
        contact: "Contato",
    },
};