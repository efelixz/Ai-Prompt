'use client';

import { Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { publishPrompt } from '@/app/actions';
import { useState } from 'react';

export function PublishButton({ promptId, currentStatus }: { promptId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  if (currentStatus === 'published') return null;

  async function handlePublish() {
    setLoading(true);
    const result = await publishPrompt(promptId);
    if (!result.success) {
      alert('Erro ao publicar prompt.');
    }
    setLoading(false);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePublish}
      disabled={loading}
      className="h-8 w-8 text-muted-foreground hover:text-green-500"
      title="Publicar agora"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
    </Button>
  );
}
