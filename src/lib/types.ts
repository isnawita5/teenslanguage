import type { InterpretYouthLanguageOutput } from '@/ai/flows/interpret-youth-language';
import type { SuggestRelatedTermsOutput } from '@/ai/flows/suggest-related-terms';

export type InterpretationResult = InterpretYouthLanguageOutput;
export type RelatedTermsResult = SuggestRelatedTermsOutput;

export type SearchResult = {
  interpretation: InterpretationResult;
  relatedTerms: RelatedTermsResult;
};
