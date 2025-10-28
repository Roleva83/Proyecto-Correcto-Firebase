
'use client'

import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { AreaChart, BarChart, Bot, Search, Star } from 'lucide-react'
import { AreaChart as RechartsAreaChart, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, Bar, Cell } from 'recharts';
import Image from 'next/image'
import { Input } from '@/app/components/ui/input'

const reviewsData = [
  {
    author: 'Alice Johnson',
    avatar: 'https://picsum.photos/seed/alice/40/40',
    platform: 'Google',
    date: '2024-07-20',
    rating: 5,
    comment: '¡Absolutamente fantástico! El ambiente era maravilloso y la comida aún mejor. El filete estaba cocinado a la perfección. ¡Volveré sin duda!',
    tags: [{ text: 'Positivo', type: 'positive' }, { text: 'Comida', type: 'neutral' }]
  },
  {
    author: 'Bob Williams',
    avatar: 'https://picsum.photos/seed/bob/40/40',
    platform: 'TripAdvisor',
    date: '2024-07-19',
    rating: 2,
    comment: 'El servicio fue increiblemente lento. Esperamos más de una hora por nuestro plato principal. La comida estaba bien, pero no valió la pena la espera. Una experiencia muy decepcionante.',
    tags: [{ text: 'Negativo', type: 'negative' }, { text: 'Servicio', type: 'neutral' }, { text: 'Alta', type: 'negative' }]
  },
  {
    author: 'Charlie Brown',
    avatar: 'https://picsum.photos/seed/charlie/40/40',
    platform: 'TheFork',
    date: '2024-07-18',
    rating: 4,
    comment: 'Un gran lugar para una cena informal. La pasta estaba deliciosa y el personal fue amable. Era un poco ruidoso, pero es de esperar en una noche de viernes.',
    tags: [{ text: 'Positivo', type: 'positive' }, { text: 'Comida', type: 'neutral' }, { text: 'Baja', type: 'neutral' }]
  },
  {
    author: 'Diana Miller',
    avatar: 'https://picsum.photos/seed/diana/40/40',
    platform: 'Google',
    date: '2024-07-17',
    rating: 3,
    comment: 'La ubicación es conveniente y los precios son razonables. Mi plato estaba bien, nada especial. Mi amigo disfrutó su comida más que yo. Fue una experiencia normal.',
    tags: [{ text: 'Neutral', type: 'neutral' }, { text: 'Precio', type: 'neutral' }]
  },
  {
    author: 'Ethan Davis',
    avatar: 'https://picsum.photos/seed/ethan/40/40',
    platform: 'TripAdvisor',
    date: '2024-07-16',
    rating: 5,
    comment: 'Servicio excepcional y postres para chuparse los dedos. El coulant de chocolate es algo que hay que probar. Nuestro camarero fue muy atento e hizo excelentes recomendaciones.',
    tags: [{ text: 'Positivo', type: 'positive' }, { text: 'Servicio', type: 'neutral' }]
  },
  {
    author: 'Fiona Green',
    avatar: 'https://picsum.photos/seed/fiona/40/40',
    platform: 'Google',
    date: '2024-07-22',
    rating: 1,
    comment: 'Horrible. El pescado no estaba fresco y el servicio fue grosero. No volveré jamás.',
    tags: [{ text: 'Negativo', type: 'negative' }, { text: 'Comida', type: 'neutral' }, { text: 'Alta', type: 'negative' }]
  },
  {
    author: 'George Hill',
    avatar: 'https://picsum.photos/seed/george/40/40',
    platform: 'Google',
    date: '2024-07-23',
    rating: 5,
    comment: 'Buena comida, buen ambiente. Perfecto para una cita. El trato de Ana fue excelente.',
    tags: [{ text: 'Positivo', type: 'positive' }, { text: 'Ambiente', type: 'neutral' }]
  },
];

const evolutionData = [
  { name: '27 ago', value: 1 }, { name: '28 ago', value: 2 }, { name: '29 ago', value: 1.5 },
  { name: '30 ago', value: 3 }, { name: '31 ago', value: 6.5 }, { name: '1 sep', value: 4 },
  { name: '4 sep', value: 2.5 }, { name: '8 sep', value: 5 }, { name: '12 sep', value: 2 },
  { name: '16 sep', value: 4.5 }, { name: '20 sep', value: 3 }, { name: '24 sep', value: 5.5 },
];

const sentimentData = [
  { name: '27 ago', positivo: 75, negativo: 25 }, { name: '31 ago', positivo: 78, negativo: 22 },
  { name: '4 sep', positivo: 92, negativo: 8 }, { name: '8 sep', positivo: 72, negativo: 28 },
  { name: '12 sep', positivo: 65, negativo: 35 }, { name: '16 sep', positivo: 84, negativo: 16 },
  { name: '20 sep', positivo: 95, negativo: 5 }, { name: '24 sep', positivo: 88, negativo: 12 },
];


export default function LolaPage() {
  const user = { name: 'Restaurante Ejemplo' };

  const getTagClass = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Lola: Reseñas y Acción</h1>
            <p className="text-muted-foreground">Analiza, gestiona y responde a todas las reseñas de tus clientes y obtén un plan de acción con IA.</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-card border rounded-lg p-1 flex">
              <Button variant="secondary" className="bg-white shadow-sm">Gestión de Reseñas</Button>
              <Button variant="ghost">Plan de Acción de Lola</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><AreaChart className="h-5 w-5 text-purple-600"/> Evolución de Reseñas</CardTitle>
                <p className="text-sm text-muted-foreground">Cantidad de reseñas recibidas por período</p>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsAreaChart data={evolutionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}}/>
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </RechartsAreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><BarChart className="h-5 w-5 text-pink-600"/> Sentimiento Positivo</CardTitle>
                <p className="text-sm text-muted-foreground">Evolución del % de sentimiento positivo</p>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={sentimentData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{fontSize: 12}}/>
                    <YAxis domain={[50, 100]} unit="%" tick={{fontSize: 12}}/>
                    <Tooltip />
                    <Bar dataKey="positivo">
                       {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 3 === 0 ? '#2dd4bf' : index % 3 === 1 ? '#f97316' : '#ec4899'} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-primary"/>
                <div>
                  <h4 className="font-semibold text-amber-900">¡A por el día, campeón!</h4>
                  <p className="text-sm text-amber-800">Has respondido a 3 de 5 reseñas hoy.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-1/4">
                <div className="w-full bg-amber-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{width: '60%'}}></div>
                </div>
                <span className="text-sm font-semibold text-amber-900">60%</span>
              </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="bg-accent">Todas (7)</Button>
                <Button variant="ghost">Nuevas (1)</Button>
                <Button variant="ghost" className="text-red-600 font-semibold">Requieren atención (2)</Button>
              </div>
              <div className="relative w-1/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar reseñas..." className="pl-9" />
              </div>
          </div>

          <div className="space-y-4">
            {reviewsData.map((review) => (
              <Card key={review.author}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar} alt={review.author}/>
                      <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold">{review.author}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <p>{review.platform}</p>
                          <p>{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                           {review.tags.map(tag => (
                            <span key={tag.text} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getTagClass(tag.type)}`}>
                              {tag.text}
                            </span>
                           ))}
                        </div>
                        <Button variant="outline"><Bot className="mr-2 h-4 w-4"/> Generar Respuesta</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}
