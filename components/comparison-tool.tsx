'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Copy, Zap, ArrowLeftRight, Check } from "lucide-react";
import Link from 'next/link';

export function ComparisonTool({ allPrompts }: { allPrompts: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    allPrompts.slice(0, 2).map(p => p.id)
  );

  const selectedPrompts = useMemo(() => {
    return selectedIds.map(id => allPrompts.find(p => p.id === id)).filter(Boolean);
  }, [selectedIds, allPrompts]);

  const removePrompt = (id: string) => {
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const addPrompt = (id: string) => {
    if (selectedIds.includes(id)) return;
    setSelectedIds(prev => [...prev, id]);
  };

  // Mock token analysis
  const getAnalysis = (text: string) => {
    const words = text.split(/\s+/).filter(Boolean).length;
    const tokens = Math.ceil(words * 1.35);
    const variables = (text.match(/\[.*?\]/g) || []).length;
    return { tokens, variables, effectiveness: 85 + (variables * 2) };
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
        {selectedPrompts.map((prompt, i) => {
          const analysis = getAnalysis(prompt.promptText);
          return (
            <Card key={prompt.id} className="bg-white/5 border-white/10 overflow-hidden group relative">
              <CardHeader className="p-6 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 uppercase text-[10px] font-bold tracking-tighter">Variante #{i + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removePrompt(prompt.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl font-bold line-clamp-1">{prompt.title}</CardTitle>
                <div className="flex gap-2 mt-4 overflow-hidden">
                   <Badge variant="secondary" className="bg-white/10 text-muted-foreground border-none text-[8px] uppercase font-bold shrink-0">{prompt.aiTools[0]}</Badge>
                   <Badge variant="secondary" className="bg-white/10 text-muted-foreground border-none text-[8px] uppercase font-bold shrink-0">{prompt.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Prompt Bruto</h4>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[12px] leading-relaxed min-h-[100px] max-h-[200px] overflow-y-auto">
                    {prompt.promptText}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Métricas Estimadas</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 p-3 rounded-lg text-center">
                      <span className="block text-[8px] text-muted-foreground mb-1 uppercase font-bold">Tokens</span>
                      <span className="text-lg font-black tracking-tighter">{analysis.tokens}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg text-center">
                      <span className="block text-[8px] text-muted-foreground mb-1 uppercase font-bold">Variáveis</span>
                      <span className="text-lg font-black tracking-tighter">{analysis.variables}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg text-center">
                      <span className="block text-[8px] text-muted-foreground mb-1 uppercase font-bold">Score</span>
                      <span className="text-lg font-black text-primary tracking-tighter">{analysis.effectiveness}%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <Link href={`/prompt/${prompt.slug}`} className="flex-1">
                    <Button variant="outline" className="w-full border-white/10 h-10 text-xs font-bold gap-2">
                      <Zap className="w-3 h-3 text-amber-400" /> Detalhes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {selectedPrompts.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">Nenhum prompt selecionado para comparação</p>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">Adicionar Prompts à Comparação</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allPrompts.filter(p => !selectedIds.includes(p.id)).slice(0, 8).map(prompt => (
            <button
              key={prompt.id}
              onClick={() => addPrompt(prompt.id)}
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 transition-all text-left group"
            >
              <h4 className="text-xs font-bold line-clamp-1 group-hover:text-primary transition-colors">{prompt.title}</h4>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">{prompt.aiTools[0]}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
