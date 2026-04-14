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
      include: { aiTools: true }
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
    </div>
  );
}
