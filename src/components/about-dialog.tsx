'use client';

import { Info } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from './icons';

const translations = {
  id: {
    about: 'Tentang',
    title: 'Tentang ReLanguage Decipher',
    description:
      'ReLanguage Decipher adalah alat yang didukung AI untuk membantu orang tua, pendidik, dan siapa saja yang tertarik untuk memahami bahasa gaul, slang, dan emoji yang terus berkembang yang digunakan oleh generasi muda. Misi kami adalah menjembatani kesenjangan komunikasi antar generasi.',
    projectBy: 'Sebuah proyek oleh Isnawita Mokodompit, S. Pd, M. Pd.',
    poweredBy: 'Didukung oleh Google AI dan Firebase.',
  },
  en: {
    about: 'About',
    title: 'About ReLanguage Decipher',
    description:
      'ReLanguage Decipher is an AI-powered tool to help parents, educators, and anyone interested in understanding the ever-evolving slang, terms, and emojis used by the younger generation. Our mission is to bridge the communication gap between generations.',
    projectBy: 'A project by Isnawita Mokodompit, S. Pd, M. Pd.',
    poweredBy: 'Powered by Google AI and Firebase.',
  },
};

export function AboutDialog() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 h-4 w-4" />
          {t.about}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <Icons.logo className="h-12 w-12 text-primary" />
          <DialogTitle className="font-headline text-2xl">
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground !mt-4">
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p className="font-semibold">{t.projectBy}</p>
          <p className="mt-2 text-xs">{t.poweredBy}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
