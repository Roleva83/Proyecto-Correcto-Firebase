'use client';

import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface FileUploaderProps {
  categoria: 'tpv' | 'reservas' | 'reseñas' | 'menus' | 'otros';
}

export default function FileUploader({ categoria }: FileUploaderProps) {
  const [progreso, setProgreso] = useState(0);
  const [archivo, setArchivo] = useState<File | null>(null);
  const { user } = useAuth();

  const subirArchivo = async () => {
    if (!archivo || !user) return;

    const rutaStorage = `users/${user.uid}/${categoria}/${archivo.name}`;
    const storageRef = ref(storage, rutaStorage);

    const uploadTask = uploadBytesResumable(storageRef, archivo);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgreso(progress);
      },
      (error) => {
        console.error('Error subiendo archivo:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await guardarMetadataEnFirestore(downloadURL);
      }
    );
  };

  const guardarMetadataEnFirestore = async (url: string) => {
    const { addDoc, collection } = await import('firebase/firestore');
    const { db } = await import('../../lib/firebase');

    await addDoc(collection(db, `usuarios/${user!.uid}/archivos`), {
      nombre: archivo!.name,
      tipo: archivo!.type,
      categoria: categoria,
      url: url,
      fechaSubida: new Date(),
      procesado: false
    });
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
    </div>
  );
}