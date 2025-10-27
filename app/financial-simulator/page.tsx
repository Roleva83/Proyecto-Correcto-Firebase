
'use client'
import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Slider } from '@/app/components/ui/slider'
import { Input } from '@/app/components/ui/input'
import { Calculator, Utensils, Zap, Bot, Users } from 'lucide-react'

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
  const user = { name: 'Restaurante Ejemplo' }
  const [mixValue, setMixValue] = useState(70);

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
                    <p className="text-2xl font-bold text-green-600">98.660 €</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Medio Actual</p>
                    <p className="text-2xl font-bold text-blue-600">43 €</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Costes Totales Actuales</p>
                    <p className="text-2xl font-bold text-red-600">63.091 €</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Comensales</p>
                    <p className="text-2xl font-bold text-foreground">2288</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Beneficio</p>
                    <p className="text-2xl font-bold text-green-600">35.569 €</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-center mb-6 text-foreground">Escenario Proyectado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Facturación Proyectada (€)</label>
                    <p className="text-2xl font-bold text-green-600 mt-1">108.526</p>
                  </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     <div>
                        <label className="text-sm font-medium text-foreground">Costes Fijos Mensuales (€)</label>
                        <Input type="number" defaultValue="44164" className="mt-1" />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground">Días de Apertura / Mes</label>
                        <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">Cierra 2 días/sem (22)</Button>
                            <Button variant="secondary" size="sm">Cierra 1 día/sem (26)</Button>
                            <Button variant="outline" size="sm">Abre todos (30)</Button>
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                     <div>
                        <label className="text-sm font-medium text-foreground">Ticket Medio Gastrobar (€)</label>
                        <Input type="number" defaultValue="34" className="mt-1" />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground">Coste Variable Gastrobar (€)</label>
                        <Input type="number" defaultValue="6" className="mt-1" />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                     <div>
                        <label className="text-sm font-medium text-foreground">Ticket Medio Restaurante (€)</label>
                        <Input type="number" defaultValue="56" className="mt-1" />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground">Coste Variable Restaurante (€)</label>
                        <Input type="number" defaultValue="12" className="mt-1" />
                     </div>
                  </div>
                </div>
                <div className="mt-6">
                    <label className="text-sm font-medium text-foreground">Mix de Clientes: {mixValue}% Gastrobar / {100 - mixValue}% Restaurante</label>
                    <Slider defaultValue={[mixValue]} max={100} step={1} onValueChange={(value) => setMixValue(value[0])} className="mt-2" />
                </div>

              </div>

              {/* Projected Analysis */}
              <div className="border-t mt-8 pt-6">
                  <h3 className="text-lg font-semibold text-center mb-4 text-foreground">Análisis del Escenario Proyectado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-accent p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-5 w-5"/> Gastrobar (70%)</div>
                          <div className="text-right">
                              <p className="text-xl font-bold text-foreground">1872</p>
                              <p className="text-xs text-muted-foreground">Comensales/mes (~72/día)</p>
                          </div>
                           <div className="text-right">
                              <p className="text-xl font-bold text-green-600">63.619 €</p>
                              <p className="text-xs text-muted-foreground">Facturación/mes</p>
                          </div>
                      </div>
                      <div className="bg-accent p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Utensils className="h-5 w-5"/> Restaurante (30%)</div>
                           <div className="text-right">
                              <p className="text-xl font-bold text-foreground">802</p>
                              <p className="text-xs text-muted-foreground">Comensales/mes (~31/día)</p>
                          </div>
                           <div className="text-right">
                              <p className="text-xl font-bold text-green-600">44.907 €</p>
                              <p className="text-xs text-muted-foreground">Facturación/mes</p>
                          </div>
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
                <Button variant="outline" className="w-full">
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

    