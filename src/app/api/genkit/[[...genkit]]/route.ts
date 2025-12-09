// src/app/api/genkit/[[...genkit]]/route.ts

import { defineFlow, generate, init } from 'genkit';
import { gemini } from '@genkit-ai/google-genai';
import { genkitNextApp } from '@genkit-ai/next/server';
import * as z from 'zod';

// 1. Inicializa Genkit
init({
  // Configura el modelo Gemini que utilizaremos
  plugins: [gemini.configure({
    models: [{
      name: 'gemini-2.5-flash',
      task: 'generate'
    }]
  })],
  logLevel: 'debug', 
});

// 2. Define un Flow para generar respuestas profesionales a reseñas
export const resenaReviewFlow = defineFlow(
  {
    name: 'resenaReviewFlow',
    inputSchema: z.object({
      restaurantName: z.string().describe('Nombre del restaurante'),
      reviewText: z.string().describe('El texto original de la reseña del cliente'),
    }),
    outputSchema: z.string().describe('Una respuesta amistosa y profesional para el cliente.'),
  },
  async ({ restaurantName, reviewText }) => {
    // Llama al modelo Gemini con el prompt de gestión de reputación
    const response = await generate({
      model: 'gemini-2.5-flash',
      prompt: `Actúa como un gestor de reputación para un restaurante. Responde a la siguiente reseña de ${restaurantName} de una manera profesional y amable.

Reseña: "${reviewText}"

Tu respuesta:`,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  }
);

// 3. Exporta el manejador de la API para Next.js
export const { GET, POST } = genkitNextApp({
  flows: { resenaReviewFlow },
});
