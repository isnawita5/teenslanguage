'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting related terms, phrases, or emojis based on a user's search query.
 *
 * - suggestRelatedTerms - A function that takes a search query and returns a list of related terms.
 * - SuggestRelatedTermsInput - The input type for the suggestRelatedTerms function.
 * - SuggestRelatedTermsOutput - The return type for the suggestRelatedTerms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedTermsInputSchema = z.object({
  query: z.string().describe('The search query entered by the user.'),
});
export type SuggestRelatedTermsInput = z.infer<typeof SuggestRelatedTermsInputSchema>;

const SuggestRelatedTermsOutputSchema = z.array(
  z.string().describe('A related term, phrase, or emoji.')
);
export type SuggestRelatedTermsOutput = z.infer<typeof SuggestRelatedTermsOutputSchema>;

export async function suggestRelatedTerms(input: SuggestRelatedTermsInput): Promise<SuggestRelatedTermsOutput> {
  return suggestRelatedTermsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedTermsPrompt',
  input: {schema: SuggestRelatedTermsInputSchema},
  output: {schema: SuggestRelatedTermsOutputSchema},
  prompt: `Suggest related terms, phrases, or emojis for the following search query. Return the results as a JSON array of strings.

Search Query: {{{query}}}`,
});

const suggestRelatedTermsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedTermsFlow',
    inputSchema: SuggestRelatedTermsInputSchema,
    outputSchema: SuggestRelatedTermsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
