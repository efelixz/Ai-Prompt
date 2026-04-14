import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const mockPosts = [
  {
    title: "O Guia Definitivo de Engenharia de Prompts para 2024",
    slug: "guia-definitivo-prompt-engineering",
    content: `
      <p>A engenharia de prompts evoluiu de uma simples curiosidade para uma habilidade fundamental no arsenal de qualquer profissional criativo ou técnico. Em 2024, não se trata mais apenas de 'pedir' algo à IA, mas de estruturar contextos complexos.</p>
      <h2>1. Estrutura Baseada em Funções</h2>
      <p>Definir quem a IA deve ser é o primeiro passo para o sucesso. Em vez de 'Escreva um código', tente 'Aja como um engenheiro de software sênior especializado em arquiteturas escaláveis de React'.</p>
      <h2>2. Contexto Negativo</h2>
      <p>Saber o que não incluir é tão importante quanto o conteúdo principal. Utilize instruções negativas para evitar clichês e redundâncias.</p>
    `,
    category: "Tutorial",
    date: "12 Abr, 2024",
    readTime: "8 min",
    author: "Erik Luminary"
  }
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = mockPosts.find(p => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        <article className="container mx-auto px-4 max-w-3xl">
           <Link href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
              <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
           </Link>

           <div className="space-y-6 mb-12 border-b border-white/5 pb-12">
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-3 py-1 uppercase text-[10px] font-bold tracking-widest">
                 {post.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">{post.title}</h1>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                       {post.author[0]}
                    </div>
                    <div>
                       <p className="text-sm font-bold">{post.author}</p>
                       <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-white border border-white/5">
                       <Share2 className="w-4 h-4" />
                    </Button>
                    <div className="w-9 h-9 rounded bg-white/5 border border-white/5" />
                 </div>
              </div>
           </div>

           <div
             className="prose prose-invert prose-primary max-w-none text-muted-foreground leading-[1.8] text-lg space-y-8"
             dangerouslySetInnerHTML={{ __html: post.content }}
           />

           <div className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col items-center text-center space-y-6">
              <h3 className="text-2xl font-bold">Gostou deste conteúdo?</h3>
              <p className="text-muted-foreground max-w-md">Junte-se à nossa comunidade e receba as melhores técnicas de prompts diretamente no seu e-mail.</p>
              <div className="flex w-full max-w-sm gap-2">
                 <input className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 text-sm" placeholder="Seu melhor e-mail" />
                 <Button className="bg-primary text-white font-bold">Assinar</Button>
              </div>
           </div>
        </article>
      </main>
    </div>
  );
}
