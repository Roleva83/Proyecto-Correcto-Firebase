
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { PlusCircle, ArrowUp, ArrowDown, Star, MessageSquare, Download, Sparkles, X, ChevronLeft, ChevronRight, Award, TrendingUp, Target, Euro } from 'lucide-react'

const teamData = [
  {
    name: 'Ana García',
    avatar: 'https://picsum.photos/seed/ana/80/80',
    avgRating: 4.9,
    reviewCount: 32,
    lastReviewDate: '2024-07-21',
    trend: 'up',
    status: 'En alza',
    statusColor: 'text-green-600 bg-green-100'
  },
  {
    name: 'Carlos Rodríguez',
    avatar: 'https://picsum.photos/seed/carlos/80/80',
    avgRating: 4.5,
    reviewCount: 25,
    lastReviewDate: '2024-07-20',
    trend: 'up',
    status: 'En alza',
    statusColor: 'text-green-600 bg-green-100'
  },
  {
    name: 'Sofía Martínez',
    avatar: 'https://picsum.photos/seed/sofia/80/80',
    avgRating: 4.2,
    reviewCount: 18,
    lastReviewDate: '2024-07-19',
    trend: 'down',
    status: 'Mejorable',
    statusColor: 'text-red-600 bg-red-100'
  },
    {
    name: 'Javier López',
    avatar: 'https://picsum.photos/seed/javier/80/80',
    avgRating: 4.8,
    reviewCount: 29,
    lastReviewDate: '2024-07-22',
    trend: 'up',
    status: 'En alza',
    statusColor: 'text-green-600 bg-green-100'
  },
];

const anaGarciaDetails = {
    name: 'Ana García',
    avatar: 'https://picsum.photos/seed/ana/80/80',
    avgRating: 4.9,
    reviewCount: 32,
    chartData: [
        { month: 'Mar', rating: 4.6 },
        { month: 'Abr', rating: 4.7 },
        { month: 'May', rating: 4.5 },
        { month: 'Jun', rating: 4.8 },
        { month: 'Jul', rating: 4.9 },
    ],
    mentionedReviews: [
        {
            platform: 'Google',
            rating: 5,
            comment: 'El trato de Ana fue excelente, muy atenta y profesional. ¡Volveremos seguro!',
            tags: ['Positivo', 'Servicio']
        },
        {
            platform: 'TripAdvisor',
            rating: 5,
            comment: 'Nos atendió Ana, un encanto. Nos recomendó el vino perfecto para la cena.',
            tags: ['Positivo', 'Servicio']
        }
    ],
    incentives: [
        'Bonus por Excelencia: Si Ana mantiene una puntuación media de 4.8 o más durante los próximos 3 meses, recibirá un bonus de 150€.',
        'Rol de Mentor/a: Asignar a Ana la formación de nuevos empleados en atención al cliente, con una pequeña compensación adicional por hora de formación.'
    ]
}

