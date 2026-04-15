import { Search, Grid, Layout, Image as ImageIcon, Video, Megaphone, Code, Briefcase, GraduationCap, ChevronRight, Star, Copy, Zap, CheckCircle2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPrompts } from "@/lib/prompts";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  const allPrompts = await getPrompts();
  const featuredPrompts = allPrompts.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-24">
          <Badge variant="outline" className="mb-6 border-white/20 text-muted-foreground uppercase tracking-widest text-[10px] py-1">
            O Padrão Luminary
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
            Os Prompts Mais <br />
            <span className="text-primary">Poderosos do Mundo</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10 leading-relaxed">
            Desbloqueie a próxima geração de engenharia criativa de IA. Prompts de alta fidelidade, feitos à mão para profissionais que exigem perfeição.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/studio" className="w-full sm:w-auto">
              <Button size="lg" className="px-8 bg-primary text-white hover:bg-primary/90 h-14 text-base font-semibold w-full">
                Começar a Criar
              </Button>
            </Link>
            <Link href="/explorar" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="px-8 border-white/10 bg-white/5 hover:bg-white/10 h-14 text-base font-semibold w-full">
                Ver Showcase
              </Button>
            </Link>
          </div>

          <form action="/explorar" method="GET" className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              name="q"
              placeholder="Buscar por 'Arquitetura Cinemática'..."
              className="h-14 pl-12 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-base rounded-xl"
            />
          </form>
        </section>

        {/* Browse by Intent */}
        <section className="container mx-auto px-4 mb-32">
          <h2 className="text-3xl font-bold mb-10 text-center md:text-left">
            Navegar por <span className="text-primary">Intenção</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { icon: Layout, label: "Escrita", slug: "escrita" },
              { icon: ImageIcon, label: "Design", slug: "design" },
              { icon: Video, label: "Vídeo", slug: "video" },
              { icon: Megaphone, label: "Marketing", slug: "marketing" },
              { icon: Code, label: "Programação", slug: "programacao" },
              { icon: Briefcase, label: "Negócios", slug: "negocios" },
              { icon: GraduationCap, label: "Educação", slug: "educacao" },
            ].map((item, i) => (
              <Link key={i} href={`/categoria/${item.slug}`}>
                <Card className="bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all cursor-pointer group h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                    <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Elite Selection */}
        <section className="container mx-auto px-4 mb-32">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">Seleção de Elite</h2>
              <p className="text-muted-foreground">Nossos prompts de melhor desempenho, atualizados diariamente.</p>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80 gap-2">
              Ver Todos <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPrompts.map((prompt) => (
              <Link key={prompt.id} href={`/prompt/${prompt.slug}`}>
                <Card className="bg-white/5 border-white/10 overflow-hidden group h-full flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/40 to-black relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-primary/20" />
                    <Zap className="w-16 h-16 text-primary/10 group-hover:text-primary/40 transition-colors" />
                    {prompt.isPremium && (
                      <Badge className="absolute top-4 right-4 bg-amber-500 text-black border-none text-[10px] font-bold">
                        <Crown className="w-3 h-3 mr-1" /> PREMIUM
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="p-8">
                    <div className="flex gap-2 mb-4">
                      {prompt.aiTools.slice(0, 1).map((tool: string) => (
                        <Badge key={tool} variant="secondary" className="bg-primary/20 text-primary border-none text-[10px] uppercase tracking-wider">{tool}</Badge>
                      ))}
                      <Badge variant="secondary" className="bg-white/10 text-muted-foreground border-none text-[10px] uppercase tracking-wider">{prompt.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-4 group-hover:text-primary transition-colors line-clamp-1">{prompt.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed line-clamp-2">
                      {prompt.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="px-8 pb-8 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center font-bold text-[10px]">
                        {prompt.author[0]}
                      </div>
                      <span>{prompt.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold">{Number((prompt as any).ratingAvg || 0).toFixed(1)}</span>
                      </div>
                      <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* The Engineering Process */}
        <section className="container mx-auto px-4 mb-32 text-center">
          <h2 className="text-4xl font-bold mb-20">O Processo de <br /><span className="text-primary">Engenharia</span></h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connector lines (desktop only) */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />

             {[
               { step: "1", title: "Descoberta", desc: "Navegue pelo nosso índice curado ou busque por métricas específicas de desempenho de modelo." },
               { step: "2", title: "Refinamento", desc: "Use nossa ferramenta de preview ao vivo para ajustar variáveis e ver resultados imediatos." },
               { step: "3", title: "Execução", desc: "Copie o código bruto de nível obsidian e aplique-o no seu motor de modelo de IA preferido." }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center">
                 <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary mb-8 text-xl">
                   {item.step}
                 </div>
                 <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                 <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="container mx-auto px-4 mb-32">
          <div className="max-w-md mx-auto relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25" />
             <Card className="relative bg-background border-white/10 rounded-2xl overflow-hidden">
                <CardHeader className="p-8 text-center border-b border-white/5">
                  <Badge variant="outline" className="mb-6 border-primary/50 text-primary text-[10px] uppercase tracking-widest font-bold">Melhor Valor</Badge>
                  <CardTitle className="text-3xl mb-2">Obsidian Pro</CardTitle>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                   {[
                     "Acesso Premium Ilimitado",
                     "Customizador de Variáveis Avançado",
                     "Integrações Diretas com API de Modelos",
                     "Espaço de Coleções Privadas"
                   ].map((feature, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-primary" />
                       <span className="text-muted-foreground font-medium">{feature}</span>
                     </div>
                   ))}
                </CardContent>
                <CardFooter className="p-8 pt-0 flex flex-col gap-4">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 h-12 font-bold text-base rounded-xl">
                    Seja Pro Agora
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-medium">7 dias de teste grátis. Cancele a qualquer momento.</p>
                </CardFooter>
             </Card>
          </div>
        </section>

        {/* Common Questions */}
        <section className="container mx-auto px-4 max-w-3xl mb-32">
          <h2 className="text-4xl font-bold mb-16 text-center">Perguntas <br /><span className="text-primary">Frequentes</span></h2>
          <Accordion className="space-y-4">
            <AccordionItem value="item-1" className="border-white/10 bg-white/5 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-left py-6">O que torna os prompts do Obsidian únicos?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                Nossos prompts não são apenas strings de texto. São sequências pré-engenheiradas testadas em múltiplas versões para garantir máxima confiabilidade, consistência semântica e alcance criativo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white/10 bg-white/5 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-left py-6">Os prompts funcionam em diferentes modelos?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                Sim, especificamos a compatibilidade para cada prompt. Embora alguns sejam específicos de modelos, muitos incluem variações otimizadas para ChatGPT, Claude e Gemini.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-white/10 bg-white/5 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-left py-6">Posso vender meus próprios prompts?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                Atualmente estamos em uma fase alfa curada. Em breve, abriremos o marketplace para criadores verificados listarem seus frameworks proprietários de engenharia de prompts.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-20 pb-10 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
               <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <span className="text-lg font-bold">Obsidian</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Elevando a engenharia de IA ao status de arte. Junte-se à elite global de criadores de prompts.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Plataforma</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Prompt Studio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Referência de API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Showcase</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Recursos</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Diretrizes</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord da Comunidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentação</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Política de Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 text-xs text-muted-foreground gap-4">
            <p>© 2024 Obsidian Luminary. Todos os direitos reservados.</p>
            <div className="flex gap-6">
               {/* Social placeholders */}
               <div className="w-5 h-5 rounded-full bg-white/10" />
               <div className="w-5 h-5 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
