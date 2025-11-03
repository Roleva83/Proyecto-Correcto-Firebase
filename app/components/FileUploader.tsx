
'use client';

import { useState } from 'react';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db } from '@/app/lib/firebase';
import { useAuth } from '@/app/contexts/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface FileUploaderProps {
  categoria: 'tpv' | 'reservas' | 'reseñas' | 'menus' | 'otros';
}

const storage = getStorage(auth.app);

export default function FileUploader({ categoria }: FileUploaderProps) {
  const [progreso, setProgreso] = useState(0);
  const [archivo, setArchivo] = useState<File | null>(null);
  const { user } = useAuth();

  const subirArchivo = async () => {
    if (!archivo || !user) return;

    setProgreso(0);
    const storageRef = ref(storage, `users/${user.uid}/${categoria}/${archivo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, archivo);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgreso(progress);
      },
      (error) => {
        console.error("Error subiendo archivo:", error);
        setProgreso(0); 
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Archivo disponible en', downloadURL);
          guardarMetadataEnFirestore(downloadURL);
          setProgreso(100); 
        });
      }
    );
  };

  const guardarMetadataEnFirestore = async (url: string) => {
    if (!user || !archivo) return;
    try {
      await addDoc(collection(db, `users/${user.uid}/uploads`), {
        nombre: archivo.name,
        tipo: archivo.type,
        categoria: categoria,
        url: url,
        fechaSubida: serverTimestamp(),
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
        disabled={!archivo || (progreso > 0 && progreso < 100)}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {progreso > 0 && progreso < 100 ? 'Subiendo...' : `Subir ${categoria.toUpperCase()}`}
      </button>

      {progreso > 0 && (
        <div className="w-full bg-gray-200 rounded">
          <div
            className="bg-blue-500 text-xs text-white text-center p-0.5 rounded"
            style={{ width: `${progreso}%` }}
          >
            {progreso.toFixed(0)}%
          </div>
        </div>
      )}
       {progreso === 100 && (
         <p className="text-sm text-green-600">¡Archivo subido con éxito!</p>
       )}
    </div>
  );
}
