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

export async function getTrendingPrompts() {
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
      },
      take: 20
    });

    // Ranking formula: score = (views * 0.2) + (copies * 0.5) + (favorites * 0.7) + (rating * 1.2)
    const promptsWithScore = prompts.map(p => {
       const score =
         (p.viewCount * 0.2) +
         (p.copyCount * 0.5) +
         (p.favoriteCount * 0.7) +
         (Number(p.ratingAvg) * 1.2);
       return { ...mapPrompt(p), rankingScore: score };
    });

    return promptsWithScore
      .sort((a, b) => b.rankingScore - a.rankingScore)
      .slice(0, 6);
  } catch (error) {
    console.error("Error fetching trending prompts", error);
    return [];
  }
}

export async function getPromptOfDay() {
  try {
    // Para o protótipo, pegamos o prompt com maior avaliação ou um destaque aleatório
    const prompt = await prisma.prompt.findFirst({
      where: { status: 'published', isFeatured: true },
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
      },
      orderBy: { ratingAvg: 'desc' }
    });

    if (!prompt) return null;
    return mapPrompt(prompt);
  } catch (error) {
    console.error("Error fetching prompt of the day", error);
    return null;
  }
}

export async function getCollectionDetail(collectionId: string) {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      include: {
        items: {
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
        }
      }
    });

    if (!collection) return null;

    return {
      ...collection,
      prompts: collection.items.map(item => mapPrompt(item.prompt))
    };
  } catch (error) {
    console.error("Error fetching collection detail", error);
    return null;
  }
}

export async function getPromptBySlug(slug: string) {
  try {
    // Increment view count
    await prisma.prompt.update({
       where: { slug },
       data: { viewCount: { increment: 1 } }
    }).catch(() => {});

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
        comments: {
           include: { user: true },
           orderBy: { createdAt: 'desc' }
        }
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

export async function getCopyHistory(userId: string) {
  try {
    const history = await prisma.copyHistory.findMany({
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
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    return history.map(h => ({
      ...mapPrompt(h.prompt),
      copiedAt: h.createdAt
    }));
  } catch (error) {
    console.error("Error fetching copy history", error);
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
    ratingAvg: Number(p.ratingAvg) || 0,
    aiTools: p.aiTools?.map((at: any) => at.tool.name) || [],
    aiToolsIds: p.aiTools?.map((at: any) => at.toolId) || [],
    category: p.category?.name || 'Geral',
    categoryId: p.categoryId,
    difficulty: mapDifficulty(p.difficultyLevel),
    difficultyLevel: p.difficultyLevel,
    author: p.author?.name || 'Sistema',
    tags: p.tags?.map((pt: any) => pt.tag.name) || [],
    usageInstructions: p.usageInstructions,
    inputExample: p.examples?.[0]?.inputExample,
    outputExample: p.examples?.[0]?.outputExample,
    viewCount: p.viewCount,
    assets: p.assets?.map((a: any) => ({ url: a.assetUrl, type: a.assetType })) || [],
    comments: p.comments?.map((c: any) => ({
       id: c.id,
       content: c.content,
       user: c.user?.name || 'Anônimo',
       createdAt: c.createdAt
    })) || [],
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
