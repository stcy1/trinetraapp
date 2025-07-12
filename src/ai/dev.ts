import {config} from 'dotenv';
config();

import {googleAI} from '@genkit-ai/googleai';
import {genkit} from 'genkit';

genkit({
  plugins: [googleAI()],
});

import '@/ai/flows/analyze-sentiment.ts';
import '@/ai/flows/generate-ai-companion-response.ts';
import '@/ai/flows/generate-personalized-insights.ts';
