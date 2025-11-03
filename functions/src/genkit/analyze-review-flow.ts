import { ai } from './config';
import { z } from 'zod';

export const analyzeReviewFlow = ai.defineFlow(
  {
    name: 'analyzeReviewFlow',
    inputSchema: z.object({
      reviewText: z.string(),
      rating: z.number().min(1).max(5),
      platform: z.string(),
    }),
    outputSchema: z.object({
      sentiment: z.enum(['positivo', 'negativo', 'neutral']),
      mainTopics: z.array(z.string()),
      suggestedResponse: z.string(),
      actionableInsights: z.array(z.string()),
    }),
  },
  async (input) => {
    const prompt = `Analiza esta reseña de restaurante:

Plataforma: ${input.platform}
Calificación: ${input.rating}/5
Texto: "${input.reviewText}"

Proporciona:
1. Sentimiento general (positivo, negativo, neutral)
2. Temas principales mencionados
3. Sugerencia de respuesta profesional
4. Insights accionables para mejorar

Responde en formato JSON con esta estructura:
{
  "sentiment": "positivo/negativo/neutral",
  "mainTopics": ["tema1", "tema2"],
  "suggestedResponse": "respuesta sugerida",
  "actionableInsights": ["insight1", "insight2"]
}`;

    const { text } = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 600,
      },
    });

    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch {
      return {
        sentiment: 'neutral',
        mainTopics: ['Reseña procesada'],
        suggestedResponse: 'Gracias por tu opinión.',
        actionableInsights: ['Revisar reseña manualmente'],
      };
    }
  }
);
