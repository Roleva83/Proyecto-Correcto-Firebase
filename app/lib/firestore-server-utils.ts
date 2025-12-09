// IMPORTANT: This file is intended for server-side use only (e.g., in Genkit flows).
// It uses firebase-admin, which has elevated privileges.

import * as admin from 'firebase-admin';

// Inicializa Firebase Admin SDK.
// Se asegura de que solo se inicialice una vez.
if (!admin.apps.length) {
  // Cuando se despliega en Firebase/Google Cloud, las credenciales se detectan automáticamente.
  // Para desarrollo local, necesitas configurar el archivo de credenciales de la cuenta de servicio.
  // process.env.GOOGLE_APPLICATION_CREDENTIALS = "path/to/your/service-account-key.json";
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Obtiene los datos de ventas de un negocio específico de los últimos X días.
 * @param restauranteId El ID del negocio.
 * @param days El número de días hacia atrás para buscar ventas.
 * @returns Una promesa que se resuelve en un array de objetos de ventas.
 */
export async function getSalesDataForBusiness(restauranteId: string, days: number = 30): Promise<any[]> {
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
  try {
    // Nota: Firestore no permite consultas complejas en colecciones anidadas sin índices.
    // Esta es una simplificación. Para un caso real, podríamos necesitar un campo businessId en cada reseña
    // o consultar la colección `archivos_subidos` que contiene `restaurante_id`.
    // Por simplicidad, asumiremos que existe una colección `reviews` de nivel superior con `restaurante_id`.
    
    // Simulación: vamos a buscar en 'archivos_subidos' que tengan un analisis
    const snapshot = await db.collection('archivos_subidos')
      .where('restaurante_id', '==', restauranteId)
      .where('estado', '==', 'completado')
      .where('tipo_datos', '==', 'tpv') // Asumiendo que el análisis de tpv contiene reseñas
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
