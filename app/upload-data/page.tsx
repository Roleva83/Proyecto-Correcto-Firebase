'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import FileUploader from '../components/uploads/FileUploader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FileText, Clock, BarChart } from 'lucide-react';
import { format } from 'date-fns';

interface UploadedFile {
    id: string;
    nombre_archivo: string;
    tamano: number;
    fecha_subida: {
        seconds: number;
        nanoseconds: number;
    };
    estado: string;
}

export default function UploadDataPage() {
    const { user, loading } = useAuth();
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, 'archivos_subidos'), orderBy('fecha_subida', 'desc'));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const files: UploadedFile[] = [];
            querySnapshot.forEach((doc) => {
                files.push({ id: doc.id, ...doc.data() } as UploadedFile);
            });
            setUploadedFiles(files);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header user={user} />
                    <main className="flex-1 p-8 text-center">
                        <p>Cargando...</p>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header user={user} />
                <main className="flex-1 p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground">Subida y Análisis de Datos</h1>
                        <p className="text-muted-foreground">Sube tus archivos (TPV, reservas, etc.) para que Lola IA los analice.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="shadow-soft">
                            <CardHeader>
                                <CardTitle>Subir Nuevos Archivos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FileUploader />
                            </CardContent>
                        </Card>

                        <Card className="shadow-soft">
                            <CardHeader>
                                <CardTitle>Historial de Archivos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                                    {uploadedFiles.length > 0 ? (
                                        uploadedFiles.map(file => (
                                            <div key={file.id} className="flex items-center gap-4 rounded-lg border p-3">
                                                <FileText className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="truncate text-sm font-medium text-foreground">{file.nombre_archivo}</p>
                                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                        <span>{(file.tamano / (1024 * 1024)).toFixed(2)} MB</span>
                                                        <span>
                                                            {file.fecha_subida ? format(new Date(file.fecha_subida.seconds * 1000), 'dd/MM/yyyy') : '...'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {file.estado === 'completado' && <Button variant="ghost">Ver Análisis</Button>}
                                                    {file.estado === 'pendiente' && <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>}
                                                    {file.estado === 'error' && <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">Error</span>}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-muted-foreground">
                                            <p>No has subido ningún archivo todavía.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8 shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart className="text-primary"/> Panel de Preguntas a tus Datos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Una vez tus archivos sean analizados, podrás hacer preguntas aquí para obtener insights.</p>
                            <div className="flex items-center gap-2">
                                <input placeholder="Ej: ¿Cuál fue el plato más vendido en la última semana?" className="flex-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                <Button disabled>Preguntar a Lola</Button>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
