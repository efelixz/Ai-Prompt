import prisma from './prisma';

export async function getPrompts(filters?: {
  search?: string;
  category?: string;
  tool?: string;
  difficulty?: string;
}) {
  try {
    const where: any = { status: 'published' };

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { shortDescription: { contains: filters.search, mode: 'insensitive' } },
        { promptText: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.category) {
      where.category = { slug: filters.category };
    }

    if (filters?.difficulty) {
      where.difficultyLevel = filters.difficulty;
    }

    if (filters?.tool) {
      where.aiTools = {
        some: {
          tool: { slug: filters.tool }
        }
      };
    }

    const prompts = await prisma.prompt.findMany({
      where,
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

export async function getFavoritePrompts(userId: string) {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        prompt: {
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
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return favorites.map(f => mapPrompt(f.prompt));
  } catch (error) {
    console.error("Error fetching favorite prompts", error);
    return [];
  }
}

export async function getUserCollections(userId: string) {
  try {
    return prisma.collection.findMany({
      where: { userId },
      include: {
        _count: {
          select: { items: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
  } catch (error) {
    console.error("Error fetching user collections", error);
    return [];
  }
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
