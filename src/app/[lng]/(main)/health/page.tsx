'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Leaf, Shield, Dumbbell, Smile, Wind, Annoyed, Bed, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
Popover,
PopoverContent,
PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/client';
import { useDayState } from '@/hooks/useDayState';
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "@/components/ui/accordion"
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

export default function HealthTrackingPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = React.use(params);
const { t } = useTranslation(lng, 'common');
const { user } = useAuth();
const todayDate = new Date().toISOString().split("T")[0];
const [docId, setDocId] = React.useState<string | null>(null);

const [lastPeriodDate, setLastPeriodDate] = React.useState<Date>();
const [cycleLength, setCycleLength] = React.useState<number>(28);
const [periodLength, setPeriodLength] = React.useState<number>(5);
const [stressLevel, setStressLevel] = React.useState([3]);
const [energyLevel, setEnergyLevel] = React.useState([5]);

// State for day state detection
const [mood, setMood] = React.useState('Happy');
const [sleepHours, setSleepHours] = React.useState([7.5]);
React.useEffect(() => {
  if (!user) return;

  const loadHealth = async () => {
    const q = query(
      collection(db, "dailyHealth"),
      where("userId", "==", user.uid),
      where("date", "==", todayDate)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const d = snapshot.docs[0];
      const data = d.data();

      setMood(data.mood || "Happy");
      setStressLevel([data.stressLevel || 3]);
      setSleepHours([data.sleepHours || 7.5]);
      setEnergyLevel([data.energyLevel || 5]);
     if (data.lastPeriodDate?.toDate) {
  setLastPeriodDate(data.lastPeriodDate.toDate());
} else {
  setLastPeriodDate(undefined);
}
      setDocId(d.id);
    }
  };

  loadHealth();
}, [user]);

const { toast } = useToast();
const [isClient, setIsClient] = React.useState(false);

React.useEffect(() => {
setIsClient(true);
}, []);

const dayState = useDayState({
mood,
stressLevel: stressLevel[0],
sleepHours: sleepHours[0],
});

const handleSave = async () => {
if (!user) return;

const healthData = {
userId: user.uid,
date: todayDate,
mood,
stressLevel: stressLevel[0],
sleepHours: sleepHours[0],
energyLevel: energyLevel[0],
lastPeriodDate: lastPeriodDate ?? null,
createdAt: serverTimestamp(),
};

try {
   // 🔹 Save daily health (for dashboard)
    if (docId) {
      await updateDoc(doc(db, "dailyHealth", docId), healthData);
    } else {
      const newDoc = await addDoc(collection(db, "dailyHealth"), healthData);
      setDocId(newDoc.id);
    }
await setDoc(
  doc(db, "users", user.uid),
  {
    lastPeriodDate: lastPeriodDate
      ? lastPeriodDate.toISOString().split("T")[0]
      : null,
    cycleLength: cycleLength,
    periodLength: periodLength,
  },
  { merge: true }
);

await setDoc(
  doc(db, "users", user.uid),
  {
    lastPeriodDate: lastPeriodDate
      ? lastPeriodDate.toISOString().split("T")[0]
      : null,
    cycleLength: cycleLength,
    periodLength: periodLength,
  },
  { merge: true }
);
toast({
  title: "Health Data Saved!",
  description: "Your wellness data has been updated successfully.",
});

} catch (error) {
console.error(error);
toast({
title: "Error",
description: "Failed to save health data",
});
}
};

const moodOptions = [
{ name: 'Happy', icon: Smile },
{ name: 'Calm', icon: Wind },
{ name: 'Stressed', icon: Annoyed },
{ name: 'Tired', icon: Bed },
];

