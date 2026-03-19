'use client';

import { useParams } from 'next/navigation';
import { Droplet, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/* ⭐ NEW IMPORTS (ONLY ADDED — NOTHING REMOVED) */
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function AchievementsPage() {

// 🔥 Correct way to read [lng] in client components
const params = useParams() as { lng?: string };
const lng = params.lng ?? 'en';

const { t } = useTranslation(lng, 'common');

/* ⭐ USER */
const { user } = useAuth();

/* ⭐ ACHIEVEMENT STATES */
const [hydrationStreak, setHydrationStreak] = useState(0);
const [skincareDays, setSkincareDays] = useState(0);
const [wellnessDays, setWellnessDays] = useState(0);

  const calculateHydrationStreak = (records: any[]) => {
  if (!records.length) return 0;

  // keep only days user actually drank water
  const dates = records
    .filter(r => r.glasses > 0)
    .map(r => r.date)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;
  let current = new Date();

  for (let i = 0; i < dates.length; i++) {
    const recordDate = new Date(dates[i]);

    const diff =
      Math.floor((current.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));

    // today OR yesterday → continue streak
    if (diff === 0 || diff === 1) {
      streak++;
      current = recordDate;
    } else {
      break;
    }
  }

  return streak;
};


/* ⭐ LOAD ACHIEVEMENTS FROM FIRESTORE */
useEffect(() => {
if (!user) return;

const loadAchievements = async () => {

  // ---------- WATER STREAK ----------
  const waterSnap = await getDocs(
    query(collection(db, "waterIntake"), where("userId", "==", user.uid))
  );
const waterRecords: any[] = [];
waterSnap.forEach(d => waterRecords.push(d.data()));

setHydrationStreak(calculateHydrationStreak(waterRecords));
  // ---------- SKINCARE + WELLNESS ----------
  const healthSnap = await getDocs(
    query(collection(db, "dailyHealth"), where("userId", "==", user.uid))
  );

  const records: any[] = [];
healthSnap.forEach(doc => records.push(doc.data()));


// -------- SKINCARE STREAK --------
const skincareCompleted = records
  .filter(r =>
    r.skincareMorning?.every((i: any) => i.completed === true) &&
    r.skincareEvening?.every((i: any) => i.completed === true)
  )
  .map(r => r.date)
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

let skincareStreak = 0;
let current = new Date();

for (let i = 0; i < skincareCompleted.length; i++) {
  const recordDate = new Date(skincareCompleted[i]);

  const diff = Math.floor(
    (current.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0 || diff === 1) {
    skincareStreak++;
    current = recordDate;
  } else {
    break;
  }
}

setSkincareDays(skincareStreak);


// -------- WELLNESS --------
let wellnessCount = 0;
records.forEach(r => {
  if (r.mood && r.sleepHours) wellnessCount++;
});

setWellnessDays(wellnessCount);
};

loadAchievements();

}, [user]);

return (
<div className="space-y-8">
<div>
<h1 className="text-2xl sm:text-3xl font-bold">
{t('page_title_achievements')}
</h1>
<p className="text-muted-foreground">
{t('page_subtitle_achievements')}
</p>
</div>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

    <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Droplet className="size-6 text-blue-500" />
          <span className="text-blue-900 dark:text-blue-300">{t("hydration_streak")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-blue-900 dark:text-blue-200">
        {hydrationStreak} {t("days")}
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          {t("hydration_desc")}
        </p>
      </CardContent>
    </Card>

    <Card className="bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <ShieldCheck className="size-6 text-rose-500" />
          <span className="text-rose-900 dark:text-rose-300">{t("skincare_champion")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-rose-700 dark:text-rose-400">
         {t("skincare_completed")} {skincareDays} {t("days")}
        </p>
      </CardContent>
    </Card>

    <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Star className="size-6 text-amber-500" />
          <span className="text-amber-900 dark:text-amber-300">{t("wellness_star")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          {t("wellness_recorded")} {wellnessDays} {t("days")}
        </p>
      </CardContent>
    </Card>

  </div>

  <div className="text-center text-muted-foreground text-sm pt-4">
    <p>{t("achievements_desc")}</p>
  </div>
</div>

);
}