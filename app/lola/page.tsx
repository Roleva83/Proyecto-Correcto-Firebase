'use client'

import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import LolaEngine from '../components/lola/LolaEngine'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Bot } from 'lucide-react'

export default function LolaPage() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna de Chat con Lola */}
          <div className="lg:col-span-2 h-[calc(100vh-150px)]">
            <Card className="h-full flex flex-col shadow-soft">
               <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  Habla con Lola
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Hazle preguntas sobre tus datos. Lola tiene acceso a tus ventas, reseñas y más.
                </p>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                  <LolaEngine />
              </CardContent>
            </Card>
          </div>

          {/* Columna de Sugerencias */}
          <div className="h-[calc(100vh-150px)] overflow-y-auto">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Sugerencias de Lola</CardTitle>
                <p className="text-sm text-muted-foreground">Aquí tienes algunas ideas para empezar:</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "¿Cuál fue mi plato más rentable del último mes?",
                  "Genera un resumen de las reseñas negativas sobre el servicio.",
                  "¿Qué día de la semana tuve más ventas?",
                  "Dame 3 ideas para una campaña de marketing para el fin de semana.",
                  "Compara las ventas de 'Pasta Carbonara' vs 'Entrecot'.",
                  "¿Hay alguna tendencia en las reseñas de TripAdvisor de esta semana?"
                ].map((suggestion, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-accent/50 text-sm hover:bg-accent cursor-pointer">
                    {suggestion}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