return (
<div className="space-y-8">
<div className="flex items-center justify-between">
<div>
<h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_health')}</h1>
<p className="text-muted-foreground">
{t('page_subtitle_health')}
</p>
<p className="text-sm text-muted-foreground pt-2">Day Mode: <span className="font-bold text-primary">{dayState}</span></p>
</div>
<Button onClick={handleSave} className="hidden sm:inline-flex">{t('save')}</Button>
</div>

<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">  
    <Card className="lg:col-span-1">  
      <CardHeader>  
        <CardTitle className="flex items-center gap-2">  
          <Leaf className="size-5 text-primary" />  
          <span>Menstrual Cycle</span>  
        </CardTitle>  
        <CardDescription>  
          Track your cycle for wellness insights.  
        </CardDescription>  
      </CardHeader>  
      <CardContent className="space-y-6">  
        {isClient && (  
          <>  
            <div className="space-y-2">  
              <Label htmlFor="last-period">Last Period Start Date</Label>  
              <Popover>  
                <PopoverTrigger asChild>  
                  <Button  
                    variant={'outline'}  
                    className={cn(  
                      'w-full justify-start text-left font-normal',  
                      !lastPeriodDate && 'text-muted-foreground'  
                    )}  
                  >  
                    <CalendarIcon className="mr-2 h-4 w-4" />  
                    {lastPeriodDate instanceof Date && !isNaN(lastPeriodDate.getTime())
  ? format(lastPeriodDate, "PPP")
  : "Pick a date"}
                  </Button>  
                </PopoverTrigger>  
                <PopoverContent className="w-auto p-0">  
                  <Calendar
  mode="single"
  selected={lastPeriodDate}
  onSelect={setLastPeriodDate}
  defaultMonth={lastPeriodDate || new Date()}
  captionLayout="dropdown"
  fromYear={2020}
  toYear={2035}
  initialFocus
/>
                </PopoverContent>  
              </Popover>  
            </div>  
            <div className="space-y-2">  
              <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>  
              <Input
  id="cycle-length"
  type="number"
  placeholder="e.g., 28"
  value={cycleLength}
  onChange={(e) => setCycleLength(Number(e.target.value))}
/>
            </div>  
            <div className="space-y-2">  
              <Label htmlFor="period-length">Average Period Length (days)</Label>  
              <Input
  id="period-length"
  type="number"
  placeholder="e.g., 5"
  value={periodLength}
  onChange={(e) => setPeriodLength(Number(e.target.value))}
/>
            </div>  
          </>  
        )}  
      </CardContent>  
      <CardFooter>  
        <p className="text-xs text-muted-foreground">  
          Used only for wellness tracking, not medical diagnosis.  
        </p>  
      </CardFooter>  
    </Card>  

    <Card className="lg:col-span-2">  
      <CardHeader>  
        <CardTitle>Daily Wellness Log</CardTitle>  
        <CardDescription>  
          How are you feeling today?  
        </CardDescription>  
      </CardHeader>  
      <CardContent className="space-y-6">  
        <div className="space-y-4">  
          <Label className="flex items-center gap-2 font-medium">  
            <Smile className="size-5 text-yellow-500" />  
            Mood  
          </Label>  
          <div className="flex justify-around items-center rounded-lg border p-2 sm:p-4">  
            {moodOptions.map(({ name, icon: Icon }) => (  
              <Button  
                key={name}  
                variant={mood === name ? 'secondary' : 'ghost'}  
                className="h-14 w-14 sm:h-16 sm:w-16 flex-col gap-1 rounded-lg"  
                onClick={() => setMood(name)}  
              >  
                <Icon className="size-6 sm:size-7" />  
                <span className="text-xs font-medium">{name}</span>  
              </Button>  
            ))}  
          </div>  
        </div>  
          
        {isClient && (  
          <>  
            <div className="space-y-4">  
              <Label htmlFor="stress-level" className="flex items-center gap-2 font-medium">  
                <Shield className="size-5 text-blue-500" />  
                Stress Level: <span className="font-bold">{stressLevel[0]}</span>  
              </Label>  
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">  
                <span className="text-sm text-muted-foreground">Low</span>  
                <Slider
  id="stress-level"
  value={stressLevel}
  max={10}
  step={1}
  onValueChange={setStressLevel}
/>
                <span className="text-sm text-muted-foreground">High</span>  
              </div>  
            </div>  

            <Accordion type="single" collapsible className="w-full">  
              <AccordionItem value="item-1" className="border-b-0">  
                <AccordionTrigger className="text-base font-medium text-muted-foreground hover:no-underline [&[data-state=open]>svg]:text-primary">  
                    Optional Wellness Details  
                </AccordionTrigger>  
                <AccordionContent className="pt-6 space-y-8">  
                   <div className="space-y-4">  
                     <Label htmlFor="sleep-hours" className="flex items-center gap-2 font-medium">  
                       <Bed className="size-5 text-purple-500" />  
                       Sleep Hours: <span className="font-bold">{sleepHours[0]}</span>  
                     </Label>  
                     <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">  
                       <span className="text-sm text-muted-foreground">0</span>  
                       <Slider  
                           id="sleep-hours"  
                           defaultValue={sleepHours}  
                           max={12}  
                           step={0.5}  
                           onValueChange={setSleepHours}  
                       />  
                       <span className="text-sm text-muted-foreground">12</span>  
                     </div>  
                   </div>  

                   <div className="space-y-4">  
                     <Label htmlFor="energy-level" className="flex items-center gap-2 font-medium">  
                       <Zap className="size-5 text-orange-500" />  
                       Energy Level: <span className="font-bold">{energyLevel[0]}</span>  
                     </Label>  
                     <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">  
                       <span className="text-sm text-muted-foreground">Low</span>  
                       <Slider  
                           id="energy-level"  
                           defaultValue={energyLevel}  
                           max={10}  
                           step={1}  
                           onValueChange={setEnergyLevel}  
                       />  
                       <span className="text-sm text-muted-foreground">High</span>  
                     </div>  
                   </div>  

                   <div className="space-y-4">  
                     <Label className="flex items-center gap-2 font-medium">  
                       <Dumbbell className="size-5 text-green-500" />  
                       Physical Activity  
                     </Label>  
                     <RadioGroup defaultValue="moderate" className="flex flex-wrap gap-4">  
                       <div className="flex items-center space-x-2">  
                         <RadioGroupItem value="light" id="activity-light" />  
                         <Label htmlFor="activity-light">Light</Label>  
                       </div>  
                       <div className="flex items-center space-x-2">  
                         <RadioGroupItem value="moderate" id="activity-moderate" />  
                         <Label htmlFor="activity-moderate">Moderate</Label>  
                       </div>  
                       <div className="flex items-center space-x-2">  
                         <RadioGroupItem value="active" id="activity-active" />  
                         <Label htmlFor="activity-active">Active</Label>  
                       </div>  
                     </RadioGroup>  
                   </div>  
                </AccordionContent>  
              </AccordionItem>  
            </Accordion>  
          </>  
        )}  
      </CardContent>  
    </Card>  
  </div>  
  <Button onClick={handleSave} className="sm:hidden w-full">{t('save')}</Button>  
</div>

);
}