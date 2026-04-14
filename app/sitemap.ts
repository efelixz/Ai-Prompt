import { MetadataRoute } from 'next'
import { getPrompts, getCategories, getAITools } from '@/lib/prompts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://obsidian-prompts.com'

  let prompts: any[] = [];
  let categories: any[] = [];
  let tools: any[] = [];

  try {
    [prompts, categories, tools] = await Promise.all([
      getPrompts(),
      getCategories(),
      getAITools()
    ]);
  } catch (error) {
    console.error("Sitemap generation failed", error);
  }

  const promptUrls = prompts.map((p) => ({
    url: `${baseUrl}/prompt/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((c) => ({
    url: `${baseUrl}/categoria/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const toolUrls = tools.map((t) => ({
    url: `${baseUrl}/ia/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/explorar`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/precos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...promptUrls,
    ...categoryUrls,
    ...toolUrls,
  ]
}
