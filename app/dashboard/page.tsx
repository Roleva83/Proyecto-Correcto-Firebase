
'use client'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import MetricsWidget from '../components/dashboard/widgets/MetricsWidget'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart, Users, Calendar, Euro } from 'lucide-react'

export default function Dashboard() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Inicio</h1>
            <p className="text-muted-foreground">Visión general de tus métricas clave, alertas y rendimiento del negocio.</p>
          </div>

          <div className="grid grid-cols-12 grid-rows-auto gap-6">
            {/* Top Metrics */}
            <div className="col-span-3">
                <MetricsWidget 
                title="Reseñas (últimos 7 días)" 
                value="3.4 ★" 
                />
            </div>
            <div className="col-span-3">
                <MetricsWidget 
                title="Reservas hoy" 
                value="72"
                />
            </div>
            <div className="col-span-3">
                <MetricsWidget 
                title="Ventas de día" 
                value="75€"
                />
            </div>
            <div className="col-span-3">
                <MetricsWidget 
                title="Clientes fidelizados" 
                value="2"
                />
            </div>

            {/* Main Chart and Menu Opportunities */}
            <div className="col-span-8 row-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>% Ingresos Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aquí irá el gráfico de barras de ingresos.</p>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-4 row-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Oportunidades de Menú</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aquí irán las oportunidades de menú.</p>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Widgets */}
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas: Con vs Sin Reserva</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Gráfico circular aquí.</p>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Origen de las Reservas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Gráfico circular aquí.</p>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Tasa de Respuesta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Datos de respuesta aquí.</p>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Beneficio Recuperable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Datos de beneficio aquí.</p>
                </CardContent>
              </Card>
            </div>

            {/* Lola's Suggestions and Alerts */}
            <div className="col-span-12">
              <Card>
                <CardHeader>
                  <CardTitle>Sugerencia Proactiva de Lola</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Sugerencia de Lola aquí.</p>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alertas de Lola</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Listado de alertas de Lola.</p>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consejos de Lola</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Listado de consejos de Lola.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
