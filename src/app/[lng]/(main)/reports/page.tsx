"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis, Cell } from "recharts"
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

// AUTH
import { useAuth } from "@/context/AuthContext";

// MOOD ANALYTICS (UNCHANGED)
import { getMoodAnalytics } from "@/lib/getHealthData";

// 🔥 FIRESTORE
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";


const chartConfig: ChartConfig = {
  hours: { label: "Sleep (hours)", color: "hsl(var(--chart-1))" },
  glasses: { label: "Water (glasses)", color: "hsl(var(--chart-2))" },
  mood: { label: "Mood" },
};

export default function ReportsPage() {

  const params = useParams();
  const lng = params?.lng as string;
  const { t } = useTranslation(lng, "common");

  const { user } = useAuth();

  const [moodData, setMoodData] = useState<any[]>([]);
  const [sleepData, setSleepData] = useState<any[]>([]);
  const [waterData, setWaterData] = useState<any[]>([]);

  useEffect(() => {

    if (!user) return;

    const loadData = async () => {

      // ================= MOOD (UNCHANGED) =================
      const mood = await getMoodAnalytics(user.uid);

      const colored = [
        { ...mood[0], fill: "hsl(var(--chart-2))" },
        { ...mood[1], fill: "hsl(var(--chart-1))" },
        { ...mood[2], fill: "hsl(var(--chart-4))" },
        { ...mood[3], fill: "hsl(var(--chart-3))" },
      ];

      setMoodData(colored);

      // ================= SLEEP DATA =================
      const sleepQuery = query(
        collection(db, "dailyHealth"),
        where("userId", "==", user.uid),
        orderBy("date", "desc")
      );

      const sleepSnapshot = await getDocs(sleepQuery);

      const sleepList: any[] = [];

      sleepSnapshot.forEach((doc) => {
        const d = doc.data();

        if (d.sleepHours) {
          sleepList.push({
            date: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
            hours: d.sleepHours,
          });
        }
      });

      setSleepData(sleepList.slice(0, 7).reverse());

      // ================= WATER DATA =================
      const waterQuery = query(
        collection(db, "waterIntake"),
        where("userId", "==", user.uid),
        orderBy("date", "desc")
      );

      const waterSnapshot = await getDocs(waterQuery);

      const waterList: any[] = [];

      waterSnapshot.forEach((doc) => {
        const d = doc.data();

        waterList.push({
          date: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
          glasses: d.glasses,
        });
      });

      setWaterData(waterList.slice(0, 7).reverse());
    };

    loadData();

  }, [user]);


  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_reports')}</h1>
        <p className="text-muted-foreground">
          {t('page_subtitle_reports')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* SLEEP */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sleep Pattern</CardTitle>
            <CardDescription>Average sleep duration over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="hours" stroke="var(--color-hours)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* WATER */}
        <Card>
          <CardHeader>
            <CardTitle>Water Intake Consistency</CardTitle>
            <CardDescription>Daily water intake over the last week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 8]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="glasses" fill="var(--color-glasses)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* MOOD (UNCHANGED) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Mood Distribution</CardTitle>
            <CardDescription>This chart is now generated from your real mood logs.</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <PieChart>
                <Tooltip />
                <Pie
                  data={moodData}
                  dataKey="value"
                  nameKey="mood"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {moodData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}