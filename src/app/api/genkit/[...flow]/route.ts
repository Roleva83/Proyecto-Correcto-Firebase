// src/app/api/genkit/[...flow]/route.ts
import genkitHandler from '@genkit-ai/next';
import '../../../../ai/genkit';

export const { GET, POST } = genkitHandler();
