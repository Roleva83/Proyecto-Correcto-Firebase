'use server';

import { ai } from '@/ai/genkit';
import { getSalesDataForBusiness, getReviewsForBusiness } from '@/lib/firestore-server-utils';
import { z } from 'zod';

// Definimos los esquemas de entrada y salida para mayor seguridad y claridad
const LolaChatInputSchema = z.object({
  question: z.string().describe('La pregunta del usuario.'),
  restauranteId: z.string().describe('El ID del negocio para el cual es la pregunta.'),
});

// El flujo principal que orquesta la lógica de Lola
const lolaChatFlow = ai.defineFlow(
  {
    name: 'lolaChatFlow',
    inputSchema: LolaChatInputSchema,
    outputSchema: z.string(),
  },
  async ({ question, restauranteId }) => {
    // 1. Obtener datos relevantes de Firestore de forma segura
    // Solo se obtienen datos para el restauranteId proporcionado.
    const salesData = await getSalesDataForBusiness(restauranteId, 30); // últimos 30 días
    const reviewsData = await getReviewsForBusiness(restauranteId, 10); // últimas 10 reseñas

    // 2. Construir el prompt para el modelo de IA
    const prompt = `
      Eres Lola, una asistente de IA experta en gestión de restaurantes. 
      Tu tono es profesional, cercano y proactivo.
      Un usuario del restaurante con ID "${restauranteId}" te hace la siguiente pregunta.

      Pregunta del usuario: "${question}"

      Usa los siguientes datos para formular tu respuesta. Si los datos no son suficientes para responder, indícalo amablemente y sugiere qué información necesitarías.

      DATOS DE VENTAS (últimos 30 días):
      ${salesData.length > 0 ? JSON.stringify(salesData, null, 2) : 'No hay datos de ventas disponibles.'}

      DATOS DE RESEÑAS (últimas 10):
      ${reviewsData.length > 0 ? JSON.stringify(reviewsData, null, 2) : 'No hay datos de reseñas disponibles.'}

      Basándote en la pregunta y los datos, proporciona una respuesta clara y útil.
    `;

    // 3. Llamar al modelo de IA (Gemini) con el prompt enriquecido
    const { output } = await ai.generate({
      prompt,
      config: {
        temperature: 0.5, // Un poco más creativo pero sin alucinar
      },
    });

    return output;
  }
);


// Función exportada que el frontend llamará
export async function lolaChat(input: z.infer<typeof LolaChatInputSchema>): Promise<string> {
    // Validamos la entrada antes de ejecutar el flujo
    const validatedInput = LolaChatInputSchema.parse(input);
    return await lolaChatFlow(validatedInput);
}
