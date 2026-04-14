'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Nota: Em um app real, o userId seria extraído da sessão (ex: via Clerk ou NextAuth).
 * Para este protótipo, usaremos um ID de usuário fixo de teste.
 */
const TEST_USER_ID = 'user_test_123';

export async function toggleFavorite(promptId: string) {
  try {
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_promptId: {
          userId: TEST_USER_ID,
          promptId,
        },
      },
    });

    if (existing) {
      await prisma.favorite.delete({
        where: {
          userId_promptId: {
            userId: TEST_USER_ID,
            promptId,
          },
        },
      });
    } else {
      await prisma.favorite.create({
        data: {
          userId: TEST_USER_ID,
          promptId,
        },
      });
    }

    revalidatePath('/explorar');
    revalidatePath(`/prompt/${promptId}`);
    revalidatePath('/favoritos');

    return { success: true };
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return { success: false, error: 'Erro ao processar favorito' };
  }
}

export async function createCollection(name: string, description?: string) {
  try {
    const collection = await prisma.collection.create({
      data: {
        userId: TEST_USER_ID,
        name,
        description,
      },
    });

    revalidatePath('/colecoes');
    return { success: true, collection };
  } catch (error) {
    console.error('Error creating collection:', error);
    return { success: false, error: 'Erro ao criar coleção' };
  }
}

export async function addToCollection(collectionId: string, promptId: string) {
  try {
    await prisma.collectionItem.create({
      data: {
        collectionId,
        promptId,
      },
    });

    revalidatePath(`/colecoes/${collectionId}`);
    return { success: true };
  } catch (error) {
    console.error('Error adding to collection:', error);
    return { success: false, error: 'Erro ao adicionar à coleção' };
  }
}

export async function createPrompt(data: any) {
  try {
    const prompt = await prisma.prompt.create({
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        promptText: data.promptText,
        promptTextShort: data.promptTextShort,
        promptTextAdvanced: data.promptTextAdvanced,
        usageInstructions: data.usageInstructions,
        difficultyLevel: data.difficultyLevel,
        categoryId: data.categoryId,
        authorId: TEST_USER_ID,
        status: data.status || 'draft',
        isFeatured: data.isFeatured || false,
        isPremium: data.isPremium || false,
      },
    });

    if (data.tools && data.tools.length > 0) {
      await prisma.promptAITool.createMany({
        data: data.tools.map((toolId: string) => ({
          promptId: prompt.id,
          toolId,
        })),
      });
    }

    revalidatePath('/explorar');
    revalidatePath('/admin');
    return { success: true, prompt };
  } catch (error) {
    console.error('Error creating prompt:', error);
    return { success: false, error: 'Erro ao criar prompt' };
  }
}

export async function updatePrompt(id: string, data: any) {
  try {
    await prisma.prompt.update({
      where: { id },
      data: {
        title: data.title,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        promptText: data.promptText,
        promptTextShort: data.promptTextShort,
        promptTextAdvanced: data.promptTextAdvanced,
        usageInstructions: data.usageInstructions,
        difficultyLevel: data.difficultyLevel,
        categoryId: data.categoryId,
        status: data.status,
        isFeatured: data.isFeatured,
        isPremium: data.isPremium,
      },
    });

    if (data.tools) {
      // Re-sync tools: Delete and Re-create (simplified for prototype)
      await prisma.promptAITool.deleteMany({ where: { promptId: id } });
      await prisma.promptAITool.createMany({
        data: data.tools.map((toolId: string) => ({
          promptId: id,
          toolId,
        })),
      });
    }

    revalidatePath('/explorar');
    revalidatePath(`/prompt/${id}`);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error updating prompt:', error);
    return { success: false, error: 'Erro ao atualizar prompt' };
  }
}

export async function logPromptCopy(promptId: string) {
  try {
    await prisma.copyHistory.create({
      data: {
        userId: TEST_USER_ID,
        promptId,
      },
    });

    await prisma.prompt.update({
      where: { id: promptId },
      data: { copyCount: { increment: 1 } },
    });

    revalidatePath('/historico');
    return { success: true };
  } catch (error) {
    console.error('Error logging copy:', error);
    return { success: false };
  }
}

export async function ratePrompt(promptId: string, value: number) {
  try {
    await prisma.promptRating.upsert({
      where: {
        userId_promptId: {
          userId: TEST_USER_ID,
          promptId,
        },
      },
      update: { value },
      create: {
        userId: TEST_USER_ID,
        promptId,
        value,
      },
    });

    // Re-calcula a média (simplificado para o protótipo)
    const ratings = await prisma.promptRating.findMany({
      where: { promptId },
    });

    const avg = ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;

    await prisma.prompt.update({
      where: { id: promptId },
      data: { ratingAvg: avg },
    });

    revalidatePath(`/prompt/${promptId}`);
    return { success: true, avg };
  } catch (error) {
    console.error('Error rating prompt:', error);
    return { success: false };
  }
}
