'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { EmojiPicker } from '@/components/emoji-picker';
import { ResultsSkeleton } from '@/components/results-skeleton';
import { ResultsDisplay } from '@/components/results-display';
import { RelatedSearches } from '@/components/related-searches';
import { performSearch } from '@/app/actions';
import type { SearchResult } from '@/lib/types';

const formSchema = z.object({
  query: z.string().min(1, { message: 'Please enter a term or emoji.' }),
});

export function Decipher() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: '' },
  });

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await performSearch(query);

    if (apiError) {
      setError(apiError);
      toast({
        variant: 'destructive',
        title: 'Search Failed',
        description: apiError,
      });
      setResult(null);
    } else if (data) {
      setResult(data);
    }
    setLoading(false);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleSearch(values.query);
  };

  const handleRelatedSearch = (term: string) => {
    form.setValue('query', term);
    handleSearch(term);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleEmojiSelect = (emoji: string) => {
    form.setValue('query', `${form.getValues('query')}${emoji}`);
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-3">
          <Icons.logo className="h-10 w-10 text-primary" />
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            ReLanguage Decipher
          </h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          Decode modern youth language, slang, and emojis with the power of AI.
        </p>
      </header>

      <main className="space-y-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full items-start gap-2">
                    <FormControl>
                      <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="Type a word, phrase, or emoji (e.g., 'rizz', 'iykyk', '💀')..."
                          className="pl-10 h-14 text-lg"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <EmojiPicker onSelectEmoji={handleEmojiSelect} />
                    <Button type="submit" size="lg" className="h-14" disabled={loading}>
                      {loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <span>Search</span>
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        
        <div className="transition-all duration-500">
            {loading && <ResultsSkeleton />}
            {error && !loading && (
              <Card className="bg-destructive/10 border-destructive text-center">
                  <CardHeader>
                    <CardTitle className="font-headline text-destructive">Oops! Something went wrong.</CardTitle>
                    <CardDescription className="text-destructive/80">{error}</CardDescription>
                  </CardHeader>
              </Card>
            )}
            {result && !loading && !error && (
                <div className="space-y-8">
                    <ResultsDisplay data={result.interpretation} />
                    <RelatedSearches
                        terms={result.relatedTerms}
                        onSearch={handleRelatedSearch}
                    />
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
