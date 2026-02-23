'use client';

import { use } from 'react';
import { Droplet, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AchievementsPage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_achievements')}</h1>
        <p className="text-muted-foreground">{t('page_subtitle_achievements')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Droplet className="size-6 text-blue-500" />
              <span className="text-blue-900 dark:text-blue-300">Hydration Streak</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-200">7 Days</div>
            <p className="text-sm text-blue-700 dark:text-blue-400">You’ve been consistently drinking enough water.</p>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ShieldCheck className="size-6 text-rose-500" />
              <span className="text-rose-900 dark:text-rose-300">Skincare Champion</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-rose-700 dark:text-rose-400">Completed skincare routine for 5 days in a row.</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Star className="size-6 text-amber-500" />
              <span className="text-amber-900 dark:text-amber-300">Wellness Star</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700 dark:text-amber-400">Maintained balanced mood and self-care.</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-muted-foreground text-sm pt-4">
        <p>Achievements are based on regular self-care activities.</p>
      </div>
    </div>
  );
}
