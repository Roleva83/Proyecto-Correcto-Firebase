import { ai } from './config';
import { z } from 'zod';

export const strategyRecommendationsFlow = ai.defineFlow(
  {
    name: 'strategyRecommendationsFlow',
    inputSchema: z.object({
      restaurantData: z.object({
        nombre: z.string(),
        tipo: z.string(),
        totalReseñas: z.number(),
        promedioCalificacion: z.number(),
        porcentajePositivas: z.number(),
      }),
      recentReviews: z.array(z.string()).optional(),
    }),
    outputSchema: z.object({
      overallStrategy: z.string(),
      priorities: z.array(z.string()),
      quickWins: z.array(z.string()),
      longTermGoals: z.array(z.string()),
    }),
  },
  async (input) => {
    const { restaurantData } = input;
    
    const prompt = `Como consultor experto en restaurantes, analiza estos datos:

Restaurante: ${restaurantData.nombre} (${restaurantData.tipo})
Total de reseñas: ${restaurantData.totalReseñas}
Calificación promedio: ${restaurantData.promedioCalificacion}/5
Reseñas positivas: ${restaurantData.porcentajePositivas}%

Proporciona:
1. Estrategia general para mejorar
2. 3 prioridades principales
3. 3 mejoras rápidas ("quick wins")
4. 3 objetivos a largo plazo

Sé específico, práctico y enfocado en resultados medibles.`;

    const { text } = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    return {
      overallStrategy: text,
      priorities: ['Mejorar tiempo de servicio', 'Capacitar personal', 'Actualizar menú'],
      quickWins: ['Responder todas las reseñas', 'Mejorar presentación de platos', 'Optimizar reservas online'],
      longTermGoals: ['Aumentar calificación a 4.5+', 'Duplicar reseñas positivas', 'Expandir base de clientes'],
    };
  }
);
