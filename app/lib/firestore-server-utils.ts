'use server';
// IMPORTANT: This file is intended for server-side use only (e.g., in Genkit flows).
// It uses firebase-admin, which has elevated privileges.

import * as admin from 'firebase-admin';

// Inicializa Firebase Admin SDK.
// Se asegura de que solo se inicialice una vez.
if (!admin.apps.length) {
  // Cuando se despliega en Firebase/Google Cloud, las credenciales se detectan automáticamente.
  // Para desarrollo local, necesitas configurar el archivo de credenciales de la cuenta de servicio.
  // process.env.GOOGLE_APPLICATION_CREDENTIALS = "path/to/your/service-account-key.json";
  try {
    admin.initializeApp();
  } catch (error) {
    console.error('Error inicializando Firebase Admin SDK. Asegúrate de que las credenciales están configuradas en el entorno del servidor.', error);
  }
}

const db = admin.firestore();

/**
 * Obtiene los datos de ventas de un negocio específico de los últimos X días.
 * @param restauranteId El ID del negocio.
 * @param days El número de días hacia atrás para buscar ventas.
 * @returns Una promesa que se resuelve en un array de objetos de ventas.
 */
export async function getSalesDataForBusiness(restauranteId: string, days: number = 30): Promise<any[]> {
  if (!admin.apps.length) return [];
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const snapshot = await db.collection(`businesses/${restauranteId}/ventas`)
      .where('fecha', '>=', startDate)
      .where('fecha', '<=', endDate)
      .orderBy('fecha', 'desc')
      .get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error al obtener datos de ventas para ${restauranteId}:`, error);
    return []; // Devuelve un array vacío en caso de error para no romper el flujo.
  }
}

/**
 * Obtiene las últimas X reseñas para un negocio específico.
 * @param restauranteId El ID del negocio.
 * @param limit El número de reseñas a obtener.
 * @returns Una promesa que se resuelve en un array de objetos de reseñas.
 */
export async function getReviewsForBusiness(restauranteId: string, limit: number = 10): Promise<any[]> {
  if (!admin.apps.length) return [];
  try {
    // Simulación: vamos a buscar en 'archivos_subidos' que tengan un analisis
    // En un futuro, esto debería consultar una colección `reviews` dedicada.
    const snapshot = await db.collection('archivos_subidos')
      .where('restaurante_id', '==', restauranteId)
      .where('estado', '==', 'completado')
      // Asumiendo que el análisis de tpv podría contener algo similar a reseñas
      .orderBy('fecha_procesamiento', 'desc')
      .limit(limit)
      .get();
      
    if (snapshot.empty) {
      return [];
    }

    // Extraemos el campo 'analisis' que debería contener la estructura de las reseñas.
    const reviews = snapshot.docs.map(doc => doc.data().analisis).filter(Boolean);
    return reviews;

  } catch (error) {
    console.error(`Error al obtener reseñas para ${restauranteId}:`, error);
    return [];
  }
}

/**
 * Añade datos simulados (ventas o reseñas) a Firestore para un restaurante específico.
 * @param restauranteId El ID del negocio.
 * @param type El tipo de dato ('ventas' o 'reviews').
 * @param payload El array de objetos de datos a añadir.
 * @returns Una promesa que se resuelve con el número de registros añadidos.
 */
export async function addSimulatedData(restauranteId: string, type: 'ventas' | 'reviews', payload: any[]): Promise<{ count: number }> {
    if (!admin.apps.length) {
        throw new Error('Firebase Admin no está inicializado.');
    }
    
    // Validar que el negocio exista
    const businessRef = db.collection('businesses').doc(restauranteId);
    const businessDoc = await businessRef.get();
    if (!businessDoc.exists) {
        throw new Error(`El restaurante con ID ${restauranteId} no existe.`);
    }

    const collectionPath = `businesses/${restauranteId}/${type}`;
    const batch = db.batch();

    payload.forEach(item => {
        const docRef = db.collection(collectionPath).doc();
        batch.set(docRef, {
            ...item,
            // Asegurarnos de que las fechas sean Timestamps de Firestore si son strings
            fecha: item.fecha ? admin.firestore.Timestamp.fromDate(new Date(item.fecha)) : admin.firestore.FieldValue.serverTimestamp(),
            simulated: true // Añadir una bandera para identificar datos simulados
        });
    });

    await batch.commit();

    return { count: payload.length };
}