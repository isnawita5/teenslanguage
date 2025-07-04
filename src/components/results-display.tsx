'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons';
import { Instagram, MessageSquare, Link as LinkIcon, Tag, Users, Sparkles, MessageSquareQuote } from 'lucide-react';
import type { InterpretationResult } from '@/lib/types';
import { ComicGenerator } from './comic-generator';

interface ResultsDisplayProps {
  data: InterpretationResult;
  translations: { [key:string]: string };
}

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('tiktok'))
    return <Icons.tiktok className="h-6 w-6 text-primary" />;
  if (p.includes('instagram'))
    return <Instagram className="h-6 w-6 text-primary" />;
  if (p.includes('whatsapp'))
    return <Icons.whatsapp className="h-6 w-6 text-primary" />;
  return <MessageSquare className="h-6 w-6 text-primary" />;
};

const InfoBlock = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
    <div className="flex items-start gap-4 rounded-lg bg-background/50 p-4 transition-all hover:bg-primary/5 hover:shadow-inner">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="font-headline text-lg font-semibold text-justify">{value}</p>
        </div>
    </div>
)

export function ResultsDisplay({ data, translations }: ResultsDisplayProps) {
  return (
    <Card className="overflow-hidden border-2 border-primary/10 shadow-lg shadow-primary/5 bg-gradient-to-br from-card to-accent/5">
      <CardHeader className="text-center pb-4">
        <CardTitle className="font-headline text-4xl md:text-5xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
          {data.termPhrase}
        </CardTitle>
        <CardDescription className="text-lg !mt-2 text-foreground/80">{data.meaning}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-3">
          <InfoBlock 
            icon={getPlatformIcon(data.platform)}
            title={translations.platform}
            value={data.platform}
          />
          <InfoBlock 
            icon={<Tag className="h-6 w-6 text-primary"/>}
            title={translations.linguisticCategory}
            value={data.linguisticCategory}
          />
          <InfoBlock 
            icon={<Users className="h-6 w-6 text-primary"/>}
            title={translations.socialCategory}
            value={data.socialCategory}
          />
        </div>

        <div className="space-y-6">
          <Separator className="bg-primary/20"/>
          <div className="space-y-4 px-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-accent"/>
              <h4 className="font-headline text-2xl font-semibold">{translations.explanation}</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed text-justify">{data.explanation}</p>
          </div>
        </div>

        {data.exampleSentences && data.exampleSentences.length > 0 && (
          <>
            <div className="space-y-6">
              <Separator className="bg-primary/20" />
              <div className="space-y-4 px-6">
                <div className="flex items-center gap-3">
                  <MessageSquareQuote className="h-6 w-6 text-accent" />
                  <h4 className="font-headline text-2xl font-semibold">
                    {translations.exampleUsage}
                  </h4>
                </div>
                <ul className="list-inside list-disc space-y-3 text-muted-foreground">
                  {data.exampleSentences.map((sentence, index) => (
                    <li key={index} className="leading-relaxed pl-2">
                      &ldquo;{sentence}&rdquo;
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
                <Separator className="bg-primary/20" />
                <ComicGenerator
                    termPhrase={data.termPhrase}
                    exampleSentences={data.exampleSentences}
                    translations={translations}
                />
            </div>
          </>
        )}

        {data.references && data.references.length > 0 && (
          <div className="space-y-6">
            <Separator className="bg-primary/20" />
            <div className="space-y-3 px-6">
                <h4 className="font-headline text-xl font-semibold">{translations.references}</h4>
                <ul className="space-y-2">
                {data.references.map((ref, index) => (
                    <li key={index}>
                    <a
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                    >
                        <LinkIcon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                        <span className="truncate">{ref}</span>
                    </a>
                    </li>
                ))}
                </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
