import { Search, SlidersHorizontal, Grid2X2, List, Copy, Star, Trash2, FolderPlus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { getFavoritePrompts } from "@/lib/prompts";

/**
 * Nota: Em um app real, o userId seria extraído da sessão.
 * Usando o mesmo ID de teste do actions.ts.
 */
const TEST_USER_ID = 'user_test_123';

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
  const favorites = await getFavoritePrompts(TEST_USER_ID);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold">O</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Obsidian</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
            <Link href="/explorar" className="hover:text-primary transition-colors">Explorar</Link>
            <Link href="/colecoes" className="hover:text-primary transition-colors">Minhas Coleções</Link>
            <Link href="/favoritos" className="text-primary">Favoritos</Link>
          </nav>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary">
                JD
             </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Meus Favoritos</h1>
          <p className="text-muted-foreground max-w-2xl">
            Sua biblioteca pessoal de inteligência. Todos os prompts que você salvou para acesso rápido e organização.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
             <span className="text-sm text-muted-foreground block mb-1">Prompts Salvos</span>
             <span className="text-3xl font-bold">{favorites.length}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
             <span className="text-sm text-muted-foreground block mb-1">Categorias</span>
             <span className="text-3xl font-bold">2</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
             <span className="text-sm text-muted-foreground block mb-1">IAs Utilizadas</span>
             <span className="text-3xl font-bold">3</span>
          </div>
        </div>

        <Separator className="bg-white/5 mb-12" />

        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Pesquisar em favoritos..."
              className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 bg-white/5 gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
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

        {/* Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {favorites.map((prompt: any) => (
              <Card key={prompt.id} className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group overflow-hidden flex flex-col">
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-[10px] uppercase font-bold tracking-wider">
                      {prompt.category}
                    </Badge>
                    <div className="flex gap-1">
                       <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-400">
                         <Trash2 className="w-3.5 h-3.5" />
                       </Button>
                    </div>
                  </div>
                  <Link href={`/prompts/${prompt.slug}`}>
                    <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">{prompt.title}</CardTitle>
                  </Link>
                  <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                    {prompt.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-6 pt-2 flex items-center justify-between border-t border-white/5 mt-auto">
                  <div className="flex gap-2">
                     {prompt.aiTools.slice(0, 1).map((tool: string) => (
                        <span key={tool} className="text-[10px] font-bold text-muted-foreground uppercase">{tool}</span>
                     ))}
                  </div>
                  <div className="flex gap-2">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                       <FolderPlus className="w-4 h-4" />
                     </Button>
                     <Button size="sm" variant="secondary" className="bg-white/5 hover:bg-white/10 gap-2 h-8 text-xs font-bold">
                       <Copy className="w-3.5 h-3.5" /> Copiar
                     </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
               <Star className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nenhum favorito ainda</h3>
            <p className="text-muted-foreground max-w-sm mb-8">
              Explore nosso catálogo e salve os prompts que você mais gosta para encontrá-los aqui.
            </p>
            <Link href="/explorar">
              <Button>Explorar Prompts</Button>
            </Link>
          </div>
        )}

        {/* Recommendations Section */}
        {favorites.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Info className="w-5 h-5 text-primary" />
               </div>
               <h2 className="text-2xl font-bold">Recomendados para você</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-not-allowed">
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 h-32 flex items-center justify-center border-dashed">
                     <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Sugestão #{i}</span>
                  </div>
               ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
