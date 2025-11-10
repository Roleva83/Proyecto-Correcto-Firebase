
'use client'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Star, HelpCircle, Trophy, Sparkles } from 'lucide-react'

// Custom icons for medals
const ProblemSolverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
  </svg>
)
const TeamMasterIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
    </svg>
)
const ReputationLegendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor"/>
    </svg>
)


const levels = [
  {
    name: 'Comprometido',
    level: 1,
    points: 'Gana 100 puntos en un mes para alcanzar este nivel.',
    benefits: [
      'Reconocimiento: "Hostelero Comprometido"',
      'Acceso anticipado a funciones nuevas',
      'Plantillas premium exclusivas',
    ],
    buttonText: 'Tus Beneficios',
    active: true,
  },
  {
    name: 'Destacado',
    level: 2,
    points: 'Gana 500 puntos y mejora tu reputación.',
    benefits: [
      'Entrada a ferias del sector (según disponibilidad)',
      'Acceso a micro-formación avanzada',
      'Pack digital exclusivo: plantillas y más',
      'Acceso a comunidad privada'
    ],
    requirement: 'Requiere suscripción activa: Plan Profesional o superior',
    missingPoints: 'Faltan 335 puntos',
    active: false,
  },
  {
    name: 'Excelencia',
    level: 3,
    points: 'Gana 1000 puntos y aplica las recomendaciones de Lola.',
    benefits: [
        'Cena para dos en restaurante recomendado',
        'Caja gourmet de productos de temporada',
        'Sello "Local Excelente" (digital y físico)',
        'Aparición destacada en nuestro blog y redes'
    ],
    requirement: 'Requiere suscripción activa: Plan Empresa',
    missingPoints: 'Faltan 835 puntos',
    active: false,
  },
];

const medals = [
    {
        name: 'Coleccionista de Estrellas',
        description: 'Consigue 10 reseñas de 5 estrellas.',
        unlocked: true,
        icon: <Star className="h-8 w-8 text-green-500"/>,
        color: 'bg-green-50'
    },
    {
        name: 'Solucionador de Problemas',
        description: 'Resuelve tu primer problema identificado por la IA.',
        unlocked: true,
        icon: <ProblemSolverIcon/>,
        color: 'bg-pink-50'
    },
    {
        name: 'Maestro de Equipo',
        description: 'Genera tu primer plan de incentivos para empleados.',
        unlocked: false,
        icon: <TeamMasterIcon/>,
        color: 'bg-gray-50'
    },
    {
        name: 'Comunicador Experto',
        description: 'Responde a 50 reseñas en total.',
        unlocked: false,
        icon: <Star className="h-8 w-8 text-gray-500"/>,
        color: 'bg-gray-50'
    },
    {
        name: 'Leyenda de la Reputación',
        description: 'Alcanza y mantén una valoración media de 4.8 estrellas durante un mes.',
        unlocked: false,
        icon: <ReputationLegendIcon/>,
        color: 'bg-gray-50'
    }
]

export default function MisMetasYMedallas() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Mis Metas y Medallas</h1>
            <p className="text-muted-foreground">Tu progreso, niveles y medallas por usar Lola IA.</p>
          </div>

          {/* Progreso en la Plataforma */}
          <Card className="mb-8 shadow-soft">
            <CardHeader>
              <CardTitle>Tu Progreso en la Plataforma</CardTitle>
              <p className="text-sm text-muted-foreground">Ganas puntos al utilizar funciones clave que mejoran tu negocio.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Tus puntos este mes</p>
                  <p className="text-6xl font-bold text-primary">165</p>
                </div>
                <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-semibold">Nivel actual: Comprometido</p>
                        <p className="text-sm font-semibold text-muted-foreground">165 / 500 para Destacado</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(165 / 500) * 100}%` }}></div>
                    </div>
                </div>
              </div>
              <div className="mt-6 bg-accent p-4 rounded-lg">
                <p className="font-semibold flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary"/> ¿Cómo ganar puntos?</p>
                <p className="text-sm text-muted-foreground mt-1">Ganas puntos automáticamente al responder reseñas, aplicar las soluciones de Lola, generar planes de incentivos para tu equipo o al conectar nuevas plataformas en la configuración. ¡Cuanto más usas la app, más ganas!</p>
              </div>
            </CardContent>
          </Card>

          {/* Programa de Niveles de Lealtad */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2"><Trophy className="text-primary"/> Programa de Niveles de Lealtad</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {levels.map((level) => (
                <Card key={level.name} className={`shadow-soft ${level.active ? 'border-2 border-primary' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{level.name}</CardTitle>
                      <span className="text-xs font-bold text-white bg-blue-500 px-2 py-1 rounded-full">Nivel {level.level}</span>
                    </div>
                    <p className="text-sm text-muted-foreground pt-2">{level.points}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {level.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {level.buttonText && <Button className="w-full bg-purple-600 hover:bg-purple-700">{level.buttonText}</Button>}
                    {level.requirement && (
                        <div className="mt-4 text-center">
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <p className="text-xs text-muted-foreground">{level.requirement}</p>
                            </div>
                            <p className="text-sm font-semibold mt-2">{level.missingPoints}</p>
                        </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
            
          {/* Nivel Especial Embajador */}
          <Card className="mb-8 shadow-soft bg-indigo-50 border-indigo-200">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-800"><Sparkles/>Nivel Especial: Embajador/a</CardTitle>
                  <p className="text-sm text-indigo-700 mt-2">Conviértete en Embajador/a al conseguir que 3 hosteleros se suscriban a un plan de pago gracias a tu recomendación. Es nuestra forma de agradecer tu confianza.</p>
              </CardHeader>
              <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-indigo-800"><Star className="h-5 w-5 text-primary"/> Sorteo mensual de una escapada para dos</li>
                          <li className="flex items-center gap-2 text-sm text-indigo-800"><Star className="h-5 w-5 text-primary"/> Acceso gratuito a todos los módulos premium</li>
                      </ul>
                       <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-indigo-800"><Star className="h-5 w-5 text-primary"/> Entrevista como caso de éxito en la plataforma</li>
                          <li className="flex items-center gap-2 text-sm text-indigo-800"><Star className="h-5 w-5 text-primary"/> Tarjeta física exclusiva "Amigo de Lola"</li>
                      </ul>
                  </div>
                  <div className="mt-6 bg-white/70 p-2 rounded-lg text-center">
                    <p className="text-xs text-indigo-700">Requiere suscripción activa para poder optar a los beneficios de Embajador/a.</p>
                  </div>
                  <div className="mt-6 flex justify-center">
                      <Button className="bg-indigo-600 hover:bg-indigo-700">Recomendar y ser Embajador/a</Button>
                  </div>
              </CardContent>
          </Card>


          {/* Medallas por Hitos Conseguidos */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Medallas por Hitos Conseguidos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {medals.map(medal => (
                    <Card key={medal.name} className={`shadow-soft text-center p-6 flex flex-col items-center justify-center ${medal.color} ${!medal.unlocked ? 'opacity-60' : ''}`}>
                        <div className="mb-4">{medal.icon}</div>
                        <h4 className="font-semibold text-foreground">{medal.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 mb-4 h-10">{medal.description}</p>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${medal.unlocked ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                            {medal.unlocked ? 'Desbloqueado' : 'Bloqueado'}
                        </span>
                    </Card>
                ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
