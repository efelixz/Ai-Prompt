import prisma from './prisma';

export async function getPrompts() {
  try {
    const prompts = await prisma.prompt.findMany({
      where: { status: 'published' },
    include: {
      category: true,
      aiTools: {
        include: {
          tool: true
        }
      },
      tags: {
        include: {
          tag: true
        }
      },
      author: true,
      examples: true,
      assets: true,
    },
      orderBy: { createdAt: 'desc' }
    });

    return prompts.map(mapPrompt);
  } catch (error) {
    console.error("Error fetching prompts", error);
    return [];
  }
}

export async function getPromptBySlug(slug: string) {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { slug },
    include: {
      category: true,
      aiTools: {
        include: {
          tool: true
        }
      },
      tags: {
        include: {
          tag: true
        }
      },
      author: true,
      examples: true,
      assets: true,
      }
    });

    if (!prompt) return null;
    return mapPrompt(prompt);
  } catch (error) {
    console.error("Error fetching prompt by slug", error);
    return null;
  }
}

export async function getPromptsByCategory(categorySlug: string) {
  const prompts = await prisma.prompt.findMany({
    where: {
      status: 'published',
      category: { slug: categorySlug }
    },
    include: {
      category: true,
      aiTools: {
        include: {
          tool: true
        }
      },
      tags: {
        include: {
          tag: true
        }
      },
    }
  });
  return prompts.map(mapPrompt);
}

export async function getPromptsByTool(toolSlug: string) {
  const prompts = await prisma.prompt.findMany({
    where: {
      status: 'published',
      aiTools: {
        some: {
          tool: { slug: toolSlug }
        }
      }
    },
    include: {
      category: true,
      aiTools: {
        include: {
          tool: true
        }
      },
      tags: {
        include: {
          tag: true
        }
      },
    }
  });
  return prompts.map(mapPrompt);
}

export async function getCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  });
}

export async function getAITools() {
  return prisma.aITool.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' }
  });
}

function mapPrompt(p: any) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDescription: p.shortDescription,
    fullDescription: p.fullDescription,
    promptText: p.promptText,
    promptTextShort: p.promptTextShort,
    promptTextAdvanced: p.promptTextAdvanced,
    isFeatured: p.isFeatured,
    isPremium: p.isPremium,
    aiTools: p.aiTools.map((at: any) => at.tool.name),
    category: p.category.name,
    difficulty: mapDifficulty(p.difficultyLevel),
    author: p.author?.name || 'Sistema',
    tags: p.tags.map((pt: any) => pt.tag.name),
    usageInstructions: p.usageInstructions,
    inputExample: p.examples?.[0]?.inputExample,
    outputExample: p.examples?.[0]?.outputExample,
    tips: [] // Pode ser expandido se adicionarmos ao schema
  };
}

function mapDifficulty(level: string) {
  const map: Record<string, string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado'
  };
  return map[level] || 'Iniciante';
}
