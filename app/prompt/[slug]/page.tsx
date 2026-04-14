import { Search, ChevronRight, Copy, Star, Share2, Info, Lightbulb, Zap, ArrowLeft, Terminal, Layout, Eye, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPrompts, getPromptBySlug as fetchPromptBySlug, getUserCollections } from "@/lib/prompts";
import { FavoriteButton } from "@/components/favorite-button";
import { CollectionSelect } from "@/components/collection-select";
import { CopyButton } from "@/components/copy-button";
import { Rating } from "@/components/rating";
import { Metadata } from 'next';
import { Lock, Crown } from "lucide-react";

const TEST_USER_ID = 'user_test_123';
const IS_PRO_USER = false; // Simulação de status do usuário

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const prompt = await fetchPromptBySlug(slug);

  if (!prompt) {
    return {
      title: 'Prompt não encontrado | Obsidian',
    };
  }

  return {
    title: `${prompt.title} | Melhores Prompts ${prompt.aiTools.join(', ')} | Obsidian`,
    description: prompt.shortDescription,
    keywords: [...prompt.tags, ...prompt.aiTools, prompt.category, 'prompts', 'inteligência artificial'].join(', '),
    openGraph: {
      title: prompt.title,
      description: prompt.shortDescription,
      type: 'article',
      locale: 'pt_BR',
    },
  };
}

async function getRelatedPrompts(category: string, currentId: string) {
    const prompts = await getPrompts();
    return prompts
        .filter((p: any) => p.category === category && p.id !== currentId)
        .slice(0, 3);
}

