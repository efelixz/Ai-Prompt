import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Zap, Shield, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const packs = [
  {
    id: "p1",
    title: "Elite Architecture Bundle",
    description: "20+ prompts ultra-realistas para visualização de interiores e exteriores.",
    price: "R$ 47",
    rating: 4.9,
    reviews: 124,
    items: 24,
    color: "from-blue-600/20 to-cyan-600/20",
    tags: ["Midjourney", "DALL-E 3"]
  },
  {
    id: "p2",
    title: "Marketing Copy Masterclass",
    description: "Frameworks de copy para anúncios de alta conversão e roteiros virais.",
    price: "R$ 39",
    rating: 4.8,
    reviews: 89,
    items: 15,
    color: "from-purple-600/20 to-pink-600/20",
    tags: ["ChatGPT", "Claude"]
  },
  {
    id: "p3",
    title: "Fullstack Developer Pack",
    description: "Prompts de precisão para geração de componentes, testes e refatoração.",
    price: "R$ 59",
    rating: 5.0,
    reviews: 56,
    items: 30,
    color: "from-orange-600/20 to-red-600/20",
    tags: ["GPT-4", "Claude 3.5"]
  }
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 mb-16">
           <div className="max-w-3xl space-y-6">
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-3 py-1 uppercase text-[10px] font-bold tracking-widest">
                 Obsidian Marketplace
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">Packs de Prompts <span className="text-primary">Especializados</span></h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                 Acelere seus resultados com coleções curadas pelos melhores engenheiros de prompts. Frameworks completos prontos para uso profissional.
              </p>
           </div>
        </section>

        <section className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packs.map((pack) => (
                 <Card key={pack.id} className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group flex flex-col overflow-hidden relative">
                    <div className={`aspect-[16/9] bg-gradient-to-br ${pack.color} flex items-center justify-center border-b border-white/5`}>
                       <ShoppingBag className="w-16 h-16 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardHeader className="p-8">
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex gap-2">
                             {pack.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-white/5 text-muted-foreground border-none text-[10px] uppercase font-bold tracking-wider">{tag}</Badge>
                             ))}
                          </div>
                          <div className="flex items-center gap-1 text-amber-400">
                             <Star className="w-3 h-3 fill-current" />
                             <span className="text-xs font-bold">{pack.rating}</span>
                          </div>
                       </div>
                       <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">{pack.title}</CardTitle>
                       <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                          {pack.description}
                       </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-4">
                       <div className="flex items-center gap-3 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                          <Check className="w-4 h-4 text-green-500" /> {pack.items} Prompts Premium
                       </div>
                       <div className="flex items-center gap-3 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                          <Check className="w-4 h-4 text-green-500" /> Atualizações Gratuitas
                       </div>
                       <div className="flex items-center gap-3 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                          <Check className="w-4 h-4 text-green-500" /> Guia de Uso PDF
                       </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 mt-auto border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                       <div className="py-4">
                          <span className="text-xs text-muted-foreground block uppercase font-bold tracking-widest">A partir de</span>
                          <span className="text-2xl font-black text-white">{pack.price}</span>
                       </div>
                       <Link href={`/marketplace/checkout/${pack.id}`}>
                          <Button className="bg-primary text-white font-bold gap-2 px-6">
                             Adquirir Pack <ArrowRight className="w-4 h-4" />
                          </Button>
                       </Link>
                    </CardFooter>
                 </Card>
              ))}
           </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 mt-32 py-20 bg-primary/5 rounded-[40px] border border-primary/10">
           <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center space-y-4">
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold">Acesso Vitalício</h3>
                 <p className="text-sm text-muted-foreground">Compre uma vez e tenha acesso para sempre a todos os prompts do pack.</p>
              </div>
              <div className="text-center space-y-4">
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Star className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold">Curadoria de Elite</h3>
                 <p className="text-sm text-muted-foreground">Apenas os melhores prompts que passaram por rigorosos testes de qualidade.</p>
              </div>
              <div className="text-center space-y-4">
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold">Garantia de Qualidade</h3>
                 <p className="text-sm text-muted-foreground">Suporte total caso um prompt pare de funcionar devido a atualizações de modelos.</p>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
