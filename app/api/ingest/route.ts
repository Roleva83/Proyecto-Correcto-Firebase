import { NextRequest, NextResponse } from 'next/server';
import { addSimulatedData } from '@/lib/firestore-server-utils';

export async function POST(request: NextRequest) {
  const INGESTION_API_KEY = process.env.DATA_INGESTION_API_KEY;
  const authHeader = request.headers.get('Authorization');

  // 1. Validar la clave de API
  if (!INGESTION_API_KEY) {
    console.error('La variable de entorno DATA_INGESTION_API_KEY no está configurada en el servidor.');
    return NextResponse.json({ error: 'Configuración de servidor incorrecta.' }, { status: 500 });
  }

  if (!authHeader || authHeader !== `Bearer ${INGESTION_API_KEY}`) {
    return NextResponse.json({ error: 'Acceso no autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { restauranteId, type, payload } = body;

    // 2. Validar el cuerpo de la petición
    if (!restauranteId || !type || !payload) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos: restauranteId, type, payload.' }, { status: 400 });
    }

    if (!['ventas', 'reviews'].includes(type)) {
      return NextResponse.json({ error: 'El tipo de dato debe ser "ventas" o "reviews".' }, { status: 400 });
    }

    if (!Array.isArray(payload) || payload.length === 0) {
      return NextResponse.json({ error: 'El "payload" debe ser un array con al menos un elemento.' }, { status: 400 });
    }

    // 3. Procesar y guardar los datos
    const result = await addSimulatedData(restauranteId, type, payload);
    
    return NextResponse.json({
      success: true,
      message: `Se han añadido ${result.count} registros de tipo "${type}" para el restaurante ${restauranteId}.`,
    });

  } catch (error: any) {
    console.error('Error en la ingesta de datos:', error);
    if (error.message.includes('JSON')) {
        return NextResponse.json({ error: 'El cuerpo de la petición no es un JSON válido.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error interno del servidor.', details: error.message }, { status: 500 });
  }
}
