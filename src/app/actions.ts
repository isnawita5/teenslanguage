'use server';

import { interpretYouthLanguage } from '@/ai/flows/interpret-youth-language';
import { suggestRelatedTerms } from '@/ai/flows/suggest-related-terms';
import { generateComicStrip } from '@/ai/flows/generate-comic-strip';
import type { GenerateComicStripInput } from '@/ai/flows/generate-comic-strip';
import type { SearchResult } from '@/lib/types';

const errors = {
    en: {
        emptyQuery: 'Search query cannot be empty.',
        noInterpretation: 'Could not find an interpretation for the given term.',
        comicGenerationFailed: 'Failed to generate comic illustration.',
        unexpected: 'An unexpected error occurred. Please try again later.'
    },
    id: {
        emptyQuery: 'Kolom pencarian tidak boleh kosong.',
        noInterpretation: 'Tidak dapat menemukan interpretasi untuk istilah yang diberikan.',
        comicGenerationFailed: 'Gagal membuat ilustrasi komik.',
        unexpected: 'Terjadi kesalahan tak terduga. Silakan coba lagi nanti.'
    }
}

export async function performSearch(
  query: string,
  language: 'en' | 'id'
): Promise<{ data: SearchResult | null; error: string | null }> {
  if (!query) {
    return { data: null, error: errors[language].emptyQuery };
  }

  try {
    const [interpretation, relatedTerms] = await Promise.all([
      interpretYouthLanguage({ query, language }),
      suggestRelatedTerms({ query }),
    ]);

    if (!interpretation || !interpretation.meaning) {
      return {
        data: null,
        error: errors[language].noInterpretation,
      };
    }

    return { data: { interpretation, relatedTerms }, error: null };
  } catch (error) {
    console.error('Search action failed:', error);
    return {
      data: null,
      error: errors[language].unexpected,
    };
  }
}

export async function generateComic(
  input: GenerateComicStripInput
): Promise<{ data: string | null; error: string | null }> {
  try {
    const imageDataUri = await generateComicStrip(input);
    if (!imageDataUri) {
        return { data: null, error: errors[input.language].comicGenerationFailed };
    }
    return { data: imageDataUri, error: null };
  } catch (error) {
    console.error('Comic generation failed:', error);
    return { data: null, error: errors[input.language].unexpected };
  }
}
