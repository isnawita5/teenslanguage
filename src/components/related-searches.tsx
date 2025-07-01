'use client';

import { Badge } from '@/components/ui/badge';
import type { RelatedTermsResult } from '@/lib/types';

interface RelatedSearchesProps {
  terms: RelatedTermsResult;
  onSearch: (term: string) => void;
  title: string;
}

export function RelatedSearches({ terms, onSearch, title }: RelatedSearchesProps) {
  if (!terms || terms.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-headline text-xl font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {terms.map((term, index) => (
          <button key={index} onClick={() => onSearch(term)}>
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {term}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
