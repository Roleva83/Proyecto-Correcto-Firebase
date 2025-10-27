'use client'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Star, Lightbulb } from 'lucide-react'

const menuData = [
  {
    name: 'Risotto de Setas y Trufa',
    category: 'Joya Oculta',
    categoryColor: 'text-purple-600',
    income: '1.375,00 €',
    benefit: '866,25 €',
    cost: '508,75 €',
    margin: 80,
    marginColor: 'bg-green-500',
    recommendation: 'Estos platos tienen alta rentabilidad, pero baja popularidad. Promociónalos estratégicamente: ofrécelos especiales, promociónalos en redes sociales, menciónalos en el menú o sugiérelos por parte del personal.',
    icon: <Star className="h-4 w-4 text-purple-600" />
  },
  {
    name: 'Pasta Carbonara Original',
    category: 'Plato Estrella',
    categoryColor: 'text-yellow-500',
    income: '1.350,00 €',
    benefit: '753,00 €',
    cost: '597,00 €',
    margin: 70,
    marginColor: 'bg-green-500',
    recommendation: 'Estos platos son los caballos de batalla del restaurante. Mantén su calidad, precio y promoción para maximizar los beneficios. Considera ofertas o promociones que aumenten las ventas sin afectar el margen de beneficio.',
    icon: <Star className="h-4 w-4 text-yellow-500" />
  },
  {
    name: 'Entrecot de Vaca Madurada',
    category: 'Popular a Optimizar',
    categoryColor: 'text-blue-600',
    income: '1.275,00 €',
    benefit: '575,00 €',
    cost: '700,00 €',
    margin: 60,
    marginColor: 'bg-blue-500',
    recommendation: 'Estos platos son populares, pero su rentabilidad es baja. Analiza el coste de sus ingredientes para ver si hay espacio para reducirlo sin afectar a la calidad. Considera subir ligeramente el precio o introducir tamaños de porción más pequeños con precios ajustados.',
    icon: <Star className="h-4 w-4 text-blue-600" />
  },
    {
    name: 'Tarta de Queso Cremosa',
    category: 'Plato Estrella',
    categoryColor: 'text-yellow-500',
    income: '990,00 €',
    benefit: '595,00 €',
    cost: '395,00 €',
    margin: 75,
    marginColor: 'bg-green-500',
    recommendation: 'Estos platos son los caballos de batalla del restaurante. Mantén su calidad, precio y promoción para maximizar los beneficios. Considera ofertas o promociones que aumenten las ventas sin afectar el margen de beneficio.',
    icon: <Star className="h-4 w-4 text-yellow-500" />
  },
  {
    name: 'Lubina a la Sal',
    category: 'Popular a Optimizar',
    categoryColor: 'text-blue-600',
    income: '980,00 €',
    benefit: '500,00 €',
    cost: '480,00 €',
    margin: 64,
    marginColor: 'bg-blue-500',
    recommendation: 'Estos platos son populares, pero su rentabilidad es baja. Analiza el coste de sus ingredientes para ver si hay espacio para reducirlo sin afectar a la calidad. Considera subir ligeramente el precio o introducir tamaños de porción más pequeños con precios ajustados.',
    icon: <Star className="h-4 w-4 text-blue-600" />
  },
  {
    name: 'Croquetas de Jamón',
    category: 'Popular a Optimizar',
    categoryColor: 'text-blue-600',
    income: '840,00 €',
    benefit: '320,00 €',
    cost: '520,00 €',
    margin: 50,
    marginColor: 'bg-yellow-500',
    recommendation: 'Estos platos son populares, pero su rentabilidad es baja. Analiza el coste de sus ingredientes para ver si hay espacio para reducirlo sin afectar a la calidad. Considera subir ligeramente el precio o introducir tamaños de porción más pequeños con precios ajustados.',
    icon: <Star className="h-4 w-4 text-blue-600" />
  },
  {
    name: 'Ensalada César',
    category: 'Popular a Optimizar',
    categoryColor: 'text-blue-600',
    income: '760,00 €',
    benefit: '380,00 €',
    cost: '380,00 €',
    margin: 65,
    marginColor: 'bg-blue-500',
    recommendation: 'Estos platos son populares, pero su rentabilidad es baja. Analiza el coste de sus ingredientes para ver si hay espacio para reducirlo sin afectar a la calidad. Considera subir ligeramente el precio o introducir tamaños de porción más pequeños con precios ajustados.',
    icon: <Star className="h-4 w-4 text-blue-600" />
  },
  {
    name: 'Coulant de Chocolate',
    category: 'Plato Estrella',
    categoryColor: 'text-yellow-500',
    income: '754,00 €',
    benefit: '388,00 €',
    cost: '366,00 €',
    margin: 70,
    marginColor: 'bg-green-500',
    recommendation: 'Estos platos son los caballos de batalla del restaurante. Mantén su calidad, precio y promoción para maximizar los beneficios. Considera ofertas o promociones que aumenten las ventas sin afectar el margen de beneficio.',
    icon: <Star className="h-4 w-4 text-yellow-500" />
  },
  {
    name: 'Provoleta a la parrilla',
    category: 'Joya Oculta',
    categoryColor: 'text-purple-600',
    income: '480,00 €',
    benefit: '310,00 €',
    cost: '170,00 €',
    margin: 85,
    marginColor: 'bg-purple-500',
    recommendation: 'Estos platos tienen alta rentabilidad, pero baja popularidad. Promociónalos estratégicamente: ofrécelos especiales, promociónalos en redes sociales, menciónalos en el menú o sugiérelos por parte del personal.',
    icon: <Star className="h-4 w-4 text-purple-600" />
  },
    {
    name: 'Carrilleras al Vino Tinto',
    category: 'A Reinventar',
    categoryColor: 'text-red-500',
    income: '455,00 €',
    benefit: '130,00 €',
    cost: '325,00 €',
    margin: 30,
    marginColor: 'bg-red-500',
    recommendation: 'Estos platos tienen baja rentabilidad y popularidad. Considera mejorarlos con nuevas recetas, presentaciones o nombres más atractivos. Si tras las mejoras no hay resultados positivos, evalúa su eliminación del menú.',
    icon: <Star className="h-4 w-4 text-red-500" />
  },
  {
    name: 'Tiramisú Casero',
    category: 'Popular a Optimizar',
    categoryColor: 'text-blue-600',
    income: '405,00 €',
    benefit: '225,00 €',
    cost: '180,00 €',
    margin: 55,
    marginColor: 'bg-yellow-500',
    recommendation: 'Estos platos son populares, pero su rentabilidad es baja. Analiza el coste de sus ingredientes para ver si hay espacio para reducirlo sin afectar a la calidad. Considera subir ligeramente el precio o introducir tamaños de porción más pequeños con precios ajustados.',
    icon: <Star className="h-4 w-4 text-blue-600" />
  },
  {
    name: 'Gazpacho Andaluz (Temporada)',
    category: 'A Reinventar',
    categoryColor: 'text-red-500',
    income: '270,00 €',
    benefit: '99,00 €',
    cost: '171,00 €',
    margin: 40,
    marginColor: 'bg-red-500',
    recommendation: 'Estos platos tienen baja rentabilidad y popularidad. Considera mejorarlos con nuevas recetas, presentaciones o nombres más atractivos. Si tras las mejoras no hay resultados positivos, evalúa su eliminación del menú.',
    icon: <Star className="h-4 w-4 text-red-500" />
  },
    {
    name: 'Fruta de Temporada',
    category: 'A Reinventar',
    categoryColor: 'text-red-500',
    income: '100,00 €',
    benefit: '25,00 €',
    cost: '75,00 €',
    margin: 25,
    marginColor: 'bg-red-500',
    recommendation: 'Estos platos tienen baja rentabilidad y popularidad. Considera mejorarlos con nuevas recetas, presentaciones o nombres más atractivos. Si tras las mejoras no hay resultados positivos, evalúa su eliminación del menú.',
    icon: <Star className="h-4 w-4 text-red-500" />
  },
];

