'use server';
/**
 * @fileOverview An AI-powered chatbot that answers women's health, wellness & self-care questions.
 *
 * - aiSelfCareChatbot - A function that handles the chatbot interaction.
 * - AiSelfCareChatbotInput - The input type for the aiSelfCareChatbot function.
 * - AiSelfCareChatbotOutput - The return type for the aiSelfCareChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSelfCareChatbotInputSchema = z.object({
  question: z.string().describe('The user question about health, wellness, or self-care.'),
});
export type AiSelfCareChatbotInput = z.infer<typeof AiSelfCareChatbotInputSchema>;

const AiSelfCareChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user question, synthesized from credible medical information.'),
});
export type AiSelfCareChatbotOutput = z.infer<typeof AiSelfCareChatbotOutputSchema>;

export async function aiSelfCareChatbot(input: AiSelfCareChatbotInput): Promise<AiSelfCareChatbotOutput> {
  return aiSelfCareChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSelfCareChatbotPrompt',
  input: {schema: AiSelfCareChatbotInputSchema},
  output: {schema: AiSelfCareChatbotOutputSchema},
  prompt: `You are an AI-powered chatbot designed to provide information and answer questions related to women's health, wellness, and self-care.  You must only use information from reliable, high-quality medical sources to generate your responses.  Synthesize the information into a clear and concise answer for the user.

Question: {{{question}}}`, 
});

const aiSelfCareChatbotFlow = ai.defineFlow(
  {
    name: 'aiSelfCareChatbotFlow',
    inputSchema: AiSelfCareChatbotInputSchema,
    outputSchema: AiSelfCareChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
