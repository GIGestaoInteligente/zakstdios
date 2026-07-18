import type { SiteLocale } from "@/hooks/use-locale";

type LocalizedText = Record<SiteLocale, string>;

export const siteCopy = {
  nav: {
    home: { pt: "Início", en: "Home" },
    especialidades: { pt: "Serviços", en: "Services" },
    blog: { pt: "Conteúdo", en: "Journal" },
    vlog: { pt: "Vídeos", en: "Videos" },
    contato: { pt: "Contato", en: "Contact" },
  },
  account: { pt: "Minha conta", en: "My account" },
  appointment: { pt: "Agendamento", en: "Booking" },
  footerNavigation: { pt: "Navegação", en: "Navigation" },
  footerContact: { pt: "Contato", en: "Contact" },
  footerHours: { pt: "Horário", en: "Hours" },
  footerIntro: {
    pt: "Recovery & social home club em Ipanema, Rio de Janeiro.",
    en: "Recovery & social home club in Ipanema, Rio de Janeiro.",
  },
  footerClose: { pt: "A casa te espera.", en: "The House is waiting for you." },
  weekdayHours: { pt: "Seg - Sex · 8h às 21h", en: "Mon - Fri · 8am to 9pm" },
  saturdayHours: { pt: "Sábado · 9h às 18h", en: "Saturday · 9am to 6pm" },
  sundayHours: { pt: "Domingo · fechado", en: "Sunday · closed" },
  copyright: {
    pt: "Mana House · Ipanema, Rio de Janeiro",
    en: "Mana House · Ipanema, Rio de Janeiro",
  },
  hero: {
    eyebrow: { pt: "Calor. Frio. Gente.", en: "Heat. Cold. People." },
    title: { pt: "Você chegou. Respira.", en: "You've arrived. Breathe." },
    body: {
      pt: "Recovery & social home club em Ipanema, Rio de Janeiro.",
      en: "Recovery & social home club in Ipanema, Rio de Janeiro.",
    },
    primaryCta: { pt: "Seja membro", en: "Become a member" },
    secondaryCta: { pt: "Conheça a casa", en: "Meet the house" },
    heroAlt: {
      pt: "Três pessoas rindo e relaxando em uma sauna de madeira aquecida com painéis de luz laranja",
      en: "Three people laughing and relaxing in a warm, wood-paneled sauna with orange light panels",
    },
  },
  about: {
    eyebrow: { pt: "Quem somos", en: "About" },
    title: { pt: "A casa", en: "The House" },
    body: {
      pt: "Mana House é um social home club de recuperação e comunidade em Ipanema. Sauna infravermelha, terapia de contraste, massagem terapêutica e hot yoga reúnem tecnologia de recuperação e toque qualificado em um mesmo espaço.",
      en: "Mana House is a recovery and community social home club in Ipanema. Infrared sauna, contrast therapy, therapeutic massage and hot yoga bring recovery technology and skilled touch into one space.",
    },
    body2: {
      pt: "Para quem exige muito do próprio ritmo e sabe que recuperar o corpo é parte do jogo.",
      en: "For people who ask a lot from their bodies and know that recovering the body is part of the game.",
    },
    imageAlt: {
      pt: "social home club Ipanema Rio de Janeiro comunidade",
      en: "social home club community in Ipanema Rio de Janeiro",
    },
  },
  experiences: {
    eyebrow: { pt: "Serviços", en: "Services" },
    title: { pt: "Os serviços", en: "The services" },
    all: { pt: "Ver todas", en: "See all" },
  },
  pillars: {
    eyebrow: { pt: "A experiência", en: "The experience" },
    title: { pt: "O que vive na casa", en: "What lives in the house" },
    subtitle: {
      pt: "Sete pilares que definem o ritmo da Mana House — recuperação, encontro e presença em Ipanema.",
      en: "Seven pillars that define the rhythm of Mana House — recovery, connection and presence in Ipanema.",
    },
    all: { pt: "Ver serviços", en: "See services" },
  },
  members: {
    eyebrow: { pt: "Membros", en: "Members" },
    title: { pt: "Ohana.", en: "Ohana." },
    subtitle: {
      pt: "Uma comunidade construída ao redor de quem cuida do corpo com seriedade.",
      en: "A community built around people who take care of their bodies seriously.",
    },
    body: {
      pt: "A Mana House funciona como um social home club de membros. Quem entra pela primeira vez acha o espaço. Quem volta encontra as pessoas.",
      en: "Mana House operates as a members' social home club. First-timers find the space. Those who return find the people.",
    },
    primaryCta: { pt: "Quero ser membro", en: "Become a member" },
    secondaryCta: { pt: "Agendar sessão avulsa", en: "Book a single session" },
    alt: {
      pt: "social home club membros Ipanema ohana Rio",
      en: "social home club members ohana in Ipanema Rio",
    },
  },
  blog: {
    eyebrow: { pt: "Conteúdo", en: "Journal" },
    title: { pt: "Leituras para recuperar o ritmo", en: "Notes on recovery and rhythm" },
    all: { pt: "Todos os artigos", en: "All articles" },
  },
};

