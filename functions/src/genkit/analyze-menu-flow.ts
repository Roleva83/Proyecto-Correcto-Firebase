import { ai } from './config';
import { z } from 'zod';

export const analyzeMenuFlow = ai.defineFlow(
  {
    name: 'analyzeMenuFlow',
    inputSchema: z.object({
      menuItems: z.array(z.object({
        nombre: z.string(),
        precio: z.number(),
        categoria: z.string(),
      })),
      restaurantType: z.string(),
    }),
    outputSchema: z.object({
      analysis: z.string(),
      recommendations: z.array(z.string()),
      pricingInsights: z.string(),
      missingCategories: z.array(z.string()).optional(),
    }),
  },
  async (input) => {
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

    const { text } = await ai.generate({
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
  }
);
