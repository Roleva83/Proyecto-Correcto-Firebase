
'use client'
import React from 'react'
import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Switch } from '@/app/components/ui/switch'
import { BarChart, TrendingUp, Coffee, Gift, Percent, Trash2, Edit, Link2 } from 'lucide-react'

const clientesLeales = [
    {
        name: 'Elena Pérez',
        points: 125,
        progress: 100,
        reviews: ['google', 'tripadvisor']
    },
    {
        name: 'Marcos Soler',
        points: 75,
        progress: 75,
        reviews: ['google']
    },
    {
        name: 'Sofía Navarro',
        points: 20,
        progress: 80, // 20 of 25
        nextReward: 25,
        reviews: []
    }
]

const recompensas = [
    { icon: <Coffee className="h-5 w-5 text-muted-foreground"/>, name: 'Café gratis', points: 10 },
    { icon: <Percent className="h-5 w-5 text-muted-foreground"/>, name: '10% de descuento', points: 50 },
    { icon: <Gift className="h-5 w-5 text-muted-foreground"/>, name: 'Postre de la casa', points: 25 },
]

export default function LoyaltyProgramPage() {
    const user = { name: 'Restaurante Ejemplo' }
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Header user={user} />
                <main className="flex-1 p-8 bg-gray-50">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8 space-y-8">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Programa de Fidelización</h1>
                                <p className="text-muted-foreground">Crea y gestiona tu programa para premiar a los clientes más leales.</p>
                            </div>

                            {/* Configuración del Programa */}
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">Configuración del Programa</h2>
                                    <p className="text-sm text-muted-foreground mb-6">Define las reglas y métricas para tu programa de fidelidad.</p>

                                    <h3 className="font-semibold text-foreground mb-4">Acumulación de Puntos</h3>
                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="text-sm font-medium">Puntos por visita</label>
                                            <Input defaultValue="1" className="mt-1" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Puntos por reseña positiva</label>
                                            <Input defaultValue="10" className="mt-1" />
                                        </div>
                                         <div>
                                            <label className="text-sm font-medium">Puntos por cada 10€ de gasto</label>
                                            <Input defaultValue="1" className="mt-1" />
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-foreground mb-4">Reglas de Reseñas</h3>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Switch id="limit-review" defaultChecked />
                                        <label htmlFor="limit-review" className="text-sm font-medium">Limitar a 1 reseña puntuable por cliente por plataforma.</label>
                                    </div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <Button variant="secondary">Simular Verificación OK</Button>
                                        <Button variant="destructive" className="bg-purple-600 hover:bg-purple-700">Simular Reseña Duplicada</Button>
                                    </div>
                                    
                                    <h3 className="font-semibold text-foreground mb-4">Métricas para Estimaciones</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium">Ticket medio por cliente fidelizado (€)</label>
                                            <Input defaultValue="35" className="mt-1" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Margen de beneficio estimado (%)</label>
                                            <Input defaultValue="20" className="mt-1" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Gestión de Clientes Leales */}
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">Gestión de Clientes Leales</h2>
                                    <p className="text-sm text-muted-foreground mb-4">Genera enlaces únicos para asociar reseñas a clientes específicos.</p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-sm font-medium">Filtrar:</span>
                                        <Button size="sm">Todos</Button>
                                        <Button size="sm" variant="outline">Google</Button>
                                        <Button size="sm" variant="outline">TripAdvisor</Button>
                                        <Button size="sm" variant="outline">TheFork</Button>
                                    </div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-sm text-muted-foreground">
                                                <th className="pb-2 font-medium">Cliente</th>
                                                <th className="pb-2 font-medium">Progreso a Recompensa</th>
                                                <th className="pb-2 font-medium">Reseñas Verificadas</th>
                                                <th className="pb-2 font-medium text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clientesLeales.map(cliente => (
                                                <tr key={cliente.name} className="border-b last:border-0">
                                                    <td className="py-4 font-semibold">{cliente.name}</td>
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                <div className="bg-green-500 h-2.5 rounded-full" style={{width: `${cliente.progress}%`}}></div>
                                                            </div>
                                                            <span className="font-bold text-sm">{cliente.points} pts</span>
                                                        </div>
                                                        {cliente.nextReward && <p className="text-xs text-muted-foreground mt-1">Próxima: {cliente.nextReward} pts</p>}
                                                    </td>
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-1.5">
                                                            {cliente.reviews.length > 0 ? cliente.reviews.map(r => (
                                                                <div key={r} className={`w-4 h-4 rounded-full ${r === 'google' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                                                            )) : <span className="text-sm text-muted-foreground">Ninguna</span>}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <Button variant="ghost" size="sm"><Link2 className="mr-1 h-4 w-4"/> Generar Enlace</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Button variant="outline" className="mt-4">Añadir Cliente</Button>
                                </CardContent>
                            </Card>

                            {/* Gestión de Recompensas */}
                             <Card>
                                <CardContent className="p-6">
                                     <h2 className="text-xl font-semibold mb-2">Gestión de Recompensas</h2>
                                    <p className="text-sm text-muted-foreground mb-6">Añade y edita las recompensas que los clientes pueden canjear con sus puntos.</p>
                                     <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-sm text-muted-foreground">
                                                <th className="pb-2 font-medium">Icono</th>
                                                <th className="pb-2 font-medium">Recompensa</th>
                                                <th className="pb-2 font-medium">Puntos necesarios</th>
                                                <th className="pb-2 font-medium text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recompensas.map(r => (
                                                <tr key={r.name} className="border-b last:border-0">
                                                    <td className="py-3">{r.icon}</td>
                                                    <td className="py-3 font-semibold">{r.name}</td>
                                                    <td className="py-3">{r.points}</td>
                                                    <td className="py-3 text-right">
                                                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                     </table>
                                     <Button variant="outline" className="mt-4">Añadir Recompensa</Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-span-12 lg:col-span-4">
                            <div className="sticky top-8 space-y-8">
                                <div className="flex justify-end">
                                    <Button>Guardar Cambios</Button>
                                </div>
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold flex items-center gap-2"><BarChart className="text-primary"/> Resumen del Programa</h3>
                                        <p className="text-sm text-muted-foreground mb-4">Visualización de las métricas clave del programa de fidelización.</p>
                                        
                                        <div className="space-y-3 text-sm mb-6">
                                            <p>Clientes Leales</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width: '20%'}}></div></div>
                                            <p>Recompensas canjeadas</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{width: '10%'}}></div></div>
                                            <p>Ingresos (€)</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div></div>
                                            <p>Beneficio (€)</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width: '50%'}}></div></div>
                                            <p>Conversión (%)</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width: '15%'}}></div></div>
                                        </div>

                                        <div className="bg-accent p-3 rounded-lg flex items-center justify-between text-sm">
                                            <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4"/> Variación Visitas (Mes)</span>
                                            <span className="font-bold text-green-600">+5%</span>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="font-semibold mb-2">Reseñas Verificadas</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between"><span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Google</span> <span>89</span></div>
                                                <div className="flex justify-between"><span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div>TripAdvisor</span> <span>41</span></div>
                                                <div className="flex justify-between"><span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-black"></div>TheFork</span> <span>15</span></div>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="font-semibold mb-2">Top 3 Clientes Activos</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between items-center"><span>1. Elena Pérez</span> <span className="text-xs font-bold text-white bg-purple-600 px-2 py-0.5 rounded-full">125 pts</span></div>
                                                <div className="flex justify-between items-center"><span>2. Marcos Soler</span> <span className="text-xs font-bold text-white bg-purple-600 px-2 py-0.5 rounded-full">75 pts</span></div>
                                                <div className="flex justify-between items-center"><span>3. Sofía Navarro</span> <span className="text-xs font-bold text-white bg-purple-600 px-2 py-0.5 rounded-full">20 pts</span></div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
