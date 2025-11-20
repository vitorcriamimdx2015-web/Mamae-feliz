import React from 'react';
import { Milk, MoonStar, HeartHandshake, Star, ShieldAlert, Info, Activity, Thermometer, Hand, Cat, Bike } from 'lucide-react';
import { QuickTopic, Recipe, VideoResource, ExpertTip } from './types';

// Placeholder URL matching the "Mother and Baby" theme. 
// In a real scenario, replace this with the local path to the user's uploaded image (e.g., '/logo.png')
export const APP_LOGO_URL = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png";

// ==================================================================================
// 🚨 ÁREA DE CONFIGURAÇÃO DE PAGAMENTO (MUITO IMPORTANTE) 🚨
// ==================================================================================
// 1. Acesse sua conta do Mercado Pago (mercadopago.com.br).
// 2. Vá no menu "Link de pagamento" -> "Criar novo link".
// 3. Crie um produto chamado "Assinatura Mensal Mamãe Feliz" valor R$ 24,99.
// 4. Copie o link gerado e cole abaixo em 'monthlyLink'.
// 5. Repita para o Plano Anual (R$ 199,99) e cole em 'annualLink'.
// ==================================================================================

export const PAYMENT_CONFIG = {
  monthlyLink: "https://mpago.la/1gg8ygM", // Link Mensal Configurado
  annualLink: "https://mpago.la/1ju3nWc",   // Link Anual Configurado
  whatsappSupport: "5513981570090", // WhatsApp Configurado
};

// ==================================================================================

export const QUICK_TOPICS: QuickTopic[] = [
  {
    id: 'food',
    title: 'Alimentação',
    prompt: 'Quais são as principais dicas para começar a introdução alimentar do meu bebê?',
    icon: <Milk className="w-6 h-6 text-white" />,
    color: 'bg-purple-400'
  },
  {
    id: 'sleep',
    title: 'Sono e Rotina',
    prompt: 'Meu bebê está com dificuldade para dormir a noite toda. Pode me ajudar com dicas de rotina de sono?',
    icon: <MoonStar className="w-6 h-6 text-white" />,
    color: 'bg-indigo-400'
  },
  {
    id: 'health',
    title: 'Cólicas e Gases',
    prompt: 'Meu bebê parece estar com cólicas e gases. O que posso fazer para aliviar?',
    icon: <HeartHandshake className="w-6 h-6 text-white" />,
    color: 'bg-pink-400'
  },
  {
    id: 'development',
    title: 'Desenvolvimento',
    prompt: 'Quais marcos de desenvolvimento devo esperar nos primeiros 6 meses?',
    icon: <Star className="w-6 h-6 text-white" />,
    color: 'bg-teal-400'
  }
];

export const DISCLAIMER_TEXT = "O Mamãe Feliz utiliza inteligência artificial para fornecer informações de apoio. Nossas respostas não substituem o conselho, diagnóstico ou tratamento médico profissional. Em caso de emergência ou dúvida sobre a saúde do bebê, consulte sempre um pediatra.";

export const FORUM_CATEGORIES = {
  alimentacao: { label: 'Alimentação', color: 'bg-orange-100 text-orange-700' },
  sono: { label: 'Sono', color: 'bg-indigo-100 text-indigo-700' },
  saude: { label: 'Saúde', color: 'bg-rose-100 text-rose-700' },
  comportamento: { label: 'Comportamento', color: 'bg-teal-100 text-teal-700' },
  outros: { label: 'Outros', color: 'bg-gray-100 text-gray-700' }
};

