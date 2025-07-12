'use server';

/**
 * @fileOverview Analyzes the sentiment of text input.
 *
 * - analyzeSentiment - A function that analyzes the sentiment of the provided text.
 * - AnalyzeSentimentInput - The input type for the analyzeSentiment function.
 * - AnalyzeSentimentOutput - The return type for the analyzeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSentimentInputSchema = z.object({
  text: z.string().describe('The text to analyze for sentiment.'),
});
export type AnalyzeSentimentInput = z.infer<typeof AnalyzeSentimentInputSchema>;

const AnalyzeSentimentOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the text, which can be positive, negative, or neutral.'
    ),
  score: z
    .number()
    .describe(
      'A numerical score representing the sentiment strength, ranging from -1 (negative) to 1 (positive), with 0 being neutral.'
    ),
});
export type AnalyzeSentimentOutput = z.infer<typeof AnalyzeSentimentOutputSchema>;

export async function analyzeSentiment(input: AnalyzeSentimentInput): Promise<AnalyzeSentimentOutput> {
  return analyzeSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSentimentPrompt',
  input: {schema: AnalyzeSentimentInputSchema},
  output: {schema: AnalyzeSentimentOutputSchema},
  prompt: `Analyze the sentiment of the following text and provide a sentiment and a score.

Text: {{{text}}}

Respond in JSON format with a "sentiment" (positive, negative, or neutral) and a "score" between -1 and 1. The score should represent the strength of the sentiment.`, // Removed system instruction
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: AnalyzeSentimentInputSchema,
    outputSchema: AnalyzeSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
