import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// Inicializar Firebase Admin
admin.initializeApp();

// ========================================
// FUNCTION 1: Send Lola Message
// ========================================
export const sendLolaMessage = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
  }
  const { message, restauranteId } = data;
  if (!message || !restauranteId) {
    throw new functions.https.HttpsError('invalid-argument', 'Faltan parámetros requeridos');
  }
  try {
    const conversacion = await admin.firestore().collection('conversaciones_lola').add({
      restaurante_id: restauranteId,
      usuario_id: context.auth.uid,
      pregunta: message,
      respuesta: 'Hola, soy Lola. Estoy aquí para ayudarte.',
      tipo: 'consulta',
      contexto: 'chat',
      fecha_creacion: admin.firestore.FieldValue.serverTimestamp(),
      resuelto: false
    });
    return {
      success: true,
      conversacionId: conversacion.id,
      response: 'Hola, soy Lola. Estoy aquí para ayudarte.'
    };
  } catch (error) {
    console.error('Error en sendLolaMessage:', error);
    throw new functions.https.HttpsError('internal', 'Error al procesar el mensaje');
  }
});

// ========================================
// FUNCTION 2: Analyze Review
// ========================================
export const analyzeReview = functions.firestore
  .document('reseñas/{reseñaId}')
  .onCreate(async (snap, context) => {
    const reseña = snap.data();
    try {
      const sentimiento = analizarSentimiento(reseña.texto);
      await snap.ref.update({
        sentimiento: sentimiento,
        analizado: true,
        fecha_analisis: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Reseña ${context.params.reseñaId} analizada: ${sentimiento}`);
      return { success: true, sentimiento };
    } catch (error) {
      console.error('Error analizando reseña:', error);
      return { success: false, error: String(error) };
    }
  });

function analizarSentimiento(texto: string): string {
  const palabrasPositivas = ['excelente', 'bueno', 'delicioso', 'genial', 'increíble', 'perfecto'];
  const palabrasNegativas = ['malo', 'terrible', 'pésimo', 'horrible', 'sucio', 'lento'];
  const textoLower = texto.toLowerCase();
  let scorePositivo = 0;
  let scoreNegativo = 0;
  palabrasPositivas.forEach(palabra => {
    if (textoLower.includes(palabra)) scorePositivo++;
  });
  palabrasNegativas.forEach(palabra => {
    if (textoLower.includes(palabra)) scoreNegativo++;
  });
  if (scorePositivo > scoreNegativo) return 'positivo';
  if (scoreNegativo > scorePositivo) return 'negativo';
  return 'neutral';
}

// ========================================
// FUNCTION 3: Send Welcome Email
// ========================================
export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.firestore().collection('notificaciones').add({
      tipo: 'bienvenida',
      usuario_id: user.uid,
      email: user.email,
      nombre: user.displayName || 'Usuario',
      mensaje: `Bienvenido a Caña y Reseña`,
      enviado: false,
      fecha_creacion: admin.firestore.FieldValue.serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false };
  }
});

// ========================================
// FUNCTION 4: On New Review Notification
// ========================================
export const onNewReview = functions.firestore
  .document('reseñas/{reseñaId}')
  .onCreate(async (snap, context) => {
    const reseña = snap.data();
    try {
      const restauranteDoc = await admin.firestore()
        .collection('restaurantes')
        .doc(reseña.restaurante_id)
        .get();
      if (!restauranteDoc.exists) return { success: false };
      const restaurante = restauranteDoc.data();
      await admin.firestore().collection('notificaciones').add({
        tipo: 'nueva_reseña',
        restaurante_id: reseña.restaurante_id,
        reseña_id: context.params.reseñaId,
        usuario_admin: restaurante?.usuario_admin,
        mensaje: `Nueva reseña de ${reseña.autor}`,
        leido: false,
        fecha_creacion: admin.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  });

// ========================================
// FUNCTION 5: Calculate Restaurant Score
// ========================================
export const calculateRestaurantScore = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'No autenticado');
  }
  const { restauranteId } = data;
  try {
    const reseñas = await admin.firestore()
      .collection('reseñas')
      .where('restaurante_id', '==', restauranteId)
      .get();
    let suma = 0;
    let positivas = 0;
    reseñas.forEach(doc => {
      const r = doc.data();
      suma += r.puntuacion || 0;
      if (r.sentimiento === 'positivo') positivas++;
    });
    const promedio = reseñas.size > 0 ? suma / reseñas.size : 0;
    const porcentajePositivas = reseñas.size > 0 ? (positivas / reseñas.size) * 100 : 0;
    await admin.firestore().collection('restaurantes').doc(restauranteId).update({
      puntuacion_promedio: promedio,
      total_reseñas: reseñas.size,
      porcentaje_positivas: porcentajePositivas,
      ultima_actualizacion: admin.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, promedio, total: reseñas.size };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error calculando score');
  }
});

// ========================================
// FUNCTION 6: Process Menu Image (con IA)
// ========================================
export const processMenuImage = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'No autenticado');
  }
  const { imageUrl, restauranteId } = data;
  try {
    // TODO: Integrar con Google Vision API o Gemini para OCR
    // Por ahora, guardamos la imagen para procesamiento futuro
    await admin.firestore().collection('imagenes_pendientes').add({
      restaurante_id: restauranteId,
      imagen_url: imageUrl,
      procesado: false,
      fecha_subida: admin.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, message: 'Imagen recibida para procesamiento' };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error procesando imagen');
  }
});

// ========================================
// FUNCTION 7: Cleanup Old Data (Cron Job)
// ========================================
export const cleanupOldData = functions.pubsub
  .schedule('0 2 * * 0')
  .timeZone('Europe/Madrid')
  .onRun(async (context) => {
    console.log('Limpiando datos antiguos...');
    try {
      const seisMesesAtras = new Date();
      seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
      
      // Limpiar notificaciones antiguas leídas
      const notificacionesAntiguas = await admin.firestore()
        .collection('notificaciones')
        .where('leido', '==', true)
        .where('fecha_creacion', '<', seisMesesAtras)
        .get();
      
      const batch = admin.firestore().batch();
      notificacionesAntiguas.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log(`${notificacionesAntiguas.size} notificaciones antiguas eliminadas`);
      
      return { success: true, eliminadas: notificacionesAntiguas.size };
    } catch (error) {
      console.error('Error limpiando datos:', error);
      return { success: false, error: String(error) };
    }
  });

// ========================================
// FUNCTION 8: Generate Monthly Report (Cron Job)
// ========================================
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
        const reseñasSnapshot = await admin.firestore()
          .collection('reseñas')
          .where('restaurante_id', '==', restauranteId)
          .where('fecha_resena', '>=', mesAnterior)
          .get();
        
        const totalReseñas = reseñasSnapshot.size;
        let suma = 0;
        let positivas = 0;
        
        reseñasSnapshot.forEach(doc => {
          const r = doc.data();
          suma += r.puntuacion || 0;
          if (r.sentimiento === 'positivo') positivas++;
        });
        
        const promedio = totalReseñas > 0 ? suma / totalReseñas : 0;
        
        await admin.firestore().collection('reportes').add({
          restaurante_id: restauranteId,
          tipo: 'mensual',
          periodo: mesAnterior.toISOString().substring(0, 7),
          total_reseñas: totalReseñas,
          promedio_calificacion: promedio,
          reseñas_positivas: positivas,
          fecha_generacion: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      return { success: true, restaurantes: restaurantes.size };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  });

// ========================================
// FUNCTION 9: Sync External Reviews
// ========================================
export const syncExternalReviews = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'No autenticado');
  }
  const { restauranteId, plataforma } = data;
  try {
    // TODO: Integrar con APIs de Google My Business, TheFork, TripAdvisor
    // Por ahora, simulamos la sincronización
    await admin.firestore().collection('sincronizaciones').add({
      restaurante_id: restauranteId,
      plataforma: plataforma,
      estado: 'pendiente',
      fecha_solicitud: admin.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, message: `Sincronización de ${plataforma} iniciada` };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error en sincronización');
  }
});
