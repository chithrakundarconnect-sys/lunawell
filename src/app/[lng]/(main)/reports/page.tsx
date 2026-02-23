"use client"

import { use } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const sleepData = [
  { date: "Mon", hours: 6.5 },
  { date: "Tue", hours: 7 },
  { date: "Wed", hours: 8 },
  { date: "Thu", hours: 7.5 },
  { date: "Fri", hours: 6 },
  { date: "Sat", hours: 9 },
  { date: "Sun", hours: 8.5 },
]

const waterData = [
  { date: "Mon", glasses: 8 },
  { date: "Tue", glasses: 6 },
  { date: "Wed", glasses: 7 },
  { date: "Thu", glasses: 8 },
  { date: "Fri", glasses: 5 },
  { date: "Sat", glasses: 8 },
  { date: "Sun", glasses: 7 },
]

const moodData = [
  { mood: "Great", value: 12, fill: "hsl(var(--chart-2))" },
  { mood: "Good", value: 45, fill: "hsl(var(--chart-1))" },
  { mood: "Okay", value: 25, fill: "hsl(var(--chart-3))" },
  { mood: "Bad", value: 18, fill: "hsl(var(--chart-4))" },
]

const chartConfig: ChartConfig = {
  hours: { label: "Sleep (hours)", color: "hsl(var(--chart-1))" },
  glasses: { label: "Water (glasses)", color: "hsl(var(--chart-2))" },
  mood: { label: "Mood" },
};

export default function ReportsPage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_reports')}</h1>
        <p className="text-muted-foreground">
          {t('page_subtitle_reports')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sleep Pattern</CardTitle>
            <CardDescription>Average sleep duration over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <LineChart data={sleepData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="hours" stroke="var(--color-hours)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Water Intake Consistency</CardTitle>
            <CardDescription>Daily water intake over the last week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={waterData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 8]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="glasses" fill="var(--color-glasses)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Mood Distribution</CardTitle>
            <CardDescription>A breakdown of your mood logs for this month.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
             <ChartContainer config={chartConfig} className="h-64 w-full">
                <PieChart>
                    <Tooltip content={<ChartTooltipContent nameKey="mood" />} />
                    <Pie data={moodData} dataKey="value" nameKey="mood" cx="50%" cy="50%" outerRadius={80} label>
                        {moodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
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
