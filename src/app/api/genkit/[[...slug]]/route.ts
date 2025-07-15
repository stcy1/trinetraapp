import {ai} from '@/ai/genkit';
import { handle } from '@genkit-ai/next';

export async function GET(req: Request) {
 return handle(ai, req);
}

export async function POST(req: Request) {
 return handle(ai, req);
}
