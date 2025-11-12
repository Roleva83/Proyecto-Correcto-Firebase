
'use client'
import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Lightbulb, TrendingUp, AlertTriangle, DollarSign, TrendingDown } from 'lucide-react'

type Category = 'A Reinventar' | 'Popular a Optimizar' | 'Joya Oculta' | 'Plato Estrella';

const menuData = [
  {
    name: 'Carrilleras al Vino Tinto',
    category: 'A Reinventar' as Category,
    income: 455.00,
    benefit: 130.00,
    cost: 325.00,
    margin: 30,
    recommendation: 'Baja rentabilidad y popularidad. Considera mejorar la receta o presentación.',
  },
  {
    name: 'Gazpacho Andaluz (Temporada)',
    category: 'A Reinventar' as Category,
    income: 270.00,
    benefit: 99.00,
    cost: 171.00,
    margin: 40,
    recommendation: 'Baja rentabilidad y popularidad. Evalúa si merece la pena mantenerlo en carta.',
  },
    {
    name: 'Fruta de Temporada',
    category: 'A Reinventar' as Category,
    income: 100.00,
    benefit: 25.00,
    cost: 75.00,
    margin: 25,
    recommendation: 'Margen muy bajo. Considera un ligero aumento de precio o un proveedor más económico.',
  },
  {
    name: 'Entrecot de Vaca Madurada',
    category: 'Popular a Optimizar' as Category,
    income: 1275.00,
    benefit: 575.00,
    cost: 700.00,
    margin: 60,
    recommendation: 'Popular pero con margen justo. Intenta optimizar costes o ajustar el precio.',
  },
  {
    name: 'Lubina a la Sal',
    category: 'Popular a Optimizar' as Category,
    income: 980.00,
    benefit: 500.00,
    cost: 480.00,
    margin: 64,
    recommendation: 'Buen volumen de ventas, pero el margen puede mejorar. Revisa el coste del producto.',
  },
  {
    name: 'Croquetas de Jamón',
    category: 'Popular a Optimizar' as Category,
    income: 840.00,
    benefit: 320.00,
    cost: 520.00,
    margin: 50,
    recommendation: 'Muy popular. Un pequeño ajuste en el precio podría aumentar mucho el beneficio.',
  },
  {
    name: 'Ensalada César',
    category: 'Popular a Optimizar' as Category,
    income: 760.00,
    benefit: 380.00,
    cost: 380.00,
    margin: 65,
    recommendation: 'Buena popularidad. Explora opciones para reducir el coste de los ingredientes.',
  },
   {
    name: 'Tiramisú Casero',
    category: 'Popular a Optimizar' as Category,
    income: 405.00,
    benefit: 225.00,
    cost: 180.00,
    margin: 55,
    recommendation: 'Postre muy demandado. Optimiza la receta para mejorar el margen de beneficio.',
  },
  {
    name: 'Risotto de Setas y Trufa',
    category: 'Joya Oculta' as Category,
    income: 1375.00,
    benefit: 866.25,
    cost: 508.75,
    margin: 80,
    recommendation: 'Alta rentabilidad. Promociónalo para aumentar su popularidad y ventas.',
  },
  {
    name: 'Provoleta a la parrilla',
    category: 'Joya Oculta' as Category,
    income: 480.00,
    benefit: 310.00,
    cost: 170.00,
    margin: 85,
    recommendation: 'Excelente margen. Entrena al personal para que lo sugiera activamente.',
  },
  {
    name: 'Pasta Carbonara Original',
    category: 'Plato Estrella' as Category,
    income: 1350.00,
    benefit: 753.00,
    cost: 597.00,
    margin: 70,
    recommendation: 'Tu plato estrella. Mantenlo visible y asegura su calidad consistente.',
  },
    {
    name: 'Tarta de Queso Cremosa',
    category: 'Plato Estrella' as Category,
    income: 990.00,
    benefit: 595.00,
    cost: 395.00,
    margin: 75,
    recommendation: 'Gran popularidad y margen. Destácalo en el menú físico y digital.',
  },
  {
    name: 'Coulant de Chocolate',
    category: 'Plato Estrella' as Category,
    income: 754.00,
    benefit: 388.00,
    cost: 366.00,
    margin: 70,
    recommendation: 'Un clásico rentable. Sugiere maridajes para aumentar el ticket medio.',
  },
];

const categoryOrder: Category[] = ['A Reinventar', 'Popular a Optimizar', 'Joya Oculta', 'Plato Estrella'];

const sortedMenuData = [...menuData].sort((a, b) => {
  return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
});

