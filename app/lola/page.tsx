
'use client'

import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import LolaEngine from '../components/lola/LolaEngine'

export default function LolaPage() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Lola: Reseñas y Acción</h1>
            <p className="text-muted-foreground">Chatea con Lola, tu asistente de IA, para analizar reseñas y obtener recomendaciones.</p>
          </div>
          <div className="bg-card border rounded-2xl h-[calc(100vh-200px)] shadow-soft">
            <LolaEngine />
          </div>
        </main>
      </div>
    </div>
  )
}
