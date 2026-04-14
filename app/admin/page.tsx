import {
  BarChart3,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Copy,
  Edit,
  Trash,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Database,
  Shield,
  LayoutDashboard,
  Settings,
  ChevronRight,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPrompts } from "@/lib/prompts";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { PublishButton } from "@/components/admin/publish-button";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let prompts: any[] = [];
  let promptCount = 0;
  let userCount = 0;
  let favoritesCount = 0;
  let recentActivity: any[] = [];

  try {
    const [p, pc, uc, fc, ra] = await Promise.all([
      getPrompts(),
      prisma.prompt.count(),
      prisma.user.count(),
      prisma.favorite.count(),
      prisma.copyHistory.findMany({
         include: {
            user: true,
            prompt: true
         },
         orderBy: { createdAt: 'desc' },
         take: 10
      })
    ]);
    prompts = p;
    promptCount = pc;
    userCount = uc;
    favoritesCount = fc;
    recentActivity = ra;
  } catch (error) {
    console.error("Failed to fetch admin stats", error);
    // Fallback or empty state
  }

  const stats = [
    { label: "Prompts Totais", value: promptCount.toLocaleString(), change: "+12%", icon: Database },
    { label: "Interações", value: favoritesCount.toLocaleString(), change: "+24%", icon: Copy },
    { label: "Usuários", value: userCount.toLocaleString(), change: "+8%", icon: Users },
    { label: "Taxa de Conv.", value: "3.2%", change: "+0.4%", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-foreground flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-black hidden lg:flex flex-col p-6 fixed h-full">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
             <span className="text-white font-bold">O</span>
          </div>
          <span className="text-xl font-bold">Obsidian Admin</span>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { label: "Dashboard", icon: LayoutDashboard, active: true },
            { label: "Gestão de Prompts", icon: Database, active: false },
            { label: "Usuários", icon: Users, active: false },
            { label: "Analytics", icon: BarChart3, active: false },
            { label: "Segurança", icon: Shield, active: false },
          ].map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 h-11 ${item.active ? "bg-white/10" : "text-muted-foreground hover:text-white"}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2">
           <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-11">
              <Settings className="w-4 h-4" /> Configurações
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
           <div>
              <h1 className="text-3xl font-bold tracking-tight">Painel de Curadoria</h1>
              <p className="text-muted-foreground">Gerencie o catálogo, revise submissões e acompanhe métricas de performance.</p>
           </div>
           <div className="flex gap-3">
              <Button variant="outline" className="border-white/10 hover:bg-white/5">Exportar CSV</Button>
              <Link href="/admin/prompts/new">
                <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
                  <Plus className="w-4 h-4" /> Novo Prompt
                </Button>
              </Link>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
           {stats.map((stat) => (
             <Card key={stat.label} className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                   </CardTitle>
                   <stat.icon className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold">{stat.value}</div>
                   <p className="text-[10px] text-primary font-bold mt-1">
                      {stat.change} <span className="text-muted-foreground font-normal">vs mês anterior</span>
                   </p>
                </CardContent>
             </Card>
           ))}
        </div>

        {/* Prompts Management Table */}
        <Card className="bg-white/5 border-white/10 overflow-hidden">
           <CardHeader className="p-6 border-b border-white/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <CardTitle className="text-lg">Catálogo de Prompts</CardTitle>
                    <CardDescription>Mostrando {prompts.length} prompts registrados no sistema.</CardDescription>
                 </div>
                 <div className="flex gap-2">
                    <div className="relative group">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                       <Input placeholder="Pesquisar..." className="pl-10 h-9 w-64 bg-black/40 border-white/10 focus-visible:ring-primary/50" />
                    </div>
                    <Button variant="outline" size="icon" className="h-9 w-9 border-white/10">
                       <Filter className="w-4 h-4" />
                    </Button>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-0">
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-white/[0.02] text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-white/5">
                          <th className="px-6 py-4">Prompt</th>
                          <th className="px-6 py-4">Categoria</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">IAs</th>
                          <th className="px-6 py-4">Métricas</th>
                          <th className="px-6 py-4 text-right">Ações</th>
                       </tr>
                    </thead>
                    <tbody className="text-sm">
                       {prompts.map((prompt: any) => (
                          <tr key={prompt.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                             <td className="px-6 py-4">
                                <div className="font-bold group-hover:text-primary transition-colors">{prompt.title}</div>
                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">{prompt.slug}</div>
                             </td>
                             <td className="px-6 py-4">
                                <Badge variant="outline" className="border-white/10 bg-white/5 text-[10px] uppercase">{prompt.category}</Badge>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                   <div className={`w-2 h-2 rounded-full ${prompt.status === 'published' ? "bg-green-500" : "bg-yellow-500"}`} />
                                   <span className="text-xs">{prompt.status === 'published' ? "Publicado" : "Pendente"}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex gap-1">
                                   {prompt.aiTools.slice(0, 2).map((tool: string) => (
                                      <span key={tool} className="text-[10px] font-bold text-muted-foreground uppercase">{tool}</span>
                                   ))}
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="text-xs">
                                   <span className="font-bold">{prompt.viewCount || 124}</span> <span className="text-muted-foreground">views</span>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-1">
                                   <PublishButton promptId={prompt.id} currentStatus={prompt.status} />
                                   <Link href={`/admin/prompts/${prompt.id}`}>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                                         <Edit className="w-4 h-4" />
                                      </Button>
                                   </Link>
                                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400">
                                      <Trash className="w-4 h-4" />
                                   </Button>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </CardContent>
           <Separator className="bg-white/5" />
           <div className="p-4 flex items-center justify-between bg-black/40">
              <p className="text-xs text-muted-foreground">Página 1 de 12</p>
              <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="h-8 border-white/10">Anterior</Button>
                 <Button variant="outline" size="sm" className="h-8 border-white/10">Próximo</Button>
              </div>
           </div>
        </Card>

        {/* Recent Activity Feed */}
        <div className="mt-12">
           <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Atividade Recente
           </h2>
           <div className="space-y-3">
              {recentActivity.map((activity) => (
                 <div key={activity.id} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                          {activity.user?.name?.[0] || 'U'}
                       </div>
                       <div>
                          <p className="text-sm font-medium">
                             <span className="font-bold text-white">{activity.user?.name || 'Usuário'}</span> copiou <span className="font-bold text-primary">{activity.prompt?.title}</span>
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">
                             {new Date(activity.createdAt).toLocaleString('pt-BR')}
                          </p>
                       </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                 </div>
              ))}
              {recentActivity.length === 0 && (
                 <p className="text-muted-foreground text-sm italic">Nenhuma atividade registrada ainda.</p>
              )}
           </div>
        </div>
      </main>
    </div>
  );
}