export default function MenuAnalysis() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Análisis de Menú</h1>
              <p className="text-muted-foreground">Herramientas estratégicas para analizar y mejorar la rentabilidad de tu carta.</p>
            </div>
            <div className="flex items-center gap-4">
              <Button>Volver a Analizar</Button>
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="joya-oculta">Joya Oculta</SelectItem>
                  <SelectItem value="plato-estrella">Plato Estrella</SelectItem>
                  <SelectItem value="popular-optimizar">Popular a Optimizar</SelectItem>
                  <SelectItem value="reinventar">A Reinventar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">Análisis de Rentabilidad por Plato</h2>
              <p className="text-muted-foreground mb-6">Desglose de cada plato, ordenado por su beneficio total.</p>
              
              <div className="space-y-4">
                {menuData.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-foreground">{item.name}</p>
                            <div className="flex items-center gap-2 text-sm">
                                {item.icon}
                                <span className={item.categoryColor}>{item.category}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-foreground">{item.income}</p>
                            <p className="text-sm text-muted-foreground">Beneficio Total: {item.benefit}</p>
                            <p className="text-xs text-muted-foreground">Coste: {item.cost}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                           <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className={`${item.marginColor} h-2.5 rounded-full`} style={{width: `${item.margin}%`}}></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Margen de Beneficio: {item.margin}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 p-4 border-t border-amber-200">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-900"><span className="font-semibold">Lola recomienda:</span> {item.recommendation}</p>
                        </div>
                    </div>
                  </Card>
                ))}
              </div>

            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
