'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, Star, MessageSquare } from 'lucide-react'
import EmployeeDetailModal from '../components/team/EmployeeDetailModal'

const teamData = [
  {
    id: '1',
    name: 'Ana García',
    avatar: 'https://picsum.photos/seed/ana/80/80',
    avgRating: 4.9,
    reviewCount: 32,
    lastReviewDate: '2024-07-21',
    performance: 95,
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    avatar: 'https://picsum.photos/seed/carlos/80/80',
    avgRating: 4.5,
    reviewCount: 25,
    lastReviewDate: '2024-07-20',
    performance: 85,
  },
  {
    id: '3',
    name: 'Sofía Martínez',
    avatar: 'https://picsum.photos/seed/sofia/80/80',
    avgRating: 4.2,
    reviewCount: 18,
    lastReviewDate: '2024-07-19',
    performance: 70,
  },
  {
    id: '4',
    name: 'Javier López',
    avatar: 'https://picsum.photos/seed/javier/80/80',
    avgRating: 4.8,
    reviewCount: 29,
    lastReviewDate: '2024-07-22',
    performance: 92,
  },
];

export type Employee = typeof teamData[0];

export default function TeamPage() {
  const user = { name: 'Restaurante Ejemplo' };
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleNextEmployee = () => {
    if (!selectedEmployee) return;
    const currentIndex = teamData.findIndex(emp => emp.id === selectedEmployee.id);
    const nextIndex = (currentIndex + 1) % teamData.length;
    setSelectedEmployee(teamData[nextIndex]);
  };

  const handlePreviousEmployee = () => {
    if (!selectedEmployee) return;
    const currentIndex = teamData.findIndex(emp => emp.id === selectedEmployee.id);
    const prevIndex = (currentIndex - 1 + teamData.length) % teamData.length;
    setSelectedEmployee(teamData[prevIndex]);
  };

  return (
    <>
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

              <Card className="rounded-2xl border-border bg-white p-2 shadow-soft">
                  <CardHeader>
                      <CardTitle>Rendimiento del Personal</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-4">
                          {teamData.map((employee) => (
                              <div 
                                key={employee.id} 
                                className="flex items-center p-4 rounded-xl bg-white shadow-[inset_4px_4px_8px_#f0f0f0,inset_-4px_-4px_8px_#ffffff] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                                onClick={() => setSelectedEmployee(employee)}
                              >
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
                          ))}
                      </div>
                  </CardContent>
              </Card>

          </main>
        </div>
      </div>
      {selectedEmployee && (
        <EmployeeDetailModal
          employee={selectedEmployee}
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onNext={handleNextEmployee}
          onPrevious={handlePreviousEmployee}
        />
      )}
    </>
  )
}
