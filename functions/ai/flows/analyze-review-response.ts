import { defineFlow } from '@genkit-ai/flow';
import { PredictionServiceClient } from '@google-cloud/aiplatform';

// Variables de entorno que debes configurar:
// PROJECT_ID - ID del proyecto GCP
// LOCATION - región, por ejemplo: "us-central1"
// MODEL_ID - ID del modelo o endpoint según la configuración de Vertex AI
const project = process.env.PROJECT_ID;
const location = process.env.LOCATION || 'us-central1';
const modelId = process.env.MODEL_ID; // por ejemplo: "models/text-bison@001" o endpoint resource

const client = new PredictionServiceClient();

async function generateWithVertex(prompt: string) {
  if (!project || !modelId) {
    throw new Error('PROJECT_ID and MODEL_ID must be set in environment variables');
  }

  const endpoint = `projects/${project}/locations/${location}/endpoints/${modelId}`;

  const [response] = await client.predict({
    endpoint,
    instances: [{ content: prompt }],
    // parameters: {}, // agrega si necesitas configurar generación
  });

  // Dependiendo de la respuesta, ajusta cómo extraes el texto
  const predictions = (response as any).predictions || [];
  const first = predictions[0] || {};
  // intentamos obtener `content` o `text` en la respuesta
  const text = first.content || first.text || JSON.stringify(first);
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

    const { text } = await generateWithVertex(prompt);
    return { response: text };
  }
);
