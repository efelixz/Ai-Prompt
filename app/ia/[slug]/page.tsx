import { getPrompts, getAITools } from "@/lib/prompts";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { FavoriteButton } from "@/components/favorite-button";
import { CollectionSelect } from "@/components/collection-select";
import { CopyButton } from "@/components/copy-button";
import { getUserCollections } from "@/lib/prompts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Crown } from "lucide-react";

const TEST_USER_ID = 'user_test_123';

export const dynamic = 'force-dynamic';

export default async function AIToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [tools, allCollections] = await Promise.all([
    getAITools(),
    getUserCollections(TEST_USER_ID)
  ]);

  const tool = tools.find(t => t.slug === slug);
  if (!tool) notFound();

  const prompts = await getPrompts({ tool: slug });

  return (
    <div className="min-h-screen bg-background text-foreground">
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
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-20 container mx-auto px-4">
        <div className="mb-12">
          <Link href="/explorar" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Todos os Prompts
          </Link>
          <h1 className="text-4xl font-bold mb-2">Prompts para {tool.name}</h1>
          <p className="text-muted-foreground">{tool.description || `Os comandos mais precisos e testados para ${tool.name}.`}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
             <Link key={prompt.id} href={`/prompt/${prompt.slug}`}>
                <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group overflow-hidden h-full flex flex-col">
                    <div className="aspect-video bg-gradient-to-br from-white/5 to-black relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {prompt.isPremium && (
                            <Badge className="absolute top-4 right-4 bg-amber-500 text-black border-none text-[10px] font-bold">
                                <Crown className="w-3 h-3 mr-1" /> PREMIUM
                            </Badge>
                        )}
                    </div>
                    <CardHeader className="p-6">
                        <div className="flex gap-2 mb-3">
                             <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-[10px] uppercase font-bold tracking-wider">
                                {prompt.category}
                             </Badge>
                        </div>
                        <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors line-clamp-1">{prompt.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                            {prompt.shortDescription}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-6 pt-2 flex items-center justify-between border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{prompt.author}</span>
                        </div>
                        <div className="flex gap-2">
                            <FavoriteButton promptId={prompt.id} />
                            <CollectionSelect promptId={prompt.id} collections={allCollections} />
                            <CopyButton promptId={prompt.id} textToCopy={prompt.promptText} className="bg-white/5 hover:bg-white/10" />
                        </div>
                    </CardFooter>
                </Card>
             </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
