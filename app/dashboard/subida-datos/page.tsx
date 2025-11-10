'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/app/lib/firebase';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Upload, FileText, Trash2, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Header from '@/app/components/layout/Header';
import Sidebar from '@/app/components/layout/Sidebar';
import { toast, Toaster } from 'sonner';

interface ArchivoSubido {
  id: string;
  nombre_archivo: string;
  tipo_datos: string;
  tamano: number;
  fecha_subida: any;
  estado: 'pendiente' | 'procesando' | 'completado' | 'error';
  url_descarga: string;
  ruta_storage: string;
  analisis?: any;
}

export default function SubidaDatosPage() {
  const { user } = useAuth();
  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tipoArchivo, setTipoArchivo] = useState<string>('otros');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(false);
    
    if (!user.uid) return;

    const q = query(
      collection(db, 'archivos_subidos'),
      where('usuario_id', '==', user.uid),
      orderBy('fecha_subida', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const archivosData: ArchivoSubido[] = [];
      snapshot.forEach((doc) => {
        archivosData.push({ id: doc.id, ...doc.data() } as ArchivoSubido);
      });
      setArchivos(archivosData);
    }, (error) => {
        console.error("Error al obtener archivos: ", error);
        toast.error("No se pudieron cargar los archivos.");
    });

    return () => unsubscribe();
  }, [user]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error('El archivo es demasiado grande. Máximo 20MB.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.uid) {
      toast.error('Selecciona un archivo primero');
      return;
    }

    setUploading(true);
    toast.info('Subiendo archivo...', {
        description: selectedFile.name,
    });


    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('userId', user.uid);
      formData.append('restauranteId', 'default-restaurant-id'); // Reemplazar con ID real
      formData.append('tipoArchivo', tipoArchivo);

      const uploadResponse = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || 'Error al subir el archivo');
      }

      const uploadData = await uploadResponse.json();
      toast.success('Archivo subido correctamente. Iniciando análisis...');

      const analyzeResponse = await fetch('/api/analyze-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archivoId: uploadData.archivoId }),
      });
      
      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || 'El análisis del archivo falló');
      }

      toast.success('Análisis completado');
      
    } catch (error: any) {
      console.error('Error en el proceso:', error);
      toast.error(error.message || 'Ocurrió un error inesperado');
    } finally {
      setSelectedFile(null);
      setTipoArchivo('otros');
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      setUploading(false);
    }
  };

  const handleDelete = async (archivo: ArchivoSubido) => {
    if (!confirm('¿Estás seguro de eliminar este archivo?')) return;

    toast.info('Eliminando archivo...');
    try {
      const storageRef = ref(storage, archivo.ruta_storage);
      await deleteObject(storageRef);
      await deleteDoc(doc(db, 'archivos_subidos', archivo.id));
      toast.success('Archivo eliminado correctamente');
    } catch (error: any) {
      console.error('Error al eliminar:', error);
      toast.error('No se pudo eliminar el archivo.');
    }
  };
  
    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'completado': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'procesando': return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

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
        <Toaster richColors />
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Header user={user} />
            <main className="flex-1 p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">Subida y Análisis de Datos</h1>
                    <p className="text-muted-foreground">Sube tus archivos (TPV, reservas, etc.) para que Lola IA los analice.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle>Subir Nuevos Archivos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Tipo de datos</label>
                                <select
                                    value={tipoArchivo}
                                    onChange={(e) => setTipoArchivo(e.target.value)}
                                    className="w-full p-2 border rounded-lg bg-background"
                                    disabled={uploading}
                                >
                                    <option value="tpv">TPV / Ventas</option>
                                    <option value="reservas">Reservas</option>
                                    <option value="resenas">Reseñas</option>
                                    <option value="menus">Menús</option>
                                    <option value="otros">Otros</option>
                                </select>
                            </div>
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <input
                                type="file"
                                accept=".csv,.xls,.xlsx,.pdf,.txt,.json,.jpg,.jpeg,.png"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="file-upload"
                                disabled={uploading}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline font-medium">
                                    Haz clic para subir
                                </label>
                                <p className="text-sm text-gray-500 mt-1">o arrastra y suelta</p>
                                {selectedFile && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-green-800 font-medium">✓ Archivo seleccionado: {selectedFile.name}</p>
                                    <p className="text-xs text-green-700 mt-1">{formatBytes(selectedFile.size)}</p>
                                </div>
                                )}
                            </div>

                            <Button
                                onClick={handleUpload}
                                disabled={!selectedFile || uploading}
                                className="w-full"
                            >
                                {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Subiendo y analizando...
                                </>
                                ) : 'Subir y Analizar'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle>Historial de Archivos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {archivos.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">
                                <p>No has subido ningún archivo todavía.</p>
                            </div>
                            ) : (
                            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                                {archivos.map((archivo) => (
                                <div key={archivo.id} className="flex items-center gap-4 rounded-lg border p-3">
                                    <FileText className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="truncate text-sm font-medium text-foreground">{archivo.nombre_archivo}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>{formatBytes(archivo.tamano)}</span>
                                            <span>
                                                {archivo.fecha_subida?.toDate?.().toLocaleDateString() || 'Reciente'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getEstadoIcon(archivo.estado)}
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(archivo)}><Trash2 className="h-4 w-4 text-red-500"/></Button>
                                </div>
                                ))}
                            </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    </div>
  );
}
