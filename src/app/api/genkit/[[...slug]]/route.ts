import { ai } from '@/ai/genkit'; // Assuming 'ai' is your Genkit instance
import handle from '@genkit-ai/next'; // Assuming '@genkit-ai/next' provides the handle function for Next.js
import { generateAiCompanionResponse } from '@/ai/flows/generate-ai-companion-response';
 
// Define a Genkit flow that uses the generateAiCompanionResponse function
const generateAiCompanionResponseFlow = ai.defineFlow(
  { name: 'generateAiCompanionResponseFlow' },
  async (input) => {
    // Call your core logic function within the flow
    return generateAiCompanionResponse(input);
  }
);

export async function GET(req: Request) {
 return handle(generateAiCompanionResponseFlow, await req.json());
}
export async function POST(req: Request) {
 return handle(generateAiCompanionResponseFlow, await req.json());
}