export const membershipTiers = [
  {
    id: "essential" as const,
    name: { pt: "Essencial", en: "Essential" },
    headline: { pt: "Para começar no seu ritmo.", en: "For those ready to begin." },
    body: {
      pt: "Para experimentar. Acesso aos serviços térmicos: sauna e terapia de contraste.",
      en: "For those ready to begin. Access to thermal experiences: sauna and contrast therapy.",
    },
    price: { pt: "R$ 590 / mês", en: "R$ 590 / month" },
  },
  {
    id: "ritual" as const,
    name: { pt: "Ritual", en: "Ritual" },
    headline: {
      pt: "Para quem faz da recuperação um ritual.",
      en: "For those who make recovery a ritual.",
    },
    body: {
      pt: "Para quem incorpora. Acesso completo aos serviços térmicos, hot yoga e prioridade em agendamentos.",
      en: "For those who make it part of life. Full access to thermal experiences, hot yoga and booking priority.",
    },
    price: { pt: "R$ 850 / mês", en: "R$ 850 / month" },
  },
  {
    id: "immersion" as const,
    name: { pt: "Imersão", en: "Immersion" },
    headline: {
      pt: "Para quem faz disso parte da vida.",
      en: "For those who make it part of life.",
    },
    body: {
      pt: "Para quem vai fundo. Acesso total, incluindo massagens e créditos mensais para serviços avulsos.",
      en: "For those who go deeper. Full access, including massages and monthly credits for single experiences.",
    },
    price: { pt: "R$ 1.100 / mês", en: "R$ 1,100 / month" },
  },
];

