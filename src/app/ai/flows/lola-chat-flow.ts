'use server';
import { ai } from '@/ai/genkit';
import { getSalesDataForBusiness, getReviewsForBusiness } from '@/lib/firestore-server-utils';
import { z } from 'zod';

const LolaChatInputSchema = z.object({
  question: z.string().describe('La pregunta del usuario.'),
  restauranteId: z.string().describe('El ID del negocio para el cual es la pregunta.'),
});

export async function lolaChat(input: z.infer<typeof LolaChatInputSchema>): Promise<string> {
  const validatedInput = LolaChatInputSchema.parse(input);
  const { question, restauranteId } = validatedInput;

  const salesData = await getSalesDataForBusiness(restauranteId, 30);
  const reviewsData = await getReviewsForBusiness(restauranteId, 10);

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

  const { text } = await ai.generate({ prompt });
  return text;
}
