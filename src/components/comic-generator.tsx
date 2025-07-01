'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';

import { useLanguage } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import { generateComic } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Skeleton } from './ui/skeleton';

interface ComicGeneratorProps {
  termPhrase: string;
  exampleSentences: string[];
  translations: { [key: string]: string };
}

export function ComicGenerator({ termPhrase, exampleSentences, translations }: ComicGeneratorProps) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const { toast } = useToast();

  const handleGenerateClick = async () => {
    setLoading(true);
    setError(null);
    setImageData(null);

    const result = await generateComic({ termPhrase, exampleSentences, language });

    if (result.error) {
      setError(result.error);
      toast({
        variant: 'destructive',
        title: translations.errorTitle,
        description: result.error,
      });
    } else if (result.data){
      setImageData(result.data);
    }
    setLoading(false);
  };
  
  return (
    <div className="space-y-4 px-6">
      <div className="flex items-center gap-3">
        <ImageIcon className="h-6 w-6 text-accent" />
        <h4 className="font-headline text-2xl font-semibold">
          {translations.comicIllustration}
        </h4>
      </div>
      <div className="flex min-h-[250px] items-center justify-center rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-4 transition-all">
        {loading && (
            <div className="flex flex-col items-center gap-4 text-center">
                <Skeleton className="h-64 w-64 rounded-lg bg-primary/10" />
                <p className="font-semibold text-primary flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {translations.generatingComic}
                </p>
                <p className="text-sm text-muted-foreground max-w-sm">{translations.generatingComicDescription}</p>
            </div>
        )}
        {error && !loading && (
            <div className="text-center text-destructive">
                <p className="font-semibold">{translations.errorTitle}</p>
                <p>{error}</p>
            </div>
        )}
        {imageData && !loading && (
          <Image
            src={imageData}
            alt={translations.comicAltText.replace('{term}', termPhrase)}
            width={512}
            height={512}
            className="rounded-lg shadow-md border"
            data-ai-hint="comic strip"
          />
        )}
        {!loading && !imageData && !error && (
            <div className="text-center">
                <Button onClick={handleGenerateClick} size="lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {translations.generateIllustration}
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">{translations.comicGenerationPrompt}</p>
            </div>
        )}
      </div>
    </div>
  );
}
