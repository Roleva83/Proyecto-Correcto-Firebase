// Declaraciones mínimas para paquetes genkit no publicados
declare module '@genkit-ai/flow' {
  export function defineFlow<TInput = any, TOutput = any>(
    config: any,
    handler: (opts: { input: TInput }) => Promise<TOutput> | TOutput
  ): any;
}

declare module '@genkit-ai/google-genai' {
  export const googleAI: {
    getGenerativeModel: (opts: any) => {
      generate: (prompt: string | any) => Promise<{ text: string } | any>;
    };
  };
  export default googleAI;
}
