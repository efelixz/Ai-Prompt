'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronRight } from 'lucide-react';
import { purchasePack } from '@/app/actions';

export function CheckoutButton({ packId }: { packId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlePurchase() {
    setLoading(true);
    const result = await purchasePack(packId);
    if (result.success) {
       router.push(`/colecoes/${result.collectionId}`);
    } else {
       alert('Ocorreu um erro no processamento do pagamento.');
    }
    setLoading(false);
  }

  return (
    <Button
       onClick={handlePurchase}
       disabled={loading}
       className="w-full bg-primary text-white font-black h-12 gap-2 shadow-lg shadow-primary/20"
    >
       {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
       ) : (
          <>Confirmar Pagamento <ChevronRight className="w-4 h-4" /></>
       )}
    </Button>
  );
}
