import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const mockPosts = [
  {
    title: "O Guia Definitivo de Engenharia de Prompts para 2024",
    slug: "guia-definitivo-prompt-engineering",
    excerpt: "Descubra as técnicas avançadas de estruturação de comandos que estão definindo a nova era da IA generativa.",
    category: "Tutorial",
    date: "12 Abr, 2024",
    readTime: "8 min",
    image: "bg-blue-500/10"
  },
  {
    title: "Midjourney v6: O que mudou e como extrair o máximo",
    slug: "midjourney-v6-guia-completo",
    excerpt: "Um mergulho profundo nas novas funcionalidades e parâmetros do motor de renderização mais poderoso da atualidade.",
    category: "IA Visual",
    date: "10 Abr, 2024",
    readTime: "5 min",
    image: "bg-purple-500/10"
  },
  {
    title: "Como criar fluxos de trabalho automatizados com Claude 3.5",
    slug: "automacao-claude-3-5",
    excerpt: "Aprenda a integrar o Claude em seu pipeline de desenvolvimento para aumentar a produtividade em 10x.",
    category: "Produtividade",
    date: "08 Abr, 2024",
    readTime: "6 min",
    image: "bg-emerald-500/10"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-3 py-1 uppercase text-[10px] font-bold tracking-widest">
            Obsidian Intelligence
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">O Blog da <span className="text-primary">Obsidian</span></h1>
          <p className="text-muted-foreground text-lg">Insights, tutoriais e as últimas novidades sobre engenharia de prompts e IA.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
             <Card key={post.slug} className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group flex flex-col h-full overflow-hidden">
                <div className={`aspect-video ${post.image} flex items-center justify-center border-b border-white/5`}>
                   <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Badge variant="ghost" className="text-primary font-black">O</Badge>
                   </div>
                </div>
                <CardHeader className="p-6">
                   <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-none text-[10px] uppercase font-bold">{post.category}</Badge>
                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                         <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                   </div>
                   <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors leading-tight">{post.title}</CardTitle>
                   <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                   </CardDescription>
                </CardHeader>
                <CardFooter className="px-6 pb-6 pt-0 mt-auto">
                   <Link href={`/blog/${post.slug}`} className="w-full">
                      <Button variant="outline" className="w-full border-white/10 group-hover:border-primary/50 group-hover:bg-primary/5 gap-2 transition-all">
                         Ler Artigo Completo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                   </Link>
                </CardFooter>
             </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
