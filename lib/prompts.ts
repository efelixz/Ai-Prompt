export async function getPrompts() {
  // In a real app with a DB:
  // return prisma.prompt.findMany(...)

  // For this implementation, we centralize the mock data to avoid duplicate fetches
  return [
    {
      id: '1',
      title: 'Arquitetura Etérea Hiper-realista',
      slug: 'arquitetura-eterea-hiper-realista',
      shortDescription: 'Gere estruturas arquitetônicas deslumbrantes que misturam formas orgânicas com materiais futuristas.',
      fullDescription: 'Este prompt foi meticulosamente desenhado para arquitetos e designers que buscam explorar as fronteiras entre o orgânico e o tecnológico. Ele produz visualizações de alta fidelidade que parecem respirar, utilizando conceitos de biomimética e materiais inteligentes.',
      promptText: 'A hyper-realistic architectural visualization of a futuristic pavilion, organic flowing structures inspired by mycelium networks, bioluminescent materials embedded in semi-transparent glass, sunset lighting, cinematic atmosphere, 8k resolution, shot on 35mm lens --v 6.0',
      promptTextShort: 'Futuristic organic pavilion, mycelium structures, bioluminescent glass, sunset lighting, 8k --v 6.0',
      promptTextAdvanced: 'Architectural photography of a mycelium-inspired pavilion, parametric design, translucent polymers with embedded fiber optics, Golden Hour lighting (3200k), volumetric fog, high contrast, Rayleigh scattering, Unreal Engine 5 style render, shot on Hasselblad H6D --ar 21:9 --v 6.0',
      isFeatured: true,
      aiTools: ['Midjourney', 'DALL-E 3'],
      category: 'Arquitetura',
      difficulty: 'Intermediário',
      author: 'Erik Luminary',
      tags: ['Futurista', 'Orgânico', 'Render'],
      usageInstructions: 'Para melhores resultados no Midjourney, use a versão 6.0. Se estiver usando DALL-E 3, foque na descrição da iluminação.',
      inputExample: '"Pavilhão no deserto, entardecer."',
      outputExample: 'O resultado deve ser uma imagem com profundidade, texturas ricas e uma sensação de paz e inovação.',
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
      fullDescription: 'Desenvolvido para engenheiros de software, este prompt gera componentes React completos focados em estados de transição suaves e lógica resiliente.',
      promptText: 'Generate a React hook for managing complex button micro-interactions including hover, active, loading, and success states with Framer Motion integration. Include TypeScript types.',
      isFeatured: true,
      aiTools: ['ChatGPT-4', 'Claude 3.5'],
      category: 'Programação',
      difficulty: 'Avançado',
      author: 'Miles Indigo',
      tags: ['React', 'TypeScript', 'Frontend'],
      usageInstructions: 'Copie e cole em um arquivo .ts ou .tsx. Requer Framer Motion.',
      inputExample: '"Botão de checkout com estado de progresso."',
      outputExample: 'Um componente pronto para uso com acessibilidade e performance otimizada.',
      tips: [
        'Especifique se prefere Tailwind CSS.',
        'Peça testes unitários junto com o componente.'
      ]
    },
    {
       id: '3',
       title: 'Roteirista de Vídeos Virais para TikTok',
       slug: 'roteirista-videos-virais-tiktok',
       shortDescription: 'Crie roteiros estruturados com hooks fortes e retenção otimizada para vídeos curtos.',
       fullDescription: 'Framework de copy focado em retenção de 3 segundos e loop infinito.',
       promptText: 'Escreva um roteiro de 60 segundos para TikTok sobre [ASSUNTO]. Use a estrutura: Hook (3s) -> Problema -> Solução -> CTA.',
       isFeatured: false,
       aiTools: ['ChatGPT-4', 'Gemini Pro'],
       category: 'Marketing',
       difficulty: 'Iniciante',
       author: 'Ana Viral',
       tags: ['Copywriting', 'Social Media', 'Hooks'],
       usageInstructions: 'Substitua [ASSUNTO] pelo seu tópico.',
       inputExample: '"Como economizar sendo estudante."',
       outputExample: 'Um roteiro dinâmico com indicações de cortes de câmera.',
       tips: [
         'Peça sugestões de legendas e hashtags.',
         'Solicite 3 variações de hooks diferentes.'
       ]
    }
  ];
}

export async function getPromptBySlug(slug: string) {
  const prompts = await getPrompts();
  return prompts.find(p => p.slug === slug);
}
