import { ai } from './config';
import { z } from 'zod';

export const lolaChatFlow = ai.defineFlow(
  {
    name: 'lolaChatFlow',
    inputSchema: z.object({
      message: z.string(),
      context: z.string().optional(),
      restauranteInfo: z.object({
        nombre: z.string(),
        tipo: z.string(),
      }).optional(),
    }),
    outputSchema: z.object({
      response: z.string(),
      suggestions: z.array(z.string()).optional(),
    }),
  },
  async (input) => {
    const systemPrompt = `Eres Lola, una asistente virtual experta en gestión de restaurantes. 
Tu trabajo es ayudar a los propietarios de restaurantes con:
- Análisis de reseñas y reputación online
- Optimización de menús
- Estrategias de marketing
- Gestión de personal
- Mejora de la experiencia del cliente

Responde de forma amigable, profesional y con consejos prácticos y accionables.`;

    const userMessage = input.restauranteInfo 
      ? `Restaurante: ${input.restauranteInfo.nombre} (${input.restauranteInfo.tipo})\nPregunta: ${input.message}`
      : input.message;

    const { text } = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: `${systemPrompt}\n\n${userMessage}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    return {
      response: text,
    };
  }
);
