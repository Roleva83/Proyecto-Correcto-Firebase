
'use client'
import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Building, Globe, Mail, Phone, MapPin, Users, Star, Calendar, MessageSquare, Briefcase, Link as LinkIcon, Settings } from 'lucide-react'
import Image from 'next/image'


const IntegrationCard = ({ icon, title, description, status, syncDate, syncStatus }: { icon: React.ReactNode, title: string, description: string, status: 'Conectado' | 'No conectado', syncDate?: string, syncStatus?: string }) => (
    <Card className={`flex flex-col justify-between ${status === 'Conectado' ? 'border-green-500' : 'border-border'}`}>
        <CardContent className="p-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent flex-shrink-0">
                       {icon}
                    </div>
                    <h4 className="font-semibold text-foreground">{title}</h4>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status === 'Conectado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                    {status}
                </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 h-10">{description}</p>
        </CardContent>
        <div className="bg-gray-50/50 px-4 py-3 border-t flex justify-between items-center">
            <div>
                 {syncDate && <p className="text-xs text-muted-foreground">Sinc.: {syncDate}</p>}
                 {syncStatus && <p className="text-xs text-muted-foreground">{syncStatus}</p>}
            </div>
             <Button variant={status === 'Conectado' ? 'destructive' : 'primary'}>
                {status === 'Conectado' ? 'Desconectar' : 'Conectar'}
            </Button>
        </div>
    </Card>
)

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-.97 2.47-2.05 3.23v2.78h3.57c2.08-1.92 3.28-4.74 3.28-8.02z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.78c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);


