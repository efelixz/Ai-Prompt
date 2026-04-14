import { getCategories, getAITools } from "@/lib/prompts";
import { PromptForm } from "@/components/admin/prompt-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function NewPromptPage() {
  const [categories, tools] = await Promise.all([
    getCategories(),
    getAITools(),
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground p-8">
      <div className="max-w-4xl mx-auto mb-10">
        <Link href="/admin" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar para o Painel
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Prompt</h1>
        <p className="text-muted-foreground mt-2">Preencha os dados abaixo para publicar um novo prompt no catálogo.</p>
      </div>

      <PromptForm categories={categories} tools={tools} />
    </div>
  );
}
