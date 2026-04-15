import { Navbar } from "@/components/navbar";
import prisma from "@/lib/prisma";
import { getFavoritePrompts, getCopyHistory, getUserCollections } from "@/lib/prompts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Star, Folder, History, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";

const TEST_USER_ID = 'user_test_123';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [favorites, history, collections] = await Promise.all([
     getFavoritePrompts(TEST_USER_ID),
     getCopyHistory(TEST_USER_ID),
     getUserCollections(TEST_USER_ID)
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20 container mx-auto px-4">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h1 className="text-4xl font-bold tracking-tight">Painel de Controle</h1>
               <p className="text-muted-foreground mt-2">Visão geral da sua inteligência e biblioteca.</p>
            </div>
            <Link href="/studio">
               <Button className="bg-primary text-white font-bold gap-2">
                  <Zap className="w-4 h-4" /> Prompt Studio
               </Button>
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/5 border-white/5 p-6 flex flex-col justify-between">
               <div className="flex items-center gap-3 text-muted-foreground mb-4">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Favoritos</span>
               </div>
               <span className="text-3xl font-bold">{favorites.length}</span>
            </Card>
            <Card className="bg-white/5 border-white/5 p-6 flex flex-col justify-between">
               <div className="flex items-center gap-3 text-muted-foreground mb-4">
                  <Folder className="w-5 h-5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest">Coleções</span>
               </div>
               <span className="text-3xl font-bold">{collections.length}</span>
            </Card>
            <Card className="bg-white/5 border-white/5 p-6 flex flex-col justify-between">
               <div className="flex items-center gap-3 text-muted-foreground mb-4">
                  <History className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Uso Recente</span>
               </div>
               <span className="text-3xl font-bold">{history.length}</span>
            </Card>
            <Card className="bg-primary/10 border-primary/20 p-6 flex flex-col justify-between">
               <div className="flex items-center gap-3 text-primary mb-4">
                  <Badge className="bg-primary text-white border-none text-[8px]">PRO</Badge>
                  <span className="text-xs font-bold uppercase tracking-widest">Status da Conta</span>
               </div>
               <span className="text-xl font-bold uppercase">Ativo</span>
            </Card>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* History List */}
            <section className="space-y-6">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2"><History className="w-5 h-5 text-muted-foreground" /> Atividade Recente</h3>
                  <Link href="/historico" className="text-xs text-primary font-bold hover:underline uppercase tracking-tighter">Ver Tudo</Link>
               </div>
               <div className="space-y-3">
                  {history.slice(0, 5).map((item: any, i) => (
                     <Link key={`${item.id}-${i}`} href={`/prompt/${item.slug}`}>
                        <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/[0.08] transition-colors group">
                           <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{item.title}</p>
                              <p className="text-[10px] text-muted-foreground uppercase mt-1">{item.aiTools[0]}</p>
                           </div>
                           <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                     </Link>
                  ))}
               </div>
            </section>

            {/* Favorite Spotlight */}
            <section className="space-y-6">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2"><Star className="w-5 h-5 text-muted-foreground" /> Seus Favoritos</h3>
                  <Link href="/favoritos" className="text-xs text-primary font-bold hover:underline uppercase tracking-tighter">Ver Tudo</Link>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favorites.slice(0, 4).map((prompt: any) => (
                     <Link key={prompt.id} href={`/prompt/${prompt.slug}`}>
                        <Card className="bg-white/5 border-white/5 hover:border-primary/20 transition-all group overflow-hidden">
                           <div className="p-4">
                              <Badge variant="outline" className="mb-3 text-[8px] uppercase tracking-tighter border-primary/20 text-primary">{prompt.category}</Badge>
                              <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{prompt.title}</h4>
                           </div>
                        </Card>
                     </Link>
                  ))}
               </div>
            </section>
         </div>
      </main>
    </div>
  );
}
