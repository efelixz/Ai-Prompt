import { getCategories, getAITools } from "@/lib/prompts";
import { PromptForm } from "@/components/admin/prompt-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditPromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [prompt, categories, tools] = await Promise.all([
    prisma.prompt.findUnique({
      where: { id },
      include: { aiTools: true, versions: { orderBy: { createdAt: 'desc' } } }
    }),
    getCategories(),
    getAITools(),
  ]);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-foreground p-8">
      <div className="max-w-4xl mx-auto mb-10">
        <Link href="/admin" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar para o Painel
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Editar Prompt</h1>
        <p className="text-muted-foreground mt-2">Atualize as informações do prompt no catálogo.</p>
      </div>

      <PromptForm initialData={prompt} categories={categories} tools={tools} />

      <div className="max-w-4xl mx-auto mt-20">
         <h2 className="text-xl font-bold mb-6">Histórico de Versões</h2>
         <div className="space-y-4">
            {(prompt as any).versions.map((v: any) => (
               <div key={v.id} className="bg-white/5 border border-white/5 rounded-xl p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                     <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                        v{v.version}
                     </div>
                     <div>
                        <p className="text-sm font-medium">{v.changes || 'Sem descrição de alterações.'}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
                           {new Date(v.createdAt).toLocaleString('pt-BR')}
                        </p>
                     </div>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">Restaurar esta versão</button>
               </div>
            ))}
            {(prompt as any).versions.length === 0 && (
               <p className="text-muted-foreground text-sm italic">Nenhuma versão anterior registrada.</p>
            )}
         </div>
      </div>
    </div>
  );
}
