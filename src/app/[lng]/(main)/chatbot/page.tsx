import { Chatbot } from "@/components/chatbot";
import { useTranslation } from "@/lib/i18n";
import { use } from 'react';

export default function ChatbotPage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = use(useTranslation(lng, 'common'));
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
