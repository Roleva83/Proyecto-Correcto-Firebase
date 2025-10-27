
'use client'
import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Search, Star } from 'lucide-react'
import Image from 'next/image'

const reviews = [
  {
    author: 'Alice Johnson',
    platform: 'Google',
    date: '2024-07-20',
    rating: 5,
    text: '¡Absolutamente fantástico! El ambiente era maravilloso y la comida aún mejor. El filete estaba cocinado a la perfección. ¡Volveré sin duda!',
    sentiment: 'Positivo',
    tags: ['Comida', 'Ambiente'],
    avatar: 'https://picsum.photos/seed/avatar1/40/40'
  },
  {
    author: 'Bob Williams',
    platform: 'TripAdvisor',
    date: '2024-07-19',
    rating: 2,
    text: 'El servicio fue increíblemente lento. Esperamos más de una hora por nuestro plato principal. La comida estaba bien, pero no valió la pena la espera. Una experiencia muy decepcionante.',
    sentiment: 'Negativo',
    tags: ['Servicio', 'Lento'],
    avatar: 'https://picsum.photos/seed/avatar2/40/40'
  },
  {
    author: 'Charlie Brown',
    platform: 'TheFork',
    date: '2024-07-18',
    rating: 4,
    text: 'Un gran lugar para una cena informal. La pasta estaba deliciosa y el personal fue amable. Era un poco ruidoso, pero es de esperar en una noche de viernes.',
    sentiment: 'Positivo',
    tags: ['Comida', 'Ambiente'],
    avatar: 'https://picsum.photos/seed/avatar3/40/40'
  },
  {
    author: 'Diana Miller',
    platform: 'Google',
    date: '2024-07-17',
    rating: 3,
    text: 'La ubicación es conveniente y los precios son razonables. Mi plato estaba bien, nada especial. Mi amigo disfrutó su comida más que yo. Fue una experiencia normal.',
    sentiment: 'Neutral',
    tags: ['Precio'],
    avatar: 'https://picsum.photos/seed/avatar4/40/40'
  },
  {
    author: 'Ethan Davis',
    platform: 'TripAdvisor',
    date: '2024-07-16',
    rating: 5,
    text: 'Servicio excepcional y postres para chuparse los dedos. El coulant de chocolate es algo que hay que probar. Nuestro camarero fue muy atento e hizo excelentes recomendaciones.',
    sentiment: 'Positivo',
    tags: ['Servicio', 'Postre'],
    avatar: 'https://picsum.photos/seed/avatar5/40/40'
  },
  {
    author: 'Fiona Green',
    platform: 'Google',
    date: '2024-07-22',
    rating: 1,
    text: 'Horrible. El pescado no estaba fresco y el servicio fue grosero. No volveré jamás.',
    sentiment: 'Negativo',
    tags: ['Comida', 'Servicio'],
    avatar: 'https://picsum.photos/seed/avatar6/40/40'
  },
  {
    author: 'George Hill',
    platform: 'Google',
    date: '2024-07-23',
    rating: 4,
    text: 'Buen sonido, buen ambiente. Perfecto para una cita. El trato de Ana fue excelente.',
    sentiment: 'Positivo',
    tags: ['Ambiente'],
    avatar: 'https://picsum.photos/seed/avatar7/40/40'
  }
];

export default function Lola() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Lola: Reseñas y Acción</h1>
            <p className="text-muted-foreground">Analiza, gestiona y responde a todas las reseñas de tus clientes y obtén un plan de acción con IA.</p>
          </div>

          {/* Main content grid */}
          <div className="space-y-6">
            {/* Top Row: Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Evolución de Reseñas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Aquí irá el gráfico de área de evolución de reseñas.</p>
                  <div className="h-48 flex items-center justify-center text-muted-foreground bg-accent rounded-md mt-4">Gráfico</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sentimiento Positivo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Aquí irá el gráfico de barras de sentimiento.</p>
                  <div className="h-48 flex items-center justify-center text-muted-foreground bg-accent rounded-md mt-4">Gráfico</div>
                </CardContent>
              </Card>
            </div>

            {/* Gamification and Progress */}
            <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-bold text-amber-800">¡A por el día, campeón!</p>
                        <p className="text-sm text-amber-700">Has respondido a 3 de 5 reseñas hoy.</p>
                    </div>
                    <div className="w-1/3">
                        <p className="text-sm text-right font-semibold text-amber-800 mb-1">60%</p>
                        <div className="w-full bg-amber-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{width: '60%'}}></div>
                        </div>
                    </div>
                </CardContent>
            </Card>


            {/* Reviews Management Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="primary">Todas (7)</Button>
                  <Button variant="secondary">Nuevas (1)</Button>
                  <Button variant="destructive">Requieren atención (2)</Button>
                </div>
                <div className="relative w-1/3">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input type="search" placeholder="Buscar reseñas..." className="pl-10" />
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 flex gap-6">
                      <Image src={review.avatar} alt={`Avatar de ${review.author}`} width={40} height={40} className="rounded-full h-10 w-10 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{review.platform}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{review.text}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${review.sentiment === 'Positivo' ? 'bg-green-100 text-green-800' : review.sentiment === 'Negativo' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{review.sentiment}</span>
                                {review.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 text-xs rounded-full bg-accent text-accent-foreground">{tag}</span>
                                ))}
                            </div>
                            <Button variant="primary">Generar Respuesta</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
