"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyRecommendationsFlow = void 0;
const config_1 = require("./config");
const zod_1 = require("zod");
exports.strategyRecommendationsFlow = config_1.ai.defineFlow({
    name: 'strategyRecommendationsFlow',
    inputSchema: zod_1.z.object({
        restaurantData: zod_1.z.object({
            nombre: zod_1.z.string(),
            tipo: zod_1.z.string(),
            totalReseñas: zod_1.z.number(),
            promedioCalificacion: zod_1.z.number(),
            porcentajePositivas: zod_1.z.number(),
        }),
        recentReviews: zod_1.z.array(zod_1.z.string()).optional(),
    }),
    outputSchema: zod_1.z.object({
        overallStrategy: zod_1.z.string(),
        priorities: zod_1.z.array(zod_1.z.string()),
        quickWins: zod_1.z.array(zod_1.z.string()),
        longTermGoals: zod_1.z.array(zod_1.z.string()),
    }),
}, async (input) => {
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
    const { text } = await config_1.ai.generate({
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
});
//# sourceMappingURL=strategy-recommendations-flow.js.map