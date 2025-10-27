
'use client'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Download, Calendar, Award, BookOpen, Mail, Users, Lightbulb } from 'lucide-react'

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
  const activePath = "/marketing"

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={`bg-card text-card-foreground border-r transition-all duration-300 w-64 flex flex-col`}>
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Caña y Reseña</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {[
                { href: "/dashboard", icon: <Home className="h-5 w-5" />, label: "Inicio" },
                { href: "/lola", icon: <Bot className="h-5 w-5" />, label: "Lola: Reseñas y Acción" },
                { href: "/menu-analysis", icon: <BarChart2 className="h-5 w-5" />, label: "Análisis de Menú" },
                { href: "/team", icon: <Users className="h-5 w-5" />, label: "Equipo y Rendimiento" },
                { href: "/mis-metas-y-medallas", icon: <Award className="h-5 w-5" />, label: "Mis Metas y Medallas" },
                { href: "/financial-simulator", icon: <CircleDollarSign className="h-5 w-5" />, label: "Simulador Financiero" },
                { href: "/marketing", icon: <Megaphone className="h-5 w-5" />, label: "Marketing y Clientes" },
            ].map((item) => (
            <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                activePath === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
            >
                {item.icon}
                <span className="font-medium">{item.label}</span>
            </a>
            ))}
        </nav>
        <div className="p-4 border-t">
          <a
              href="/settings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                activePath === "/settings"
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Configuración</span>
          </a>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Marketing y Fidelización</h1>
                  <p className="text-muted-foreground">Herramientas para captar más reseñas, fidelizar clientes y lanzar campañas.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline">
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
                                <Button variant="outline">Gestionar Programa de Fidelización</Button>
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
                                <Button variant="outline">Ir al Calendario de Contenidos</Button>
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
                            <Button variant="secondary" className="w-full">Ver Plantillas</Button>
                        </Card>
                         <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">Formación Equipo</h4>
                            <p className="text-xs text-muted-foreground mb-4">Cápsulas formativas para tu personal.</p>
                            <Button variant="secondary" className="w-full">Ver Consejos</Button>
                        </Card>
                         <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mx-auto mb-4">
                                <Lightbulb className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">Nuevas Estrategias</h4>
                            <p className="text-xs text-muted-foreground mb-4">Ideas innovadoras para captar reseñas.</p>
                            <Button variant="secondary" className="w-full">Descubrir</Button>
                        </Card>
                    </div>
                </CardContent>
            </Card>

        </main>
      </div>
    </div>
  )
}

    