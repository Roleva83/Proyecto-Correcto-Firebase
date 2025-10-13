import { defineFlow } from '@genkit-ai/flow';
import OpenAI from 'openai';

// Usaremos OpenAI porque ya está en tus dependencias y es la forma más rápida
// de probar sin crear una cuenta en GCP/Vertex.
// Variables de entorno que debes configurar:
// OPENAI_API_KEY - tu clave de OpenAI
// OPENAI_MODEL - (opcional) modelo a usar, por ejemplo: "gpt-4o-mini" o "gpt-4-turbo"
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const openai = new OpenAI({ apiKey: openaiApiKey });

async function generateWithOpenAI(prompt: string) {
  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY must be set in environment variables');
  }

  const res: any = await openai.chat.completions.create({
    model: openaiModel,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.9,
  });

  // Extraer texto según la estructura de la respuesta
  const text = res?.choices?.[0]?.message?.content ?? res?.choices?.[0]?.text ?? JSON.stringify(res);
  return { text };
}
export const generateResponseToReview = defineFlow(
  {
    name: 'generate-response-to-review',
    inputSchema: {
      review: 'string',
    },
  },
  async ({ input }) => {
    const prompt = `
Eres un asistente de atención al cliente para restaurantes. Lee esta reseña:

"${input.review}"

Genera una respuesta amable, profesional y breve, usando el tono del restaurante.
    `;

    const { text } = await generateWithOpenAI(prompt);
    return { response: text };
  }
);