export default async function PromptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [prompt, collections] = await Promise.all([
     fetchPromptBySlug(slug),
     getUserCollections(TEST_USER_ID)
  ]);

  if (!prompt) {
    notFound();
  }

  const relatedPrompts = await getRelatedPrompts(prompt.category, prompt.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar Reused */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Obsidian</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
            <Link href="/explorar" className="hover:text-primary transition-colors">Explorar</Link>
            <a href="#" className="hover:text-primary transition-colors">Marketplace</a>
            <a href="#" className="hover:text-primary transition-colors">Preços</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Entrar</Button>
            <Button size="sm">Começar Agora</Button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/explorar" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Voltar para Explorar
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{prompt.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column: Details and Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Header Section */}
              <section className="space-y-6">
                <div className="flex flex-wrap gap-2">
                   <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-3 py-1">
                     {prompt.category}
                   </Badge>
                   {prompt.aiTools.map((tool: string) => (
                      <Badge key={tool} variant="secondary" className="bg-white/5 border-white/10 text-muted-foreground px-3 py-1 uppercase text-[10px] font-bold tracking-wider">
                        {tool}
                      </Badge>
                   ))}
                   <Badge variant="outline" className="border-white/10 text-muted-foreground px-3 py-1">
                     {prompt.difficulty}
                   </Badge>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{prompt.title}</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {prompt.fullDescription || prompt.shortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-2">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                        {prompt.author[0]}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Curadoria por</p>
                        <p className="text-sm font-medium">{prompt.author}</p>
                      </div>
                   </div>
                   <Separator orientation="vertical" className="h-8 bg-white/10" />
                   <div className="flex items-center gap-6">
                      <Rating promptId={prompt.id} initialValue={Number((prompt as any).ratingAvg || 0)} />
                   </div>
                   <Separator orientation="vertical" className="h-8 bg-white/10" />
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                         <FavoriteButton promptId={prompt.id} />
                         <span className="text-sm text-muted-foreground">Favoritar</span>
                      </div>
                      <div className="flex items-center gap-1">
                         <CollectionSelect promptId={prompt.id} collections={collections} />
                         <span className="text-sm text-muted-foreground">Colecionar</span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary ml-2">
                        <Share2 className="w-4 h-4" /> Compartilhar
                      </Button>
                   </div>
                </div>
              </section>

              {/* Core Prompt Tabs */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold">O Prompt</h2>
                  {prompt.isPremium && (
                    <Badge className="bg-amber-500 text-black border-none gap-1 ml-2">
                       <Crown className="w-3 h-3" /> PREMIUM
                    </Badge>
                  )}
                </div>

                <div className="relative">
                  <Tabs defaultValue="main" className={`w-full ${prompt.isPremium && !IS_PRO_USER ? 'blur-md pointer-events-none select-none' : ''}`}>
                    <TabsList className="bg-white/5 border border-white/10 p-1 mb-6">
                      <TabsTrigger value="main" className="data-[state=active]:bg-primary data-[state=active]:text-white">Principal</TabsTrigger>
                      <TabsTrigger value="short" className="data-[state=active]:bg-primary data-[state=active]:text-white">Curto</TabsTrigger>
                      <TabsTrigger value="advanced" className="data-[state=active]:bg-primary data-[state=active]:text-white">Avançado</TabsTrigger>
                    </TabsList>

                    <TabsContent value="main" className="relative group">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-8 pt-10 font-mono text-sm leading-relaxed text-foreground min-h-[200px] selection:bg-primary/30">
                        <div className="absolute top-4 left-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Base Prompt</div>
                        <CopyButton
                          promptId={prompt.id}
                          textToCopy={prompt.promptText}
                          variant="default"
                          className="absolute top-4 right-4 bg-primary text-white hover:bg-primary/90"
                        />
                        {prompt.promptText}
                      </div>
                    </TabsContent>

                    <TabsContent value="short" className="relative group">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-8 pt-10 font-mono text-sm leading-relaxed text-foreground min-h-[200px] selection:bg-primary/30">
                        <div className="absolute top-4 left-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Condensed Version</div>
                        <CopyButton
                          promptId={prompt.id}
                          textToCopy={prompt.promptTextShort || prompt.promptText}
                          variant="default"
                          className="absolute top-4 right-4 bg-primary text-white hover:bg-primary/90"
                        />
                        {prompt.promptTextShort || prompt.promptText}
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="relative group">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-8 pt-10 font-mono text-sm leading-relaxed text-foreground min-h-[200px] selection:bg-primary/30">
                        <div className="absolute top-4 left-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Power User Mode</div>
                        <CopyButton
                          promptId={prompt.id}
                          textToCopy={prompt.promptTextAdvanced || prompt.promptText}
                          variant="default"
                          className="absolute top-4 right-4 bg-primary text-white hover:bg-primary/90"
                        />
                        {prompt.promptTextAdvanced || prompt.promptText}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {prompt.isPremium && !IS_PRO_USER && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
                       <Card className="max-w-md bg-black/60 backdrop-blur-xl border-amber-500/30 p-8 shadow-2xl">
                          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                             <Lock className="w-8 h-8 text-amber-500" />
                          </div>
                          <h3 className="text-2xl font-bold mb-3">Conteúdo Premium</h3>
                          <p className="text-muted-foreground text-sm mb-8">
                             Este prompt faz parte da nossa coleção de elite. Assine o plano PRO para desbloquear este e milhares de outros prompts avançados.
                          </p>
                          <Link href="/precos">
                             <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold gap-2">
                                <Crown className="w-4 h-4" /> Desbloquear Agora
                             </Button>
                          </Link>
                       </Card>
                    </div>
                  )}
                </div>
              </section>

              {/* Instructions and Usage */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold">Como Usar</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed bg-white/5 border border-white/5 p-6 rounded-xl">
                    {prompt.usageInstructions || "Para usar este prompt, basta copiá-lo e colá-lo na sua ferramenta de IA preferida. Você pode ajustar os parâmetros entre colchetes para personalizar o resultado final conforme sua necessidade específica."}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold">Dicas do Especialista</h3>
                  </div>
                  <ul className="space-y-3">
                    {(prompt.tips || ["Experimente variações de iluminação", "Use em conjunto com outros prompts", "Ajuste o tom de voz"]).map((tip: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground items-start bg-white/5 border border-white/5 p-4 rounded-lg">
                        <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Input/Output Examples */}
              <section className="space-y-6">
                 <div className="flex items-center gap-2">
                    <Layout className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold">Exemplo Prático</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Exemplo de Entrada</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <p className="text-sm font-mono italic">"{prompt.inputExample || "Tema ou assunto base..."}"</p>
                       </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Resultado Esperado</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <p className="text-sm">{prompt.outputExample || "O resultado esperado aparecerá aqui..."}</p>
                       </CardContent>
                    </Card>
                 </div>
              </section>

            </div>

            {/* Right Column: Visual Preview, Related, CTA */}
            <div className="space-y-12">

              {/* Visual Preview Card */}
              <section className="space-y-4">
                 <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold">Preview Visual</h3>
                 </div>
                 <div className="aspect-square bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                       <p className="text-xs text-white/80 italic">Representação visual do resultado deste prompt em alta resolução.</p>
                    </div>
                    {/* Placeholder content based on category */}
                    <div className="text-center p-8">
                       {prompt.category === 'Arquitetura' && (
                          <div className="w-32 h-32 border-2 border-primary/20 rounded-full animate-pulse flex items-center justify-center">
                             <div className="w-20 h-20 border-2 border-primary/40 rounded-full flex items-center justify-center">
                                <div className="w-10 h-10 bg-primary/20 rounded-full" />
                             </div>
                          </div>
                       )}
                       {prompt.category === 'Programação' && (
                          <CodeIcon className="w-24 h-24 text-primary/10" />
                       )}
                       {!['Arquitetura', 'Programação'].includes(prompt.category) && (
                          <Layout className="w-24 h-24 text-primary/10" />
                       )}
                       <p className="mt-6 text-sm text-muted-foreground uppercase font-bold tracking-tighter opacity-50">Visual Preview Asset</p>
                    </div>
                 </div>
                 <p className="text-[10px] text-center text-muted-foreground uppercase font-medium tracking-widest">
                   Imagens geradas variam conforme a versão da IA
                 </p>
              </section>

              {/* Related Prompts */}
              {relatedPrompts.length > 0 && (
                <section className="space-y-6">
                  <h3 className="text-xl font-bold">Relacionados</h3>
                  <div className="space-y-4">
                    {relatedPrompts.map((rp: any) => (
                      <Link key={rp.id} href={`/prompts/${rp.slug}`}>
                        <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group p-4 cursor-pointer">
                          <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 rounded-lg bg-white/5 shrink-0 flex items-center justify-center">
                              <Zap className="w-6 h-6 text-primary/20 group-hover:text-primary/50 transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{rp.title}</h4>
                               <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">{rp.aiTools[0]}</p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Premium CTA Box */}
              <section>
                 <Card className="bg-gradient-to-br from-primary/20 to-purple-900/20 border-primary/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <Badge className="bg-primary text-white border-none">PRO</Badge>
                    </div>
                    <CardHeader>
                       <CardTitle className="text-xl">Precisa de Mais?</CardTitle>
                       <CardDescription className="text-foreground/70">
                         Desbloqueie nossa biblioteca premium com mais de 5.000 prompts exclusivos e atualizações semanais.
                       </CardDescription>
                    </CardHeader>
                    <CardFooter>
                       <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                         Ver Planos Premium
                       </Button>
                    </CardFooter>
                 </Card>
              </section>

              {/* Metadata/Tags */}
              <section className="space-y-4 pt-6 border-t border-white/5">
                 <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tags Adicionais</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag: string) => (
                       <Badge key={tag} variant="ghost" className="bg-white/5 text-muted-foreground hover:bg-white/10 text-[10px]">
                         #{tag}
                       </Badge>
                    ))}
                 </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Footer (Simplified) */}
      <footer className="border-t border-white/5 py-12 bg-black/50">
        <div className="container mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">O</span>
              </div>
              <span className="text-lg font-bold">Obsidian</span>
           </div>
           <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
             A plataforma definitiva para descoberta e organização de prompts de elite.
           </p>
           <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
             &copy; 2024 Obsidian Prompt Platform. Todos os direitos reservados.
           </div>
        </div>
      </footer>
    </div>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
