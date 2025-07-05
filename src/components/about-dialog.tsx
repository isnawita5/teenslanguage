
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
    title: 'Tentang Teens Language',
    intro:
      'Teens Language adalah alat yang didukung AI yang dirancang untuk membantu orang tua, pendidik, dan siapa saja untuk memahami bahasa gaul, istilah, dan emoji yang terus berkembang yang digunakan oleh generasi muda.',
    goal: 'Misi utama kami adalah menjembatani kesenjangan komunikasi antargenerasi, mendorong pemahaman dan hubungan yang lebih baik. Di dunia di mana bahasa digital berubah dengan cepat, Teens Language hadir sebagai panduan ramah Anda.',
    howItWorksTitle: 'Cara Kerja',
    howItWorks:
      'Cukup ketik kata, frasa, atau bahkan emoji ke dalam kolom pencarian. AI canggih kami, yang didukung oleh model terbaru Google, akan menganalisis permintaan Anda dan memberikan rincian komprehensif, termasuk makna, platform penggunaan umum, konteks linguistik dan sosial, dan contoh kalimat. Anda juga dapat membuat komik strip yang menyenangkan untuk menghidupkan bahasa!',
    howToUseTitle: 'Cara Penggunaan',
    howToUse: [
      'Masukkan istilah yang ingin Anda pahami di kotak pencarian.',
      'Klik tombol "Cari" untuk melihat hasil yang terperinci.',
      'Klik "Buatkan Ilustrasi" untuk melihat komik strip berdasarkan contoh kalimat.',
    ],
    projectBy: 'Dikembangkan oleh Wita_RJ',
  },
  en: {
    about: 'About',
    title: 'About Teens Language',
    intro:
      'Teens Language is an AI-powered tool designed to help parents, educators, and anyone interested in understanding the ever-evolving slang, terms, and emojis used by the younger generation.',
    goal: 'Our primary mission is to bridge the communication gap between generations, fostering better understanding and connection. In a world where digital language changes rapidly, Teens Language serves as your friendly guide.',
    howItWorksTitle: 'How It Works',
    howItWorks:
      "Simply type a word, phrase, or even an emoji into the search bar. Our advanced AI, powered by Google's latest models, will analyze the query and provide a comprehensive breakdown, including its meaning, context, and real-world example sentences. You can also generate a fun comic strip to bring the language to life!",
    howToUseTitle: 'How to Use',
    howToUse: [
      'Enter the term you want to understand in the search box.',
      'Click the "Search" button to see the detailed results.',
      'Click "Generate Illustration" to see a comic strip based on the example sentences.',
    ],
    projectBy: 'Developed by Wita_RJ',
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="items-center text-center">
          <Icons.logo className="h-12 w-12 text-primary" />
          <DialogTitle className="font-headline text-2xl">
            {t.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm text-muted-foreground text-left max-h-[60vh] overflow-y-auto px-6">
          <p>{t.intro}</p>
          <p>{t.goal}</p>
          <div>
            <h3 className="font-semibold text-foreground mb-2 text-base">
              {t.howItWorksTitle}
            </h3>
            <p>{t.howItWorks}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2 text-base">
              {t.howToUseTitle}
            </h3>
            <ul className="list-decimal list-inside space-y-1">
              {t.howToUse.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground border-t pt-4">
          <p className="font-semibold">{t.projectBy}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
