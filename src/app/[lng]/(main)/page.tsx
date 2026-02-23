'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/client'
import {
  Droplet,
  Sun,
  Smile,
  Wind,
  Annoyed,
  Bed,
  CheckCircle2,
  Circle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useDayState } from '@/hooks/useDayState';

export default function Dashboard({ params }: { params: { lng: string }}) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common')
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [greeting, setGreeting] = useState('');
  const [dateString, setDateString] = useState('');

  // Dummy data for day state detection. In a real app, this would come from a shared state/context.
  const [stressLevel, setStressLevel] = useState(3);
  const [sleepHours, setSleepHours] = useState(7.5);

  const dayState = useDayState({
    mood: selectedMood,
    stressLevel,
    sleepHours,
  });

  // The 'dayState' variable now holds either "normal" or "gentle".
  // This can be used in the future to adapt the UI.

  useEffect(() => {
    const today = new Date();
    const hour = today.getHours();

    if (hour < 12) {
      setGreeting(t('greeting_morning'));
    } else if (hour < 18) {
      setGreeting(t('greeting_afternoon'));
    } else {
      setGreeting(t('greeting_evening'));
    }

    setDateString(
      today.toLocaleDateString(lng, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    );
  }, [lng, t]);

  const moodOptions = [
    { name: 'Happy', icon: Smile },
    { name: 'Calm', icon: Wind },
    { name: 'Stressed', icon: Annoyed },
    { name: 'Tired', icon: Bed },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">
          {greeting || t('greeting')}
        </h1>
        <p className="text-muted-foreground">
          {dateString &&
            t('dashboard_subtitle', { date: dateString })}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Water Intake Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="size-5 text-primary" />
              <span>Water Intake</span>
            </CardTitle>
            <CardDescription>Daily Goal: 8 glasses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-2">
              {[...Array(8)].map((_, i) => (
                <Droplet
                  key={i}
                  className={cn(
                    'size-8 transition-colors',
                    i < 4 ? 'text-chart-2 fill-chart-2/60' : 'text-muted/50'
                  )}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              You're doing great, stay hydrated 💧
            </p>
          </CardContent>
          <CardFooter>
            <Progress value={50} aria-label="Water intake progress: 50%" />
          </CardFooter>
        </Card>

        {/* Mood & Stress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="size-5 text-primary" />
              <span>Mood & Stress</span>
            </CardTitle>
            <CardDescription>Last logged: {selectedMood}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-around items-center">
            {moodOptions.map(({ name, icon: Icon }) => (
              <Button
                key={name}
                variant={selectedMood === name ? 'secondary' : 'ghost'}
                className="h-16 w-16 sm:h-20 sm:w-20 flex-col gap-1 rounded-lg"
                onClick={() => setSelectedMood(name)}
              >
                <Icon className="size-7 sm:size-8" />
                <span className="text-xs font-medium">{name}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Daily Skincare Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="size-5 text-primary" />
              <span>Daily Skincare</span>
            </CardTitle>
            <CardDescription>Your AM & PM routine status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href={`/${lng}/skincare`}>
              <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-6 text-green-500" />
                  <div>
                    <span className="font-medium">Morning Routine</span>
                    <p className="text-xs text-muted-foreground">3 / 5 steps completed</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={`/${lng}/skincare`}>
              <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  <Circle className="size-6 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Evening Routine</span>
                    <p className="text-xs text-muted-foreground">0 / 4 steps completed</p>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
        
        {/* Wellness Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <span>Wellness Summary</span>
            </CardTitle>
            <CardDescription>A quick look at your day.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your wellness looks balanced today. Keep up the great work with your hydration and skincare routines. Remember to take a moment for yourself.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
