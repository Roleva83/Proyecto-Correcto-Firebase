import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const sendLolaMessage = functions.https.onCall(async (data, context) => {
  // Verificar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
  }

  const { message, restauranteId } = data;
  
  if (!message || !restauranteId) {
    throw new functions.https.HttpsError('invalid-argument', 'Faltan parámetros requeridos');
  }

  try {
    // Guardar conversación en Firestore
    const conversacion = await admin.firestore().collection('conversaciones_lola').add({
      restaurante_id: restauranteId,
      usuario_id: context.auth.uid,
      pregunta: message,
      respuesta: 'Hola, soy Lola. Estoy aquí para ayudarte con tu restaurante. Por ahora estoy en modo de prueba.',
      tipo: 'consulta',
      contexto: 'chat',
      fecha_creacion: admin.firestore.FieldValue.serverTimestamp(),
      resuelto: false
    });

    return {
      success: true,
      conversacionId: conversacion.id,
      response: 'Hola, soy Lola. Estoy aquí para ayudarte con tu restaurante. Por ahora estoy en modo de prueba.'
    };
  } catch (error) {
    console.error('Error en sendLolaMessage:', error);
    throw new functions.https.HttpsError('internal', 'Error al procesar el mensaje');
  }
});
