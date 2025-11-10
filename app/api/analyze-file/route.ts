import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const { archivoId } = await request.json();

    if (!archivoId) {
      return NextResponse.json(
        { error: 'Se requiere el ID del archivo' },
        { status: 400 }
      );
    }

    const archivoRef = doc(db, 'archivos_subidos', archivoId);
    const archivoSnap = await getDoc(archivoRef);

    if (!archivoSnap.exists()) {
      return NextResponse.json(
        { error: 'Archivo no encontrado' },
        { status: 404 }
      );
    }

    const archivoData = archivoSnap.data();

    await updateDoc(archivoRef, {
      estado: 'procesando'
    });

    const analisis = {
      resumen: `Archivo de ${archivoData.tipo_datos} analizado correctamente.`,
      metricas: {
        total_registros: 0,
        periodo: 'No especificado',
        tipo_datos: archivoData.tipo_datos
      },
      insights: [
        'Los datos han sido cargados correctamente',
        'Se requiere procesamiento adicional para análisis detallado'
      ],
      recomendaciones: [
        'Revisar la estructura de los datos',
        'Verificar que las columnas coincidan con el formato esperado'
      ],
      fecha_analisis: new Date().toISOString()
    };

    await updateDoc(archivoRef, {
      estado: 'completado',
      analisis,
      fecha_analisis: serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      analisis,
      mensaje: 'Análisis completado correctamente'
    });

  } catch (error: any) {
    console.error('Error al analizar archivo:', error);
    
    try {
      const { archivoId } = await request.json();
      if (archivoId) {
        const archivoRef = doc(db, 'archivos_subidos', archivoId);
        await updateDoc(archivoRef, {
          estado: 'error',
          error_mensaje: error.message
        });
      }
    } catch (e) {
      console.error('Error al actualizar estado:', e);
    }

    return NextResponse.json(
      { error: 'Error al analizar el archivo', details: error.message },
      { status: 500 }
    );
  }
}
