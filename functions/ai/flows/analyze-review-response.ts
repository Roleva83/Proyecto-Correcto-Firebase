// functions/ai/flows/analyze-review-response.ts

import { defineFlow } from "@genkit-ai/core";
import { googleAI } from '@genkit-ai/google-genai';

const model = googleAI.model('gemini-pro');

export const generateResponseToReview = defineFlow(
  {
    name: 'generateResponseToReview',
    inputSchema: {
      review: {
        type: 'string',
        description: 'Texto de la reseña del cliente',
      },
    },
    outputSchema: {
      response: {
        type: 'string',
        description: 'Respuesta sugerida con IA',
      },
    },
  },
  async ({ input }) => {
    const prompt = `
Eres un asistente de atención al cliente para restaurantes. Lee esta reseña:

"${input.review}"

Genera una respuesta amable, profesional y breve, usando el tono del restaurante.
`;

    const { text } = await model.generate(prompt);
    return { response: text };
  }
);