export default function SettingsPage() {
  const user = { name: 'Restaurante Ejemplo' }
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8 bg-gray-50">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
                <p className="text-muted-foreground">Gestiona el perfil de tu negocio y las integraciones de plataformas.</p>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-border">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('perfil')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                        activeTab === 'perfil'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Perfil
                    </button>
                    <button
                        onClick={() => setActiveTab('integraciones')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                        activeTab === 'integraciones'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Integraciones
                    </button>
                </nav>
            </div>
            
            {activeTab === 'perfil' && (
                <Card className="shadow-soft">
                    <CardHeader>
                        <CardTitle>Perfil del Negocio</CardTitle>
                        <p className="text-sm text-muted-foreground">Mantén actualizada la información clave de tu restaurante para personalizar la experiencia.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 pb-8 border-b">
                                <div className="relative h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-xs text-muted-foreground">
                                    
                                </div>
                                <Button variant="ghost">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Cambiar Logo
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b">
                                <div>
                                    <label className="text-sm font-medium text-foreground">Nombre del Negocio</label>
                                    <div className="relative mt-1">
                                        <Building className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input defaultValue="The Gourmet Place" className="pl-10"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground">Sector del Negocio</label>
                                     <div className="relative mt-1">
                                        <Building className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                                        <Select defaultValue="restaurante">
                                            <SelectTrigger className="pl-10">
                                                <SelectValue placeholder="Selecciona un sector" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="restaurante">Restaurante</SelectItem>
                                                <SelectItem value="cafeteria">Cafetería</SelectItem>
                                                <SelectItem value="bar">Bar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground">Sitio Web</label>
                                    <div className="relative mt-1">
                                        <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input defaultValue="https://www.thegourmetplace.com" className="pl-10"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground">Teléfono de Contacto</label>
                                    <div className="relative mt-1">
                                        <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input defaultValue="912 345 678" className="pl-10"/>
                                    </div>
                                </div>
                                 <div>
                                    <label className="text-sm font-medium text-foreground">Email de Contacto</label>
                                    <div className="relative mt-1">
                                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input defaultValue="contacto@thegourmetplace.com" className="pl-10"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground">Dirección</label>
                                    <div className="relative mt-1">
                                        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input defaultValue="123 Foodie Lane, Flavor Town, 12345" className="pl-10"/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                    <label className="text-sm font-medium text-foreground">Número de Empleados</label>
                                    <div className="relative mt-1">
                                        <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input type="number" defaultValue="25" className="pl-10"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">Horario Comercial</label>
                                    <div className="space-y-2 text-sm text-foreground">
                                        <div className="flex justify-between items-center"><span>Lunes - Viernes</span> <span className="font-mono">13:00 - 23:00</span></div>
                                        <div className="flex justify-between items-center"><span>Sábado</span> <span className="font-mono">13:00 - 00:00</span></div>
                                        <div className="flex justify-between items-center"><span>Domingo</span> <span className="text-muted-foreground">Cerrado</span></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button>Guardar Cambios</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === 'integraciones' && (
                <div className="space-y-8">
                    {/* Plataformas de Reseñas */}
                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Star className="h-5 w-5 text-primary"/> Plataformas de Reseñas</h3>
                        <p className="text-sm text-muted-foreground mb-4">Conecta tus cuentas para sincronizar los datos automáticamente.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <IntegrationCard icon={<GoogleIcon/>} title="Google" description="Sincroniza automáticamente las reseñas desde tu perfil de Google My Business." status="No conectado" syncStatus="Sincronización pendiente" />
                            <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="TripAdvisor" description="Conecta tu cuenta para gestionar todas las opiniones de TripAdvisor aquí." status="Conectado" syncDate="2024-07-24" />
                            <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="TheFork" description="Integra las reseñas de los comensales que reservan a través de TheFork." status="No conectado" syncStatus="Sincronización pendiente" />
                        </div>
                    </div>

                    {/* Sistemas de Reservas */}
                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Calendar className="h-5 w-5 text-primary"/> Sistemas de Reservas</h3>
                        <p className="text-sm text-muted-foreground mb-4">Conecta tus cuentas para sincronizar los datos automáticamente.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="CoverManager" description="Sincroniza tus reservas para obtener feedback post-visita de forma automática." status="Conectado" syncDate="2024-07-25" />
                           <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="Zenchef" description="Conecta con Zenchef para centralizar la gestión de reservas y opiniones." status="No conectado" syncStatus="Sincronización pendiente" />
                           <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="OpenTable" description="Integra OpenTable para unificar la experiencia del cliente y la gestión de reseñas." status="No conectado" syncStatus="Sincronización pendiente" />
                        </div>
                    </div>

                    {/* CRM y Email Marketing */}
                     <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Mail className="h-5 w-5 text-primary"/> CRM y Email Marketing</h3>
                        <p className="text-sm text-muted-foreground mb-4">Conecta tus cuentas para sincronizar los datos automáticamente.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="Brevo" description="Sincroniza contactos y automatiza campañas de email con Brevo." status="Conectado" syncDate="2024-07-25" />
                           <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="ActiveCampaign" description="Conecta tu CRM para comunicaciones personalizadas." status="No conectado" syncStatus="Sincronización pendiente" />
                        </div>
                    </div>

                    {/* Sistemas de TPV */}
                     <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Building className="h-5 w-5 text-primary"/> Sistemas de TPV</h3>
                        <p className="text-sm text-muted-foreground mb-4">Conecta tus cuentas para sincronizar los datos automáticamente.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="Square" description="Conecta tu TPV Square para vincular ventas con el rendimiento de los empleados." status="No conectado" syncStatus="Sincronización pendiente" />
                           <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="Revo" description="Integra Revo para analizar el impacto de las reseñas en tus ventas." status="Conectado" syncDate="2024-07-25" />
                           <IntegrationCard icon={<Briefcase className="h-5 w-5 text-gray-700" />} title="Lightspeed" description="Sincroniza tus datos de ventas para obtener métricas de negocio más completas." status="No conectado" syncStatus="Sincronización pendiente" />
                        </div>
                    </div>

                    {/* Automatización */}
                     <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Settings className="h-5 w-5 text-primary"/> Automatización</h3>
                        <p className="text-sm text-muted-foreground mb-4">Conecta tus cuentas para sincronizar los datos automáticamente.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           <IntegrationCard icon={<LinkIcon className="h-5 w-5 text-gray-700" />} title="Zapier" description="Conecta Caña y Reseña con más de 5,000 apps para automatizar flujos de trabajo." status="No conectado" syncStatus="Sincronización pendiente" />
                           <IntegrationCard icon={<LinkIcon className="h-5 w-5 text-gray-700" />} title="Webhook" description="Usa webhooks para integraciones personalizadas y notificaciones en tiempo real." status="No conectado" syncStatus="Sincronización pendiente" />
                        </div>
                    </div>
                </div>
            )}

        </main>
      </div>
    </div>
  )
}
