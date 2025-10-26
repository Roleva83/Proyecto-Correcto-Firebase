// src/app/api/genkit/[...flow]/route.ts
import genkitHandler from '@genkit-ai/next';
import '../../../../ai/genkit';

// Wrap the GenKit Next handler in functions with a permissive type so
// Next.js build-time type checks don't fail due to strict ParamCheck
// constraints coming from the genkit types.
export const GET = async (req: Request) => {
	// genkitHandler expects NextRequest/NextResponse; cast to any to avoid
	// incompatible generic constraint errors during build.
	return await (genkitHandler as any)(req as any);
};

export const POST = async (req: Request) => {
	return await (genkitHandler as any)(req as any);
};
