"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMenuFlow = void 0;
const config_1 = require("./config");
const zod_1 = require("zod");
exports.analyzeMenuFlow = config_1.ai.defineFlow({
    name: 'analyzeMenuFlow',
    inputSchema: zod_1.z.object({
        menuItems: zod_1.z.array(zod_1.z.object({
            nombre: zod_1.z.string(),
            precio: zod_1.z.number(),
            categoria: zod_1.z.string(),
        })),
        restaurantType: zod_1.z.string(),
    }),
    outputSchema: zod_1.z.object({
        analysis: zod_1.z.string(),
        recommendations: zod_1.z.array(zod_1.z.string()),
        pricingInsights: zod_1.z.string(),
        missingCategories: zod_1.z.array(zod_1.z.string()).optional(),
    }),
}, async (input) => {
    const menuDescription = input.menuItems
        .map(item => `${item.nombre} (${item.categoria}): €${item.precio}`)
        .join('\n');
    const prompt = `Analiza este menú de un restaurante ${input.restaurantType}:

${menuDescription}

Proporciona:
1. Análisis general del menú
2. Recomendaciones específicas para mejorar
3. Insights sobre precios
4. Categorías que podrían faltar

Sé específico y enfócate en aumentar rentabilidad y satisfacción del cliente.`;
    const { text } = await config_1.ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: prompt,
        config: {
            temperature: 0.7,
            maxOutputTokens: 800,
        },
    });
    // Parsear la respuesta
    const lines = text.split('\n').filter(l => l.trim());
    return {
        analysis: text,
        recommendations: lines.slice(0, 5),
        pricingInsights: 'Análisis de precios incluido en el análisis general',
    };
});
//# sourceMappingURL=analyze-menu-flow.js.map