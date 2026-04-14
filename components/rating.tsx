'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { ratePrompt } from '@/app/actions';

export function Rating({
  promptId,
  initialValue = 0
}: {
  promptId: string;
  initialValue?: number;
}) {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRate(value: number) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setRating(value);
    const result = await ratePrompt(promptId, value);
    if (!result.success) {
      setRating(initialValue);
      alert('Erro ao salvar avaliação.');
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={isSubmitting}
          className={`transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRate(star)}
        >
          <Star
            className={`w-5 h-5 ${
              star <= (hover || rating)
                ? 'fill-amber-400 text-amber-400 scale-110'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm font-medium text-muted-foreground">
        {rating > 0 ? rating.toFixed(1) : 'Avaliar'}
      </span>
    </div>
  );
}