export const BABY_RECIPES: Recipe[] = [
  // PAPINHAS (Main Meals)
  {
    id: 'p1',
    title: 'Papinha de Mandioquinha com Carne',
    category: 'papinhas',
    ageRecommendation: '6+ meses',
    prepTime: '30 min',
    ingredients: [
      '2 colheres (sopa) de carne moída magra (patinho ou músculo)',
      '1 mandioquinha média',
      '1/2 cenoura pequena',
      '1 colher (chá) de azeite',
      'Salsinha picada a gosto'
    ],
    instructions: [
      'Refogue a carne moída no azeite com um pouco de cebola (opcional) até dourar.',
      'Adicione a mandioquinha e a cenoura em cubos pequenos e cubra com água.',
      'Cozinhe até que os legumes estejam bem macios.',
      'Amasse os legumes com um garfo (evite liquidificar para estimular a mastigação).',
      'Misture a carne e finalize com a salsinha.'
    ],
    benefits: 'Rico em ferro e carboidratos de fácil digestão.',
    isPremium: false
  },
  {
    id: 'p2',
    title: 'Creme de Abóbora com Feijão',
    category: 'papinhas',
    ageRecommendation: '7+ meses',
    prepTime: '25 min',
    ingredients: [
      '1 fatia de abóbora cabotiá',
      '1 concha de feijão cozido (com caldo)',
      '1 folha de couve picadinha',
      'Fio de azeite'
    ],
    instructions: [
      'Cozinhe a abóbora no vapor ou água até ficar macia.',
      'Amasse a abóbora formando um purê.',
      'Amasse os grãos de feijão levemente.',
      'Refogue a couve rapidamente no azeite até murchar.',
      'Misture tudo e sirva morno.'
    ],
    benefits: 'Combinação perfeita de proteínas vegetais e fibras para o intestino.',
    isPremium: true
  },
  {
    id: 'p3',
    title: 'Papinha de Frango, Batata Doce e Brócolis',
    category: 'papinhas',
    ageRecommendation: '6+ meses',
    prepTime: '35 min',
    ingredients: [
      '1 filé de frango pequeno desfiado ou picadinho',
      '1 batata doce pequena',
      '2 floretes de brócolis',
      'Alho e cebola para temperar'
    ],
    instructions: [
      'Cozinhe o frango e desfie bem ou pique em pedacinhos minúsculos.',
      'Cozinhe a batata doce e o brócolis até ficarem macios.',
      'Amasse a batata e pique o brócolis bem pequeno.',
      'Misture todos os ingredientes, regue com um fio de azeite cru antes de servir.'
    ],
    benefits: 'Vitamina A, proteínas magras e ferro.',
    isPremium: false
  },

  // FRUTAS (Fruits)
  {
    id: 'f1',
    title: 'Purê de Pera com Ameixa',
    category: 'frutas',
    ageRecommendation: '6+ meses',
    prepTime: '10 min',
    ingredients: [
      '1 pera madura',
      '1 ameixa seca sem caroço (hidratada em água morna)'
    ],
    instructions: [
      'Deixe a ameixa de molho em água morna por 15 min para amaciar.',
      'Descasque a pera e retire as sementes.',
      'Cozinhe a pera levemente no vapor se estiver dura (opcional).',
      'Amasse a pera junto com a ameixa até formar uma pastinha.',
      'Sirva em temperatura ambiente.'
    ],
    benefits: 'Excelente para regular o intestino do bebê (efeito laxante natural).',
    isPremium: true
  },
  {
    id: 'f2',
    title: 'Banana Amassadinha com Aveia',
    category: 'frutas',
    ageRecommendation: '6+ meses',
    prepTime: '5 min',
    ingredients: [
      '1 banana prata ou nanica bem madura',
      '1 colher (café) de farelo de aveia'
    ],
    instructions: [
      'Descasque a banana e amasse bem com um garfo.',
      'Polvilhe a aveia por cima e misture.',
      'Ofereça imediatamente para não oxidar (escurecer).'
    ],
    benefits: 'Energia rápida e fibras. A aveia ajuda na saciedade.',
    isPremium: false
  },
  {
    id: 'f3',
    title: 'Mousse Natural de Manga',
    category: 'frutas',
    ageRecommendation: '6+ meses',
    prepTime: '5 min',
    ingredients: [
      '1/2 manga palmer madura (sem fiapos)'
    ],
    instructions: [
      'Descasque a manga.',
      'Bata a polpa no mixer ou liquidificador (ou amasse bem na peneira) para ficar bem aerado.',
      'Não precisa adicionar água ou açúcar.'
    ],
    benefits: 'Rico em Vitamina C e muito doce naturalmente, ótima aceitação.',
    isPremium: false
  },

  // SUCOS E LANCHES
  {
    id: 's1',
    title: 'Suco de Laranja Lima com Cenoura',
    category: 'sucos_lanches',
    ageRecommendation: '12+ meses (Sucos) / 6+ (Como papa)',
    prepTime: '10 min',
    ingredients: [
      'Suco de 2 laranjas lima',
      '1/4 de cenoura pequena ralada'
    ],
    instructions: [
      'Bata o suco da laranja com a cenoura no liquidificador.',
      'Coe se necessário (para bebês maiores, as fibras são ótimas).',
      'Nota: Para bebês menores de 1 ano, prefira oferecer a laranja em bagaços e a cenoura cozida.'
    ],
    benefits: 'Explosão de imunidade e betacaroteno.',
    isPremium: false
  },
  {
    id: 's2',
    title: 'Água Aromatizada de Melancia',
    category: 'sucos_lanches',
    ageRecommendation: '6+ meses',
    prepTime: '5 min',
    ingredients: [
      '1 fatia de melancia',
      'Água filtrada ou água de coco'
    ],
    instructions: [
      'Amasse a melancia e passe na peneira para extrair o suco natural.',
      'Misture com um pouquinho de água se ficar muito concentrado.',
      'Ótimo para dias quentes.'
    ],
    benefits: 'Hidratação profunda.',
    isPremium: false
  },
  {
    id: 's3',
    title: 'Panquequinha de Banana (BLW)',
    category: 'sucos_lanches',
    ageRecommendation: '9+ meses',
    prepTime: '15 min',
    ingredients: [
      '1 banana madura',
      '1 ovo',
      '1 colher (sopa) de aveia'
    ],
    instructions: [
      'Amasse a banana e misture com o ovo batido e a aveia.',
      'Unte uma frigideira antiaderente com um pingo de azeite.',
      'Coloque pequenas porções da massa e doure dos dois lados.',
      'Sirva em pedaços que o bebê consiga pegar.'
    ],
    benefits: 'Ótimo lanchinho da tarde para treinar a autonomia.',
    isPremium: true
  }
];

