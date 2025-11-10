'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MessageSquare, TrendingUp, Sparkles, QrCode } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { Employee } from '@/team/page'

interface EmployeeDetailModalProps {
    employee: Employee | null;
    isOpen: boolean;
    onClose: () => void;
}

const performanceChartData = [
  { day: 'Lun', rendimiento: 75 }, { day: 'Mar', rendimiento: 78 }, { day: 'Mié', rendimiento: 82 },
  { day: 'Jue', rendimiento: 80 }, { day: 'Vie', rendimiento: 88 }, { day: 'Sáb', rendimiento: 92 },
  { day: 'Dom', rendimiento: 90 },
];

const mentionedReviews = [
    { rating: 5, platform: 'Google', comment: '¡Ana fue increíble! Súper atenta y amable.' },
    { rating: 5, platform: 'TripAdvisor', comment: 'El servicio de Ana marcó la diferencia.' },
    { rating: 4, platform: 'TheFork', comment: '...nos atendió Ana, muy profesional.' },
]

export default function EmployeeDetailModal({ employee, isOpen, onClose }: EmployeeDetailModalProps) {
    if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
            <DialogHeader>
                <DialogTitle>Detalle del Empleado</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Columna Izquierda */}
                <div className="space-y-6">
                    <Card className="shadow-soft">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-4 border-primary/30">
                                <AvatarImage src={employee.avatar} alt={employee.name} />
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">{employee.name}</h2>
                                <div className="flex items-center gap-4 mt-2">
                                    <Badge variant="secondary" className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500" /> {employee.avgRating.toFixed(1)} Puntuación Media</Badge>
                                    <Badge variant="secondary" className="flex items-center gap-1"><MessageSquare className="h-3 w-3 text-blue-500" /> {employee.reviewCount} Reseñas</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Evolución del Rendimiento</CardTitle>
                        </CardHeader>
                        <CardContent className="h-64">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis unit="%" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: 'white', borderColor: 'hsl(var(--primary))', borderRadius: '12px' }}/>
                                    <Line type="monotone" dataKey="rendimiento" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-primary" /> QR Personal de Reseña</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-sm text-muted-foreground mb-4">Usa este QR para que los clientes dejen reseñas mencionando a {employee.name}.</p>
                            <div className="flex justify-center">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/review?employee=${employee.id}`} alt="QR Code" />
                            </div>
                            <Button variant="outline" className="mt-4">Descargar QR</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Columna Derecha */}
                <div className="space-y-6">
                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Reseñas Mencionadas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                            {mentionedReviews.map((review, index) => (
                                <div key={index} className="p-3 rounded-lg border bg-gray-50/50">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <Badge variant="outline">{review.platform}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="shadow-soft bg-amber-50 border-amber-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-amber-900"><Sparkles className="h-5 w-5 text-primary" /> Sugerencias de Incentivos (IA)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 rounded-lg bg-white/50">
                                <p className="font-semibold text-amber-800 text-sm">Bono por Excelencia</p>
                                <p className="text-xs text-amber-700">Otorga un bono de 50€ si mantiene una puntuación media superior a 4.8 durante un mes.</p>
                            </div>
                             <div className="p-3 rounded-lg bg-white/50">
                                <p className="font-semibold text-amber-800 text-sm">Día Libre Adicional</p>
                                <p className="text-xs text-amber-700">Regala un día libre pagado si consigue 5 menciones positivas seguidas.</p>
                            </div>
                            <Button variant="secondary" className="w-full mt-2">Crear Plan de Incentivos</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
