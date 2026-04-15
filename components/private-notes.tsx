'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StickyNote, Save, Loader2 } from "lucide-react";
import { saveUserNote } from "@/app/actions";

export function PrivateNotes({ promptId, initialContent }: { promptId: string, initialContent: string }) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await saveUserNote(promptId, content);
    if (res.success) {
      setLastSaved(new Date());
    }
    setIsSaving(false);
  };

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <CardHeader className="p-6 border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-bold">Notas Privadas</CardTitle>
        </div>
        {lastSaved && (
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Salvo às {lastSaved.toLocaleTimeString()}</span>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-xs text-muted-foreground">Suas anotações pessoais sobre este prompt. Somente você pode ver este conteúdo.</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Dicas, variações que funcionaram, observações..."
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-sans focus:outline-none focus:border-primary/50 min-h-[150px] resize-none"
        />
        <Button
          onClick={handleSave}
          disabled={isSaving || content === initialContent}
          className="w-full bg-primary text-white font-bold gap-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Salvar Notas
        </Button>
      </CardContent>
    </Card>
  );
}
