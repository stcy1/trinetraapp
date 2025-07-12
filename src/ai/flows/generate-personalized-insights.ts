'use server';

/**
 * @fileOverview A flow for generating personalized insights and coping strategy suggestions based on user journal entries and chat logs.
 *
 * - generatePersonalizedInsights - A function that handles the generation of personalized insights.
 * - GeneratePersonalizedInsightsInput - The input type for the generatePersonalizedInsights function.
 * - GeneratePersonalizedInsightsOutput - The return type for the generatePersonalizedInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedInsightsInputSchema = z.object({
  journalEntries: z.string().describe('User journal entries.'),
  chatLogs: z.string().describe('User chat logs.'),
});
export type GeneratePersonalizedInsightsInput = z.infer<
  typeof GeneratePersonalizedInsightsInputSchema
>;

const GeneratePersonalizedInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized insights based on user data.'),
  copingStrategies: z
    .string()
    .describe('Suggested coping strategies from NIMH.'),
});
export type GeneratePersonalizedInsightsOutput = z.infer<
  typeof GeneratePersonalizedInsightsOutputSchema
>;

export async function generatePersonalizedInsights(
  input: GeneratePersonalizedInsightsInput
): Promise<GeneratePersonalizedInsightsOutput> {
  return generatePersonalizedInsightsFlow(input);
}

const generatePersonalizedInsightsPrompt = ai.definePrompt({
  name: 'generatePersonalizedInsightsPrompt',
  input: {schema: GeneratePersonalizedInsightsInputSchema},
  output: {schema: GeneratePersonalizedInsightsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized insights and coping strategies to users based on their journal entries and chat logs.

  Analyze the following journal entries and chat logs to identify prevalent emotional states and recurring themes. Based on this analysis, provide personalized insights and suggest coping strategies from the National Institute of Mental Health.

  Journal Entries:
  {{journalEntries}}

  Chat Logs:
  {{chatLogs}}

  Ensure that the insights and coping strategies are tailored to the user's specific situation and emotional needs.
  Format the output in markdown.
  `,
});

const generatePersonalizedInsightsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedInsightsFlow',
    inputSchema: GeneratePersonalizedInsightsInputSchema,
    outputSchema: GeneratePersonalizedInsightsOutputSchema,
  },
  async input => {
    const {output} = await generatePersonalizedInsightsPrompt(input);
    return output!;
  }
);