const getCategoryStyles = (margin: number): { name: string; icon: React.ReactNode; tagBg: string; tagColor: string; barColor: string; } => {
  if (margin > 70) return { name: 'Plato Estrella', icon: <Star className="h-4 w-4" />, tagBg: '#E6F9EE', tagColor: '#48BB78', barColor: '#48BB78' };
  if (margin >= 40) return { name: 'A Optimizar', icon: <TrendingUp className="h-4 w-4" />, tagBg: '#FFF9E6', tagColor: '#D4AF37', barColor: '#D4AF37' };
  return { name: 'A Replantear', icon: <AlertTriangle className="h-4 w-4" />, tagBg: '#FEECEC', tagColor: '#F56565', barColor: '#F56565' };
};


export default function MenuAnalysis() {
  const user = { name: 'Restaurante Ejemplo' };
  const [filter, setFilter] = useState<string>('Todos');

  const getFilteredData = () => {
    if (filter === 'Todos') return sortedMenuData;
    if (filter === 'Rentables') return sortedMenuData.filter(item => item.margin > 70);
    if (filter === 'A Optimizar') return sortedMenuData.filter(item => item.margin >= 40 && item.margin <= 70);
    if (filter === 'En Riesgo') return sortedMenuData.filter(item => item.margin < 40);
    return sortedMenuData;
  }

  const filteredData = getFilteredData();
  
  const totalBenefit = menuData.reduce((acc, item) => acc + item.benefit, 0);
  const totalIncome = menuData.reduce((acc, item) => acc + item.income, 0);
  const averageMargin = totalIncome > 0 ? (totalBenefit / totalIncome) * 100 : 0;
  const riskyDishes = menuData.filter(item => item.margin < 40).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#F9FAFB]">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Análisis de Menú</h1>
            <p className="text-muted-foreground">Herramientas estratégicas para analizar y mejorar la rentabilidad de tu carta.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-white rounded-2xl shadow-md">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                        <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Beneficio total</p>
                        <p className="text-2xl font-bold text-foreground">{totalBenefit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                    </div>
                </div>
            </Card>
            <Card className="p-4 bg-white rounded-2xl shadow-md">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                        <TrendingUp className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Margen medio</p>
                        <p className="text-2xl font-bold text-foreground">{averageMargin.toFixed(0)}%</p>
                    </div>
                </div>
            </Card>
            <Card className="p-4 bg-white rounded-2xl shadow-md">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Platos en riesgo</p>
                        <p className="text-2xl font-bold text-foreground">{riskyDishes}</p>
                    </div>
                </div>
            </Card>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
              <Button onClick={() => setFilter('Rentables')} variant={filter === 'Rentables' ? 'primary' : 'outline'} className="rounded-full">⭐ Rentables</Button>
              <Button onClick={() => setFilter('A Optimizar')} variant={filter === 'A Optimizar' ? 'primary' : 'outline'} className="rounded-full">🧠 A Optimizar</Button>
              <Button onClick={() => setFilter('En Riesgo')} variant={filter === 'En Riesgo' ? 'primary' : 'outline'} className="rounded-full">⚠️ En Riesgo</Button>
              <Button onClick={() => setFilter('Todos')} variant={filter === 'Todos' ? 'secondary' : 'ghost'} className="rounded-full">📋 Todos</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredData.map((item, index) => {
              const styles = getCategoryStyles(item.margin);
              const isTrendingUp = item.margin > 50;

              return (
              <Card key={index} className="bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1" style={{boxShadow: '0 2px 6px rgba(0,0,0,0.05)'}}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full mb-3 self-start" style={{ backgroundColor: styles.tagBg, color: styles.tagColor }}>
                    {styles.icon}
                    <span>{styles.name}</span>
                  </div>

                  <div className="border-t border-gray-100 my-2"></div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.name}</h3>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
                    <span className="font-semibold text-gray-800 text-lg">💰 Beneficio: <span className="text-xl">{item.benefit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></span>
                    <span className="flex items-center font-semibold">
                      {isTrendingUp ? <TrendingUp className="h-4 w-4 mr-1 text-green-500"/> : <TrendingDown className="h-4 w-4 mr-1 text-red-500" />}
                      Margen: {item.margin}%
                    </span>
                    <span>🧾 Coste: {item.cost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1 mb-4">
                      <div className="h-1 rounded-full" style={{width: `${item.margin}%`, backgroundColor: styles.barColor}}></div>
                  </div>

                  <div className="border-t border-gray-100 my-2"></div>

                  <div className="flex items-start gap-3 mt-2">
                      <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700"><span className="font-semibold">Recomendación IA:</span> {item.recommendation}</p>
                  </div>
                </div>
              </Card>
            )})}
          </div>
        </main>
      </div>
    </div>
  )
}

    