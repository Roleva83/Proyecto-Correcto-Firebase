
'use client'
import React from 'react'
import Image from 'next/image'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, Star, MessageSquare, Award } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

const teamData = [
  {
    name: 'Ana García',
    avatar: 'https://picsum.photos/seed/ana/80/80',
    avgRating: 4.9,
    reviewCount: 32,
    lastReviewDate: '2024-07-21',
    performance: 95,
  },
  {
    name: 'Carlos Rodríguez',
    avatar: 'https://picsum.photos/seed/carlos/80/80',
    avgRating: 4.5,
    reviewCount: 25,
    lastReviewDate: '2024-07-20',
    performance: 85,
  },
  {
    name: 'Sofía Martínez',
    avatar: 'https://picsum.photos/seed/sofia/80/80',
    avgRating: 4.2,
    reviewCount: 18,
    lastReviewDate: '2024-07-19',
    performance: 70,
  },
  {
    name: 'Javier López',
    avatar: 'https://picsum.photos/seed/javier/80/80',
    avgRating: 4.8,
    reviewCount: 29,
    lastReviewDate: '2024-07-22',
    performance: 92,
  },
];

const performanceChartData = [
  { day: 'Lun', rendimiento: 75 },
  { day: 'Mar', rendimiento: 78 },
  { day: 'Mié', rendimiento: 82 },
  { day: 'Jue', rendimiento: 80 },
  { day: 'Vie', rendimiento: 88 },
  { day: 'Sáb', rendimiento: 92 },
  { day: 'Dom', rendimiento: 90 },
];

const topEmployees = [
    { rank: 1, name: 'Ana García', score: 95, icon: '🥇' },
    { rank: 2, name: 'Javier López', score: 92, icon: '🥈' },
    { rank: 3, name: 'Carlos Rodríguez', score: 85, icon: '🥉' },
]

export default function TeamPage() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Equipo y Rendimiento</h1>
                  <p className="text-muted-foreground">Analiza el desempeño individual, detecta oportunidades y crea planes de incentivos con IA.</p>
                </div>
                <Button className="bg-primary text-primary-foreground rounded-lg h-11 px-6 shadow-md hover:bg-amber-600 hover:shadow-lg transition-all duration-200">
                    <Plus className="mr-2 h-5 w-5" />
                    Añadir Empleado
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Columna Izquierda: Rendimiento del Personal */}
                <Card className="rounded-2xl border-border bg-white p-2 shadow-soft hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>Rendimiento del Personal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {teamData.map((employee) => (
                                <div key={employee.name} className="flex flex-col p-4 rounded-xl bg-white shadow-[inset_4px_4px_8px_#f0f0f0,inset_-4px_-4px_8px_#ffffff] transition-all duration-300 hover:scale-[1.02]">
                                    <div className="flex items-center">
                                        <Avatar className="h-14 w-14 mr-4 border-2 border-primary/20">
                                            <AvatarImage src={employee.avatar} alt={employee.name} />
                                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-bold text-lg text-foreground">{employee.name}</p>
                                            <div className="flex items-center text-sm text-muted-foreground gap-3">
                                                <span className="flex items-center gap-1"><Star className="h-4 w-4 text-primary" /> {employee.avgRating.toFixed(1)}</span>
                                                <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {employee.reviewCount} reseñas</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground">Última reseña</p>
                                            <p className="text-sm font-semibold text-foreground">{employee.lastReviewDate}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${employee.performance}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Columna Derecha: Análisis de Rendimiento y Estado del Equipo */}
                <div className="space-y-8">
                    <Card className="rounded-2xl border-border bg-white p-2 shadow-soft hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle>Análisis de Rendimiento Semanal</CardTitle>
                        </CardHeader>
                        <CardContent className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis unit="%" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            borderColor: '#D4AF37',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                    <Line type="monotone" dataKey="rendimiento" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-border bg-white p-2 shadow-soft hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle>Ranking Top Empleados</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-3">
                               {topEmployees.map(emp => (
                                   <div key={emp.rank} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
                                       <div className="flex items-center gap-3">
                                            <span className="text-xl font-bold">{emp.icon}</span>
                                            <p className="font-semibold text-foreground">{emp.name}</p>
                                       </div>
                                       <div className="flex items-center gap-2">
                                           <Award className="h-5 w-5 text-primary" />
                                           <span className="font-bold text-foreground">{emp.score} pts</span>
                                       </div>
                                   </div>
                               ))}
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
