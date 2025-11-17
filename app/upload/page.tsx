
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { collection, query, where, onSnapshot, orderBy, doc, getDoc } from 'firebase/firestore';
import { UploadCloud, File as FileIcon, X, CheckCircle, Loader, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

interface UploadedFile {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: {
    seconds: number;
    nanoseconds: number;
  };
  downloadURL: string;
}

const functions = getFunctions();
const uploadRestaurantFile = httpsCallable(functions, 'uploadRestaurantFile');

export default function UploadPage() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [storageUsed, setStorageUsed] = useState(0);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Fetch uploaded files and storage usage
  useEffect(() => {
    if (!user?.restaurante_id) return;

    const filesQuery = query(
      collection(db, 'uploads'),
      where('restaurantId', '==', user.restaurante_id),
      orderBy('uploadDate', 'desc')
    );

    const unsubscribeFiles = onSnapshot(filesQuery, (snapshot) => {
      const filesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UploadedFile));
      setUploadedFiles(filesData);
    }, (error) => {
        toast.error("Error al cargar el historial de archivos.");
        console.error("Error fetching files: ", error);
    });
    
    const restaurantRef = doc(db, 'restaurants', user.restaurante_id);
    const unsubscribeRestaurant = onSnapshot(restaurantRef, (doc) => {
        if(doc.exists()) {
            setStorageUsed(doc.data().totalStorageUsed || 0);
        }
    }, (error) => {
        toast.error("Error al obtener el uso de almacenamiento.");
        console.error("Error fetching restaurant data: ", error);
    });


    return () => {
      unsubscribeFiles();
      unsubscribeRestaurant();
    };
  }, [user]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        toast.error('El archivo es demasiado grande. Máximo 20MB.');
        return;
      }
      setSelectedFile(file);
    }
  };
  
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.restaurante_id) {
      toast.error('Por favor, selecciona un archivo y asegúrate de haber iniciado sesión.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    const toastId = toast.loading('Preparando subida...');

    try {
      toast.info('Convirtiendo archivo...', { id: toastId });
      const base64File = await convertFileToBase64(selectedFile);
      setUploadProgress(50); // Simulate progress

      toast.info('Subiendo a la nube...', { id: toastId });
      await uploadRestaurantFile({
        file: base64File,
        restaurantId: user.restaurante_id,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
      });

      setUploadProgress(100);
      toast.success('¡Archivo subido con éxito!', { id: toastId });
      setSelectedFile(null);

    } catch (error: any) {
      console.error('Error al subir archivo:', error);
      toast.error('Error al subir el archivo', {
        id: toastId,
        description: error.message || 'Ocurrió un error inesperado.',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Subida de Archivos</h1>
            <p className="text-muted-foreground">Sube tus archivos (TPV, reservas, etc.) para que Lola IA los analice.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                <Card className="shadow-soft">
                    <CardHeader>
                        <CardTitle>Subir Nuevo Archivo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                            <UploadCloud className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <input
                                type="file"
                                accept=".csv,.xls,.xlsx,.pdf"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="file-upload"
                                disabled={uploading}
                            />
                            <label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline font-medium">
                                Haz clic para subir un archivo
                            </label>
                            <p className="text-sm text-gray-500 mt-1">o arrástralo aquí (max 20MB)</p>
                            {selectedFile && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-left">
                                <p className="text-sm text-green-800 font-medium flex items-center justify-between">
                                    <span>✓ {selectedFile.name}</span>
                                    <button onClick={() => setSelectedFile(null)} disabled={uploading}>
                                        <X className="h-4 w-4 text-green-800"/>
                                    </button>
                                </p>
                                <p className="text-xs text-green-700 mt-1">{formatBytes(selectedFile.size)}</p>
                            </div>
                            )}
                        </div>
                        {uploading && (
                            <div className="relative pt-1">
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                                    <div style={{ width: `${uploadProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"></div>
                                </div>
                            </div>
                        )}
                        <Button onClick={handleUpload} disabled={!selectedFile || uploading} className="w-full">
                            {uploading ? <><Loader className="w-4 h-4 mr-2 animate-spin" /> Subiendo...</> : 'Subir Archivo'}
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="shadow-soft">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2"><HardDrive className="h-5 w-5 text-primary"/> Almacenamiento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Has utilizado</p>
                        <p className="text-2xl font-bold text-foreground">{formatBytes(storageUsed)} de 5 GB</p>
                         <div className="relative pt-2">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-primary/20">
                                <div style={{ width: `${(storageUsed / 5368709120) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Historial de Archivos Subidos</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>No has subido ningún archivo todavía.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center gap-4 rounded-lg border p-3">
                        <FileIcon className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 overflow-hidden">
                          <p className="truncate text-sm font-medium text-foreground">{file.fileName}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{formatBytes(file.fileSize)}</span>
                            <span>
                              {file.uploadDate ? new Date(file.uploadDate.seconds * 1000).toLocaleDateString() : 'Fecha no disponible'}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => window.open(file.downloadURL, '_blank')}>
                            Descargar
                        </Button>
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
