'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { LanguageSwitcher } from './language-switcher';
import { AboutDialog } from './about-dialog';
import { ThemeSwitcher } from './theme-switcher';

const formSchema = z.object({
  query: z.string().min(1, { message: 'Please enter a term or emoji.' }),
});

const translations = {
    id: {
        title: "Teens Language",
        subtitle: "Uraikan bahasa gaul, singkatan, slang, dan emoji dengan kekuatan AI.",
        searchPlaceholder: "Ketik kata, frasa, atau emoji (mis., 'santuy', 'kepo', '💀')...",
        searchButton: "Cari",
        clearSearch: "Bersihkan",
        searchFailedTitle: "Pencarian Gagal",
        errorTitle: "Ups! Terjadi kesalahan.",
        relatedSearches: "Pencarian Terkait",
        platform: "Platform",
        linguisticCategory: "Kategori Linguistik",
        socialCategory: "Kategori Sosial",
        explanation: "Penjelasan",
        exampleUsage: "Contoh Penggunaan",
        references: "Referensi",
        projectBy: "Sebuah proyek oleh Wita_RJ",
        comicIllustration: "Ilustrasi Komik",
        generateIllustration: "Buatkan Ilustrasi",
        generatingComic: "Membuat komik...",
        generatingComicDescription: "AI sedang menggambar komik untuk Anda. Ini mungkin butuh beberapa saat.",
        comicAltText: "Komik strip yang mengilustrasikan '{term}'",
        comicGenerationPrompt: "Klik untuk membuat komik strip AI.",
    },
    en: {
        title: "Teens Language",
        subtitle: "Decode modern youth language, abbreviations, slang, and emojis with the power of AI.",
        searchPlaceholder: "Type a word, phrase, or emoji (e.g., 'rizz', 'iykyk', '💀')...",
        searchButton: "Search",
        clearSearch: "Clear",
        searchFailedTitle: "Search Failed",
        errorTitle: "Oops! Something went wrong.",
        relatedSearches: "Related Searches",
        platform: "Platform",
        linguisticCategory: "Linguistic Category",
        socialCategory: "Social Category",
        explanation: "Explanation",
        exampleUsage: "Example Usage",
        references: "References",
        projectBy: "A project by Isnawita Mokodompit, S. Pd, M. Pd.",
        comicIllustration: "Comic Illustration",
        generateIllustration: "Generate Illustration",
        generatingComic: "Generating comic...",
        generatingComicDescription: "The AI is drawing a comic for you. This might take a moment.",
        comicAltText: "Comic strip illustrating '{term}'",
        comicGenerationPrompt: "Click to generate an AI comic strip.",
    }
};

export function Decipher() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();

  const t = translations[language];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: '' },
  });

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const { data, error: apiError } = await performSearch(query, language);

    if (apiError) {
      setError(apiError);
      toast({
        variant: 'destructive',
        title: t.searchFailedTitle,
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

  const handleClear = () => {
    form.reset({ query: '' });
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <header className="mb-12">
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <div className="invisible hidden sm:flex" aria-hidden="true">
            <div className="flex items-center gap-2">
              <AboutDialog />
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
          <div className="inline-flex items-center gap-3">
            <Icons.logo className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              {t.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <AboutDialog />
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
        <p className="mt-4 text-center text-base sm:text-lg text-muted-foreground">
          {t.subtitle}
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
                  <div className="flex w-full flex-col sm:flex-row items-stretch gap-2">
                    <div className="relative w-full flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder={t.searchPlaceholder}
                          className="pl-10 pr-12 h-14 text-lg w-full"
                          {...field}
                        />
                      </FormControl>
                      {field.value && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                          onClick={handleClear}
                          aria-label={t.clearSearch}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <EmojiPicker onSelectEmoji={handleEmojiSelect} />
                      <Button type="submit" size="lg" className="h-14 flex-grow sm:flex-grow-0" disabled={loading}>
                        {loading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          <span>{t.searchButton}</span>
                        )}
                      </Button>
                    </div>
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
                    <CardTitle className="font-headline text-destructive">{t.errorTitle}</CardTitle>
                    <CardDescription className="text-destructive/80">{error}</CardDescription>
                  </CardHeader>
              </Card>
            )}
            {result && !loading && !error && (
                <div className="space-y-8">
                    <ResultsDisplay data={result.interpretation} translations={t} />
                    <RelatedSearches
                        terms={result.relatedTerms}
                        onSearch={handleRelatedSearch}
                        title={t.relatedSearches}
                    />
                </div>
            )}
        </div>
      </main>

      <footer className="text-center mt-16 text-sm text-muted-foreground">
        <p>{t.projectBy}</p>
      </footer>
    </div>
  );
}
