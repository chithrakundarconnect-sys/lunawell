'use client';

import * as React from 'react';
import { Chatbot } from "@/components/chatbot";
import { useTranslation } from "@/lib/i18n/client";


export default function ChatbotPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = React.use(params);
  const { t } = useTranslation(lng, 'common');
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_chatbot')}</h1>
        <p className="text-muted-foreground pt-1">
          Hi, I’m Kiki 🌸 Your wellness companion
        </p>
      </div>
      <Chatbot />
    </div>
  );
}
