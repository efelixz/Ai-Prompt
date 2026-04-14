import { getCopyHistory } from "@/lib/prompts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, History, ExternalLink, Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/favorite-button";
import { CopyButton } from "@/components/copy-button";
import { Navbar } from "@/components/navbar";

const TEST_USER_ID = 'user_test_123';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const history = await getCopyHistory(TEST_USER_ID);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-12 container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
           <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <History className="w-6 h-6 text-primary" />
           </div>
           <div>
              <h1 className="text-3xl font-bold">Histórico de Uso</h1>
              <p className="text-muted-foreground">Veja os prompts que você copiou recentemente.</p>
           </div>
        </div>

        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item, index) => (
              <Card key={`${item.id}-${index}`} className="bg-white/5 border-white/10 hover:border-primary/20 transition-all">
                <CardContent className="p-6">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                            <Clock className="w-3 h-3" />
                            {new Date(item.copiedAt).toLocaleString('pt-BR')}
                         </div>
                         <h3 className="text-lg font-bold mb-1 hover:text-primary transition-colors">
                            <Link href={`/prompt/${item.slug}`}>{item.title}</Link>
                         </h3>
                         <p className="text-sm text-muted-foreground line-clamp-1">{item.shortDescription}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                         <FavoriteButton promptId={item.id} />
                         <CopyButton promptId={item.id} textToCopy={item.promptText} />
                         <Link href={`/prompt/${item.slug}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                               <ExternalLink className="w-4 h-4" />
                            </Button>
                         </Link>
                      </div>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-muted-foreground">
               <Copy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Seu histórico está vazio</h3>
            <p className="text-muted-foreground max-w-sm mb-8">
              Comece a explorar o catálogo e use os melhores prompts para ver seu histórico aqui.
            </p>
            <Link href="/explorar">
              <Button>Explorar Prompts</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
