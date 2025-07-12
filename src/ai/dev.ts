import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-sentiment.ts';
import '@/ai/flows/generate-ai-companion-response.ts';
import '@/ai/flows/generate-personalized-insights.ts';