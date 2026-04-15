import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, CreditCard, Lock, ChevronRight, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { purchasePack } from "@/app/actions";
import { CheckoutButton } from "@/components/marketplace/checkout-button";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20 container mx-auto px-4 max-w-5xl">
         <Link href="/marketplace" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Marketplace
         </Link>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
               <h1 className="text-3xl font-bold">Finalizar Compra</h1>

               <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" /> Pagamento Seguro
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Nome no Cartão</label>
                        <Input placeholder="Como impresso no cartão" className="bg-black/40 border-white/10" />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Número do Cartão</label>
                           <Input placeholder="0000 0000 0000 0000" className="bg-black/40 border-white/10" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Validade</label>
                              <Input placeholder="MM/AA" className="bg-black/40 border-white/10" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">CVV</label>
                              <Input placeholder="123" className="bg-black/40 border-white/10" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="bg-white/[0.01] border-t border-white/5 p-6 flex items-center justify-center gap-6 text-muted-foreground">
                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                        <ShieldCheck className="w-4 h-4 text-green-500" /> Criptografia 256-bit
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                        <Lock className="w-4 h-4 text-primary" /> Checkout Seguro
                     </div>
                  </CardFooter>
               </Card>
            </div>

            <aside className="lg:col-span-1">
               <Card className="bg-white/5 border-primary/20 sticky top-24">
                  <CardHeader className="border-b border-white/5">
                     <CardTitle className="text-lg font-bold">Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="font-bold text-sm">Theme Pack ID: {id}</p>
                           <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mt-1">Pack Especializado</p>
                        </div>
                        <span className="font-black">R$ 47</span>
                     </div>

                     <div className="h-px bg-white/5" />

                     <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                           <span className="text-muted-foreground">Subtotal</span>
                           <span>R$ 47,00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-muted-foreground">Desconto</span>
                           <span className="text-green-500">- R$ 0,00</span>
                        </div>
                        <div className="flex justify-between text-lg font-black pt-2">
                           <span>Total</span>
                           <span className="text-primary">R$ 47,00</span>
                        </div>
                     </div>

                     <CheckoutButton packId={id} />
                  </CardContent>
                  <CardFooter className="bg-black/20 p-4">
                     <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
                        Ao finalizar a compra, você concorda com nossos Termos de Serviço e a Política de Uso de Conteúdo Digital.
                     </p>
                  </CardFooter>
               </Card>
            </aside>
         </div>
      </main>
    </div>
  );
}
