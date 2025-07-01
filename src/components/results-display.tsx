'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons';
import { Instagram, MessageSquare, Link as LinkIcon } from 'lucide-react';
import type { InterpretationResult } from '@/lib/types';

interface ResultsDisplayProps {
  data: InterpretationResult;
  translations: { [key: string]: string };
}

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('tiktok'))
    return <Icons.tiktok className="h-5 w-5 text-foreground" />;
  if (p.includes('instagram'))
    return <Instagram className="h-5 w-5 text-foreground" />;
  if (p.includes('whatsapp'))
    return <Icons.whatsapp className="h-5 w-5 text-foreground" />;
  return <MessageSquare className="h-5 w-5 text-foreground" />;
};

export function ResultsDisplay({ data, translations }: ResultsDisplayProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-3xl md:text-4xl">
          {data.termPhrase}
        </CardTitle>
        <CardDescription>{data.meaning}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{translations.platform}</p>
            <div className="flex items-center gap-2">
              {getPlatformIcon(data.platform)}
              <span className="font-semibold">{data.platform}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {translations.linguisticCategory}
            </p>
            <Badge variant="secondary">{data.linguisticCategory}</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {translations.socialCategory}
            </p>
            <Badge variant="secondary">{data.socialCategory}</Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-headline text-lg font-semibold">{translations.explanation}</h4>
          <p className="text-muted-foreground">{data.explanation}</p>
        </div>

        {data.references && data.references.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-headline text-lg font-semibold">{translations.references}</h4>
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
        )}
      </CardContent>
    </Card>
  );
}
