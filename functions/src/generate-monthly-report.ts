import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Se ejecuta el día 1 de cada mes a las 00:00
export const generateMonthlyReport = functions.pubsub
  .schedule('0 0 1 * *')
  .timeZone('Europe/Madrid')
  .onRun(async (context) => {
    console.log('Generando reportes mensuales...');
    
    try {
      const restaurantes = await admin.firestore()
        .collection('restaurantes')
        .where('activo', '==', true)
        .get();
      
      const mesAnterior = new Date();
      mesAnterior.setMonth(mesAnterior.getMonth() - 1);
      
      for (const restauranteDoc of restaurantes.docs) {
        const restauranteId = restauranteDoc.id;
        
        // Obtener reseñas del mes anterior
        const reseñasSnapshot = await admin.firestore()
          .collection('reseñas')
          .where('restaurante_id', '==', restauranteId)
          .where('fecha_resena', '>=', mesAnterior)
          .get();
        
        const totalReseñas = reseñasSnapshot.size;
        let sumaCalificaciones = 0;
        let positivas = 0;
        let negativas = 0;
        
        reseñasSnapshot.forEach(doc => {
          const reseña = doc.data();
          sumaCalificaciones += reseña.puntuacion || 0;
          if (reseña.sentimiento === 'positivo') positivas++;
          if (reseña.sentimiento === 'negativo') negativas++;
        });
        
        const promedioCalificacion = totalReseñas > 0 ? sumaCalificaciones / totalReseñas : 0;
        
        // Guardar reporte
        await admin.firestore().collection('reportes').add({
          restaurante_id: restauranteId,
          tipo: 'mensual',
          periodo: mesAnterior.toISOString().substring(0, 7), // YYYY-MM
          total_reseñas: totalReseñas,
          promedio_calificacion: promedioCalificacion,
          reseñas_positivas: positivas,
          reseñas_negativas: negativas,
          fecha_generacion: admin.firestore.FieldValue.serverTimestamp()
        });
        
        console.log(`Reporte generado para restaurante ${restauranteId}`);
      }
      
      return { success: true, restaurantes: restaurantes.size };
    } catch (error) {
      console.error('Error generando reportes:', error);
      return { success: false, error: String(error) };
    }
  });
