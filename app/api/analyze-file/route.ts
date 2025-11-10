import { NextResponse } from 'next/server';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getBytes } from 'firebase/storage';
import { db, storage } from '@/app/lib/firebase';
import { parseCSV, parseExcel, parsePDF } from '@/app/lib/fileProcessing';
// Placeholder for Genkit AI
// import { ai } from '@/app/ai/genkit';
// import { someAnalysisFlow } from '@/app/ai/flows/analysisFlow';

export async function POST(request: Request) {
  try {
    const { archivoId } = await request.json();

    if (!archivoId) {
      return NextResponse.json({ success: false, error: 'Falta el ID del archivo.' }, { status: 400 });
    }

    const fileDocRef = doc(db, 'archivos_subidos', archivoId);
    
    await updateDoc(fileDocRef, { estado: 'procesando' });

    const fileDocSnap = await getDoc(fileDocRef);
    if (!fileDocSnap.exists()) {
      await updateDoc(fileDocRef, { estado: 'error', error_analisis: 'Documento no encontrado.' });
      return NextResponse.json({ success: false, error: 'Documento no encontrado.' }, { status: 404 });
    }

    const fileData = fileDocSnap.data();
    const storagePath = fileData.ruta_storage;
    const fileType = fileData.tipo_archivo;

    const storageRef = ref(storage, storagePath);
    const fileBuffer = await getBytes(storageRef);
    const file = new Blob([fileBuffer], { type: fileType });

    let content;
    if (fileType === 'text/csv') {
      content = await parseCSV(file);
    } else if (fileType.includes('spreadsheetml') || fileType.includes('ms-excel')) {
      content = await parseExcel(file);
    } else if (fileType === 'application/pdf') {
        content = await parsePDF(file);
    } else {
      content = 'Tipo de archivo no soportado para análisis de contenido.';
    }
    
    // --- Placeholder for Gemini Analysis ---
    // This is where you would call your Genkit flow with the extracted content
    // const analysisResult = await someAnalysisFlow(content);
    // For now, we'll use a simulated result.
    const simulatedAnalysis = {
        summary: "Este es un resumen de ejemplo del análisis de IA.",
        key_insights: [
            "Insight clave 1: Las ventas aumentan los fines de semana.",
            "Insight clave 2: El 'Risotto' es el plato más popular.",
            "Insight clave 3: Se detectan quejas sobre el tiempo de espera en las reseñas."
        ],
        data_preview: Array.isArray(content) ? content.slice(0, 3) : content.substring(0, 200),
    };
    // --- End of Placeholder ---

    await updateDoc(fileDocRef, {
      estado: 'completado',
      analisis: simulatedAnalysis,
      fecha_analisis: new Date(),
    });

    return NextResponse.json({ success: true, analysis: simulatedAnalysis });

  } catch (error) {
    console.error('Error en el análisis de archivo:', error);
    // If archivoId is available, try to update the document state to 'error'
    const { archivoId } = await request.json().catch(() => ({}));
    if (archivoId) {
        const fileDocRef = doc(db, 'archivos_subidos', archivoId);
        await updateDoc(fileDocRef, { estado: 'error', error_analisis: (error as Error).message }).catch(() => {});
    }
    return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}
