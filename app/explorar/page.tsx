import { Search, Filter, SlidersHorizontal, Grid2X2, List, Copy, Star, ChevronDown, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPrompts, getCategories, getAITools, getUserCollections } from "@/lib/prompts";
import { FavoriteButton } from "@/components/favorite-button";
import { CollectionSelect } from "@/components/collection-select";
import { CopyButton } from "@/components/copy-button";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { Crown } from "lucide-react";

const TEST_USER_ID = 'user_test_123';

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    cat?: string;
    tool?: string;
    diff?: string;
  }>;
}) {
  const { q, cat, tool, diff } = await searchParams;

  const [prompts, allCategories, allTools, collections] = await Promise.all([
    getPrompts({ search: q, category: cat, tool: tool, difficulty: diff }),
    getCategories(),
    getAITools(),
    getUserCollections(TEST_USER_ID),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-12 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Ferramentas de IA</h3>
              <div className="space-y-3">
                {allTools.map((t) => (
                  <Link
                    key={t.id}
                    href={`/explorar?${new URLSearchParams({
                      ...(q && { q }),
                      ...(cat && { cat }),
                      tool: t.slug,
                      ...(diff && { diff })
                    }).toString()}`}
                    className={`flex items-center gap-3 group cursor-pointer ${tool === t.slug ? 'text-primary' : ''}`}
                  >
                    <div className={`w-4 h-4 rounded border ${tool === t.slug ? 'bg-primary border-primary' : 'border-white/20'}`} />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {t.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="bg-white/5" />

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Categorias</h3>
              <div className="space-y-3">
                {allCategories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/explorar?${new URLSearchParams({
                      ...(q && { q }),
                      cat: c.slug,
                      ...(tool && { tool }),
                      ...(diff && { diff })
                    }).toString()}`}
                    className={`flex items-center gap-3 group cursor-pointer ${cat === c.slug ? 'text-primary' : ''}`}
                  >
                    <div className={`w-4 h-4 rounded border ${cat === c.slug ? 'bg-primary border-primary' : 'border-white/20'}`} />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {c.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="bg-white/5" />

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Dificuldade</h3>
              <div className="space-y-3">
                {[
                  { label: 'Iniciante', value: 'beginner' },
                  { label: 'Intermediário', value: 'intermediate' },
                  { label: 'Avançado', value: 'advanced' }
                ].map((level) => (
                  <Link
                    key={level.value}
                    href={`/explorar?${new URLSearchParams({
                      ...(q && { q }),
                      ...(cat && { cat }),
                      ...(tool && { tool }),
                      diff: level.value
                    }).toString()}`}
                    className={`flex items-center gap-3 group cursor-pointer ${diff === level.value ? 'text-primary' : ''}`}
                  >
                    <div className={`w-4 h-4 rounded border ${diff === level.value ? 'bg-primary border-primary' : 'border-white/20'}`} />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {level.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {(q || cat || tool || diff) && (
              <Link href="/explorar">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-primary">
                  Limpar Filtros
                </Button>
              </Link>
            )}
          </aside>

          {/* Main Content */}
          <section className="flex-1">
            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <form action="/explorar" className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="q"
                  defaultValue={q}
                  placeholder="Pesquisar prompts..."
                  className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                />
                {cat && <input type="hidden" name="cat" value={cat} />}
                {tool && <input type="hidden" name="tool" value={tool} />}
                {diff && <input type="hidden" name="diff" value={diff} />}
              </form>
              <div className="flex gap-2">
                <Button variant="outline" className="border-white/10 bg-white/5 gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Ordenar <ChevronDown className="w-4 h-4" />
                </Button>
                <div className="border border-white/10 rounded-md p-1 flex bg-white/5">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/10 text-primary">
                    <Grid2X2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tags Ribbon */}
            <ScrollArea className="w-full whitespace-nowrap mb-8 pb-3">
              <div className="flex gap-2">
                {['Tudo', 'Populares', 'Novos', 'Realismo', 'Código', 'Copywriting', '3D', 'Hooks', 'Retratos', 'UI/UX'].map((tag) => (
                  <Badge
                    key={tag}
                    variant={tag === 'Tudo' ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-1.5 ${tag === 'Tudo' ? '' : 'border-white/10 hover:border-primary/50 bg-white/5'}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </ScrollArea>

            {/* Prompts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {prompts.map((prompt: any) => (
                <Link key={prompt.id} href={`/prompt/${prompt.slug}`}>
                  <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group overflow-hidden h-full flex flex-col">
                    <div className="aspect-[16/9] bg-gradient-to-br from-white/5 to-black/50 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {prompt.category === 'Arquitetura' && (
                        <div className="w-24 h-24 border border-primary/20 rounded-full animate-pulse" />
                      )}
                      {prompt.category === 'Programação' && (
                        <Code className="w-12 h-12 text-primary/20" />
                      )}
                      {prompt.category === 'Marketing' && (
                        <Megaphone className="w-12 h-12 text-primary/20" />
                      )}
                      <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border-white/10 text-[10px] uppercase font-bold">
                        {prompt.category}
                      </Badge>
                      {prompt.isPremium && (
                        <Badge className="absolute top-4 right-4 bg-amber-500 text-black border-none text-[10px] font-bold">
                          <Crown className="w-3 h-3 mr-1" /> PREMIUM
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-6">
                      <div className="flex gap-2 mb-3">
                        {prompt.aiTools.slice(0, 2).map((tool: string) => (
                          <span key={tool} className="text-[10px] font-bold text-primary uppercase tracking-wider">{tool}</span>
                        ))}
                      </div>
                      <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors line-clamp-1">{prompt.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                        {prompt.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-2 flex-1">
                      <div className="flex flex-wrap gap-2">
                        {prompt.tags.map((tag: string) => (
                          <span key={tag} className="text-[10px] text-muted-foreground">#{tag}</span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-2 flex items-center justify-between border-t border-white/5 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                          {prompt.author[0]}
                        </div>
                        <span className="text-xs text-muted-foreground">{prompt.author}</span>
                      </div>
                      <div className="flex gap-2">
                        <FavoriteButton promptId={prompt.id} />
                        <CollectionSelect promptId={prompt.id} collections={collections} />
                        <CopyButton promptId={prompt.id} textToCopy={prompt.promptText} className="bg-white/5 hover:bg-white/10" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center gap-2">
               <Button variant="outline" size="sm" disabled className="border-white/10">Anterior</Button>
               <Button variant="outline" size="sm" className="bg-primary/10 border-primary/20 text-primary">1</Button>
               <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">2</Button>
               <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">3</Button>
               <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">Próximo</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Minimal missing icons
function Megaphone(props: any) {
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
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  )
}
