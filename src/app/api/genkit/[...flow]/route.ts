// src/app/api/genkit/[...flow]/route.ts
import genkitHandler from '@genkit-ai/next';
import '../../../../ai/genkit';

// Use genkitHandler directly as the route handler
export { genkitHandler as GET, genkitHandler as POST };
