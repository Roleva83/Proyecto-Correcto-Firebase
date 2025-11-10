
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { getStorage } from 'firebase/storage';

interface UploadStatus {
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  downloadURL?: string;
}

const app = auth.app;
const storage = getStorage(app);


export default function FileUploader() {
  const { user } = useAuth();
  const [uploads, setUploads] = useState<Record<string, UploadStatus>>({});

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (!user) {
      // It's better to show a toast message here
      console.error("Debes iniciar sesión para subir archivos.");
      return;
    }

    acceptedFiles.forEach(file => {
      if (file.size > 20 * 1024 * 1024) { // 20 MB validation
        setUploads(prev => ({
          ...prev,
          [file.name]: { file, progress: 0, status: 'error', error: 'Archivo demasiado grande (máx 20MB)' }
        }));
        return;
      }
      
      const newUpload: UploadStatus = { file, progress: 0, status: 'uploading' };
      setUploads(prev => ({ ...prev, [file.name]: newUpload }));

      const fileId = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `user_uploads/${user.uid}/${fileId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploads(prev => ({
            ...prev,
            [file.name]: { ...prev[file.name], progress, status: 'uploading' }
          }));
        },
        (error) => {
          console.error("Error en la subida:", error);
          setUploads(prev => ({
            ...prev,
            [file.name]: { ...prev[file.name], status: 'error', error: 'Error al subir el archivo.' }
          }));
        },
        async () => {
          setUploads(prev => ({
            ...prev,
            [file.name]: { ...prev[file.name], status: 'processing', progress: 100 }
          }));

          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          try {
            await addDoc(collection(db, `users/${user.uid}/uploads`), {
              fileName: file.name,
              fileId: fileId,
              fileType: file.type,
              fileSize: file.size,
              storagePath: uploadTask.snapshot.ref.fullPath,
              downloadURL: downloadURL,
              uploadDate: serverTimestamp(),
              analysisStatus: 'pending',
            });
            
            // Simulate AI processing
            setTimeout(() => {
                setUploads(prev => ({
                    ...prev,
                    [file.name]: { ...prev[file.name], status: 'completed', downloadURL }
                }));
            }, 2000);

          } catch (error) {
            console.error("Error guardando metadatos en Firestore:", error);
            setUploads(prev => ({
              ...prev,
              [file.name]: { ...prev[file.name], status: 'error', error: 'Error al guardar los datos.' }
            }));
          }
        }
      );
    });

    fileRejections.forEach(({ file, errors }: any) => {
        setUploads(prev => ({
            ...prev,
            [file.name]: { file, progress: 0, status: 'error', error: errors[0].message }
        }));
    });

  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
    maxSize: 20 * 1024 * 1024, // 20MB
  });

  const removeUpload = (fileName: string) => {
    setUploads(prev => {
      const newUploads = { ...prev };
      delete newUploads[fileName];
      return newUploads;
    });
  };

  return (
    <div className="w-full">
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
            <h3 className="font-semibold text-foreground">Archivos para subir</h3>
            {Object.values(uploads).map(({ file, progress, status, error }, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center gap-4 rounded-lg border p-3">
                <FileIcon className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    
                    {status === 'uploading' && <div className="relative mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200"><div className="absolute h-full bg-primary" style={{ width: `${progress}%` }}></div></div>}
                    {status === 'processing' && <div className="mt-1 flex items-center gap-2 text-xs text-amber-600"><Loader className="h-3 w-3 animate-spin" /> Procesando con IA...</div>}
                    {status === 'completed' && <div className="mt-1 flex items-center gap-2 text-xs text-green-600"><CheckCircle className="h-3 w-3" /> Completado</div>}
                    {status === 'error' && <p className="mt-1 text-xs text-red-600">{error}</p>}
                </div>
                <button onClick={() => removeUpload(file.name)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                </button>
            </div>
            ))}
        </div>
      )}
    </div>
  );
}
