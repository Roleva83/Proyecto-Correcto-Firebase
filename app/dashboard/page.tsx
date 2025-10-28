'use client'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import MetricsWidget from '../components/dashboard/widgets/MetricsWidget'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { BarChart, Users, Calendar, Euro, TrendingUp, TrendingDown, Gem, ArrowRight } from 'lucide-react'
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const incomeData = [
  { date: '27 ago', income: 3200, cost: 2200 },
  { date: '28 ago', income: 2900, cost: 1900 },
  { date: '29 ago', income: 2700, cost: 1600 },
  { date: '30 ago', income: 4200, cost: 2600 },
  { date: '31 ago', income: 3800, cost: 2400 },
  { date: '1 sep', income: 3300, cost: 2200 },
  { date: '2 sep', income: 3500, cost: 2300 },
  { date: '3 sep', income: 2900, cost: 1700 },
  { date: '4 sep', income: 2600, cost: 1600 },
  { date: '5 sep', income: 3400, cost: 2200 },
  { date: '6 sep', income: 3800, cost: 2500 },
  { date: '7 sep', income: 4500, cost: 2800 },
  { date: '8 sep', income: 3200, cost: 2100 },
  { date: '9 sep', income: 2800, cost: 1800 },
  { date: '10 sep', income: 3100, cost: 2000 },
  { date: '11 sep', income: 2900, cost: 1900 },
  { date: '12 sep', income: 3400, cost: 2200 },
  { date: '13 sep', income: 4100, cost: 2800 },
  { date: '14 sep', income: 3900, cost: 2500 },
  { date: '15 sep', income: 2800, cost: 1800 },
  { date: '16 sep', income: 2200, cost: 1500 },
  { date: '17 sep', income: 3200, cost: 2100 },
  { date: '18 sep', income: 3100, cost: 2000 },
  { date: '19 sep', income: 3200, cost: 2100 },
  { date: '20 sep', income: 3800, cost: 2400 },
  { date: '21 sep', income: 4500, cost: 3000 },
  { date: '22 sep', income: 3200, cost: 2200 },
  { date: '23 sep', income: 2800, cost: 1800 },
  { date: '24 sep', income: 2200, cost: 1500 },
  { date: '25 sep', income: 2700, cost: 1800 },
];

const popularItems = [
    { name: 'Tarta de Queso Cremosa', units: 180, trend: 'down' },
    { name: 'Pasta Carbonara Original', units: 150, trend: 'up' },
    { name: 'Coulant de Chocolate', units: 130, trend: 'down' },
];

const hiddenGems = [
    { name: 'Entrecot de Vaca Madurada', benefit: 15.00 },
    { name: 'Lubina a la Sal', benefit: 14.00 },
    { name: 'Carrilleras al Vino Tinto', benefit: 13.00 },
]

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
            <div className="col-span-12 lg:col-span-8 row-span-2">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>% Ingresos Totales</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p>Aquí irá el gráfico de barras de ingresos.</p>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-12 lg:col-span-4 row-span-2">
                <Card className="h-full flex flex-col">
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
