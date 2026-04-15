'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { trackEvent } from '@/lib/analytics';

async function logAudit(action: string, entity: string, entityId?: string, details?: string) {
   try {
      await prisma.auditLog.create({
         data: {
            userId: TEST_USER_ID,
            action,
            entity,
            entityId,
            details
         }
      });
   } catch (error) {
      console.error('Audit Log failed:', error);
   }
}

/**
 * Nota: Em um app real, o userId seria extraído da sessão (ex: via Clerk ou NextAuth).
 * Para este protótipo, usaremos um ID de usuário fixo de teste.
 */
const TEST_USER_ID = 'user_test_123';

export async function toggleFavorite(promptId: string) {
  try {
    await logAudit('toggle_favorite', 'prompt', promptId);
    await trackEvent('prompt_favorited_toggled', { promptId, userId: TEST_USER_ID });
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

    if (data.assetUrl) {
       await prisma.promptAsset.create({
          data: {
             promptId: prompt.id,
             assetType: 'image',
             assetUrl: data.assetUrl,
          }
       });
    }

    revalidatePath('/explorar');
    await logAudit('create_prompt', 'prompt', prompt.id, data.title);
    revalidatePath('/admin');
    return { success: true, prompt };
  } catch (error) {
    console.error('Error creating prompt:', error);
    return { success: false, error: 'Erro ao criar prompt' };
  }
}

export async function updatePrompt(id: string, data: any) {
  try {
    const current = await prisma.prompt.findUnique({
      where: { id },
      include: { versions: { orderBy: { version: 'desc' }, take: 1 } }
    });

    const nextVersionNum = current?.versions[0] ? current.versions[0].version + 1 : 1;

    // Create version entry
    await prisma.promptVersion.create({
      data: {
        promptId: id,
        version: nextVersionNum,
        promptText: data.promptText,
        changes: data.versionNote || 'Atualização de conteúdo',
      }
    });

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

    if (data.assetUrl) {
       await prisma.promptAsset.deleteMany({ where: { promptId: id } });
       await prisma.promptAsset.create({
          data: {
             promptId: id,
             assetType: 'image',
             assetUrl: data.assetUrl,
          }
       });
    }

    revalidatePath('/explorar');
    revalidatePath(`/prompt/${id}`);
    await logAudit('update_prompt', 'prompt', id, data.title);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error updating prompt:', error);
    return { success: false, error: 'Erro ao atualizar prompt' };
  }
}

export async function logPromptCopy(promptId: string) {
  try {
    await trackEvent('prompt_copied', { promptId, userId: TEST_USER_ID });
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

export async function purchasePack(packId: string) {
  try {
    // Simulating pack contents
    const contents: Record<string, string[]> = {
       'p1': ['Arquitetura Etérea', 'Cinematic Drone Shot'],
       'p2': ['Marketing Masterclass', 'Social Ads Hook'],
       'p3': ['React Hook Gen', 'Unit Test Framework']
    };

    const packName = packId === 'p1' ? 'Elite Architecture Bundle' : packId === 'p2' ? 'Marketing Copy Masterclass' : 'Fullstack Developer Pack';

    // Create a new collection for the user with the pack name
    const collection = await prisma.collection.create({
      data: {
        userId: TEST_USER_ID,
        name: `Pack: ${packName}`,
        description: `Prompts adquiridos via Marketplace em ${new Date().toLocaleDateString('pt-BR')}.`,
      }
    });

    // Simulate adding prompts to the collection
    const samplePrompts = await prisma.prompt.findMany({ take: 3 });
    if (samplePrompts.length > 0) {
       await prisma.collectionItem.createMany({
          data: samplePrompts.map(p => ({
             collectionId: collection.id,
             promptId: p.id
          }))
       });
    }

    await trackEvent('marketplace_purchase_completed', { userId: TEST_USER_ID, packId, collectionId: collection.id });

    return { success: true, collectionId: collection.id };
  } catch (error) {
    console.error('Error purchasing pack:', error);
    return { success: false };
  }
}

export async function updateProfile(data: {
  name: string;
  email: string;
}) {
  try {
    await prisma.user.update({
      where: { id: TEST_USER_ID },
      data: {
        name: data.name,
        email: data.email
      }
    });

    revalidatePath('/configuracoes');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false };
  }
}

export async function addComment(promptId: string, content: string) {
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        userId: TEST_USER_ID,
        promptId,
      },
    });

    revalidatePath(`/prompt/${promptId}`);
    return { success: true, comment };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: 'Erro ao adicionar comentário' };
  }
}

export async function deleteComment(commentId: string) {
  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/explorar`); // Just in case, usually we'd need to revalidate the specific prompt page
    return { success: true };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false };
  }
}

export async function publishPrompt(promptId: string) {
  try {
    await prisma.prompt.update({
      where: { id: promptId },
      data: { status: 'published', publishedAt: new Date() },
    });
    revalidatePath('/admin');
    revalidatePath('/explorar');
    return { success: true };
  } catch (error) {
    console.error('Error publishing prompt:', error);
    return { success: false };
  }
}

export async function saveOnboarding(data: {
  objectives: string[];
  tools: string[];
  categories: string[];
}) {
  try {
    await trackEvent('onboarding_completed', { userId: TEST_USER_ID, ...data });

    // In a real app, we would update the user profile or preferences table
    await prisma.user.update({
      where: { id: TEST_USER_ID },
      data: {
        // Simulating preference storage as a JSON string or meta if not in schema
        // For now, just confirming success
        status: 'active'
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving onboarding:', error);
    return { success: false };
  }
}

export async function ratePrompt(promptId: string, value: number) {
  try {
    await trackEvent('prompt_rated', { promptId, userId: TEST_USER_ID, value });
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