export const especialidades = [
  {
    slug: "contraste",
    title: { pt: "Terapia de Contraste", en: "Contrast Therapy" },
    short: { pt: "Calor. Frio. Reset.", en: "Heat. Cold. Reset." },
    card: {
      pt: "Sauna infravermelha e banheiras de gelo num circuito que treina o corpo e acorda a mente.",
      en: "Infrared sauna and cold plunge pools in a circuit that trains the body and wakes the mind.",
    },
    headline: {
      pt: "Calor que abre. Frio que fecha. O ciclo que o corpo quer.",
      en: "Heat that opens. Cold that closes. The cycle the body craves.",
    },
    desc: {
      pt: "A sauna infravermelha aquece de dentro para fora. Depois, a banheira de gelo contrai, reduz inflamação e ativa o sistema nervoso. A alternância cria um estímulo vascular quase como um treino: circulação responde, corpo desperta, mente clareia.",
      en: "The infrared sauna heats from the inside out. Then the cold plunge constricts, reduces inflammation and activates the nervous system. The alternation creates a vascular stimulus that works almost like training: circulation responds, body wakes, mind clears.",
    },
    benefits: {
      pt: [
        "Circulação intensa",
        "Redução de dor muscular",
        "Anti-inflamatório natural",
        "Clareza mental",
        "Modulação do sistema nervoso",
      ],
      en: [
        "Intense circulation",
        "Reduced muscle soreness",
        "Natural anti-inflammatory support",
        "Mental clarity",
        "Nervous system modulation",
      ],
    },
    imageAlt: {
      pt: "terapia de contraste banho de gelo recuperação Rio",
      en: "contrast therapy cold plunge recovery Rio",
    },
  },
  {
    slug: "massagem",
    title: { pt: "Massagem Terapêutica", en: "Therapeutic Massage" },
    short: { pt: "Toque de nível internacional.", en: "Internationally awarded touch." },
    card: {
      pt: "Terapeutas com medalhas em campeonatos internacionais. Cada sessão é uma abordagem, não um protocolo.",
      en: "Therapists awarded at international bodywork championships. Each session is an approach, not a protocol.",
    },
    headline: {
      pt: "Anos de prática. Medalhas internacionais. Mãos que sabem onde ir.",
      en: "Years of practice. International medals. Hands that know where to go.",
    },
    desc: {
      pt: "A Mana House reúne terapeutas premiados em campeonatos internacionais de terapia corporal. O menu combina técnicas consolidadas há milênios e abordagens autorais desenvolvidas em anos de prática e pesquisa em recuperação física.",
      en: "Mana House brings together therapists awarded at international bodywork championships. The menu combines techniques refined over millennia with signature experiences developed through years of recovery research and practice.",
    },
    benefits: {
      pt: [
        "Thai Massage Traditional",
        "Deep Tissue Massage",
        "Lomi Lani Reset",
        "Mana Awakening Flow",
        "Therapeutic Aloha Sabai",
      ],
      en: [
        "Thai Massage Traditional",
        "Deep Tissue Massage",
        "Lomi Lani Reset",
        "Mana Awakening Flow",
        "Therapeutic Aloha Sabai",
      ],
    },
    imageAlt: {
      pt: "massagem terapêutica premiada Deep Tissue Rio de Janeiro",
      en: "award-winning therapeutic massage Deep Tissue Rio de Janeiro",
    },
  },
  {
    slug: "hot-yoga",
    title: { pt: "Hot Yoga Infravermelho", en: "Infrared Hot Yoga" },
    short: { pt: "Movimento com calor profundo.", en: "Movement with deep heat." },
    card: {
      pt: "Yoga em sala aquecida por infravermelho de ondas médias e longas.",
      en: "Yoga in a room heated by medium and long-wave infrared.",
    },
    headline: {
      pt: "O calor entra no tecido. O yoga faz o resto.",
      en: "The heat enters the tissue. The yoga does the rest.",
    },
    desc: {
      pt: "O infravermelho aquece o corpo diretamente, ampliando mobilidade articular antes mesmo da primeira sequência. Combinado ao yoga, aprofunda respiração, presença mental, circulação e relaxamento muscular.",
      en: "Infrared heats the body directly, expanding joint mobility before the first movement sequence begins. Combined with yoga, it deepens breath, presence, circulation and muscular relaxation.",
    },
    benefits: {
      pt: ["Mobilidade", "Respiração", "Presença mental", "Relaxamento muscular", "Leveza física"],
      en: ["Mobility", "Breath", "Mental presence", "Muscular relaxation", "Physical lightness"],
    },
    imageAlt: {
      pt: "hot yoga infravermelho Ipanema Rio de Janeiro",
      en: "infrared hot yoga Ipanema Rio de Janeiro",
    },
  },
  {
    slug: "espreguicadeira",
    title: { pt: "Espreguiçadeira Parassimpática", en: "Parasympathetic Lounger" },
    short: { pt: "O sistema nervoso pede licença.", en: "The nervous system clocks out." },
    card: {
      pt: "Bota pneumática, nervo vago e fotobiomodulação sistêmica ao mesmo tempo.",
      en: "Pneumatic compression, vagus nerve stimulation and systemic photobiomodulation at once.",
    },
    headline: {
      pt: "Três tecnologias. Uma espreguiçadeira. O corpo sai diferente de como entrou.",
      en: "Three technologies. One recliner. The body leaves different from how it arrived.",
    },
    desc: {
      pt: "A experiência ativa o modo de recuperação do organismo em três frentes: compressão sequencial, estimulação do nervo vago e terapia ILIB. A sinergia é o que torna a sessão diferente de qualquer tecnologia isolada.",
      en: "The experience activates the body's recovery mode across three fronts: sequential compression, vagus nerve stimulation and ILIB therapy. The synergy is what makes it different from any single technology.",
    },
    benefits: {
      pt: [
        "Drenagem linfática",
        "Redução de inchaço",
        "Desaceleração fisiológica",
        "Suporte anti-inflamatório",
        "Recuperação muscular",
      ],
      en: [
        "Lymphatic drainage",
        "Reduced swelling",
        "Physiological deceleration",
        "Anti-inflammatory support",
        "Muscular recovery",
      ],
    },
    imageAlt: {
      pt: "recuperação parassimpática nervo vago ILIB Rio",
      en: "parasympathetic recovery vagus nerve ILIB Rio",
    },
  },
  {
    slug: "sauna",
    title: { pt: "Sauna Híbrida Seca e Vapor", en: "Dry and Steam Hybrid Sauna" },
    short: { pt: "Dois calores. Um espaço.", en: "Two heats. One space." },
    card: {
      pt: "Sauna seca, sauna a vapor e chuveirão com luz vermelha para alternar conforme o corpo pede.",
      en: "Dry sauna, steam sauna and a red-light shower to alternate as the body asks.",
    },
    headline: {
      pt: "Dois formatos. Um espaço. O corpo escolhe.",
      en: "Two formats. One space. The body chooses.",
    },
    desc: {
      pt: "A sauna seca trabalha calor intenso e baixa umidade para sudorese profunda. O vapor relaxa vias aéreas e pele com desaceleração mais gradual. O chuveirão com anel de luz vermelha finaliza a experiência.",
      en: "The dry sauna uses intense heat and low humidity for deep sweating. Steam relaxes airways and skin with a more gradual deceleration. The red-light shower closes the experience.",
    },
    benefits: {
      pt: [
        "Sudorese profunda",
        "Relaxamento muscular",
        "Vias aéreas",
        "Pele",
        "Fotobiomodulação leve",
      ],
      en: ["Deep sweating", "Muscular relaxation", "Airways", "Skin", "Gentle photobiomodulation"],
    },
    imageAlt: {
      pt: "sauna seca vapor wellness Ipanema Rio",
      en: "dry steam sauna wellness Ipanema Rio",
    },
  },
];

