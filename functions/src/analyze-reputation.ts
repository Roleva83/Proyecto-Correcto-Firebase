import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const analyzeReview = functions.firestore
  .document('reseñas/{reseñaId}')
  .onCreate(async (snap, context) => {
    const reseña = snap.data();
    
    try {
      // Análisis simple de sentimiento
      const sentimiento = analizarSentimiento(reseña.texto);
      
      // Actualizar documento con análisis
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
  // Análisis simple por palabras clave
  // TODO: Integrar con Gemini para análisis más avanzado
  const palabrasPositivas = ['excelente', 'bueno', 'delicioso', 'genial', 'increíble', 'perfecto', 'maravilloso'];
  const palabrasNegativas = ['malo', 'terrible', 'pésimo', 'horrible', 'sucio', 'lento', 'frío'];
  
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
