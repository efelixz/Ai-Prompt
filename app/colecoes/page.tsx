import { Plus, Folder, MoreVertical, Search, Grid2X2, List, ExternalLink, Users, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const mockCollections = [
  {
    id: '1',
    name: 'Projetos de Arquitetura 2024',
    description: 'Coleção de prompts focados em visualização arquitetônica, materiais e iluminação realista.',
    count: 12,
    isPublic: false,
    updatedAt: '2 dias atrás',
    color: 'bg-blue-500/20 border-blue-500/50'
  },
  {
    id: '2',
    name: 'Marketing & Copywriting',
    description: 'Templates para anúncios, posts de blog e estratégias de conteúdo para redes sociais.',
    count: 8,
    isPublic: true,
    updatedAt: '5 horas atrás',
    color: 'bg-purple-500/20 border-purple-500/50'
  },
  {
    id: '3',
    name: 'Desenvolvimento React',
    description: 'Prompts para geração de componentes, debug e refatoração de código TypeScript.',
    count: 15,
    isPublic: false,
    updatedAt: '1 semana atrás',
    color: 'bg-emerald-500/20 border-emerald-500/50'
  }
];

export default function CollectionsPage() {
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
            <Link href="/colecoes" className="text-primary">Minhas Coleções</Link>
            <Link href="/favoritos" className="hover:text-primary transition-colors">Favoritos</Link>
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">Minhas Coleções</h1>
            <p className="text-muted-foreground max-w-2xl">
              Organize seus prompts em diretórios temáticos para fluxos de trabalho específicos.
            </p>
          </div>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Nova Coleção
          </Button>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Pesquisar coleções..."
              className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50"
            />
          </div>
          <div className="border border-white/10 rounded-md p-1 flex bg-white/5">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/10 text-primary">
              <Grid2X2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCollections.map((collection) => (
            <Card key={collection.id} className="bg-white/5 border-white/10 hover:border-primary/40 transition-all group cursor-pointer flex flex-col">
              <CardHeader className="p-6">
                 <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl ${collection.color} border flex items-center justify-center`}>
                       <Folder className="w-6 h-6 text-foreground" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                       <MoreVertical className="w-4 h-4" />
                    </Button>
                 </div>
                 <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{collection.name}</CardTitle>
                 <CardDescription className="line-clamp-2 text-sm leading-relaxed mb-4">
                   {collection.description}
                 </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 mt-auto">
                 <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1.5">
                          <Badge variant="secondary" className="bg-white/5 hover:bg-white/5 text-[10px] py-0 px-1.5">{collection.count} prompts</Badge>
                       </span>
                       <span className="flex items-center gap-1">
                          {collection.isPublic ? <Users className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          {collection.isPublic ? 'Pública' : 'Privada'}
                       </span>
                    </div>
                    <span>{collection.updatedAt}</span>
                 </div>
              </CardContent>
              <CardFooter className="px-6 py-3 bg-white/5 border-t border-white/5 flex items-center justify-between group-hover:bg-primary/5 transition-colors">
                 <span className="text-xs font-bold uppercase tracking-widest text-primary/80 group-hover:text-primary">Abrir Coleção</span>
                 <ChevronRight className="w-4 h-4 text-primary/80 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </CardFooter>
            </Card>
          ))}

          {/* Create New Card */}
          <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group py-12">
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
             </div>
             <h3 className="font-bold text-lg mb-1">Nova Coleção</h3>
             <p className="text-sm text-muted-foreground">Agrupe seus prompts por tema</p>
          </div>
        </div>

        {/* Suggested Collections Section */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Coleções Sugeridas</h2>
            <Button variant="link" className="text-primary gap-2">
               Ver Marketplace <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { name: 'Elite UI/UX Designs', author: 'Design System Team', color: 'from-blue-600/20 to-cyan-600/20' },
               { name: 'Fullstack Dev Pack', author: 'Vercel Expert', color: 'from-orange-600/20 to-red-600/20' }
             ].map((suggested, i) => (
                <div key={i} className={`p-8 rounded-2xl bg-gradient-to-br ${suggested.color} border border-white/10 flex items-center justify-between`}>
                   <div>
                      <h4 className="text-xl font-bold mb-1">{suggested.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">Por {suggested.author}</p>
                      <Button size="sm" variant="outline" className="border-white/20 bg-black/20">Explorar Pack</Button>
                   </div>
                   <div className="hidden sm:block w-24 h-24 bg-black/40 rounded-full blur-2xl animate-pulse" />
                </div>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
}
