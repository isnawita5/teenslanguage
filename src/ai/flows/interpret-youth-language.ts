'use server';

/**
 * @fileOverview A flow to interpret youth language, including keywords, phrases, and emojis.
 *
 * - interpretYouthLanguage - A function that handles the interpretation process.
 * - InterpretYouthLanguageInput - The input type for the interpretYouthLanguage function.
 * - InterpretYouthLanguageOutput - The return type for the interpretYouthLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretYouthLanguageInputSchema = z.object({
  query: z.string().describe('The keyword, phrase, or emoji to interpret.'),
  language: z.enum(['en', 'id']).describe('The language for the response. Can be "en" for English or "id" for Indonesian.'),
});
export type InterpretYouthLanguageInput = z.infer<typeof InterpretYouthLanguageInputSchema>;

const InterpretYouthLanguageOutputSchema = z.object({
  termPhrase: z.string().describe('The entered term or phrase.'),
  platform: z.string().describe('The platform where the term is commonly used (e.g., Instagram, TikTok, WhatsApp).'),
  meaning: z.string().describe('A brief description of the meaning of the term.'),
  linguisticCategory: z.string().describe('The linguistic category of the term (e.g., Emoji, Singkatan, Slang).'),
  socialCategory: z.string().describe('The social category of the term (e.g., Komunikasi Sosial, Ekspresi Emosi).'),
  explanation: z.string().describe('A detailed explanation of the term and its usage.'),
  references: z.array(z.string()).describe('Links to references for further reading.'),
});
export type InterpretYouthLanguageOutput = z.infer<typeof InterpretYouthLanguageOutputSchema>;

export async function interpretYouthLanguage(input: InterpretYouthLanguageInput): Promise<InterpretYouthLanguageOutput> {
  return interpretYouthLanguageFlow(input);
}

const interpretYouthLanguagePrompt = ai.definePrompt({
  name: 'interpretYouthLanguagePrompt',
  input: {schema: InterpretYouthLanguageInputSchema},
  output: {schema: InterpretYouthLanguageOutputSchema},
  prompt: `You are an expert in modern youth language and culture. Given a keyword, phrase, or emoji, you will provide a detailed interpretation of its meaning and usage.

  Respond in the language specified: {{language}}. If the language is 'id', respond in Bahasa Indonesia. If the language is 'en', respond in English.

  Analyze the following input:
  {{query}}

  Provide the following information in your response:
  - termPhrase: The entered term or phrase.
  - platform: The platform where the term is commonly used (e.g., Instagram, TikTok, WhatsApp).
  - meaning: A brief description of the meaning of the term.
  - linguisticCategory: The linguistic category of the term (e.g., Emoji, Singkatan, Slang).
  - socialCategory: The social category of the term (e.g., Komunikasi Sosial, Ekspresi Emosi).
  - explanation: A detailed explanation of the term and its usage.
  - references: Links to references for further reading.
  `,
});

const interpretYouthLanguageFlow = ai.defineFlow(
  {
    name: 'interpretYouthLanguageFlow',
    inputSchema: InterpretYouthLanguageInputSchema,
    outputSchema: InterpretYouthLanguageOutputSchema,
  },
  async input => {
    const {output} = await interpretYouthLanguagePrompt(input);
    return output!;
  }
);
