import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seed: Iniciando...')

  // 1. Criar Usuário (Autor principal/Admin)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@obsidian.com' },
    update: {},
    create: {
      email: 'admin@obsidian.com',
      name: 'Erik Luminary',
      role: 'admin',
      status: 'active',
    },
  })

  // 2. Criar IAs
  const tools = [
    { name: 'ChatGPT', slug: 'chatgpt', vendor: 'OpenAI' },
    { name: 'Claude', slug: 'claude', vendor: 'Anthropic' },
    { name: 'Midjourney', slug: 'midjourney', vendor: 'Midjourney' },
    { name: 'Gemini', slug: 'gemini', vendor: 'Google' },
    { name: 'DALL-E 3', slug: 'dalle-3', vendor: 'OpenAI' },
  ]

  const createdTools = await Promise.all(
    tools.map((tool) =>
      prisma.aITool.upsert({
        where: { slug: tool.slug },
        update: {},
        create: {
          name: tool.name,
          slug: tool.slug,
          vendor: tool.vendor,
        },
      })
    )
  )

  // 3. Criar Categorias
  const categories = [
    { name: 'Arquitetura', slug: 'arquitetura' },
    { name: 'Programação', slug: 'programacao' },
    { name: 'Marketing', slug: 'marketing' },
    { name: 'Design', slug: 'design' },
    { name: 'Vídeo', slug: 'video' },
  ]

  const createdCategories = await Promise.all(
    categories.map((cat) =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: {
          name: cat.name,
          slug: cat.slug,
        },
      })
    )
  )

  // 4. Criar Prompts
  const promptsData = [
    {
      title: 'Arquitetura Etérea Hiper-realista',
      slug: 'arquitetura-eterea-hiper-realista',
      shortDescription: 'Gere estruturas arquitetônicas deslumbrantes que misturam formas orgânicas com materiais futuristas.',
      fullDescription: 'Este prompt foi meticulosamente desenhado para arquitetos e designers que buscam explorar as fronteiras entre o orgânico e o tecnológico.',
      promptText: 'A hyper-realistic architectural visualization of a futuristic pavilion, organic flowing structures inspired by mycelium networks...',
      promptTextShort: 'Futuristic organic pavilion, mycelium structures, bioluminescent glass, sunset lighting, 8k',
      promptTextAdvanced: 'Architectural photography of a mycelium-inspired pavilion, parametric design, translucent polymers...',
      difficultyLevel: 'intermediate',
      isFeatured: true,
      categoryId: createdCategories.find((c) => c.slug === 'arquitetura')!.id,
      authorId: admin.id,
      tools: ['midjourney', 'dalle-3'],
      tags: ['Futurista', 'Orgânico', 'Render'],
    },
    {
      title: 'Framework de Lógica para Micro-interações',
      slug: 'framework-logica-micro-interacoes',
      shortDescription: 'Um prompt de precisão para criar micro-interações complexas em React com lógica de estado performática.',
      fullDescription: 'Desenvolvido para engenheiros de software, este prompt gera componentes React completos focados em estados de transição suaves.',
      promptText: 'Generate a React hook for managing complex button micro-interactions including hover, active, loading, and success states...',
      difficultyLevel: 'advanced',
      isFeatured: true,
      categoryId: createdCategories.find((c) => c.slug === 'programacao')!.id,
      authorId: admin.id,
      tools: ['chatgpt', 'claude'],
      tags: ['React', 'TypeScript', 'Frontend'],
    },
  ]

  for (const p of promptsData) {
    const prompt = await prisma.prompt.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        promptText: p.promptText,
        promptTextShort: p.promptTextShort,
        promptTextAdvanced: p.promptTextAdvanced,
        difficultyLevel: p.difficultyLevel,
        isFeatured: p.isFeatured,
        categoryId: p.categoryId,
        authorId: p.authorId,
        status: 'published',
      },
    })

    // Conectar ferramentas
    for (const toolSlug of p.tools) {
      const tool = createdTools.find((t) => t.slug === toolSlug)
      if (tool) {
        await prisma.promptAITool.upsert({
          where: { promptId_toolId: { promptId: prompt.id, toolId: tool.id } },
          update: {},
          create: { promptId: prompt.id, toolId: tool.id },
        })
      }
    }

    // Criar/Conectar Tags
    for (const tagName of p.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      })
      await prisma.promptTag.upsert({
        where: { promptId_tagId: { promptId: prompt.id, tagId: tag.id } },
        update: {},
        create: { promptId: prompt.id, tagId: tag.id },
      })
    }
  }

  console.log('Seed: Finalizado com sucesso.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
