'use client'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import MetricsWidget from '../components/dashboard/widgets/MetricsWidget'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { BarChart, Users, Calendar, Euro, TrendingUp, TrendingDown, Gem, ArrowRight, ShieldCheck, DollarSign, AlertCircle, Star, Utensils, Lightbulb, Bot } from 'lucide-react'
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

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
];

const salesData = [
  { name: 'Con Reserva', value: 75, color: '#14b8a6' }, // Teal-500
  { name: 'Sin Reserva', value: 25, color: '#ec4899' }, // Pink-500
];

const reservationSourceData = [
    { name: 'CoverManager', value: 40, color: '#14b8a6' }, // Teal-500
    { name: 'Google', value: 30, color: '#ec4899' }, // Pink-500
    { name: 'Teléfono', value: 20, color: '#f97316' }, // Orange-500
    { name: 'Web', value: 10, color: '#84cc16' }, // Lime-500
];

const alerts = [
  { icon: <AlertCircle className="h-5 w-5 text-red-500" />, title: "Cliente con reseña negativa vuelve al local", description: "Juan Pérez (reseña de 1 estrella el 15/07) tiene una reserva para hoy. Es una segunda oportunidad para ofrecerle una experiencia excelente.", action: "Ver Cliente" },
  { icon: <Star className="h-5 w-5 text-yellow-500" />, title: "5 reseñas llevan más de 48h sin respuesta", description: "Responder rápidamente a las reseñas, especialmente a las negativas, puede mitigar su impacto y mejorar la percepción del cliente.", action: "Ir a Reseñas" },
  { icon: <Utensils className="h-5 w-5 text-orange-500" />, title: 'La "Sopa de pescado" tiene una baja rotación', description: "Este plato solo representa el 3% de las ventas en su categoría. Considera renovarlo o crear una promoción para aumentar su visibilidad.", action: "Revisar Menú" },
  { icon: <TrendingDown className="h-5 w-5 text-blue-500" />, title: "Caída del 18% en las reservas esta semana", description: "La semana pasada tuviste un 18% más de reservas. Lanza una campaña en redes sociales para atraer más clientes.", action: "Lanzar Campaña" },
];

const tips = [
  { title: "Mejora Operativa", description: "La inconsistencia en la calidad de los platos es un problema significativo. Res...", tags: ["Prioridad Alta", "Carta"], tagColors: ["bg-red-100 text-red-800", "bg-purple-100 text-purple-800"] },
  { title: "Mejora del Servicio", description: "La lentitud en el servicio y la falta de atención por parte del personal son pro...", tags: ["Prioridad Alta", "Servicio"], tagColors: ["bg-red-100 text-red-800", "bg-indigo-100 text-indigo-800"] },
];

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
                        <Bar dataKey="income" fill="hsl(var(--primary))" name="Ingresos" radius={[4, 4, 0, 0]} />
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
            <div className="col-span-12 lg:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Ventas: Con vs Sin Reserva</CardTitle>
                  <CardContent className="text-xs text-muted-foreground">Ingresos de clientes con y sin reserva</CardContent>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-40 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={salesData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2}>
                                {salesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">Las ventas de clientes con reserva representaron un <span className="font-bold text-foreground">75%</span> del total.</p>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Origen de las Reservas</CardTitle>
                  <CardContent className="text-xs text-muted-foreground">Distribución por canal en el periodo</CardContent>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-40 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={reservationSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2}>
                                    {reservationSourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold">2362</span>
                            <span className="text-sm text-muted-foreground">Reservas</span>
                        </div>
                    </div>
                    <div className="flex justify-around text-xs mt-4">
                        {reservationSourceData.map(item => (
                            <div key={item.name} className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="flex flex-row items-start justify-between">
                  <CardTitle>Tasa de Respuesta</CardTitle>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <ShieldCheck className="h-4 w-4 text-blue-600"/>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-foreground">91% <span className="text-base font-semibold text-green-600 align-text-bottom">+5%</span></p>
                  <p className="text-xs text-muted-foreground">Respecto al periodo anterior</p>
                  <div className="border-t my-4"></div>
                  <h4 className="font-semibold text-sm mb-2">Comunicaciones</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500 mt-2"></span>
                        <span>Respondiendo mejoras tu SEO local</span>
                    </li>
                    <li className="flex items-start gap-2">
                         <span className="w-1 h-1 rounded-full bg-green-500 mt-2"></span>
                        <span>Aumenta la confianza del cliente</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="flex flex-row items-start justify-between">
                  <CardTitle>Beneficio Recuperable</CardTitle>
                   <div className="p-2 rounded-lg bg-green-100">
                    <DollarSign className="h-4 w-4 text-green-600"/>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-green-600">280€ <span className="text-base font-semibold text-muted-foreground align-text-bottom">+2 acciones</span></p>
                  <p className="text-xs text-muted-foreground">Aplicando mejoras de Lola</p>
                  <div className="border-t my-4"></div>
                  <h4 className="font-semibold text-sm mb-2">Acciones de Mayor Impacto</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                     <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500 mt-2"></span>
                        <span>Implementar una lista de verificación diaria para la recepción y control de calidad de los ingredientes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                         <span className="w-1 h-1 rounded-full bg-green-500 mt-2"></span>
                        <span>Establecer un sistema de retroalimentación para los cocineros.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Lola's Suggestions and Alerts */}
            <div className="col-span-12">
              <Card>
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Sugerencia Proactiva de Lola</h4>
                      <p className="text-sm text-muted-foreground mt-1">Si reorganizas tu menú para destacar platos con mayor margen y renombras algunos para hacerlos más atractivos, puedes reducir costes en un 5% y aumentar el beneficio un 8%, lo que supone unos +1.200€/mes.</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                     <Button>Analizar en profundidad</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/> Alertas de Lola</CardTitle>
                  <p className="text-sm text-muted-foreground pt-1">Lola ha detectado estas situaciones. ¡Revísalas para no perder ninguna oportunidad!</p>
                </CardHeader>
                <CardContent className="space-y-2">
                    {alerts.map((alert, index) => (
                        <div key={index} className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    {alert.icon}
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">{alert.title}</p>
                                        <p className="text-xs text-muted-foreground">{alert.description}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" className="text-primary text-sm whitespace-nowrap">{alert.action} <ArrowRight className="h-4 w-4 ml-1"/></Button>
                            </div>
                        </div>
                    ))}
                    <div className="pt-2">
                      <Button variant="secondary" className="w-full">Ver todas las alertas</Button>
                    </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary"/> Consejos de Lola</CardTitle>
                  <p className="text-sm text-muted-foreground pt-1">Recomendaciones para ti.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tips.map((tip, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-foreground">{tip.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {tip.tags.map((tag, i) => (
                              <span key={i} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tip.tagColors[i]}`}>{tag}</span>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{tip.description}</p>
                        </div>
                        <Button variant="ghost" className="text-primary text-sm whitespace-nowrap">Ver detalles <ArrowRight className="h-4 w-4 ml-1"/></Button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                     <Button variant="secondary" className="w-full">Ver todos los consejos</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
