
import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const restauranteId = formData.get('restauranteId') as string;
    const tipoArchivo = formData.get('tipoArchivo') as string;

    if (!file || !userId || !restauranteId) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Máximo 20MB.' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const folder = tipoArchivo || 'otros';
    const filePath = `uploads/${folder}/${userId}/${fileName}`;

    const storageRef = ref(storage, filePath);
    const fileBuffer = await file.arrayBuffer();
    const uploadResult = await uploadBytes(storageRef, fileBuffer, {
      contentType: file.type,
    });

    const downloadURL = await getDownloadURL(uploadResult.ref);

    const archivoData = {
      usuario_id: userId,
      restaurante_id: restauranteId,
      nombre_archivo: file.name,
      nombre_archivo_storage: fileName,
      tipo_archivo: file.type,
      tipo_datos: folder,
      tamano: file.size,
      url_descarga: downloadURL,
      ruta_storage: filePath,
      fecha_subida: serverTimestamp(),
      estado: 'pendiente',
      analisis: null
    };

    const docRef = await addDoc(collection(db, 'archivos_subidos'), archivoData);

    return NextResponse.json({
      success: true,
      archivoId: docRef.id,
      url: downloadURL,
      mensaje: 'Archivo subido correctamente'
    });

  } catch (error: any) {
    console.error('Error al subir archivo:', error);
    return NextResponse.json(
      { error: 'Error al subir el archivo', details: error.message },
      { status: 500 }
    );
  }
}