export const COLIC_TIPS = [
  {
    id: 'bicicleta',
    title: 'Movimento da Bicicletinha',
    description: 'Deite o bebê de barriga para cima. Segure as perninhas e faça movimentos circulares suaves, como se ele estivesse pedalando. Isso ajuda a liberar os gases presos.',
    iconName: 'Bike'
  },
  {
    id: 'calor',
    title: 'Compressa Morna',
    description: 'Passe uma fralda de pano com ferro quente (teste a temperatura no seu pulso!) ou use uma bolsa de sementes morna sobre a barriguinha do bebê.',
    iconName: 'ThermometerSun'
  },
  {
    id: 'shantala',
    title: 'Massagem na Barriga',
    description: 'Faça movimentos circulares em sentido horário na barriga do bebê usando óleo vegetal seguro. Pressione levemente para ajudar o trânsito intestinal.',
    iconName: 'Hand'
  },
  {
    id: 'tiger',
    title: 'Posição "Tigre na Árvore"',
    description: 'Coloque o bebê de bruços sobre o seu antebraço, com a cabeça apoiada na sua mão. O peso da barriguinha no seu braço alivia a dor.',
    iconName: 'Cat'
  }
];

export const VACCINE_SCHEDULE = [
  {
    month: 'Ao Nascer',
    vaccines: ['BCG (Dose única)', 'Hepatite B (1ª dose)'],
    care: 'A BCG costuma formar uma ferida pequena que vira cicatriz. Não esprema, apenas mantenha limpo.'
  },
  {
    month: '2 Meses',
    vaccines: ['Penta (1ª)', 'VIP (Poliomielite 1ª)', 'Pneumocócica 10 (1ª)', 'Rotavírus (1ª)'],
    care: 'Pode haver febre e dor local. Compressa fria no local da injeção ajuda. Muita mamada para confortar!'
  },
  {
    month: '3 Meses',
    vaccines: ['Meningocócica C (1ª)'],
    care: 'Geralmente tranquila, mas fique atenta a irritabilidade.'
  },
  {
    month: '4 Meses',
    vaccines: ['Penta (2ª)', 'VIP (2ª)', 'Pneumocócica 10 (2ª)', 'Rotavírus (2ª)'],
    care: 'Reforço das doses de 2 meses. O bebê pode ficar enjoadinho.'
  },
  {
    month: '5 Meses',
    vaccines: ['Meningocócica C (2ª)'],
    care: 'Segunda dose da vacina de 3 meses.'
  },
  {
    month: '6 Meses',
    vaccines: ['Penta (3ª)', 'VIP (3ª)', 'Influenza (Gripe - Dose anual)'],
    care: 'Marca o fim do primeiro ciclo intenso. Parabéns, mamãe!'
  }
];

