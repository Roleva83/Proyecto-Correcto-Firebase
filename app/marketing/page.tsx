
'use client'
import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Calendar, Award, Mail, Users, Lightbulb, Home, Bot, BarChart2, CircleDollarSign, Megaphone, Settings } from 'lucide-react'
import Link from 'next/link'
import EmailTemplatesModal from '../components/marketing/EmailTemplatesModal'
import TrainingCapsulesModal from '../components/marketing/TrainingCapsulesModal'
import NewStrategiesModal from '../components/marketing/NewStrategiesModal'


// Custom SVG Icons for Marketing Page
const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 2V6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 2V6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 10H21" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 16H11" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 16H15" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const FomentarResenasIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10H16" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 14H12" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
);

export default function MarketingPage() {
  const user = { name: 'Restaurante Ejemplo' };
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [isStrategiesModalOpen, setIsStrategiesModalOpen] = useState(false);
  
  return (
    <>
    <div className="flex min-h-screen bg-background">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Marketing y Fidelización</h1>
                  <p className="text-muted-foreground">Herramientas para captar más reseñas, fidelizar clientes y lanzar campañas.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="secondary">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar Informe
                    </Button>
                    <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>27 ago - 25 sep</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Fidelización de Clientes</h3>
                                <p className="text-sm text-muted-foreground mt-1 mb-4">Crea programas para premiar a tus clientes más leales.</p>
                                <p className="text-sm text-secondary mb-6">Gestiona tus clientes leales, asigna puntos, canjea recompensas y mide el impacto de tu programa de fidelización.</p>
                                <Button variant="secondary">
                                  <Link href="/marketing/loyalty">Gestionar Programa de Fidelización</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                               <CalendarIcon />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Campañas y Contenidos</h3>
                                <p className="text-sm text-muted-foreground mt-1 mb-4">Planifica tus posts y genera ideas con IA.</p>
                                <p className="text-sm text-secondary mb-6">Genera copys para redes sociales, planifica tu calendario de contenidos y analiza el rendimiento de tus publicaciones.</p>
                                <Button variant="secondary">Ir al Calendario de Contenidos</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="shadow-soft">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                            <FomentarResenasIcon />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Fomentar Reseñas</h3>
                            <p className="text-sm text-muted-foreground mt-1">Estrategias y herramientas para aumentar el volumen y la calidad de tus opiniones online.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                                <Mail className="h-6 w-6 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">Plantillas Email/SMS</h4>
                            <p className="text-xs text-muted-foreground mb-4">Envía recordatorios amables post-visita.</p>
                            <Button variant="secondary" className="w-full" onClick={() => setIsTemplatesModalOpen(true)}>Ver Plantillas</Button>
                        </Card>
                         <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">Formación Equipo</h4>
                            <p className="text-xs text-muted-foreground mb-4">Cápsulas formativas para tu personal.</p>
                            <Button variant="secondary" className="w-full" onClick={() => setIsTrainingModalOpen(true)}>Ver Consejos</Button>
                        </Card>
                         <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mx-auto mb-4">
                                <Lightbulb className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">Nuevas Estrategias</h4>
                            <p className="text-xs text-muted-foreground mb-4">Ideas innovadoras para captar reseñas.</p>
                            <Button variant="secondary" className="w-full" onClick={() => setIsStrategiesModalOpen(true)}>Descubrir</Button>
                        </Card>
                    </div>
                </CardContent>
            </Card>

        </main>
      </div>
    </div>
    <EmailTemplatesModal isOpen={isTemplatesModalOpen} onClose={() => setIsTemplatesModalOpen(false)} />
    <TrainingCapsulesModal isOpen={isTrainingModalOpen} onClose={() => setIsTrainingModalOpen(false)} />
    <NewStrategiesModal isOpen={isStrategiesModalOpen} onClose={() => setIsStrategiesModalOpen(false)} />
    </>
  )
}
