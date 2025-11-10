'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { drawThreeCards, type TarotCard } from '@/lib/tarot-data';

interface DrawnCard extends TarotCard {
  reading: 'Pasado' | 'Presente' | 'Futuro';
}

export default function TarotPage() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);

  const handleDrawCards = () => {
    const cards = drawThreeCards();
    setDrawnCards([
      { ...cards[0], reading: 'Pasado' },
      { ...cards[1], reading: 'Presente' },
      { ...cards[2], reading: 'Futuro' },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={{ name: 'Explorador' }} />
        <main className="flex-1 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Lectura de Tarot de Tres Cartas</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Esta lectura clásica te ofrece una visión sobre tu pasado, una instantánea de tu presente y una guía para tu futuro. Concéntrate en tu pregunta y roba las cartas.
            </p>
          </div>

          <div className="text-center mb-12">
            <Button size="lg" onClick={handleDrawCards}>
              <Sparkles className="mr-2 h-5 w-5" />
              Leer las cartas
            </Button>
          </div>

          {drawnCards.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-8">Tu Lectura</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {drawnCards.map((card) => (
                  <Card key={card.name} className="flex flex-col items-center text-center shadow-lg">
                    <CardHeader>
                      <p className="font-semibold text-primary">{card.reading}</p>
                      <CardTitle className="text-2xl">{card.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative w-full aspect-[2/3] mb-4">
                        <Image
                          src={card.image}
                          alt={`Carta del tarot: ${card.name}`}
                          layout="fill"
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <CardDescription>{card.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
