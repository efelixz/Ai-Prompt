import { Navbar } from "@/components/navbar";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Bell, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";

const TEST_USER_ID = 'user_test_123';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const user = await prisma.user.findUnique({
     where: { id: TEST_USER_ID }
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20 container mx-auto px-4 max-w-4xl">
         <h1 className="text-4xl font-bold mb-10">Configurações</h1>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <aside className="md:col-span-1 space-y-2">
               {[
                  { label: "Perfil", icon: User, active: true },
                  { label: "Assinatura", icon: CreditCard, active: false },
                  { label: "Notificações", icon: Bell, active: false },
                  { label: "Segurança", icon: Shield, active: false },
               ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${item.active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
                  >
                     <item.icon className="w-4 h-4" />
                     {item.label}
                  </button>
               ))}
            </aside>

            <div className="md:col-span-3 space-y-8">
               <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                     <CardTitle>Dados Pessoais</CardTitle>
                     <CardDescription>Atualize suas informações públicas e de contato.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center font-black text-2xl text-primary border border-primary/20">
                           {user.name?.[0] || 'U'}
                        </div>
                        <Button variant="outline" className="border-white/10 bg-white/5">Alterar Avatar</Button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nome Completo</label>
                           <Input defaultValue={user.name || ''} className="bg-black/40 border-white/10" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">E-mail</label>
                           <Input defaultValue={user.email} className="bg-black/40 border-white/10" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bio Curta</label>
                        <textarea
                           className="w-full min-h-[100px] bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                           placeholder="Conte um pouco sobre sua experiência com IA..."
                        />
                     </div>
                  </CardContent>
                  <CardFooter className="border-t border-white/5 bg-white/[0.01] p-6 flex justify-end">
                     <Button className="bg-primary text-white font-bold px-8">Salvar Alterações</Button>
                  </CardFooter>
               </Card>

               <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                     <CardTitle>Plano Atual</CardTitle>
                     <CardDescription>Gerencie sua assinatura e métodos de pagamento.</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="flex items-center justify-between p-6 rounded-2xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                              <Shield className="w-6 h-6 text-white" />
                           </div>
                           <div>
                              <p className="font-bold">Plano {user.role === 'admin' ? 'Elite' : 'Free'}</p>
                              <p className="text-xs text-muted-foreground">Válido até 12/05/2024</p>
                           </div>
                        </div>
                        <Link href="/precos">
                           <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">Fazer Upgrade</Button>
                        </Link>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </main>
    </div>
  );
}
