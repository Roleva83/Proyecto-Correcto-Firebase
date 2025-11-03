"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeReviewFlow = void 0;
const config_1 = require("./config");
const zod_1 = require("zod");
exports.analyzeReviewFlow = config_1.ai.defineFlow({
    name: 'analyzeReviewFlow',
    inputSchema: zod_1.z.object({
        reviewText: zod_1.z.string(),
        rating: zod_1.z.number().min(1).max(5),
        platform: zod_1.z.string(),
    }),
    outputSchema: zod_1.z.object({
        sentiment: zod_1.z.enum(['positivo', 'negativo', 'neutral']),
        mainTopics: zod_1.z.array(zod_1.z.string()),
        suggestedResponse: zod_1.z.string(),
        actionableInsights: zod_1.z.array(zod_1.z.string()),
    }),
}, async (input) => {
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
    const { text } = await config_1.ai.generate({
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
    }
    catch (_a) {
        return {
            sentiment: 'neutral',
            mainTopics: ['Reseña procesada'],
            suggestedResponse: 'Gracias por tu opinión.',
            actionableInsights: ['Revisar reseña manualmente'],
        };
    }
});
//# sourceMappingURL=analyze-review-flow.js.map