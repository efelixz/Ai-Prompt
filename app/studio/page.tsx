'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Settings2,
  Terminal,
  Copy,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

export default function PromptStudioPage() {
  const [basePrompt, setBasePrompt] = useState('Escreva um roteiro de [DURACAO] segundos para [PLATAFORMA] sobre [ASSUNTO]. O tom deve ser [TOM].');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [compiledPrompt, setCompiledPrompt] = useState('');

  // Extract variables from prompt text
  useEffect(() => {
    const matches = basePrompt.match(/\[(.*?)\]/g);
    if (matches) {
      const newVars: Record<string, string> = {};
      matches.forEach(match => {
        const varName = match.slice(1, -1);
        newVars[varName] = variables[varName] || '';
      });
      setVariables(newVars);
    } else {
      setVariables({});
    }
  }, [basePrompt]);

  // Compile final prompt
  useEffect(() => {
    let result = basePrompt;
    Object.entries(variables).forEach(([name, value]) => {
      result = result.split(`[${name}]`).join(value || `[${name}]`);
    });
    setCompiledPrompt(result);
  }, [basePrompt, variables]);

  const handleVarChange = (name: string, value: string) => {
    setVariables(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(compiledPrompt);
    alert('Prompt copiado!');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20 container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-3 py-1 uppercase text-[10px] font-bold tracking-widest mb-4">
               Beta Laboratory
            </Badge>
            <h1 className="text-4xl font-black tracking-tight">Prompt <span className="text-primary">Studio</span></h1>
            <p className="text-muted-foreground mt-2">Refine, teste e parametrize seus prompts em tempo real.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="border-white/10 gap-2" onClick={() => setBasePrompt('')}>
                <RotateCcw className="w-4 h-4" /> Resetar
             </Button>
             <Button className="bg-primary text-white font-bold gap-2" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" /> Copiar Final
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Editor Section */}
           <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/5 border-white/10 shadow-2xl">
                 <CardHeader className="border-b border-white/5 bg-white/[0.01]">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                       <Terminal className="w-4 h-4 text-primary" /> Template do Prompt
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                    <textarea
                      value={basePrompt}
                      onChange={(e) => setBasePrompt(e.target.value)}
                      className="w-full min-h-[300px] bg-transparent p-8 text-lg font-mono leading-relaxed focus:outline-none resize-none selection:bg-primary/30"
                      placeholder="Use colchetes para criar variáveis, ex: [ASSUNTO]"
                    />
                 </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                 <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                       <Sparkles className="w-4 h-4 text-primary" /> Resultado Compilado
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="p-8 pt-0">
                    <div className="bg-black/40 rounded-xl p-6 text-muted-foreground italic text-sm leading-[1.8] border border-white/5">
                       {compiledPrompt}
                    </div>
                 </CardContent>
              </Card>
           </div>

           {/* Sidebar: Variables and Settings */}
           <aside className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                 <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                       <Settings2 className="w-4 h-4" /> Variáveis Detectadas
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    {Object.keys(variables).length > 0 ? (
                       Object.keys(variables).map((varName) => (
                          <div key={varName} className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-tighter text-primary">{varName}</label>
                             <Input
                               value={variables[varName]}
                               onChange={(e) => handleVarChange(varName, e.target.value)}
                               placeholder={`Valor para ${varName}...`}
                               className="bg-black/40 border-white/10 focus:ring-primary/50"
                             />
                          </div>
                       ))
                    ) : (
                       <div className="text-center py-10 space-y-4">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                             <Info className="w-6 h-6 text-muted-foreground opacity-30" />
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                             Nenhuma variável encontrada. <br />Use <strong>[nome]</strong> no editor.
                          </p>
                       </div>
                    )}
                 </CardContent>
              </Card>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-black border border-white/5 space-y-4">
                 <h4 className="font-bold text-sm">Dica do Pro</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                    A estrutura de variáveis ajuda a manter seus prompts reutilizáveis. Tente criar templates genéricos e salve-os em suas coleções.
                 </p>
                 <Button variant="link" className="text-primary text-xs p-0 h-auto gap-1">
                    Ver Guia de Engenharia <ChevronRight className="w-3 h-3" />
                 </Button>
              </div>
           </aside>
        </div>
      </main>
    </div>
  );
}

function Badge({ children, variant, className }: any) {
    return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>{children}</span>
}
