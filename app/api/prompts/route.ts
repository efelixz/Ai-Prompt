import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for initial implementation
  const prompts = [
    {
      id: '1',
      title: 'Arquitetura Etérea Hiper-realista',
      slug: 'arquitetura-eterea-hiper-realista',
      shortDescription: 'Gere estruturas arquitetônicas deslumbrantes que misturam formas orgânicas com materiais futuristas.',
      fullDescription: 'Este prompt foi meticulosamente desenhado para arquitetos e designers que buscam explorar as fronteiras entre o orgânico e o tecnológico. Ele produz visualizações de alta fidelidade que parecem respirar, utilizando conceitos de biomimética e materiais inteligentes.',
      isFeatured: true,
      aiTools: ['Midjourney', 'DALL-E 3'],
      category: 'Arquitetura',
      difficulty: 'Intermediário',
      author: 'Erik Luminary',
      tags: ['Futurista', 'Orgânico', 'Render'],
      createdAt: '2024-03-20T10:00:00Z',
      promptText: 'A hyper-realistic architectural visualization of a futuristic pavilion, organic flowing structures inspired by mycelium networks, bioluminescent materials embedded in semi-transparent glass, sunset lighting, cinematic atmosphere, 8k resolution, shot on 35mm lens --v 6.0',
      promptTextShort: 'Futuristic organic pavilion, mycelium inspired, bioluminescent, cinematic lighting.',
      promptTextAdvanced: 'Architectural render of a sustainable pavilion, parametric design, mycelium-based structural forms, translucent smart-glass facade with embedded photonic crystals for bioluminescence, golden hour illumination with soft shadows, misty atmosphere, ultra-detailed textures, unreal engine 5 style, --ar 16:9 --stylize 750',
      usageInstructions: 'Para melhores resultados no Midjourney, use a versão 6.0. Se estiver usando DALL-E 3, foque na descrição da iluminação.',
      inputExample: 'Pavilhão no deserto, entardecer.',
      outputExample: 'Uma imagem deslumbrante de uma estrutura em forma de duna com luzes internas azuis suaves sob um céu púrpura.',
      resultDescription: 'O resultado deve ser uma imagem com profundidade, texturas ricas e uma sensação de paz e inovação.',
      tips: [
        'Adicione "rainy day" para reflexos mais dramáticos.',
        'Use "macro shot" para focar nos detalhes dos materiais.',
        'Experimente diferentes proporções de tela com --ar 21:9.'
      ]
    },
    {
      id: '2',
      title: 'Framework de Lógica para Micro-interações',
      slug: 'framework-logica-micro-interacoes',
      shortDescription: 'Um prompt de precisão para criar micro-interações complexas em React com lógica de estado performática.',
      fullDescription: 'Ideal para engenheiros frontend que precisam de componentes altamente interativos mas querem evitar código bagunçado. Este prompt gera a estrutura lógica, estados de transição e integração com Framer Motion.',
      isFeatured: true,
      aiTools: ['ChatGPT-4', 'Claude 3.5'],
      category: 'Programação',
      difficulty: 'Avançado',
      author: 'Miles Indigo',
      tags: ['React', 'TypeScript', 'Frontend'],
      createdAt: '2024-03-21T12:00:00Z',
      promptText: 'Atue como um Engenheiro de Software Sênior especializado em React e Animações. Crie um componente de botão de "curtir" altamente interativo usando Framer Motion e Lucide React. O componente deve lidar com estados de repouso, hover, ativação e erro. Use Tailwind CSS para estilização e TypeScript para tipagem rigorosa.',
      promptTextShort: 'Componente React interativo com Framer Motion e TypeScript.',
      promptTextAdvanced: 'Gere um hook customizado useInteractiveState para gerenciar micro-interações complexas em React. O hook deve retornar estados de animação prontos para o Framer Motion. Aplique princípios de design de interface como "anticipatory feedback". Implemente usando uma máquina de estados finitos (XState opcional) para garantir robustez.',
      usageInstructions: 'Copie o código gerado e instale as dependências: framer-motion, lucide-react e tailwind-merge.',
      inputExample: 'Botão de upload com progresso.',
      outputExample: 'Um componente completo com animação de preenchimento e ícone de check ao finalizar.',
      resultDescription: 'Código limpo, modular e pronto para produção, seguindo as melhores práticas de acessibilidade.',
      tips: [
        'Peça para adicionar testes unitários com Vitest.',
        'Solicite uma versão que utilize CSS Modules se preferir.',
        'Peça explicações sobre as escolhas de performance nas animações.'
      ]
    },
    {
      id: '3',
      title: 'Roteirista de Vídeos Virais para TikTok',
      slug: 'roteirista-videos-virais-tiktok',
      shortDescription: 'Crie roteiros estruturados com hooks fortes e retenção otimizada para vídeos curtos.',
      fullDescription: 'Este prompt utiliza técnicas de retenção psicológica para manter o usuário assistindo até o fim. Foca em ganchos visuais e verbais imediatos.',
      isFeatured: false,
      aiTools: ['ChatGPT-4', 'Gemini Pro'],
      category: 'Marketing',
      difficulty: 'Iniciante',
      author: 'Sarah Content',
      tags: ['Social Media', 'Hooks', 'Viral'],
      createdAt: '2024-03-22T09:00:00Z',
      promptText: 'Escreva um roteiro de 30 segundos para o TikTok sobre [TEMA]. Use a estrutura: 0-3s Gancho Explosivo, 3-15s Valor/História, 15-25s Reviravolta/Dica Bônus, 25-30s CTA Forte. Inclua sugestões de cenas visuais e legendas dinâmicas.',
      promptTextShort: 'Roteiro TikTok com gancho, conteúdo e CTA.',
      promptTextAdvanced: 'Crie um roteiro de vídeo curto otimizado para o algoritmo do TikTok. O tema é [TEMA]. Analise os trending audios atuais e sugira um que combine. O gancho deve atacar uma dor comum da persona [PERSONA]. O ritmo deve ser acelerado, com cortes sugeridos a cada 1.5 segundos.',
      usageInstructions: 'Substitua [TEMA] pelo assunto do seu vídeo. Seja específico sobre quem é seu público.',
      inputExample: 'Como fazer café gelado em casa.',
      outputExample: 'Roteiro: "Pare de gastar 20 reais em café gelado! (Gancho)..."',
      resultDescription: 'Um script pronto para gravar, com marcações de tempo e diretrizes de edição.',
      tips: [
        'Peça 3 variações diferentes de ganchos.',
        'Solicite sugestões de hashtags relevantes.',
        'Peça para adaptar o tom para sarcástico ou motivacional.'
      ]
    },
    {
      id: '4',
      title: 'Mockup de Packaging Minimalista',
      slug: 'mockup-packaging-minimalista',
      shortDescription: 'Prompt para visualização 3D de embalagens premium com foco em iluminação de estúdio.',
      fullDescription: 'Para designers de embalagem que precisam de renders rápidos para apresentação de conceito sem abrir softwares de 3D pesados.',
      isFeatured: false,
      aiTools: ['Midjourney'],
      category: 'Design',
      difficulty: 'Intermediário',
      author: 'Lucas Craft',
      tags: ['Minimalismo', 'Branding', '3D'],
      createdAt: '2024-03-23T15:00:00Z',
      promptText: 'Premium cosmetics packaging mockup, matte black glass bottle, minimalist label design, studio lighting, soft shadows, neutral background, high-end product photography, 8k resolution --ar 4:5',
      promptTextShort: 'Minimalist premium bottle mockup, studio lighting.',
      promptTextAdvanced: 'Studio product photography of a luxury skincare box and glass jar. Materials: soft-touch paper, embossed silver foil logo, frosted glass. Lighting: top-down softbox with side reflector for rim light. Composition: Rule of thirds, focus on texture. Cinematic color grading. --v 6.0 --stylize 250',
      usageInstructions: 'No Midjourney, use o comando --stylize baixo se quiser manter o design mais "realista" e menos "artístico".',
      inputExample: 'Garrafa de vinho artesanal.',
      outputExample: 'Um render de garrafa de vinho com rótulo texturizado em um ambiente de adega moderna.',
      resultDescription: 'Uma imagem limpa e profissional que pode ser usada diretamente em apresentações de portfólio.',
      tips: [
        'Adicione "depth of field" para focar no rótulo.',
        'Tente "floating composition" para um visual mais moderno.',
        'Mude a cor de fundo para "soft pastel" para produtos de beleza.'
      ]
    },
    {
      id: '5',
      title: 'Analista de SEO de Conteúdo',
      slug: 'analista-seo-conteudo',
      shortDescription: 'Analise e otimize textos para palavras-chave semânticas e intenção de busca do usuário.',
      fullDescription: 'Uma ferramenta essencial para copywriters e profissionais de SEO que desejam subir no ranking do Google garantindo qualidade e relevância.',
      isFeatured: false,
      aiTools: ['ChatGPT-4', 'Perplexity'],
      category: 'Marketing',
      difficulty: 'Intermediário',
      author: 'SEO Master',
      tags: ['SEO', 'Conteúdo', 'Otimização'],
      createdAt: '2024-03-24T11:00:00Z',
      promptText: 'Analise o texto a seguir para SEO. Identifique a palavra-chave principal e sugira 5 palavras-chave LSI. Verifique a densidade, a estrutura de H1-H3 e a legibilidade. Recomende melhorias para aumentar a taxa de clique (CTR) no título. Texto: [COLE O TEXTO AQUI]',
      promptTextShort: 'Análise de SEO de texto e sugestão de melhorias.',
      promptTextAdvanced: 'Atue como um Especialista em SEO de Conteúdo da HubSpot. Realize uma auditoria completa do conteúdo [LINK OU TEXTO]. Compare com a intenção de busca "informativa". Crie um plano de otimização de "Featured Snippet". Sugira links internos e externos baseados na autoridade do domínio.',
      usageInstructions: 'Cole o seu rascunho de artigo ou forneça o link se a IA tiver acesso à web.',
      inputExample: 'Artigo sobre benefícios da creatina.',
      outputExample: 'Lista de melhorias, novos títulos e palavras-chave que faltavam no texto.',
      resultDescription: 'Um guia prático de como transformar um texto comum em um conteúdo otimizado para buscadores.',
      tips: [
        'Peça para criar a Meta Description também.',
        'Solicite uma tabela comparativa com os concorrentes do Top 3.',
        'Peça para ajustar o tom de voz para ser mais autoritativo.'
      ]
    },
    {
      id: '6',
      title: 'Tutor de Física Quântica Simples',
      slug: 'tutor-fisica-quantica-simples',
      shortDescription: 'Explique conceitos complexos de física quântica usando analogias do dia a dia.',
      fullDescription: 'Torne o aprendizado de física divertido e acessível. Este prompt quebra barreiras técnicas usando exemplos que qualquer pessoa entende.',
      isFeatured: false,
      aiTools: ['Claude 3.5', 'Gemini Pro'],
      category: 'Educação',
      difficulty: 'Iniciante',
      author: 'Prof. Quark',
      tags: ['Física', 'Educação', 'Analogias'],
      createdAt: '2024-03-25T08:00:00Z',
      promptText: 'Explique o conceito de [CONCEITO] da física quântica para uma criança de 10 anos. Use uma analogia com esportes ou jogos de vídeo game. Evite fórmulas matemáticas complexas e foque na intuição por trás do fenômeno.',
      promptTextShort: 'Explicação simples de física quântica para iniciantes.',
      promptTextAdvanced: 'Você é o Richard Feynman. Explique o Entalhamento Quântico usando a técnica de Feynman. Comece de forma simples, identifique onde a explicação falha, volte aos fundamentos e finalize com uma analogia que até um leigo entenda, mas sem perder a essência científica.',
      usageInstructions: 'Insira o conceito que você está tendo dificuldade de entender (ex: Superposição, Tunelamento).',
      inputExample: 'O que é o Gato de Schrödinger?',
      outputExample: 'Uma história sobre um vídeo game onde o personagem está em dois lugares ao mesmo tempo até você olhar para a tela.',
      resultDescription: 'Clareza mental imediata sobre um assunto que antes parecia impossível.',
      tips: [
        'Peça um quiz de 3 perguntas ao final para testar seu conhecimento.',
        'Solicite sugestões de vídeos ou livros para aprofundar.',
        'Peça para explicar como esse conceito é usado na tecnologia real hoje.'
      ]
    }
  ];

  return NextResponse.json(prompts);
}
