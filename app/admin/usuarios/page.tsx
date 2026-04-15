import { Navbar } from "@/components/navbar";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Shield, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { prompts: true, favorites: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#050505] text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold">Gestão de Usuários</h1>
            <p className="text-muted-foreground">Monitore o acesso e as permissões da plataforma.</p>
          </div>
          <Link href="/admin">
             <Button variant="outline" className="border-white/10">Voltar ao Painel</Button>
          </Link>
        </div>

        <Card className="bg-white/5 border-white/10 overflow-hidden">
           <CardContent className="p-0">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-white/[0.02] text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-white/5">
                       <th className="px-6 py-4">Usuário</th>
                       <th className="px-6 py-4">Papel</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Atividade</th>
                       <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm">
                    {users.map((user) => (
                       <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                                   {user.name?.[0] || 'U'}
                                </div>
                                <div>
                                   <p className="font-bold">{user.name}</p>
                                   <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary">
                                {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : null}
                                {user.role}
                             </Badge>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                {user.status === 'active' ? (
                                   <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                   <XCircle className="w-3 h-3 text-red-500" />
                                )}
                                <span className="capitalize">{user.status}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="text-xs space-x-4">
                                <span><span className="font-bold">{user._count.prompts}</span> prompts</span>
                                <span className="text-muted-foreground">|</span>
                                <span><span className="font-bold">{user._count.favorites}</span> favoritos</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                             </Button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
