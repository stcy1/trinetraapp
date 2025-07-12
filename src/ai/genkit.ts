import {genkit} from 'genkit';
import {nextJs} from '@genkit-ai/next/plugin';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    nextJs(),
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
