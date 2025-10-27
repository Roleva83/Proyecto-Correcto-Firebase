
'use client'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import MetricsWidget from '../components/dashboard/widgets/MetricsWidget'

export default function Dashboard() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricsWidget 
              title="Valoración Media" 
              value="4.7 ★" 
              color="yellow" 
            />
            <MetricsWidget 
              title="Reseñas Totales" 
              value="1,254" 
              color="blue"
            />
            <MetricsWidget 
              title="Nuevos Clientes (Mes)" 
              value="89" 
              color="green"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
