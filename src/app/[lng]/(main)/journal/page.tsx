'use client';

import { use } from 'react';
import { BookHeart } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const pastEntries = [
  {
    date: 'Yesterday',
    preview: 'Felt calm after completing my skincare routine. The new serum feels great on my skin.',
  },
  {
    date: '2 days ago',
    preview: 'A bit stressed today, but a short meditation session helped. Remembered to drink all my water.',
  },
  {
    date: '3 days ago',
    preview: 'Had a burst of energy in the morning and went for a walk. It was a good start to the day.',
  },
];

export default function HealthJournalPage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_journal')}</h1>
        <p className="text-muted-foreground">{t('page_subtitle_journal')}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('journal_todays_entry')}</CardTitle>
              <CardDescription>
                Take a moment to reflect on your physical and emotional state.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={t('journal_placeholder')}
                className="min-h-[200px] resize-none"
              />
              <Button>{t('journal_save')}</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('journal_past_entries')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pastEntries.map((entry, index) => (
                <div key={index} className="space-y-1">
                  <p className="font-medium text-sm">{entry.date}</p>
                  <p className="text-muted-foreground text-sm">{entry.preview}</p>
                  {index < pastEntries.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <p className="text-center text-muted-foreground text-sm pt-4">
        {t('journal_footer_note')}
      </p>
    </div>
  );
}
