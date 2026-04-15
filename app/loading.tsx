import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Carregando inteligência...</p>
       </div>
    </div>
  );
}