export default function TeamPage() {
  const user = { name: 'Restaurante Ejemplo' };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('rendimiento');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Equipo y Rendimiento</h1>
                  <p className="text-muted-foreground">Analiza el rendimiento individual, detecta oportunidades y crea planes de incentivos con IA.</p>
                </div>
                 {activeTab === 'rendimiento' && (
                    <Button onClick={() => alert('Funcionalidad para añadir empleado no implementada.')}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Empleado
                    </Button>
                 )}
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-border">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('rendimiento')}
                  className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === 'rendimiento'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Rendimiento del Equipo
                </button>
                <button
                  onClick={() => setActiveTab('incentivos')}
                  className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === 'incentivos'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Plan de Incentivos (IA)
                </button>
              </nav>
            </div>

            {activeTab === 'rendimiento' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Columna Izquierda: Rendimiento del Personal */}
                  <Card className="shadow-soft">
                      <CardHeader>
                          <CardTitle>Rendimiento del Personal</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className="space-y-4">
                              {teamData.map((employee) => (
                                  <div key={employee.name} onClick={() => setIsModalOpen(true)} className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                      <Avatar className="h-12 w-12 mr-4">
                                          <AvatarImage src={employee.avatar} alt={employee.name} />
                                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                          <p className="font-semibold text-foreground">{employee.name}</p>
                                          <div className="flex items-center text-sm text-muted-foreground gap-3">
                                              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" /> {employee.avgRating.toFixed(1)}</span>
                                              <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {employee.reviewCount} reseñas</span>
                                          </div>
                                      </div>
                                      <div className="text-right">
                                          <p className="text-xs text-muted-foreground">Última reseña</p>
                                          <p className="text-sm font-medium text-foreground">{employee.lastReviewDate}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </CardContent>
                  </Card>

                  {/* Columna Derecha: Plan de Incentivos (IA) */}
                  <Card className="shadow-soft">
                      <CardHeader>
                          <CardTitle>Resumen de Estado del Equipo</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className="space-y-4 mb-6">
                              {teamData.map((employee) => (
                                  <div key={employee.name} className="flex items-center p-3 rounded-lg bg-card border">
                                      <Avatar className="h-10 w-10 mr-4">
                                          <AvatarImage src={employee.avatar} alt={employee.name} />
                                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                          <p className="font-semibold text-foreground">{employee.name}</p>
                                      </div>
                                      <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${employee.statusColor}`}>
                                          {employee.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                                          <span>{employee.status}</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                          <Button className="w-full" onClick={() => setActiveTab('incentivos')}>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Ver Plan de Incentivos de Lola
                          </Button>
                      </CardContent>
                  </Card>
              </div>
            )}

            {activeTab === 'incentivos' && (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-7">
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Sugerencias de Incentivos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground flex items-center gap-2"><Award className="text-primary"/>Bonus "Reseñas Brillantes"</h4>
                        <p className="text-sm text-muted-foreground mt-1">Por cada 5 reseñas de 5 estrellas donde un cliente mencione a un empleado, ese empleado recibe un bonus de 20€.</p>
                        <p className="text-xs font-semibold mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full inline-block">Para: Todo el equipo</p>
                      </div>
                       <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground flex items-center gap-2"><Award className="text-primary"/>Competición "Rey/Reina del Upselling"</h4>
                        <p className="text-sm text-muted-foreground mt-1">El empleado que más postres venda este mes (medido por el TPV) gana una cena para dos en el restaurante.</p>
                        <p className="text-xs font-semibold mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full inline-block">Para: Camareros</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-12 lg:col-span-5">
                   <Card className="shadow-soft h-full">
                    <CardHeader>
                      <CardTitle>Comparativa de Impacto</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-foreground">Reseñas Positivas (+5 estrellas)</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-gray-400 h-4 rounded-l-full" style={{width: '60%'}}></div>
                                    </div>
                                    <span className="text-sm font-bold">60%</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-primary h-4 rounded-l-full" style={{width: '85%'}}></div>
                                    </div>
                                    <span className="text-sm font-bold text-primary">85%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">Puntuación Media</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-gray-400 h-4 rounded-l-full" style={{width: '84%'}}></div>
                                    </div>
                                    <span className="text-sm font-bold">4.2</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-primary h-4 rounded-l-full" style={{width: '90%'}}></div>
                                    </div>
                                    <span className="text-sm font-bold text-primary">4.5</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start gap-4 mt-4 text-xs">
                          <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-gray-400"></div>Sin Incentivo</span>
                          <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary"></div>Con Incentivo (Estimado)</span>
                        </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="col-span-12 lg:col-span-4">
                   <Card className="shadow-soft bg-green-50 text-green-900 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-900"><TrendingUp/> Proyecciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">+25%</p>
                      <p className="text-sm">en reseñas positivas en 3 meses</p>
                      <p className="text-2xl font-bold mt-2">+0.3 pts</p>
                      <p className="text-sm">en puntuación media global</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-12 lg:col-span-4">
                   <Card className="shadow-soft bg-blue-50 text-blue-900 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-900"><Target/> Impacto Económico</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">+800€</p>
                      <p className="text-sm">Beneficio mensual estimado por aumento de clientes recurrentes y ticket medio.</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-12 lg:col-span-4">
                   <Card className="shadow-soft bg-red-50 text-red-900 border-red-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-900"><Euro/> Coste de Inacción</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">-250€</p>
                      <p className="text-sm">Pérdida potencial mensual por no atajar la desmotivación y la bajada de rendimiento.</p>
                    </CardContent>
                  </Card>
                </div>

              </div>
            )}
        </main>
      </div>

      {/* Modal de Detalle de Empleado */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader className="flex-row items-center justify-between pr-6 pt-6">
                <DialogTitle className="flex items-center">
                    <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={anaGarciaDetails.avatar} alt={anaGarciaDetails.name} />
                        <AvatarFallback>{anaGarciaDetails.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">{anaGarciaDetails.name}</h2>
                        <div className="flex items-center text-lg text-muted-foreground gap-4 mt-1">
                            <span className="flex items-center gap-1.5"><Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> {anaGarciaDetails.avgRating.toFixed(1)}</span>
                            <span className="flex items-center gap-1.5"><MessageSquare className="h-5 w-5" /> {anaGarciaDetails.reviewCount} reseñas</span>
                        </div>
                    </div>
                </DialogTitle>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" disabled><ChevronLeft className="h-4 w-4"/></Button>
                    <Button variant="ghost"><ChevronRight className="h-4 w-4"/></Button>
                </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Columna Izquierda del Modal */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Evolución del Rendimiento</CardTitle></CardHeader>
                        <CardContent>
                            <div className="h-48 bg-accent rounded-md flex items-center justify-center text-muted-foreground">
                                <p>Gráfico de Líneas Placeholder</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>QR Personal de Reseña</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="p-2 border rounded-md bg-white">
                                    <Image src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=cana-y-resena-ana-garcia" width={100} height={100} alt="Código QR de Ana García" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground mb-4">Usa este QR en tarjetas o tickets para que los clientes dejen una reseña directamente atribuida a Ana.</p>
                                    <Button className="w-full"><Download className="mr-2 h-4 w-4" /> Descargar QR</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Columna Derecha del Modal */}
                <div className="space-y-6">
                     <Card>
                        <CardHeader><CardTitle>Reseñas Mencionadas</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {anaGarciaDetails.mentionedReviews.map((review, i) => (
                                <div key={i} className="border-b pb-3 last:border-b-0">
                                    <div className="flex items-center mb-1">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} className={`h-4 w-4 ${j < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                        ))}
                                        <span className="ml-auto text-xs font-medium">{review.platform}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="bg-amber-50 border-amber-200">
                        <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Sugerencias de Incentivos (Lola IA)</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {anaGarciaDetails.incentives.map((incentive, i) => (
                                 <p key={i} className="text-sm text-amber-900">{incentive}</p>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

    