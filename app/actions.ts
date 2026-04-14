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
