'use server';

import { interpretYouthLanguage } from '@/ai/flows/interpret-youth-language';
import { suggestRelatedTerms } from '@/ai/flows/suggest-related-terms';
import type { SearchResult } from '@/lib/types';

export async function performSearch(
  query: string
): Promise<{ data: SearchResult | null; error: string | null }> {
  if (!query) {
    return { data: null, error: 'Search query cannot be empty.' };
  }

  try {
    const [interpretation, relatedTerms] = await Promise.all([
      interpretYouthLanguage({ query }),
      suggestRelatedTerms({ query }),
    ]);

    if (!interpretation || !interpretation.meaning) {
      return {
        data: null,
        error: 'Could not find an interpretation for the given term.',
      };
    }

    return { data: { interpretation, relatedTerms }, error: null };
  } catch (error) {
    console.error('Search action failed:', error);
    return {
      data: null,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
