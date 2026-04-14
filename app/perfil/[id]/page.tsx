import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPrompts, getUserCollections } from "@/lib/prompts";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { User, MapPin, Globe, Grid2X2, Star, Share2, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const profileUser = await prisma.user.findUnique({
    where: { id },
    include: {
       _count: {
          select: { prompts: true, collections: true }
       }
    }
  });

  if (!profileUser) notFound();

  const [userPrompts, userCollections] = await Promise.all([
     prisma.prompt.findMany({
        where: { authorId: id, status: 'published' },
        include: { category: true, aiTools: { include: { tool: true } } },
        take: 6
     }),
     prisma.collection.findMany({
        where: { userId: id, isPublic: true },
        include: { _count: { select: { items: true } } },
        take: 3
     })
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20 container mx-auto px-4">
        {/* Profile Header */}
        <div className="mb-20 flex flex-col md:flex-row items-center md:items-end gap-8">
           <div className="w-32 h-32 rounded-3xl bg-primary/20 border border-primary/20 flex items-center justify-center font-black text-4xl text-primary">
              {profileUser.name?.[0] || 'U'}
           </div>
           <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                 <h1 className="text-4xl font-bold">{profileUser.name}</h1>
                 <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] uppercase font-bold tracking-widest px-3">
                    Curador Verificado
                 </Badge>
              </div>
              <p className="text-muted-foreground max-w-xl">Especialista em visualização arquitetônica e engenharia de prompts para Midjourney e DALL-E 3.</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                 <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> São Paulo, BR</span>
                 <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> erik.art</span>
                 <div className="flex gap-4">
                    <div className="w-4 h-4 rounded bg-white/10 hover:bg-primary cursor-pointer transition-colors" />
                    <div className="w-4 h-4 rounded bg-white/10 hover:bg-primary cursor-pointer transition-colors" />
                 </div>
              </div>
           </div>
           <div className="flex gap-2">
              <Button className="bg-primary text-white font-bold gap-2 px-8">Seguir</Button>
              <Button variant="outline" size="icon" className="h-10 w-10 border-white/10"><Share2 className="w-4 h-4" /></Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
           {/* Sidebar Stats */}
           <aside className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest block mb-1">Prompts</span>
                    <span className="text-2xl font-bold">{profileUser._count.prompts}</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest block mb-1">Coleções</span>
                    <span className="text-2xl font-bold">{profileUser._count.collections}</span>
                 </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Badges do Usuário</h3>
                 <div className="flex flex-wrap gap-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center" title="Early Adopter"><Star className="w-5 h-5 text-amber-500" /></div>
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center" title="Top Curador"><Globe className="w-5 h-5 text-blue-500" /></div>
                 </div>
              </div>
           </aside>

           {/* Main Content Areas */}
           <div className="lg:col-span-3 space-y-16">
              {/* User Prompts */}
              <section>
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Grid2X2 className="w-6 h-6 text-primary" /> Prompts Públicos</h2>
                    <Button variant="link" className="text-primary p-0">Ver Todos</Button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userPrompts.map((prompt: any) => (
                       <Link key={prompt.id} href={`/prompt/${prompt.slug}`}>
                          <Card className="bg-white/5 border-white/10 hover:border-primary/40 transition-all p-6 group">
                             <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5 text-[10px] uppercase font-bold tracking-wider">{prompt.category.name}</Badge>
                             <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{prompt.title}</CardTitle>
                             <p className="text-sm text-muted-foreground line-clamp-2">{prompt.shortDescription}</p>
                          </Card>
                       </Link>
                    ))}
                 </div>
              </section>

              {/* User Public Collections */}
              <section>
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-primary" /> Coleções Curadas</h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {userCollections.map((col: any) => (
                       <Link key={col.id} href={`/colecoes/${col.id}`}>
                          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/[0.08] transition-colors relative overflow-hidden group">
                             <div className="relative z-10">
                                <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{col.name}</h4>
                                <p className="text-xs text-muted-foreground">{col._count.items} prompts</p>
                             </div>
                             <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                          </div>
                       </Link>
                    ))}
                 </div>
              </section>
           </div>
        </div>
      </main>
    </div>
  );
}
