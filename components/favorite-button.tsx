'use client';

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleFavorite } from "@/app/actions";
import { useState } from "react";

export function FavoriteButton({ promptId, initialIsFavorite = false }: { promptId: string, initialIsFavorite?: boolean }) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    setIsLoading(true);
    const result = await toggleFavorite(promptId);
    if (result.success) {
      setIsFavorite(!isFavorite);
    }
    setIsLoading(false);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 transition-colors ${isFavorite ? 'text-primary fill-primary' : 'text-muted-foreground hover:text-primary'}`}
      onClick={(e) => {
        e.preventDefault();
        handleToggle();
      }}
      disabled={isLoading}
    >
      <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
    </Button>
  );
}
