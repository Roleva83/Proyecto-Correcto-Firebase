import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onNewReview = functions.firestore
  .document('reseñas/{reseñaId}')
  .onCreate(async (snap, context) => {
    const reseña = snap.data();
    const reseñaId = context.params.reseñaId;
    
    try {
      // Obtener info del restaurante
      const restauranteDoc = await admin.firestore()
        .collection('restaurantes')
        .doc(reseña.restaurante_id)
        .get();
      
      if (!restauranteDoc.exists) {
        console.error('Restaurante no encontrado');
        return { success: false };
      }
      
      const restaurante = restauranteDoc.data();
      
      // Crear notificación para el admin del restaurante
      await admin.firestore().collection('notificaciones').add({
        tipo: 'nueva_reseña',
        restaurante_id: reseña.restaurante_id,
        reseña_id: reseñaId,
        usuario_admin: restaurante?.usuario_admin,
        plataforma: reseña.plataforma,
        puntuacion: reseña.puntuacion,
        autor: reseña.autor,
        mensaje: `Nueva reseña de ${reseña.autor} (${reseña.puntuacion}⭐) en ${reseña.plataforma}`,
        leido: false,
        fecha_creacion: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`Notificación creada para nueva reseña ${reseñaId}`);
      return { success: true };
    } catch (error) {
      console.error('Error en onNewReview:', error);
      return { success: false, error: String(error) };
    }
  });
