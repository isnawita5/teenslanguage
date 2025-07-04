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
  query: z.string().describe('The keyword, phrase, abbreviation, or emoji to interpret.'),
  language: z.enum(['en', 'id']).describe('The language for the response. Can be "en" for English or "id" for Indonesian.'),
});
export type InterpretYouthLanguageInput = z.infer<typeof InterpretYouthLanguageInputSchema>;

const InterpretYouthLanguageOutputSchema = z.object({
  termPhrase: z.string().describe('The entered term or phrase.'),
  platform: z.string().describe('The platform where the term is commonly used (e.g., Instagram, TikTok, WhatsApp).'),
  meaning: z.string().describe('A brief description of the meaning of the term.'),
  linguisticCategory: z.string().describe('The linguistic category of the term (e.g., Emoji, Abbreviation/Singkatan, Slang).'),
  socialCategory: z.string().describe('The social category of the term (e.g., Komunikasi Sosial, Ekspresi Emosi).'),
  explanation: z.string().describe('A detailed explanation of the term and its usage.'),
  exampleSentences: z.array(z.string()).describe('Example sentences showing how the term is used in daily conversation.'),
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
  prompt: `You are an expert in modern youth language and culture. Given a keyword, phrase, abbreviation, or emoji, you will provide a detailed interpretation of its meaning and usage.

  Your entire response, including all fields, must be in the language specified by the 'language' parameter.
  - If 'language' is 'id', respond in Bahasa Indonesia.
  - If 'language' is 'en', respond in English.

  Analyze the following input:
  {{query}}

  Provide the following information in your response, ensuring all textual content is in the requested language ({{language}}):
  - termPhrase: The entered term or phrase.
  - platform: The platform where the term is commonly used (e.g., Instagram, TikTok, WhatsApp). The platform name should remain as is, but any description should be in the target language.
  - meaning: A brief description of the meaning of the term, in the target language.
  - linguisticCategory: The linguistic category of the term (e.g., Emoji, Singkatan, Slang), in the target language.
  - socialCategory: The social category of the term (e.g., Komunikasi Sosial, Ekspresi Emosi), in the target language.
  - explanation: A detailed explanation of the term and its usage, in the target language.
  - exampleSentences: An array of 2-3 example sentences showing how the term is used in daily conversation, in the target language.
  - references: Links to references for further reading. The links themselves should not be translated, but if you provide any context, it should be in the target language.
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
