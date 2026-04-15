import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, User, Activity, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return (
    <div className="min-h-screen bg-[#050505] text-foreground p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h1 className="text-3xl font-bold">Trilha de Auditoria</h1>
                <p className="text-muted-foreground">Log de ações administrativas e alterações críticas.</p>
             </div>
          </div>
          <Link href="/admin">
             <Button variant="outline" className="border-white/10 gap-2">
                <ArrowLeft className="w-4 h-4" /> Painel Admin
             </Button>
          </Link>
        </div>

        <div className="space-y-4">
           {logs.map((log) => (
              <Card key={log.id} className="bg-white/5 border-white/5 hover:bg-white/[0.08] transition-colors group">
                 <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center font-bold text-xs text-muted-foreground">
                             {log.user?.name?.[0] || 'A'}
                          </div>
                          <div>
                             <div className="flex items-center gap-3 mb-1">
                                <Badge variant="secondary" className="text-[10px] uppercase font-black px-2 py-0 h-5 border-none bg-primary/20 text-primary">
                                   {log.action}
                                </Badge>
                                <span className="text-sm font-bold">{log.user?.name}</span>
                             </div>
                             <p className="text-xs text-muted-foreground">
                                Modificou <span className="text-white">{log.entity}</span> {log.details && <span className="italic">({log.details})</span>}
                             </p>
                          </div>
                       </div>
                       <div className="text-right shrink-0">
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                             {new Date(log.createdAt).toLocaleString('pt-BR')}
                          </p>
                          <p className="text-[10px] text-primary/40 font-bold mt-1 uppercase tracking-tighter">ID: {log.entityId?.slice(0,8)}...</p>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           ))}

           {logs.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                 <p className="text-muted-foreground italic">Nenhum log registrado ainda.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
