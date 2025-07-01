'use server';

/**
 * @fileOverview A flow to generate a comic strip from example sentences.
 *
 * - generateComicStrip - A function that handles the comic generation process.
 * - GenerateComicStripInput - The input type for the generateComicStrip function.
 * - GenerateComicStripOutput - The return type for the generateComicStrip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateComicStripInputSchema = z.object({
  termPhrase: z.string().describe('The term or phrase to illustrate.'),
  exampleSentences: z.array(z.string()).describe('The example sentences forming a conversation.'),
  language: z.enum(['en', 'id']).describe('The language for the comic. Can be "en" for English or "id" for Indonesian.'),
});
export type GenerateComicStripInput = z.infer<typeof GenerateComicStripInputSchema>;

// The output is just the image data URI string
const GenerateComicStripOutputSchema = z.string().describe("A data URI of the generated comic strip image. Format: 'data:image/png;base64,<encoded_data>'.");
export type GenerateComicStripOutput = z.infer<typeof GenerateComicStripOutputSchema>;

export async function generateComicStrip(input: GenerateComicStripInput): Promise<GenerateComicStripOutput> {
  return generateComicStripFlow(input);
}

const generateComicStripFlow = ai.defineFlow(
  {
    name: 'generateComicStripFlow',
    inputSchema: GenerateComicStripInputSchema,
    outputSchema: GenerateComicStripOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a single image that is a 4-panel comic strip. The comic strip should be fun, simple, black and white, minimalist, and use a line-art style. The comic should visually illustrate the following conversation without using any text or speech bubbles. The conversation is about: "${input.termPhrase}". The style should appeal to a young, modern audience.
      
      Conversation:
      ${input.exampleSentences.join('\n- ')}
      `,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed.');
    }
    return media.url;
  }
);
