"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lolaChatFlow = void 0;
const config_1 = require("./config");
const zod_1 = require("zod");
exports.lolaChatFlow = config_1.ai.defineFlow({
    name: 'lolaChatFlow',
    inputSchema: zod_1.z.object({
        message: zod_1.z.string(),
        context: zod_1.z.string().optional(),
        restauranteInfo: zod_1.z.object({
            nombre: zod_1.z.string(),
            tipo: zod_1.z.string(),
        }).optional(),
    }),
    outputSchema: zod_1.z.object({
        response: zod_1.z.string(),
        suggestions: zod_1.z.array(zod_1.z.string()).optional(),
    }),
}, async (input) => {
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
    const { text } = await config_1.ai.generate({
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
});
//# sourceMappingURL=lola-chat-flow.js.map