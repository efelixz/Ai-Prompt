import { Check, Zap, Star, ShieldCheck, Clock, Library, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Para quem está começando a explorar o poder da IA.",
    features: [
      "Acesso ao catálogo público",
      "Favoritos ilimitados",
      "Coleções básicas",
      "Filtros por IA e Categoria",
      "Cópia rápida de prompts"
    ],
    buttonText: "Começar Agora",
    buttonVariant: "outline" as const,
    highlight: false
  },
  {
    name: "Obsidian Pro",
    price: "29",
    description: "O padrão ouro para profissionais e criadores de elite.",
    features: [
      "Tudo do plano Free",
      "Prompts Premium exclusivos",
      "Packs temáticos avançados",
      "Preview visual em alta resolução",
      "Histórico completo de uso",
      "Acesso antecipado a novas IAs",
      "Suporte prioritário"
    ],
    buttonText: "Seja Pro Agora",
    buttonVariant: "default" as const,
    highlight: true
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar Reused */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Obsidian</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
            <Link href="/explorar" className="hover:text-primary transition-colors">Explorar</Link>
            <Link href="/precos" className="text-primary">Preços</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Entrar</Button>
            <Button size="sm">Começar Agora</Button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4 text-center mb-20">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary uppercase tracking-widest text-[10px] py-1">
            Planos e Preços
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Escolha o plano ideal para sua <br />
            <span className="text-primary">produtividade com IA</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Seja você um curioso iniciante ou um engenheiro de prompts experiente, temos a estrutura certa para elevar seus resultados.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 mb-32">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden flex flex-col border-white/10 ${
                  plan.highlight ? "bg-white/5 border-primary/50 shadow-2xl shadow-primary/10" : "bg-transparent"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 p-4">
                     <Badge className="bg-primary text-white border-none uppercase text-[10px] font-bold tracking-tighter">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="p-10 text-center border-b border-white/5">
                  <CardTitle className="text-2xl mb-4">{plan.name}</CardTitle>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <span className="text-sm text-muted-foreground mt-2">R$</span>
                    <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                    <span className="text-sm text-muted-foreground mt-6">/mês</span>
                  </div>
                  <CardDescription className="text-sm px-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-10 flex-1">
                   <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <div className={`mt-1 rounded-full p-0.5 ${plan.highlight ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"}`}>
                              <Check className="w-3.5 h-3.5" />
                           </div>
                           <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                   </ul>
                </CardContent>
                <CardFooter className="p-10 pt-0">
                   <Button
                    variant={plan.buttonVariant}
                    className={`w-full h-12 font-bold text-base rounded-xl ${
                      plan.highlight ? "bg-primary text-white hover:bg-primary/90" : "border-white/10 hover:bg-white/5"
                    }`}
                   >
                     {plan.buttonText}
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="container mx-auto px-4 mb-32">
          <h2 className="text-3xl font-bold mb-12 text-center">Comparativo <span className="text-primary">Detalhado</span></h2>
          <div className="max-w-4xl mx-auto border border-white/10 rounded-2xl overflow-hidden bg-white/5">
            <div className="grid grid-cols-3 bg-black/40 p-6 border-b border-white/10 text-xs font-bold uppercase tracking-widest text-muted-foreground">
               <div>Funcionalidade</div>
               <div className="text-center">Free</div>
               <div className="text-center text-primary">Obsidian Pro</div>
            </div>
            {[
              { label: "Catálogo de Prompts", free: "Público", pro: "Público + Premium" },
              { label: "Preview Visual", free: "Básico", pro: "Alta Resolução" },
              { label: "Coleções", free: "Até 3", pro: "Ilimitadas" },
              { label: "Histórico", free: "24h", pro: "Vitalício" },
              { label: "Suporte", free: "Comunidade", pro: "Prioritário" },
              { label: "Novas IAs", free: "Padrão", pro: "Acesso Antecipado" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 p-6 border-b border-white/5 last:border-0 ${i % 2 === 0 ? "bg-white/0" : "bg-white/[0.02]"}`}>
                 <div className="text-sm font-medium">{row.label}</div>
                 <div className="text-center text-sm text-muted-foreground">{row.free}</div>
                 <div className="text-center text-sm font-bold text-primary">{row.pro}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Perguntas <span className="text-primary">Frequentes</span></h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-white/10 bg-white/5 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-left py-6">Como funciona o pagamento?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                Aceitamos cartões de crédito, PIX e boleto através de nossa integração segura com o Stripe. A renovação é automática a cada mês, mas você pode cancelar quando quiser.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white/10 bg-white/5 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-left py-6">Posso cancelar minha assinatura a qualquer momento?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                Sim. Ao cancelar, você continuará tendo acesso aos recursos Pro até o final do seu período de faturamento atual. Depois disso, sua conta retornará ao plano Free.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-white/10 bg-white/5 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-left py-6">Vocês oferecem planos para empresas?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                Estamos desenvolvendo o Obsidian Business para times. Se tiver interesse em uma solução corporativa, entre em contato conosco através do e-mail suporte@obsidian.ia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      {/* Footer (Reused) */}
      <footer className="border-t border-white/10 py-12 bg-black/50">
        <div className="container mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">O</span>
              </div>
              <span className="text-lg font-bold">Obsidian</span>
           </div>
           <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
             A plataforma definitiva para descoberta e organização de prompts de elite.
           </p>
           <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
             &copy; 2024 Obsidian Prompt Platform. Todos os direitos reservados.
           </div>
        </div>
      </footer>
    </div>
  );
}
