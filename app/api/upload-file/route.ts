import { NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/app/lib/firebase';
import { validateFile } from '@/app/lib/fileProcessing';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const restauranteId = formData.get('restauranteId') as string;
    let tipoArchivo = formData.get('tipoArchivo') as string;

    if (!file || !userId || !restauranteId) {
      return NextResponse.json({ success: false, error: 'Faltan datos requeridos.' }, { status: 400 });
    }

    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }
    
    if (!tipoArchivo || tipoArchivo === 'auto') {
        // Implement detection logic if needed, for now we default to 'otros'
        tipoArchivo = 'otros';
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storagePath = `uploads/${tipoArchivo}/${userId}/${fileName}`;
    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, 'archivos_subidos'), {
      usuario_id: userId,
      restaurante_id: restauranteId,
      nombre_archivo: file.name,
      tipo_archivo: file.type,
      tamano_archivo: file.size,
      ruta_storage: storagePath,
      url_descarga: downloadURL,
      estado: 'subido',
      fecha_subida: serverTimestamp(),
      analisis: null,
    });

    return NextResponse.json({
      success: true,
      archivoId: docRef.id,
      url: downloadURL,
    });

  } catch (error) {
    console.error('Error en la subida de archivo:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}
