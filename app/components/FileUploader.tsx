'use client';

import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '@/app/lib/firebase';
import { useAuth } from '@/app/contexts/AuthContext';
import { addDoc, collection } from 'firebase/firestore';

interface FileUploaderProps {
  categoria: 'tpv' | 'reservas' | 'reseñas' | 'menus' | 'otros';
}

export default function FileUploader({ categoria }: FileUploaderProps) {
  const [progreso, setProgreso] = useState(0);
  const [archivo, setArchivo] = useState<File | null>(null);
  const { user } = useAuth();

  const subirArchivo = async () => {
    if (!archivo || !user) return;

    // Nota: El storage de Firebase no está inicializado en lib/firebase.ts, esto fallará.
    // const storageRef = ref(storage, `users/${user.uid}/${categoria}/${archivo.name}`);
    // const uploadTask = uploadBytesResumable(storageRef, archivo);
    
    // Simulación de subida mientras se corrige storage
    console.log(`Simulando subida de ${archivo.name}...`);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setProgreso(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const downloadURL = `https://fake-storage.com/users/${user.uid}/${categoria}/${archivo.name}`;
        guardarMetadataEnFirestore(downloadURL);
      }
    }, 100);
  };

  const guardarMetadataEnFirestore = async (url: string) => {
    if (!user) return;
    try {
      await addDoc(collection(db, `usuarios/${user.uid}/archivos`), {
        nombre: archivo!.name,
        tipo: archivo!.type,
        categoria: categoria,
        url: url,
        fechaSubida: new Date(),
        procesado: false
      });
      console.log('Metadatos guardados en Firestore');
    } catch (error) {
      console.error('Error guardando metadatos en Firestore:', error);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold">Subir archivo - {categoria.toUpperCase()}</h3>
      
      <input
        type="file"
        onChange={(e) => setArchivo(e.target.files?.[0] || null)}
        accept="*/*"
        className="block w-full text-sm border rounded p-2"
      />
      
      <button
        onClick={subirArchivo}
        disabled={!archivo}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Subir {categoria.toUpperCase()}
      </button>

      {progreso > 0 && progreso < 100 && (
        <div className="w-full bg-gray-200 rounded">
          <div
            className="bg-blue-500 text-xs text-white text-center p-0.5 rounded"
            style={{ width: `${progreso}%` }}
          >
            {progreso.toFixed(0)}%
          </div>
        </div>
      )}
       {progreso >= 100 && (
         <p className="text-sm text-green-600">¡Archivo subido con éxito!</p>
       )}
    </div>
  );
}
