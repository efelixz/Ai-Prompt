'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logPromptCopy } from '@/app/actions';
import { useState } from 'react';

export function CopyButton({
  promptId,
  textToCopy,
  variant = "secondary",
  className = ""
}: {
  promptId: string;
  textToCopy: string;
  variant?: any;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      await logPromptCopy(promptId);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return (
    <Button
      size="sm"
      variant={variant}
      className={`gap-2 h-8 text-xs font-bold transition-all ${copied ? 'bg-green-600 hover:bg-green-700 text-white' : ''} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCopy();
      }}
    >
      <Copy className="w-3.5 h-3.5" />
      {copied ? 'Copiado!' : 'Copiar'}
    </Button>
  );
}
