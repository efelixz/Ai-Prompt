import { getCollectionDetail, getUserCollections } from "@/lib/prompts";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { FavoriteButton } from "@/components/favorite-button";
import { CollectionSelect } from "@/components/collection-select";
import { CopyButton } from "@/components/copy-button";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Crown, Folder, Lock, Users, Calendar } from "lucide-react";

const TEST_USER_ID = 'user_test_123';

export const dynamic = 'force-dynamic';

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [collection, allCollections] = await Promise.all([
    getCollectionDetail(id),
    getUserCollections(TEST_USER_ID)
  ]);

  if (!collection) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20 container mx-auto px-4">
        <div className="mb-12">
          <Link href="/colecoes" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Minhas Coleções
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Folder className="w-6 h-6 text-primary" />
                   </div>
                   <h1 className="text-4xl font-bold">{collection.name}</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">{collection.description || "Sem descrição."}</p>

                <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                   <span className="flex items-center gap-2">
                      {collection.isPublic ? <Users className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      {collection.isPublic ? 'Pública' : 'Privada'}
                   </span>
                   <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Atualizada em {new Date(collection.updatedAt).toLocaleDateString('pt-BR')}
                   </span>
                   <span className="flex items-center gap-2 text-primary">
                      {collection.prompts.length} Prompts
                   </span>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.prompts.map((prompt: any) => (
             <Link key={prompt.id} href={`/prompt/${prompt.slug}`}>
                <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group overflow-hidden h-full flex flex-col">
                    <CardHeader className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-[10px] uppercase font-bold tracking-wider">
                              {prompt.category}
                           </Badge>
                           {prompt.isPremium && (
                              <Badge className="bg-amber-500 text-black border-none text-[8px] font-bold">PRO</Badge>
                           )}
                        </div>
                        <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors line-clamp-1">{prompt.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
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
                            <FavoriteButton promptId={prompt.id} />
                            <CollectionSelect promptId={prompt.id} collections={allCollections} />
                            <CopyButton promptId={prompt.id} textToCopy={prompt.promptText} className="bg-white/5 hover:bg-white/10" />
                        </div>
                    </CardFooter>
                </Card>
             </Link>
          ))}

          {collection.prompts.length === 0 && (
             <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                   <Folder className="w-8 h-8 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-xl font-bold mb-2">Coleção vazia</h3>
                <p className="text-muted-foreground max-w-sm mb-8">
                   Adicione prompts interessantes do catálogo para organizar seu fluxo de trabalho.
                </p>
                <Link href="/explorar">
                   <Button>Explorar Catálogo</Button>
                </Link>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Button({ children, ...props }: any) {
    return (
        <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors" {...props}>
            {children}
        </button>
    )
}
