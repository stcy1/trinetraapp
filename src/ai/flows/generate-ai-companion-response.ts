'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating AI companion responses in a chat application.
 *
 * It includes the flow definition, input and output schemas, and a wrapper function.
 * - generateAiCompanionResponse - A function that generates AI companion responses.
 * - GenerateAiCompanionResponseInput - The input type for the generateAiCompanionResponse function.
 * - GenerateAiCompanionResponseOutput - The return type for the generateAiCompanionResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiCompanionResponseInputSchema = z.object({
  userMessage: z.string().describe('The message from the user.'),
  userHistory: z.string().describe('The user history of journal entries and chat logs.'),
});
export type GenerateAiCompanionResponseInput = z.infer<typeof GenerateAiCompanionResponseInputSchema>;

const GenerateAiCompanionResponseOutputSchema = z.object({
  aiResponse: z.string().describe('The AI companion response.'),
});
export type GenerateAiCompanionResponseOutput = z.infer<typeof GenerateAiCompanionResponseOutputSchema>;

export async function generateAiCompanionResponse(input: GenerateAiCompanionResponseInput): Promise<GenerateAiCompanionResponseOutput> {
  return generateAiCompanionResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAiCompanionResponsePrompt',
  input: {schema: GenerateAiCompanionResponseInputSchema},
  output: {schema: GenerateAiCompanionResponseOutputSchema},
  prompt: `You are an AI companion designed to provide guided prompts and supportive dialogue to help users explore their feelings.
  Leverage the user's history to personalize the conversation.

  User History: {{{userHistory}}}
  User Message: {{{userMessage}}}

  AI Companion Response: `,
});

const generateAiCompanionResponseFlow = ai.defineFlow(
  {
    name: 'generateAiCompanionResponseFlow',
    inputSchema: GenerateAiCompanionResponseInputSchema,
    outputSchema: GenerateAiCompanionResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
