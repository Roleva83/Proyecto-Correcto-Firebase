import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { ai } from '@/ai/genkit';

export async function POST(request: NextRequest) {
  try {
    const { archivoId } = await request.json();

    if (!archivoId) {
      return NextResponse.json({ error: 'Falta archivoId' }, { status: 400 });
    }

    const archivoRef = doc(db, 'archivos_subidos', archivoId);
    const archivoSnap = await getDoc(archivoRef);

    if (!archivoSnap.exists()) {
      return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
    }

    const archivoData = archivoSnap.data();
    await updateDoc(archivoRef, { estado: 'procesando' });

    const storageRef = ref(storage, archivoData.ruta_storage);
    const downloadURL = await getDownloadURL(storageRef);

    const fileResponse = await fetch(downloadURL);
    const fileBuffer = await fileResponse.arrayBuffer();
    const fileBase64 = Buffer.from(fileBuffer).toString('base64');

    const fileExtension = archivoData.nombre_archivo.split('.').pop()?.toLowerCase();
    let datosExtraidos;

    if (fileExtension === 'pdf') {
      datosExtraidos = await procesarPDF(fileBase64, archivoData.tipo_datos);
    } else if (['csv', 'xls', 'xlsx'].includes(fileExtension || '')) {
      datosExtraidos = await procesarExcel(fileBase64, archivoData.tipo_datos);
    } else {
      throw new Error('Formato de archivo no soportado');
    }

    if (datosExtraidos && archivoData.tipo_datos === 'tpv') {
      await guardarVentas(archivoData.usuario_id, archivoData.restaurante_id, datosExtraidos, archivoId);
    }

    await updateDoc(archivoRef, {
      estado: 'completado',
      analisis: datosExtraidos.metadata || {},
      fecha_procesamiento: serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      mensaje: 'Archivo procesado correctamente',
      productos_extraidos: datosExtraidos.productos?.length || 0
    });

  } catch (error: any) {
    console.error('Error al analizar archivo:', error);
    return NextResponse.json(
      { error: 'Error al procesar el archivo', details: error.message },
      { status: 500 }
    );
  }
}

async function procesarPDF(fileBase64: string, tipoDatos: string) {
  const prompt = tipoDatos === 'tpv' ? promptVentasTPV : promptGenerico;

  const response = await ai.generate({
    model: 'googleai/gemini-2.0-flash-exp',
    prompt: [
      { text: prompt },
      {
        media: {
          contentType: 'application/pdf',
          url: `data:application/pdf;base64,${fileBase64}`
        }
      }
    ],
    config: {
      temperature: 0.1,
      maxOutputTokens: 8192
    }
  });

  let jsonText = response.text.trim();
  jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  return JSON.parse(jsonText);
}

async function procesarExcel(fileBase64: string, tipoDatos: string) {
  throw new Error('Procesamiento de Excel aún no implementado');
}

async function guardarVentas(
  usuarioId: string,
  restauranteId: string,
  datosExtraidos: any,
  archivoOrigenId: string
) {
  const ventasRef = collection(db, `usuarios/${usuarioId}/restaurantes/${restauranteId}/ventas`);
  const batch: Promise<any>[] = [];

  datosExtraidos.productos?.forEach((producto: any) => {
    batch.push(
      addDoc(ventasRef, {
        producto: producto.nombre,
        categoria: producto.categoria || 'Sin categoría',
        unidades: producto.unidades || 0,
        precio_base: producto.precio_base || 0,
        precio_total: producto.precio_total || 0,
        porcentaje_ventas: producto.porcentaje_ventas || 0,
        fecha: serverTimestamp(),
        archivo_origen_id: archivoOrigenId,
        periodo_inicio: datosExtraidos.metadata?.periodo_inicio || null,
        periodo_fin: datosExtraidos.metadata?.periodo_fin || null
      })
    );
  });

  await Promise.all(batch);
}

const promptVentasTPV = `
Analiza este documento PDF de ventas de restaurante y extrae TODOS los productos en formato JSON.

REGLAS CRÍTICAS:
- Extrae TODOS los productos (no resumas ni omitas)
- Convierte formatos europeos: "1.234,56 €" → 1234.56
- Si hay categorías, agrúpalas
- Calcula precio unitario si es necesario

FORMATO DE SALIDA (JSON válido):
{
  "metadata": {
    "restaurante": "string",
    "periodo_inicio": "YYYY-MM-DD o null",
    "periodo_fin": "YYYY-MM-DD o null",
    "total_productos": number,
    "total_ventas_base": number,
    "total_ventas_iva": number
  },
  "productos": [
    {
      "nombre": "string",
      "categoria": "string",
      "unidades": number,
      "precio_base": number,
      "precio_total": number,
      "porcentaje_ventas": number
    }
  ]
}

IMPORTANTE: Responde SOLO con JSON válido, sin explicaciones ni markdown.
`;

const promptGenerico = `
Extrae toda la información relevante de este documento y devuélvela en formato JSON estructurado.
Responde SOLO con JSON válido, sin explicaciones.
`;
