'use client';

import { useState } from 'react';
import { MessageSquare, Send, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addComment, deleteComment } from '@/app/actions';

export function CommentSection({
  promptId,
  comments,
  currentUserId
}: {
  promptId: string;
  comments: any[];
  currentUserId: string;
}) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const result = await addComment(promptId, content);
    if (result.success) {
      setContent('');
    } else {
      alert(result.error);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Comentários ({comments.length})</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 border border-white/5 p-6 rounded-2xl">
         <textarea
           value={content}
           onChange={(e) => setContent(e.target.value)}
           placeholder="O que você achou deste prompt?"
           className="w-full min-h-[100px] bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
         />
         <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="bg-primary text-white font-bold px-8 gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Enviar Comentário
            </Button>
         </div>
      </form>

      <div className="space-y-4">
         {comments.map((comment) => (
            <div key={comment.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl group relative">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                        {comment.user[0]}
                     </div>
                     <div>
                        <p className="text-sm font-bold">{comment.user}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                           {new Date(comment.createdAt).toLocaleString('pt-BR')}
                        </p>
                     </div>
                  </div>
               </div>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  {comment.content}
               </p>
            </div>
         ))}
         {comments.length === 0 && (
            <p className="text-center py-12 text-muted-foreground text-sm italic">Nenhum comentário ainda. Seja o primeiro a opinar!</p>
         )}
      </div>
    </div>
  );
}
