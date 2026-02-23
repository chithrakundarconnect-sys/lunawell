'use client';

import { use, Fragment, useState, useEffect } from 'react';
import { Apple, Utensils, Heart } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/client';
import { useDayState } from '@/hooks/useDayState';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const MealInput = ({ mealName, t }: { mealName: string; t: (key: string) => string; }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="flex-1 w-full">
          <Label htmlFor={mealName.toLowerCase()} className="text-lg font-medium">{t(`diet_${mealName.toLowerCase()}`)}</Label>
          <Input id={mealName.toLowerCase()} placeholder={t('diet_placeholder', { meal: t(`diet_${mealName.toLowerCase()}`).toLowerCase() })} className="mt-1"/>
        </div>
        <div className="w-full sm:w-auto">
          <Label htmlFor={`${mealName.toLowerCase()}-time`} className="text-sm font-medium text-muted-foreground">{t('diet_time')}</Label>
          <Input id={`${mealName.toLowerCase()}-time`} type="time" className="mt-1" />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id={`${mealName.toLowerCase()}-healthy`} />
        <Label htmlFor={`${mealName.toLowerCase()}-healthy`} className="text-sm font-normal text-muted-foreground">
          {t('diet_healthy_choice')}
        </Label>
      </div>

      <div className="space-y-2 pt-2">
        <Label className="text-sm font-medium text-muted-foreground">{t('diet_post_meal_mood')}</Label>
        <RadioGroup onValueChange={setSelectedMood} value={selectedMood || ''} className="flex flex-wrap gap-4 pt-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="good" id={`${mealName.toLowerCase()}-good`} />
            <Label htmlFor={`${mealName.toLowerCase()}-good`} className="font-normal cursor-pointer">{t('diet_mood_good')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="okay" id={`${mealName.toLowerCase()}-okay`} />
            <Label htmlFor={`${mealName.toLowerCase()}-okay`} className="font-normal cursor-pointer">{t('diet_mood_okay')}</Label>
          </div>
           <div className="flex items-center space-x-2">
            <RadioGroupItem value="heavy" id={`${mealName.toLowerCase()}-heavy`} />
            <Label htmlFor={`${mealName.toLowerCase()}-heavy`} className="font-normal cursor-pointer">{t('diet_mood_heavy')}</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default function DietTrackingPage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Dummy data for day state detection. In a real app, this would come from a shared state/context.
  const dayState = useDayState({
    mood: 'Happy',
    stressLevel: 3,
    sleepHours: 7.5,
  });

  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_diet')}</h1>
        <p className="text-muted-foreground">{t('page_subtitle_diet')}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="size-5 text-primary" />
                {t('diet_todays_meals')}
              </CardTitle>
              <CardDescription>
                {t('diet_log_prompt')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {isClient && meals.map((meal, index) => (
                <Fragment key={meal}>
                  <MealInput mealName={meal} t={t} />
                  {index < meals.length - 1 && <Separator />}
                </Fragment>
              ))}
            </CardContent>
            <CardFooter>
                 <Button>{t('diet_save_log')}</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="size-5 text-primary" />
                {t('diet_daily_summary')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {t('diet_summary_encouragement')}
              </p>
            </CardContent>
          </Card>
          
          {dayState === 'gentle' && (
            <Card className="bg-secondary/50 border-primary/20">
              <CardContent className="pt-6">
                <p className="flex items-center gap-2 text-sm text-primary-foreground font-medium">
                  <Heart className="size-4 text-primary fill-primary" />
                  {t('diet_gentle_day_note')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