export const EDUCATIONAL_VIDEOS: VideoResource[] = [
  {
    id: 'v1',
    title: 'Dicas de Introdução Alimentar 🍎',
    duration: '5:12',
    category: '#NutriInfantil',
    thumbnailUrl: 'https://img.youtube.com/vi/J4X5mK5F5w4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/J4X5mK5F5w4?autoplay=1&rel=0',
    description: 'Como começar a introdução alimentar de forma segura e saudável. BLW e papinhas explicados na prática.',
    isPremium: false
  },
  {
    id: 'v2',
    title: 'Adeus Cólica? Massagem Shantala ✨',
    duration: '3:30',
    category: '#SemChoro',
    thumbnailUrl: 'https://img.youtube.com/vi/ptXj1jFp_gU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/ptXj1jFp_gU?autoplay=1&rel=0',
    description: 'A técnica infalível de massagem que acalma bebês com gases e cólicas. Passo a passo.',
    isPremium: false
  },
  {
    id: 'v3',
    title: 'Manobra de Desengasgo: Salve uma vida 🚨',
    duration: '2:15',
    category: '#PrimeirosSocorros',
    thumbnailUrl: 'https://img.youtube.com/vi/5T5ZZc8KjKQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/5T5ZZc8KjKQ?autoplay=1&rel=0',
    description: 'Todo pai e mãe PRECISA ver isso. O passo a passo exato do que fazer se o bebê engasgar.',
    isPremium: true
  },
  {
    id: 'v4',
    title: 'Como fazer o bebê dormir a noite toda 😴',
    duration: '4:10',
    category: '#SonoDoBebe',
    thumbnailUrl: 'https://img.youtube.com/vi/hJ3h2vj-wXo/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/hJ3h2vj-wXo?autoplay=1&rel=0',
    description: 'Dicas de higiene do sono e rotina para melhorar a noite de toda a família.',
    isPremium: true
  },
  {
    id: 'v5',
    title: 'Banho do Recém-Nascido: Passo a Passo 🛁',
    duration: '6:00',
    category: '#Higiene',
    thumbnailUrl: 'https://img.youtube.com/vi/_G2eLwz5yK8/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/_G2eLwz5yK8?autoplay=1&rel=0',
    description: 'Como dar banho no bebê com segurança e tranquilidade, desde a temperatura da água até a limpeza.',
    isPremium: false
  }
];

export const PEDIATRICIAN_TIPS: ExpertTip[] = [
  {
    id: 't1',
    topic: 'Febre',
    question: 'Quando devo levar meu bebê ao pronto-socorro por causa de febre?',
    answer: 'Em recém-nascidos (até 3 meses), qualquer febre acima de 37,8ºC requer avaliação médica imediata. Entre 3 e 6 meses, se a febre persistir ou vier acompanhada de choro intenso/prostração. Acima de 6 meses, observe o estado geral: se a criança brinca e mama quando a febre baixa, pode-se aguardar observando por 24-48h.',
    doctorName: 'Dra. Juliana Martins',
    specialty: 'Pediatra',
    isPremium: true
  },
  {
    id: 't2',
    topic: 'Engasgo',
    question: 'O que fazer se o bebê engasgar com leite?',
    answer: 'Mantenha a calma. Se o bebê estiver tossindo e corado, deixe-o tossir, é o melhor mecanismo de defesa. Se ele ficar roxinho ou não emitir som, inicie a manobra de Heimlich para bebês (tapotagem nas costas) imediatamente e peça para alguém ligar para a emergência (192).',
    doctorName: 'Dr. Roberto Almeida',
    specialty: 'Emergencista Pediátrico',
    isPremium: true
  },
  {
    id: 't3',
    topic: 'Dentição',
    question: 'Como aliviar a coceira da gengiva no nascimento dos dentes?',
    answer: 'Mordedores gelados (coloque na geladeira, não no freezer) ajudam muito, pois o frio anestesia o local. Oferecer picolé de leite materno também é uma ótima opção natural. Evite pomadas com anestésicos sem prescrição médica.',
    doctorName: 'Dra. Carla Souza',
    specialty: 'Odontopediatra',
    isPremium: false
  },
  {
    id: 't4',
    topic: 'Pele',
    question: 'A pele do meu bebê está descascando, é normal?',
    answer: 'Sim, é muito comum nos primeiros dias de vida (descamação fisiológica). Não é necessário passar óleos ou cremes em excesso, a pele se renova naturalmente. Use sabonetes neutros e banhos rápidos.',
    doctorName: 'Dra. Juliana Martins',
    specialty: 'Pediatra',
    isPremium: false
  }
];