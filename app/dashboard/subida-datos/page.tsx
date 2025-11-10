'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useAuth } from '@/app/contexts/AuthContext';
import { collection, onSnapshot, query, where, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/app/lib/firebase';
import { useDropzone } from 'react-dropzone';
import { FileText, Clock, BarChart, UploadCloud, X, Loader, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface UploadedFile {
    id: string;
    nombre_archivo: string;
    tamano_archivo: number;
    fecha_subida: {
        seconds: number;
        nanoseconds: number;
    };
    estado: 'subiendo' | 'subido' | 'procesando' | 'completado' | 'error';
    analisis?: any;
    url_descarga: string;
    ruta_storage: string;
}

interface UploadProgress {
  file: File;
  status: 'uploading' | 'analyzing' | 'completed' | 'error';
  error?: string;
}


export default function UploadDataPage() {
    const { user, loading } = useAuth();
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [uploads, setUploads] = useState<Record<string, UploadProgress>>({});

    // Real-time listener for Firestore
    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, `archivos_subidos`), 
            where('usuario_id', '==', user.uid), 
            orderBy('fecha_subida', 'desc')
        );
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const files: UploadedFile[] = [];
            querySnapshot.forEach((doc) => {
                files.push({ id: doc.id, ...doc.data() } as UploadedFile);
            });
            setUploadedFiles(files);
        });

        return () => unsubscribe();
    }, [user]);

    const handleFileUpload = useCallback(async (acceptedFiles: File[]) => {
      if (!user) {
          console.error("Debes iniciar sesión para subir archivos.");
          // You can show a toast here
          return;
      }
  
      for (const file of acceptedFiles) {
          const fileName = file.name;
          setUploads(prev => ({ ...prev, [fileName]: { file, status: 'uploading' } }));
  
          try {
              const formData = new FormData();
              formData.append('file', file);
              formData.append('userId', user.uid);
              formData.append('restauranteId', 'default-restaurant-id'); // Replace with actual restaurant ID
              formData.append('tipoArchivo', 'auto');
  
              // Step 1: Upload the file
              const uploadResponse = await fetch('/api/upload-file', {
                  method: 'POST',
                  body: formData,
              });
  
              if (!uploadResponse.ok) {
                  const { error } = await uploadResponse.json();
                  throw new Error(error || 'Error al subir el archivo.');
              }
  
              const { archivoId } = await uploadResponse.json();
  
              setUploads(prev => ({ ...prev, [fileName]: { ...prev[fileName], status: 'analyzing' } }));
  
              // Step 2: Trigger the analysis
              const analyzeResponse = await fetch('/api/analyze-file', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ archivoId }),
              });
  
              if (!analyzeResponse.ok) {
                  const { error } = await analyzeResponse.json();
                  throw new Error(error || 'Error al analizar el archivo.');
              }
              
              // The Firestore listener will automatically update the UI to 'completed'
              // but we can remove it from the progress list
              setUploads(prev => {
                const newUploads = { ...prev };
                delete newUploads[fileName];
                return newUploads;
              });
  
          } catch (error: any) {
              console.error(`Error con el archivo ${fileName}:`, error);
              setUploads(prev => ({
                  ...prev,
                  [fileName]: { ...prev[fileName], status: 'error', error: error.message }
              }));
          }
      }
    }, [user]);

    const handleDelete = async (file: UploadedFile) => {
        if (!user) return;
        if (!confirm(`¿Estás seguro de que quieres eliminar "${file.nombre_archivo}"?`)) return;

        try {
            // Delete from Firestore
            await deleteDoc(doc(db, 'archivos_subidos', file.id));
            
            // Delete from Storage
            const storageRef = ref(storage, file.ruta_storage);
            await deleteObject(storageRef);

            // You can add a success toast here
        } catch (error) {
            console.error("Error eliminando el archivo:", error);
            // You can add an error toast here
        }
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleFileUpload,
      accept: {
        'text/csv': ['.csv'],
        'application/vnd.ms-excel': ['.xls'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/pdf': ['.pdf'],
        'text/plain': ['.txt'],
        'application/json': ['.json'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
      },
      maxSize: 20 * 1024 * 1024,
    });

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
                                <div
                                  {...getRootProps()}
                                  className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors
                                  ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
                                >
                                  <input {...getInputProps()} />
                                  <div className="flex flex-col items-center gap-4 text-center">
                                    <div className="rounded-full border-8 border-gray-50 bg-gray-100 p-4">
                                      <UploadCloud className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className="text-secondary">
                                      <span className="font-semibold text-primary">Haz clic para subir</span> o arrastra y suelta
                                    </div>
                                    <p className="text-xs text-muted-foreground">CSV, XLS, PDF, TXT, JSON, JPG o PNG (máx. 20MB)</p>
                                  </div>
                                </div>
                                
                                {Object.values(uploads).length > 0 && (
                                  <div className="mt-6 space-y-3">
                                      <h3 className="font-semibold text-foreground">Progreso de Subida</h3>
                                      {Object.entries(uploads).map(([fileName, { status, error }]) => (
                                      <div key={fileName} className="flex items-center gap-4 rounded-lg border p-3">
                                          <FileText className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                                          <div className="flex-1 overflow-hidden">
                                              <p className="truncate text-sm font-medium text-foreground">{fileName}</p>
                                              {status === 'uploading' && <div className="mt-1 flex items-center gap-2 text-xs text-blue-600"><Loader className="h-3 w-3 animate-spin" /> Subiendo...</div>}
                                              {status === 'analyzing' && <div className="mt-1 flex items-center gap-2 text-xs text-amber-600"><Loader className="h-3 w-3 animate-spin" /> Analizando con IA...</div>}
                                              {status === 'error' && <p className="mt-1 text-xs text-red-600">{error}</p>}
                                          </div>
                                          <button onClick={() => setUploads(p => { const newP = {...p}; delete newP[fileName]; return newP;})} className="text-muted-foreground hover:text-foreground">
                                              <X className="h-5 w-5" />
                                          </button>
                                      </div>
                                      ))}
                                  </div>
                                )}
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
                                                        <span>{(file.tamano_archivo / (1024 * 1024)).toFixed(2)} MB</span>
                                                        <span>
                                                            {file.fecha_subida ? format(new Date(file.fecha_subida.seconds * 1000), 'dd MMM yyyy, HH:mm', { locale: es }) : '...'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {file.estado === 'completado' && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle className="h-3 w-3" />Completado</span>}
                                                    {file.estado === 'procesando' && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1"><Loader className="h-3 w-3 animate-spin" />Procesando</span>}
                                                    {file.estado === 'subido' && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">Subido</span>}
                                                    {file.estado === 'error' && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-800">Error</span>}
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(file)}><X className="h-4 w-4"/></Button>
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
