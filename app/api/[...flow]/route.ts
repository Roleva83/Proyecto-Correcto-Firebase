import genkitHandler from '@genkit-ai/next';
import '../../../ai/genkit';

export const GET = async (req: Request) => {
  return genkitHandler(req as any);
};

export const POST = async (req: Request) => {
  return genkitHandler(req as any);
};
