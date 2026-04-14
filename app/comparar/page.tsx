import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Search, Plus, Trash2, Copy, Zap } from "lucide-react";
import { getPrompts } from "@/lib/prompts";

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const prompts = await getPrompts();
  const selected = prompts.slice(0, 2);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto relative">
           <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background font-black text-white shadow-2xl">
              VS
           </div>

           {selected.map((prompt, i) => (
              <Card key={prompt.id} className="bg-white/5 border-white/10 overflow-hidden group">
                 <CardHeader className="p-8 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex items-center justify-between mb-4">
                       <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 uppercase text-[10px] font-bold">Variante #{i+1}</Badge>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    <CardTitle className="text-2xl font-bold">{prompt.title}</CardTitle>
                    <div className="flex gap-2 mt-4">
                       {prompt.aiTools.slice(0, 1).map((tool: string) => (
                          <Badge key={tool} variant="secondary" className="bg-white/10 text-muted-foreground border-none text-[8px] uppercase font-bold">{tool}</Badge>
                       ))}
                       <Badge variant="secondary" className="bg-white/10 text-muted-foreground border-none text-[8px] uppercase font-bold">{prompt.difficulty}</Badge>
                    </div>
                 </CardHeader>
                 <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                       <h4 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Prompt Bruto</h4>
                       <div className="bg-black/40 border border-white/5 rounded-xl p-6 font-mono text-sm leading-relaxed min-h-[120px]">
                          {prompt.promptText}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Análise de Tokens</h4>
                       <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white/5 p-4 rounded-xl text-center">
                             <span className="block text-[10px] text-muted-foreground mb-1 uppercase font-bold tracking-tighter">Tokens</span>
                             <span className="text-xl font-black">124</span>
                          </div>
                          <div className="bg-white/5 p-4 rounded-xl text-center">
                             <span className="block text-[10px] text-muted-foreground mb-1 uppercase font-bold tracking-tighter">Variáveis</span>
                             <span className="text-xl font-black">3</span>
                          </div>
                          <div className="bg-white/5 p-4 rounded-xl text-center">
                             <span className="block text-[10px] text-muted-foreground mb-1 uppercase font-bold tracking-tighter">Eficácia</span>
                             <span className="text-xl font-black text-primary">94%</span>
                          </div>
                       </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                       <Button className="flex-1 bg-primary text-white font-bold gap-2">
                          <Copy className="w-4 h-4" /> Copiar
                       </Button>
                       <Button variant="outline" className="flex-1 border-white/10">
                          <Zap className="w-4 h-4 text-amber-400" /> Detalhes
                       </Button>
                    </div>
                 </CardContent>
              </Card>
           ))}
        </div>

        <div className="mt-12 flex justify-center">
           <Button variant="outline" className="border-dashed border-white/20 h-16 px-12 gap-3 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
              <Plus className="w-5 h-5" /> Adicionar mais um prompt para comparar
           </Button>
        </div>
      </main>
    </div>
  );
}
