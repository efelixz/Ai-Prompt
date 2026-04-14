"use client";

import { useState } from "react";
import {
  Sparkles,
  BrainCircuit,
  Zap,
  ChevronRight,
  ChevronLeft,
  Check,
  Image as ImageIcon,
  Video,
  Code,
  Briefcase,
  GraduationCap,
  Megaphone,
  PenTool
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { saveOnboarding } from "@/app/actions";

const steps = [
  { id: 1, title: "Objetivos", description: "O que você quer alcançar com IA?" },
  { id: 2, title: "Ferramentas", description: "Quais IAs você utiliza no dia a dia?" },
  { id: 3, title: "Interesses", description: "Quais temas você quer explorar?" },
];

const goals = [
  { id: "images", label: "Criar Imagens", icon: ImageIcon },
  { id: "videos", label: "Criar Vídeos", icon: Video },
  { id: "writing", label: "Escrever Melhor", icon: PenTool },
  { id: "study", label: "Estudar", icon: GraduationCap },
  { id: "code", label: "Programar", icon: Code },
  { id: "sales", label: "Vender Mais", icon: Megaphone },
  { id: "content", label: "Criar Conteúdo", icon: Zap },
  { id: "work", label: "Organizar Trabalho", icon: Briefcase },
];

const aiTools = [
  { id: "chatgpt", label: "ChatGPT", logo: "GPT" },
  { id: "midjourney", label: "Midjourney", logo: "MJ" },
  { id: "claude", label: "Claude", logo: "CL" },
  { id: "gemini", label: "Gemini", logo: "GE" },
  { id: "perplexity", label: "Perplexity", logo: "PX" },
  { id: "stable-diffusion", label: "Stable Diffusion", logo: "SD" },
];

const categories = [
  { id: "arch", label: "Arquitetura" },
  { id: "marketing", label: "Marketing" },
  { id: "dev", label: "Desenvolvimento" },
  { id: "design", label: "Design" },
  { id: "business", label: "Negócios" },
  { id: "edu", label: "Educação" },
  { id: "art", label: "Arte Digital" },
  { id: "copy", label: "Copywriting" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selections, setSelections] = useState<{
    goals: string[];
    tools: string[];
    categories: string[];
  }>({
    goals: [],
    tools: [],
    categories: [],
  });

  const router = useRouter();

  const toggleSelection = (key: keyof typeof selections, id: string) => {
    setSelections(prev => ({
      ...prev,
      [key]: prev[key].includes(id)
        ? prev[key].filter(i => i !== id)
        : [...prev[key], id]
    }));
  };

  const nextStep = async () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
    else {
      setIsSubmitting(true);
      const result = await saveOnboarding({
         objectives: selections.goals,
         tools: selections.tools,
         categories: selections.categories
      });
      if (result.success) {
         router.push("/explorar");
      } else {
         alert("Erro ao salvar suas preferências.");
      }
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <BrainCircuit className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Personalize sua experiência</h1>
          <p className="text-muted-foreground">
            {steps.find(s => s.id === currentStep)?.description}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span>Passo {currentStep} de {steps.length}</span>
            <span>{steps.find(s => s.id === currentStep)?.title}</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/5" />
        </div>

        {/* Content */}
        <div className="min-h-[350px]">
          {currentStep === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {goals.map(goal => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer border-white/10 transition-all hover:border-primary/50 group ${
                    selections.goals.includes(goal.id) ? "bg-primary/10 border-primary shadow-lg shadow-primary/5" : "bg-white/5"
                  }`}
                  onClick={() => toggleSelection("goals", goal.id)}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      selections.goals.includes(goal.id) ? "bg-primary text-white" : "bg-white/5 text-muted-foreground group-hover:text-primary"
                    }`}>
                      <goal.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-center">{goal.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {aiTools.map(tool => (
                <Card
                  key={tool.id}
                  className={`cursor-pointer border-white/10 transition-all hover:border-primary/50 group ${
                    selections.tools.includes(tool.id) ? "bg-primary/10 border-primary" : "bg-white/5"
                  }`}
                  onClick={() => toggleSelection("tools", tool.id)}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-black text-lg transition-all ${
                      selections.tools.includes(tool.id) ? "bg-primary text-white" : "bg-black/40 text-muted-foreground border border-white/5"
                    }`}>
                      {tool.logo}
                    </div>
                    <span className="text-sm font-bold">{tool.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant="outline"
                  className={`h-auto py-4 px-6 rounded-2xl border-white/10 transition-all ${
                    selections.categories.includes(cat.id)
                      ? "bg-primary border-primary text-white hover:bg-primary/90"
                      : "bg-white/5 hover:border-primary/50"
                  }`}
                  onClick={() => toggleSelection("categories", cat.id)}
                >
                  <span className="flex items-center gap-2">
                    {selections.categories.includes(cat.id) && <Check className="w-4 h-4" />}
                    {cat.label}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          <Button
            variant="ghost"
            className="text-muted-foreground gap-2 hover:text-foreground"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4" /> Voltar
          </Button>

          <div className="flex gap-3">
             <Link href="/explorar">
                <Button variant="ghost" className="text-muted-foreground hover:text-white">Pular</Button>
             </Link>
             <Button
              disabled={isSubmitting}
              className="gap-2 px-8 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 min-w-[140px]"
              onClick={nextStep}
             >
              {isSubmitting ? (
                 <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                 <>
                   {currentStep === 3 ? "Finalizar" : "Continuar"} <ChevronRight className="w-4 h-4" />
                 </>
              )}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
