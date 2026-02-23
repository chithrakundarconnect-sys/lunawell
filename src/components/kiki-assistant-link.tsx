'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { KikiAvatar } from '@/components/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function KikiAssistantLink({ lng }: { lng: string }) {
  const pathname = usePathname();
  const isChatbotPage = pathname === `/${lng}/chatbot`;

  if (isChatbotPage) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/${lng}/chatbot`}
            className={cn(
              "fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-card shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            aria-label="Chat with Kiki"
          >
            <KikiAvatar className="h-14 w-14" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left" className="mr-2">
          <p>Chat with Kiki</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
