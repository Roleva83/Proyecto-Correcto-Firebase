'use client'
import React, { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import MetricsWidget from '../components/dashboard/widgets/MetricsWidget'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Users, Calendar, Euro, TrendingUp, TrendingDown, Gem, ArrowRight, ShieldCheck, DollarSign, AlertCircle, Star, Utensils, Lightbulb, Bot, Loader2 } from 'lucide-react'
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/AuthContext'

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Estados para los datos de Firestore
  const [avgReview, setAvgReview] = useState('0.0 ★');
  const [reservationsToday, setReservationsToday] = useState('0');
  const [dailySales, setDailySales] = useState('0€');
  const [loyalCustomers, setLoyalCustomers] = useState('0');
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [popularItems, setPopularItems] = useState<any[]>([]);
  const [hiddenGems, setHiddenGems] = useState<any[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [reservationSourceData, setReservationSourceData] = useState<any[]>([]);
  const [responseRate, setResponseRate] = useState('0%');
  const [recoverableBenefit, setRecoverableBenefit] = useState('0€');
  const [alerts, setAlerts] = useState<any[]>([]);
  const [tips, setTips] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !user.restaurante_id) {
        if(!user) setLoading(true);
        return;
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const businessId = user.restaurante_id;

        // 1. KPI Cards
        // Reseñas promedio últimos 7 días
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const reviewsQuery = query(
          collection(db, 'reviews'), 
          where('businessId', '==', businessId),
          where('date', '>=', Timestamp.fromDate(sevenDaysAgo))
        );
        const reviewsSnapshot = await getDocs(reviewsQuery);
        let totalRating = 0;
        if (!reviewsSnapshot.empty) {
          reviewsSnapshot.forEach(doc => {
            totalRating += doc.data().rating;
          });
          setAvgReview(`${(totalRating / reviewsSnapshot.size).toFixed(1)} ★`);
        } else {
          setAvgReview('N/A');
        }

        // Simulación de otros datos por ahora
        setReservationsToday('72');
        setDailySales('75€');
        setLoyalCustomers('2');

        // 2. Gráfico "Ingresos Totales"
        // Simulado por ahora, requiere agregación compleja
        setIncomeData([
          { date: '27 ago', income: 3200, cost: 2200 },
          { date: '28 ago', income: 2900, cost: 1900 },
          { date: '29 ago', income: 2700, cost: 1600 },
        ]);

        // 9. Los Más Populares y 10. Joyas Ocultas
        const menuQuery = query(collection(db, 'menus'), where('businessId', '==', businessId), limit(1));
        const menuSnapshot = await getDocs(menuQuery);
        if (!menuSnapshot.empty) {
            const menuDoc = menuSnapshot.docs[0].data();
            const allItems = menuDoc.items || [];
            
            // Populares
            const sortedBySales = [...allItems].sort((a:any, b:any) => b.sales - a.sales);
            setPopularItems(sortedBySales.slice(0, 3).map((item:any) => ({...item, trend: Math.random() > 0.5 ? 'up' : 'down'})));

            // Joyas Ocultas
            const avgSales = allItems.reduce((acc: number, item: any) => acc + item.sales, 0) / allItems.length;
            const hidden = allItems.filter((item: any) => item.margin > 70 && item.sales < avgSales);
            setHiddenGems(hidden.slice(0, 3));
        }

        // Simulación del resto de datos
        setSalesData([
          { name: 'Con Reserva', value: 75, color: '#14b8a6' },
          { name: 'Sin Reserva', value: 25, color: '#ec4899' },
        ]);
        setReservationSourceData([
            { name: 'CoverManager', value: 40, color: '#14b8a6' },
            { name: 'Google', value: 30, color: '#ec4899' },
            { name: 'Teléfono', value: 20, color: '#f97316' },
            { name: 'Web', value: 10, color: '#84cc16' },
        ]);
        setResponseRate('91%');
        setRecoverableBenefit('280€');
        
        // 7. Alertas de Lola
        const alertsQuery = query(collection(db, 'alerts'), where('businessId', '==', businessId), orderBy('priority', 'desc'), limit(4));
        const alertsSnapshot = await getDocs(alertsQuery);
        setAlerts(alertsSnapshot.docs.map(doc => ({
            ...doc.data(),
            icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        })));
        
        // 8. Consejos de Lola
        const tipsQuery = query(collection(db, 'recommendations'), where('businessId', '==', businessId), limit(2));
        const tipsSnapshot = await getDocs(tipsQuery);
        setTips(tipsSnapshot.docs.map(doc => doc.data()));

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const appUser = { name: 'Restaurante Ejemplo' };

  if (loading || !user) {
    return (
       <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header user={appUser} />
          <main className="flex-1 p-8 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={appUser} />
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
                value={avgReview} 
                />
            </div>
            <div className="col-span-3">
                <MetricsWidget 
                title="Reservas hoy" 
                value={reservationsToday}
                />
            </div>
            <div className="col-span-3">
                <MetricsWidget 
                title="Ventas de día" 
                value={dailySales}
                />
            </div>
            <div className="col-span-3">
                <MetricsWidget 
                title="Clientes fidelizados" 
                value={loyalCustomers}
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
                      {popularItems.map((item:any) => (
                        <div key={item.name} className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            {item.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-2 text-green-500" /> : <TrendingDown className="h-4 w-4 mr-2 text-red-500" />}
                            {item.name}
                          </span>
                          <span className="font-bold">{item.sales}</span>
                        </div>
                      ))}
                    </div>
                    <h4 className="font-semibold mb-2 mt-6 text-foreground">Joyas Ocultas a Potenciar</h4>
                    <div className="space-y-3">
                      {hiddenGems.map((item:any) => (
                        <div key={item.name} className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            <Gem className="h-4 w-4 mr-2 text-purple-500" />
                            {item.name}
                          </span>
                          <span className="font-bold text-green-600">+ {item.price - item.cost} €</span>
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
                  <p className="text-4xl font-bold text-foreground">{responseRate} <span className="text-base font-semibold text-green-600 align-text-bottom">+5%</span></p>
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
                  <p className="text-4xl font-bold text-green-600">{recoverableBenefit} <span className="text-base font-semibold text-muted-foreground align-text-bottom">+2 acciones</span></p>
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
                    {alerts.map((alert:any, index) => (
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
                  {tips.map((tip:any, index:number) => (
                    <div key={index} className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-foreground">{tip.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {tip.tags.map((tag: string, i: number) => (
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
