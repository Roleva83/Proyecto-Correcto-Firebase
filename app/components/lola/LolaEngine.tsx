'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { lolaChat } from '@/ai/flows/lola-chat-flow';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  role: 'user' | 'lola';
  content: string;
}

export default function LolaEngine() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user?.restaurante_id) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await lolaChat({
        question: input,
        restauranteId: user.restaurante_id,
      });
      const lolaMessage: Message = { role: 'lola', content: response };
      setMessages(prev => [...prev, lolaMessage]);
    } catch (error) {
      console.error('Error al contactar a Lola:', error);
      toast.error('Hubo un error al procesar tu pregunta. Inténtalo de nuevo.');
      // Revertir el mensaje del usuario si hay un error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : ''
            }`}
          >
            {msg.role === 'lola' && (
              <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-md rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'rounded-br-none bg-primary text-primary-foreground'
                  : 'rounded-bl-none bg-accent'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
             {msg.role === 'user' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
             <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
            <div className="max-w-md rounded-2xl rounded-bl-none bg-accent px-4 py-3">
               <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1"
            placeholder="Ej: ¿Cuál fue el plato más vendido la semana pasada?"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
