'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPrompt, updatePrompt } from '@/app/actions';

export function PromptForm({
  initialData,
  categories,
  tools
}: {
  initialData?: any;
  categories: any[];
  tools: any[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    promptText: initialData?.promptText || '',
    promptTextShort: initialData?.promptTextShort || '',
    promptTextAdvanced: initialData?.promptTextAdvanced || '',
    usageInstructions: initialData?.usageInstructions || '',
    difficultyLevel: initialData?.difficultyLevel || 'beginner',
    categoryId: initialData?.categoryId || (categories.length > 0 ? categories[0].id : ''),
    status: initialData?.status || 'draft',
    isFeatured: initialData?.isFeatured || false,
    isPremium: initialData?.isPremium || false,
    tools: initialData?.aiToolsIds || initialData?.aiTools?.map((t: any) => t.toolId) || [],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = initialData
      ? await updatePrompt(initialData.id, formData)
      : await createPrompt(formData);

    if (result.success) {
      router.push('/admin');
    } else {
      alert(result.error);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle>{initialData ? 'Editar Prompt' : 'Novo Prompt'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Arquitetura Futurista"
                className="bg-black/40 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <Input
                required
                disabled={!!initialData}
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                placeholder="ex-arquitetura-futurista"
                className="bg-black/40 border-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição Curta</label>
            <Input
              required
              value={formData.shortDescription}
              onChange={e => setFormData({...formData, shortDescription: e.target.value})}
              placeholder="Um resumo rápido para o card..."
              className="bg-black/40 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Prompt Principal</label>
            <textarea
              required
              className="w-full min-h-[150px] bg-black/40 border border-white/10 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.promptText}
              onChange={e => setFormData({...formData, promptText: e.target.value})}
              placeholder="Escreva o prompt completo aqui..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <select
                className="w-full h-10 bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dificuldade</label>
              <select
                className="w-full h-10 bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={formData.difficultyLevel}
                onChange={e => setFormData({...formData, difficultyLevel: e.target.value})}
              >
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary/50"
              />
              <span className="text-sm">Destaque</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPremium}
                onChange={e => setFormData({...formData, isPremium: e.target.checked})}
                className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary/50"
              />
              <span className="text-sm">Premium</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
             <Button type="submit" disabled={loading} className="px-8 bg-primary text-white hover:bg-primary/90">
               {loading ? 'Salvando...' : 'Salvar Prompt'}
             </Button>
             <Button type="button" variant="ghost" onClick={() => router.back()} className="text-muted-foreground">
               Cancelar
             </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