export const homePillars = [
  {
    id: "hot-yoga" as const,
    label: { pt: "Hot Yoga", en: "Hot Yoga" },
    desc: {
      pt: "Movimento com calor infravermelho profundo para mobilidade, respiração e presença.",
      en: "Movement with deep infrared heat for mobility, breath and presence.",
    },
    href: "/especialidades" as const,
  },
  {
    id: "cold-plunge" as const,
    label: { pt: "Cold Plunge", en: "Cold Plunge" },
    desc: {
      pt: "Banho de gelo e circuito de contraste que acorda circulação, mente e sistema nervoso.",
      en: "Ice bath and contrast circuit that wakes circulation, mind and nervous system.",
    },
    href: "/especialidades" as const,
  },
  {
    id: "floating" as const,
    label: { pt: "Floating", en: "Floating" },
    desc: {
      pt: "Flutuação sensorial para desacelerar o corpo e entregar o sistema nervoso ao repouso.",
      en: "Sensory floating to slow the body and hand the nervous system over to rest.",
    },
  },
  {
    id: "bar" as const,
    label: { pt: "Bar", en: "Bar" },
    desc: {
      pt: "Um canto para pausar, conversar e recarregar entre uma sessão e outra.",
      en: "A corner to pause, talk and recharge between sessions.",
    },
  },
  {
    id: "connections" as const,
    label: { pt: "Connections", en: "Connections" },
    desc: {
      pt: "Comunidade, encontros e o espírito ohana — quem volta encontra as pessoas.",
      en: "Community, gatherings and the ohana spirit — those who return find the people.",
    },
    href: "/contato" as const,
  },
  {
    id: "membership" as const,
    label: { pt: "Membership", en: "Membership" },
    desc: {
      pt: "Planos para quem quer fazer da recuperação um ritual, não uma exceção.",
      en: "Plans for those who want recovery to be a ritual, not an exception.",
    },
    href: "/contato" as const,
  },
  {
    id: "nature" as const,
    label: { pt: "Nature", en: "Nature" },
    desc: {
      pt: "Bem-estar em sintonia com o corpo, o ritmo natural e o que a casa cultiva com cuidado.",
      en: "Wellness in tune with the body, natural rhythm and what the house cultivates with care.",
    },
  },
];

export const posts = [
  {
    slug: "contraste-recuperacao",
    title: "Por que a terapia de contraste acelera a recuperação",
    excerpt:
      "Entenda como calor e frio estimulam circulação, clareza mental e recuperação muscular.",
    date: "28 Mar 2026",
    read: "6 min",
  },
  {
    slug: "massagem-premiada",
    title: "Massagem terapêutica: técnica, escuta e resultado",
    excerpt: "O que muda quando a sessão é uma abordagem clínica, não um protocolo.",
    date: "12 Abr 2026",
    read: "5 min",
  },
  {
    slug: "hot-yoga-infravermelho",
    title: "Hot yoga infravermelho: mobilidade, suor e presença",
    excerpt: "Como o calor profundo amplia os efeitos da prática.",
    date: "03 Mai 2026",
    read: "4 min",
  },
];

export const vlogs = [
  {
    slug: "tour-espaco",
    title: "Tour pelo espaço Mana House",
    desc: "Conheça o ambiente onde acontecem nossos atendimentos.",
    duration: "2:14",
  },
  {
    slug: "contraste",
    title: "Como funciona uma sessão de contraste",
    desc: "Acompanhe o circuito de sauna infravermelha e banho de gelo.",
    duration: "5:48",
  },
  {
    slug: "hot-yoga",
    title: "Hot yoga infravermelho",
    desc: "Movimento com calor profundo e presença.",
    duration: "10:02",
  },
];

export function t(text: LocalizedText, locale: SiteLocale) {
  return text[locale];
}
