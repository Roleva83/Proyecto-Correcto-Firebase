import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  const displayName = user.displayName || 'Usuario';
  
  console.log(`Nuevo usuario registrado: ${email}`);
  
  // TODO: Integrar con servicio de email (SendGrid, Mailgun, etc.)
  // Por ahora, solo guardamos en Firestore como notificación
  
  try {
    await admin.firestore().collection('notificaciones').add({
      tipo: 'bienvenida',
      usuario_id: user.uid,
      email: email,
      nombre: displayName,
      asunto: '¡Bienvenido a Caña y Reseña!',
      mensaje: `Hola ${displayName}, gracias por unirte a Caña y Reseña. Estamos aquí para ayudarte a gestionar tu restaurante.`,
      enviado: false,
      fecha_creacion: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`Notificación de bienvenida creada para ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Error creando notificación de bienvenida:', error);
    return { success: false, error: String(error) };
  }
});
