'use client'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import MetricsWidget from '../components/dashboard/widgets/MetricsWidget'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
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
                <CardContent className="flex-grow flex flex-col">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={incomeData}>
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="income" fill="#8884d8" name="Ingresos" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="cost" fill="#82ca9d" name="Costes" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="border-t mt-4 pt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                      <p className="text-xl font-bold text-foreground">98.660 €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Coste operativo</p>
                      <p className="text-xl font-bold text-foreground">63.091 €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Beneficio</p>
                      <p className="text-xl font-bold text-green-600">35.569 €</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4 row-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Oportunidades de Menú</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Los Más Populares (por Unidades)</h4>
                    <div className="space-y-3">
                      {popularItems.map(item => (
                        <div key={item.name} className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            {item.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-2 text-green-500" /> : <TrendingDown className="h-4 w-4 mr-2 text-red-500" />}
                            {item.name}
                          </span>
                          <span className="font-bold">{item.units}</span>
                        </div>
                      ))}
                    </div>
                    <h4 className="font-semibold mb-2 mt-6 text-foreground">Joyas Ocultas a Potenciar</h4>
                    <div className="space-y-3">
                      {hiddenGems.map(item => (
                        <div key={item.name} className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            <Gem className="h-4 w-4 mr-2 text-purple-500" />
                            {item.name}
                          </span>
                          <span className="font-bold text-green-600">+ {item.benefit.toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full mt-6">
                    Analizar Menú Completo con Lola IA <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
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
