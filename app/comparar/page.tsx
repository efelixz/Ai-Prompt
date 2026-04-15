import { Navbar } from "@/components/navbar";
import { ArrowLeftRight } from "lucide-react";
import { getPrompts } from "@/lib/prompts";
import { ComparisonTool } from "@/components/comparison-tool";

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const allPrompts = await getPrompts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
              <ArrowLeftRight className="w-8 h-8 text-primary" />
           </div>
           <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Comparador de <span className="text-primary">Prompts</span></h1>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Analise as diferenças estruturais, variações de tokens e complexidade entre dois ou mais prompts lado a lado.
           </p>
        </div>

        <ComparisonTool allPrompts={allPrompts} />
      </main>
    </div>
  );
}
