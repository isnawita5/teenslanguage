'use client';

import { useState, useMemo } from 'react';
import { Smile, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { emojiCategories } from '@/lib/emojis';

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
}

export function EmojiPicker({ onSelectEmoji }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmojis = useMemo(() => {
    if (!searchTerm) {
      return emojiCategories;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return emojiCategories.map(category => {
      const filtered = category.emojis.filter(emoji => 
        emoji.e.includes(lowerCaseSearchTerm) || 
        emoji.k.some(keyword => keyword.toLowerCase().includes(lowerCaseSearchTerm))
      );
      
      return { ...category, emojis: filtered };
    }).filter(category => category.emojis.length > 0);

  }, [searchTerm]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-14 w-14"
          aria-label="Open emoji picker"
        >
          <Smile className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-border">
        <div className="p-2 border-b border-border">
            <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search emoji..."
                    className="pl-8 h-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search emojis"
                />
            </div>
        </div>
        <ScrollArea className="h-72">
            <div className="p-2">
                {filteredEmojis.length > 0 ? (
                    filteredEmojis.map(category => (
                        <div key={category.name} className="mb-2">
                            <div className="text-xs font-semibold text-muted-foreground px-2 py-1 sticky top-0 bg-popover/90 backdrop-blur-sm z-10">
                                {category.name}
                            </div>
                            <div className="grid grid-cols-8 gap-1">
                                {category.emojis.map(({ e: emoji }) => (
                                    <button
                                        key={emoji}
                                        onClick={() => onSelectEmoji(emoji)}
                                        className="flex h-9 w-9 items-center justify-center rounded-md text-2xl transition-transform hover:scale-110 hover:bg-accent"
                                        aria-label={`Select emoji ${emoji}`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-sm text-muted-foreground p-4">No emojis found.</p>
                )}
            </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
