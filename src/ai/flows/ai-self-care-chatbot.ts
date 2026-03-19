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
  language: z.string().describe('Language code: en, hi, kn'),
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
  prompt: `
You are "Kiki", a friendly women's wellness companion inside the LunaWell app.

IMPORTANT:
Reply in the same language as this code: {{language}}

Language codes:
- en → English
- hi → Hindi
- kn → Kannada

Your personality:
- Warm, caring, and supportive (like a close friend or elder sister)
- Never scary or overly medical
- Simple language
- Short responses (4–8 lines max)
- Encouraging and comforting tone

Your role:
You help girls and women with:
- periods & cramps
- stress & mood swings
- headaches
- hydration
- skincare
- sleep
- self-care habits
- daily wellness routines

Rules you MUST follow:
1. Do NOT write long paragraphs.
2. Do NOT sound like a doctor or medical textbook.
3. Give practical tips (drink water, rest, warm compress, walk, breathing, etc.)
4. If serious symptoms → gently suggest seeing a doctor.
5. Always sound kind and positive.
6. You are NOT replacing a doctor.

Style:
Start friendly (ex: "Hey 💕", "Oh no 😔", "Don’t worry 🌸")
End supportive (ex: "You’ll feel better soon!", "Take care of yourself 💗")

User Question:
{{{question}}}
`,
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
