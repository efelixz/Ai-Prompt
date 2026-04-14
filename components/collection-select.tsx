'use client';

import { useState } from 'react';
import { FolderPlus, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCollection } from '@/app/actions';

export function CollectionSelect({
  promptId,
  collections
}: {
  promptId: string,
  collections: any[]
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const [addedTo, setAddedTo] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  async function handleAdd(collectionId: string) {
    setLoading(collectionId);
    const result = await addToCollection(collectionId, promptId);
    if (result.success) {
      setAddedTo([...addedTo, collectionId]);
    } else {
      alert(result.error);
    }
    setLoading(null);
  }

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <FolderPlus className="w-4 h-4" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#0A0A0A] border border-white/10 p-2 shadow-2xl rounded-lg z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="p-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Salvar na Coleção</h4>
              <div className="space-y-1">
                  {collections.length > 0 ? (
                    collections.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAdd(col.id);
                        }}
                        disabled={loading === col.id || addedTo.includes(col.id)}
                        className="w-full flex items-center justify-between p-2 rounded-md hover:bg-white/5 transition-colors text-sm group disabled:opacity-50 text-left"
                      >
                        <span className="truncate">{col.name}</span>
                        {addedTo.includes(col.id) ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : loading === col.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                        ) : null}
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Nenhuma coleção encontrada.</p>
                      <a
                        href="/colecoes"
                        className="text-primary text-xs hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Criar Coleção
                      </a>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
