
'use client';

import { Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Expanded and reordered emoji list based on popularity
const emojis = [
  '😂', '😍', '😭', '❤️', '🔥', '✨', '💀', '👍',
  '🙏', '🥺', '🥰', '🤔', '👀', '💅', '🤣', '💯',
  '🎉', '🙄', '🤡', '🧢', '🫣', '😮‍💨', '😅', '😏',
  '😊', '😉', '💔', '🤯', '🥳', '🤪', '😵‍💫', '🙌',
];

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
}

export function EmojiPicker({ onSelectEmoji }: EmojiPickerProps) {
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
      <PopoverContent className="w-auto border-none bg-transparent shadow-none">
        <div className="grid grid-cols-8 gap-2 rounded-lg border bg-popover p-4 shadow-lg">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onSelectEmoji(emoji)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-2xl transition-transform hover:scale-110 hover:bg-accent"
              aria-label={`Select emoji ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
