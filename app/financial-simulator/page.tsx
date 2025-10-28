
'use client'
import React, { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Slider } from '@/app/components/ui/slider'
import { Input } from '@/app/components/ui/input'
import { Calculator, Utensils, Zap, Bot, Users, TrendingUp } from 'lucide-react'

const strategicScenarios = [
  {
    scenario: 'Subir precios un 5%',
    impact: 'Ingresos: +1.750€/mes, Ocupación: -3%',
    benefit: '+1200€',
    benefitColor: 'text-green-600',
  },
  {
    scenario: 'Menú mediodía (-15%)',
    impact: 'Ocupación: +15%, Ticket medio: -8%',
    benefit: '+850€',
    benefitColor: 'text-green-600',
  },
  {
    scenario: 'Campaña 2x1 en cócteles',
    impact: 'Ingresos extras: +500€/mes, Coste: -200€',
    benefit: '+300€',
    benefitColor: 'text-green-600',
  },
]

export default function FinancialSimulator() {
  const user = { name: 'Restaurante Ejemplo' };

  // --- Datos de la Situación Actual (base para los cálculos) ---
  const comensalesActuales = 2288;
  const facturacionActual = 98660;
  const ticketMedioActual = 43;
  const costesTotalesActuales = 63091;
  const beneficioActual = 35569;

  // --- Estados para las variables del simulador ---
  const [facturacionProyectada, setFacturacionProyectada] = useState(facturacionActual);
  const [costesFijos, setCostesFijos] = useState(44164);
  const [diasApertura, setDiasApertura] = useState(26);
  const [ticketMedioGastrobar, setTicketMedioGastrobar] = useState(34);
  const [costeVariableGastrobar, setCosteVariableGastrobar] = useState(6);
  const [ticketMedioRestaurante, setTicketMedioRestaurante] = useState(56);
  const [costeVariableRestaurante, setCosteVariableRestaurante] = useState(12);
  const [mixClientes, setMixClientes] = useState(70); // Porcentaje de clientes de Gastrobar

  // --- Estados para los resultados calculados ---
  const [proyeccion, setProyeccion] = useState({
    comensalesProyectados: 0,
    comensalesGastrobar: 0,
    facturacionGastrobar: 0,
    comensalesRestaurante: 0,
    facturacionRestaurante: 0,
    beneficio: 0,
    puntoEquilibrio: 0,
  });

  // --- Lógica de cálculo ---
  useEffect(() => {
    // 1. Calcular el ticket medio y coste variable ponderado según el mix de clientes
    const mixGastrobar = mixClientes / 100;
    const mixRestaurante = (100 - mixClientes) / 100;

    const ticketMedioPonderado = (ticketMedioGastrobar * mixGastrobar) + (ticketMedioRestaurante * mixRestaurante);
    const costeVariablePonderado = (costeVariableGastrobar * mixGastrobar) + (costeVariableRestaurante * mixRestaurante);
    
    // 2. Calcular el número total de comensales proyectados a partir de la facturación
    const comensalesTotalesProyectados = ticketMedioPonderado > 0 ? Math.round(facturacionProyectada / ticketMedioPonderado) : 0;

    // 3. Distribuir comensales y facturación por área
    const comensalesGastrobar = Math.round(comensalesTotalesProyectados * mixGastrobar);
    const comensalesRestaurante = comensalesTotalesProyectados - comensalesGastrobar;
    const facturacionGastrobar = comensalesGastrobar * ticketMedioGastrobar;
    const facturacionRestaurante = comensalesRestaurante * ticketMedioRestaurante;

    // 4. Calcular costes y beneficio
    const costesVariablesTotales = comensalesTotalesProyectados * costeVariablePonderado;
    const costesTotalesProyectados = costesFijos + costesVariablesTotales;
    const beneficioProyectado = facturacionProyectada - costesTotalesProyectados;

    // 5. Calcular el punto de equilibrio
    const margenContribucionPonderado = ticketMedioPonderado - costeVariablePonderado;
    const ratioMargenContribucion = ticketMedioPonderado > 0 ? margenContribucionPonderado / ticketMedioPonderado : 0;
    const puntoEquilibrio = ratioMargenContribucion > 0 ? costesFijos / ratioMargenContribucion : 0;

    setProyeccion({
      comensalesProyectados: comensalesTotalesProyectados,
      comensalesGastrobar,
      facturacionGastrobar,
      comensalesRestaurante,
      facturacionRestaurante,
      beneficio: beneficioProyectado,
      puntoEquilibrio,
    });
  }, [
    facturacionProyectada,
    costesFijos, 
    ticketMedioGastrobar, 
    costeVariableGastrobar, 
    ticketMedioRestaurante, 
    costeVariableRestaurante, 
    mixClientes,
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-ES').format(value);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Simulador Financiero</h1>
            <p className="text-muted-foreground">Compara tu situación actual con escenarios proyectados para optimizar la rentabilidad.</p>
          </div>

          {/* Interactive Simulator */}
          <Card className="shadow-soft mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                Simulador Interactivo de Rentabilidad
              </CardTitle>
              <p className="text-sm text-muted-foreground">Ajusta las variables para ver su impacto en tiempo real.</p>
            </CardHeader>
            <CardContent>
              {/* Current Situation */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-center mb-4 text-foreground">Situación Actual</h3>
                <div className="grid grid-cols-5 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Facturación Actual</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(facturacionActual)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Medio Actual</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(ticketMedioActual)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Costes Totales Actuales</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(costesTotalesActuales)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Comensales</p>
                    <p className="text-2xl font-bold text-foreground">{formatNumber(comensalesActuales)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Beneficio</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(beneficioActual)}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-center mb-6 text-foreground">Escenario Proyectado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="grid grid-cols-2 gap-x-8">
                     <div>
                        <label className="text-sm font-medium text-foreground">Facturación Proyectada (€)</label>
                         <Input type="number" value={facturacionProyectada} onChange={(e) => setFacturacionProyectada(Number(e.target.value))} className="mt-1 font-bold text-green-600 text-lg" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Beneficio Proyectado</label>
                        <p className={`text-2xl font-bold mt-1 ${proyeccion.beneficio >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(proyeccion.beneficio)}</p>
                      </div>
                  </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     <div>
                        <label className="text-sm font-medium text-foreground">Costes Fijos Mensuales (€)</label>
                        <Input type="number" value={costesFijos} onChange={(e) => setCostesFijos(Number(e.target.value))} className="mt-1" />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground">Días de Apertura / Mes</label>
                        <div className="flex gap-2 mt-2">
                            <Button variant={diasApertura === 22 ? 'secondary' : 'ghost'} onClick={() => setDiasApertura(22)}>22</Button>
                            <Button variant={diasApertura === 26 ? 'secondary' : 'ghost'} onClick={() => setDiasApertura(26)}>26</Button>
                            <Button variant={diasApertura === 30 ? 'secondary' : 'ghost'} onClick={() => setDiasApertura(30)}>30</Button>
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                     <div>
                        <label className="text-sm font-medium text-foreground">Ticket Medio Gastrobar (€)</label>
                        <Input type="number" value={ticketMedioGastrobar} onChange={(e) => setTicketMedioGastrobar(Number(e.target.value))} className="mt-1" />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground">Coste Variable Gastrobar (€)</label>
                        <Input type="number" value={costeVariableGastrobar} onChange={(e) => setCosteVariableGastrobar(Number(e.target.value))} className="mt-1" />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                     <div>
                        <label className="text-sm font-medium text-foreground">Ticket Medio Restaurante (€)</label>
                        <Input type="number" value={ticketMedioRestaurante} onChange={(e) => setTicketMedioRestaurante(Number(e.target.value))} className="mt-1" />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground">Coste Variable Restaurante (€)</label>
                        <Input type="number" value={costeVariableRestaurante} onChange={(e) => setCosteVariableRestaurante(Number(e.target.value))} className="mt-1" />
                     </div>
                  </div>
                </div>
                <div className="mt-6">
                    <label className="text-sm font-medium text-foreground">Mix de Clientes: {mixClientes}% Gastrobar / {100 - mixClientes}% Restaurante</label>
                    <Slider defaultValue={[mixClientes]} max={100} step={1} onValueChange={(value) => setMixClientes(value[0])} className="mt-2" />
                </div>

              </div>

              {/* Projected Analysis */}
              <div className="border-t mt-8 pt-6">
                  <h3 className="text-lg font-semibold text-center mb-4 text-foreground">Análisis del Escenario Proyectado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-accent p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-5 w-5"/> Gastrobar ({mixClientes}%)</div>
                          <div className="text-right">
                              <p className="text-xl font-bold text-foreground">{formatNumber(proyeccion.comensalesGastrobar)}</p>
                              <p className="text-xs text-muted-foreground">Comensales/mes (~{formatNumber(diasApertura > 0 ? Math.round(proyeccion.comensalesGastrobar / diasApertura) : 0)}/día)</p>
                          </div>
                           <div className="text-right">
                              <p className="text-xl font-bold text-green-600">{formatCurrency(proyeccion.facturacionGastrobar)}</p>
                              <p className="text-xs text-muted-foreground">Facturación/mes</p>
                          </div>
                      </div>
                      <div className="bg-accent p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Utensils className="h-5 w-5"/> Restaurante ({100 - mixClientes}%)</div>
                           <div className="text-right">
                              <p className="text-xl font-bold text-foreground">{formatNumber(proyeccion.comensalesRestaurante)}</p>
                              <p className="text-xs text-muted-foreground">Comensales/mes (~{formatNumber(diasApertura > 0 ? Math.round(proyeccion.comensalesRestaurante / diasApertura) : 0)}/día)</p>
                          </div>
                           <div className="text-right">
                              <p className="text-xl font-bold text-green-600">{formatCurrency(proyeccion.facturacionRestaurante)}</p>
                              <p className="text-xs text-muted-foreground">Facturación/mes</p>
                          </div>
                      </div>
                  </div>
              </div>

               {/* Break-even Point */}
              <div className="border-t mt-8 pt-6">
                  <h3 className="text-lg font-semibold text-center mb-4 text-foreground">Punto de Equilibrio</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                        <p className="text-sm text-blue-800">Facturación Mínima para no Perder</p>
                        <p className="text-3xl font-bold text-blue-600 mt-1">{formatCurrency(proyeccion.puntoEquilibrio)}</p>
                        <p className="text-xs text-blue-700 mt-1">Esta es la facturación mensual que necesitas para cubrir todos tus costes.</p>
                     </div>
                     <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                        <p className="text-sm text-green-800">Distancia al Punto de Equilibrio</p>
                        <p className={`text-3xl font-bold mt-1 ${facturacionProyectada - proyeccion.puntoEquilibrio >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(facturacionProyectada - proyeccion.puntoEquilibrio)}
                        </p>
                        <p className="text-xs text-green-700 mt-1">Esto es lo que te queda (o te falta) para empezar a tener beneficios.</p>
                     </div>
                  </div>
              </div>


            </CardContent>
          </Card>

          {/* Strategic Scenarios */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Simulación de Escenarios Estratégicos
              </CardTitle>
              <p className="text-sm text-muted-foreground">Predice el impacto de decisiones clave en tu rentabilidad mensual.</p>
            </CardHeader>
            <CardContent>
              <div className="flow-root">
                <div className="-mx-6 -my-2 overflow-x-auto">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-foreground">Escenario</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Impacto Estimado</th>
                          <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-foreground">Beneficio Mensual</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {strategicScenarios.map((item) => (
                          <tr key={item.scenario}>
                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-foreground">{item.scenario}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">{item.impact}</td>
                            <td className={`whitespace-nowrap px-3 py-4 text-sm text-right font-semibold ${item.benefitColor}`}>{item.benefit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t pt-6">
                <Button variant="ghost" className="w-full">
                  <Bot className="mr-2 h-4 w-4" />
                  Solicitar análisis personalizado a Lola
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

    