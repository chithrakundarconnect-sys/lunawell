'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/client';
import {
  Droplet,
  Sun,
  Smile,
  Wind,
  Annoyed,
  Bed,
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
import { useAuth } from "@/context/AuthContext";

import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc 
}from "firebase/firestore";
import { getPeriodPrediction } from "@/lib/mlService";
export default function DashboardClient({ lng }: { lng: string }) {

  const { t } = useTranslation(lng, 'common');
  const { user } = useAuth();

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Friend";

  const [selectedMood, setSelectedMood] = useState('Happy');
  const [greeting, setGreeting] = useState('');
  const [dateString, setDateString] = useState('');
  const [waterGlasses, setWaterGlasses] = useState(0);

  const [sleepHours, setSleepHours] = useState<number | null>(null);
  const [morningDone, setMorningDone] = useState(0);
  const [eveningDone, setEveningDone] = useState(0);
  // PERIOD DATA (ML NEEDS THIS)
const [cycleLength, setCycleLength] = useState<number | null>(null);
const [periodLength, setPeriodLength] = useState<number | null>(null);
const [lastPeriodDate, setLastPeriodDate] = useState<string | null>(null);
const [prediction, setPrediction] = useState<any>(null);

  const [stressLevel] = useState(3);

  const dayState = useDayState({
    mood: selectedMood,
    stressLevel,
    sleepHours: sleepHours || 0,
  });

  // ---------------- SAVE MOOD ----------------
  const saveHealthData = async (moodValue: string) => {
  if (!user) return;

  try {
    const todayDate = new Date().toISOString().split("T")[0];

    await addDoc(collection(db, "dailyHealth"), {
      userId: user.uid,
      date: todayDate,   // ⭐⭐⭐ THIS IS THE MISSING PIECE
      mood: moodValue,
      stressLevel,
      sleepHours: sleepHours || 0,
      dayState,
      createdAt: serverTimestamp(),
    });

    console.log("Health data saved with date:", todayDate);

  } catch (error) {
    console.error("Firestore error:", error);
  }
};
  // ---------------- LOAD TODAY WATER ----------------
  const loadTodayWater = async () => {
  if (!user) return;

  try {
    const todayDate = new Date().toISOString().split("T")[0];

    const q = query(
      collection(db, "waterIntake"),
      where("userId", "==", user.uid),
      where("date", "==", todayDate)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const data: any = snapshot.docs[0].data();
      setWaterGlasses(data.glasses || 0);
    } else {
      setWaterGlasses(0);
    }
  } catch (e) {
    console.log("Water load error", e);
  }
};
  // -------- LOAD TODAY HEALTH (Sleep + Skincare) ----------
 const loadTodayHealth = async () => {
  if (!user) return;

  try {
    const todayDate = new Date().toISOString().split("T")[0];

    // SEARCH today's record (same logic as skincare page)
    const q = query(
      collection(db, "dailyHealth"),
      where("userId", "==", user.uid),
      where("date", "==", todayDate)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    const data: any = snapshot.docs[0].data();

    // ---- Mood ----
if (data.mood) {
  setSelectedMood(data.mood);
}


    // ---- Sleep ----
    if (data.sleepHours) {
      setSleepHours(data.sleepHours);
    }

    // ---- Morning skincare ----
    if (data.skincareMorning) {
      const done = data.skincareMorning.filter((i: any) => i.completed).length;
      setMorningDone(done);
    }

    // ---- Evening skincare ----
    if (data.skincareEvening) {
      const done = data.skincareEvening.filter((i: any) => i.completed).length;
      setEveningDone(done);
    }

  } catch (e) {
    console.log("Dashboard health load error", e);
  }
};
 // -------- LOAD PERIOD DATA FROM USERS COLLECTION ----------
const loadPeriodData = async () => {
  if (!user) return;

  try {
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) return;

    const data: any = snapshot.data();

    setCycleLength(data.cycleLength || null);
    setPeriodLength(data.periodLength || null);
    setLastPeriodDate(data.lastPeriodDate || null);

    console.log("Period data loaded:", data);

  } catch (e) {
    console.log("Period data load error", e);
  }
};
// -------- ML PREDICTION --------
useEffect(() => {
  const runPrediction = async () => {
    if (!lastPeriodDate || !cycleLength) return;

    try {
      const result = await getPeriodPrediction(
        lastPeriodDate,
        cycleLength
      );

      console.log("ML Prediction:", result);
      setPrediction(result);
    } catch (err) {
      console.log("ML error", err);
    }
  };

  runPrediction();
}, [lastPeriodDate, cycleLength]);
  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    if (!user) return;

    const init = async () => {

      const today = new Date();
      const hour = today.getHours();

      if (hour < 12) setGreeting(t('greeting_morning'));
      else if (hour < 18) setGreeting(t('greeting_afternoon'));
      else setGreeting(t('greeting_evening'));

      setDateString(
        today.toLocaleDateString(lng, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      );

      await loadTodayWater();
      await loadTodayHealth();
      await loadPeriodData();
    };

    init();

    const onFocus = () => {
      loadTodayWater();
      loadTodayHealth();
      loadPeriodData();
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);

  }, [user, lng]);

  const moodOptions = [
  { name: 'Happy', label: t("mood_happy"), icon: Smile },
  { name: 'Calm', label: t("mood_calm"), icon: Wind },
  { name: 'Stressed', label: t("mood_stressed"), icon: Annoyed },
  { name: 'Tired', label: t("mood_tired"), icon: Bed },
];


  return (
    <div className="flex flex-col gap-8">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">
          {(greeting || t('greeting')) + ", " + userName + " 🌸"}
        </h1>
        <p className="text-muted-foreground">
          {dateString && t('dashboard_subtitle', { date: dateString })}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Water Intake */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="size-5 text-primary" />
              <span>{t("water_intake")}</span>
            </CardTitle>
            <CardDescription>{t("daily_goal")}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-center gap-2">
              {[...Array(8)].map((_, i) => (
                <Droplet
                  key={i}
                  className={cn(
                    'size-8 transition-colors',
                    i < waterGlasses
                      ? 'text-chart-2 fill-chart-2/60'
                      : 'text-muted/50'
                  )}
                />
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <Progress value={(waterGlasses / 8) * 100} />
          </CardFooter>
        </Card>

        {/* Mood */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="size-5 text-primary" />
              <span>{t("mood_stress")}</span>
            </CardTitle>
            <CardDescription>{t("last_logged")}: {selectedMood}</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-around items-center">
            {moodOptions.map(({ name,label, icon: Icon }) => (
              <Button
                key={name}
                variant={selectedMood === name ? 'secondary' : 'ghost'}
                className="h-16 w-16 sm:h-20 sm:w-20 flex-col gap-1 rounded-lg"
                onClick={() => {
                  setSelectedMood(name);
                  saveHealthData(name);
                }}
              >
                <Icon className="size-7 sm:size-8" />
                <span className="text-xs font-medium">{label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Skincare */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="size-5 text-primary" />
             <span>{t("daily_skincare")}</span>
            </CardTitle>
            <CardDescription>{t("skincare_status")}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Link href={`/${lng}/skincare`}>
              <div className="rounded-lg border p-3 hover:bg-accent cursor-pointer">
                <span className="font-medium">{t("morning_routine")}</span>
                <p className="text-xs text-muted-foreground">
                  {morningDone} / 5 steps completed
                </p>
              </div>
            </Link>

          <Link href={`/${lng}/skincare`}>
              <div className="rounded-lg border p-3 hover:bg-accent cursor-pointer">
                <span className="font-medium">{t("evening_routine")}</span>
                <p className="text-xs text-muted-foreground">
                  {eveningDone} / 5 steps completed
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Wellness Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <span>{t("wellness_summary")}</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {sleepHours
              ? t("wellness_summary_text", {
      sleep: sleepHours,
      morning: morningDone,
      evening: eveningDone,
    })
  : t("no_health_data")}
          </CardContent>
        </Card>

      </div>
      {/* Period Prediction Card */}
{prediction && (
  <div className="mt-8">
    <Card className="border-pink-200 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 shadow-md">
      
      <CardHeader>
        <CardTitle className="text-pink-700 text-xl">
          🌸 {t("period_prediction")}
        </CardTitle>
        <CardDescription>
          {t("period_prediction_desc")}
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">

        <div className="rounded-xl border p-4 bg-white">
         <p className="text-sm text-muted-foreground">
  {t("next_expected_date")} </p>
          <p className="text-lg font-semibold text-pink-600">
            {prediction.nextPeriodDate}
          </p>
        </div>

        <div className="rounded-xl border p-4 bg-white">
          <p className="text-sm text-muted-foreground">
  {t("days_remaining")}
</p>
          <p className="text-lg font-semibold text-purple-600">
            {prediction.daysRemaining} {t("days")}
          </p>
        </div>

      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3">

  {/* Recommendation from Backend */}
  <p className="text-sm text-pink-800 font-medium">
    💡 {t("cycle_health_tip")}
  </p>

  {/* 🔴 Cycle Starting Today */}
  {prediction.daysRemaining === 0 && (
    <div className="w-full p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 font-semibold">
      🔴 {t("cycle_today")}
    </div>
  )}

  {/* ⚠️ Approaching (1–3 days) */}
  {prediction.daysRemaining > 0 && prediction.daysRemaining <= 3 && (
    <div className="w-full p-3 rounded-lg bg-orange-100 border border-orange-300 text-orange-700 font-semibold">
      ⚠️ {t("period_approaching")}
    </div>
  )}

  {/* ⏳ Date Passed */}
  {prediction.daysRemaining < 0 && (
    <div className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 font-semibold">
      ⏳ {t("cycle_passed_message")}
    </div>
  )}

</CardFooter>

    </Card>
  </div>
)}
    </div>
  );
}