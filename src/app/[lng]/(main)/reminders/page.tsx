"use client"

import * as React from 'react';
import { useState } from "react"
import { Bell, Clock, Plus, Tag, Trash2 } from "lucide-react"

import type { Reminder } from "@/lib/types"
import { useTranslation } from "@/lib/i18n/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

export default function RemindersPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = React.use(params);
  const { t } = useTranslation(lng, 'common');

  const { user } = useAuth();

  const [reminders, setReminders] = useState<Reminder[]>([])
  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("12:00")
  const [type, setType] = useState<Reminder["type"]>("Medication")
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null)
  const [triggeredReminders, setTriggeredReminders] = useState<string[]>([])
  /* 🔔 Ask notification permission */
React.useEffect(() => {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}, []);

  /* 🔹 Load reminders */
  React.useEffect(() => {
    if (!user) return;

    const loadReminders = async () => {
      const q = query(
        collection(db, "reminders"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const list: Reminder[] = [];

      snapshot.forEach((d) => {
        const data = d.data();
        list.push({
          id: d.id,
          title: data.title,
          time: data.time,
          type: data.type,
        });
      });

      setReminders(list);
    };

    loadReminders();
  }, [user]);
  /* 🔔 Reminder Notification Checker */
React.useEffect(() => {

  const interval = setInterval(() => {

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const currentTime = `${hours}:${minutes}`;

    reminders.forEach((reminder) => {

    if (
  reminder.time === currentTime &&
  !triggeredReminders.includes(reminder.id)
) {

  setActiveReminder(reminder); // show popup
  setTriggeredReminders(prev => [...prev, reminder.id])

  if (Notification.permission === "granted") {
    new Notification("Reminder 🔔", {
      body: reminder.title,
    });
  }

 }

    });

  }, 1000);

  return () => clearInterval(interval);

}, [reminders]);
const deleteReminder = async (id: string) => {

  try {
    await deleteDoc(doc(db, "reminders", id))

    setReminders(prev => prev.filter(r => r.id !== id))

  } catch (error) {
    console.log("Delete reminder error", error)
  }

}
const formatTime = (time: string) => {

  const [hours, minutes] = time.split(":").map(Number)

  const period = hours >= 12 ? "PM" : "AM"

  const formattedHour = hours % 12 || 12

  return `${formattedHour}:${minutes.toString().padStart(2,"0")} ${period}`

}
  const getTypeBadge = (type: Reminder['type']) => {
    switch(type) {
      case 'Medication': return <Badge variant="secondary">Medication</Badge>;
      case 'Appointment': return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Appointment</Badge>;
      case 'Self-care': return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Self-care</Badge>;
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_reminders')}</h1>
          <p className="text-muted-foreground">
            {t('page_subtitle_reminders')}
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t('add_reminder')}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("new_reminder")}</DialogTitle>
              <DialogDescription>
               {t("reminder_description")}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="title" className="text-left sm:text-right">
                  {t("title")}
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("example_reminder")}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="time" className="text-left sm:text-right">
                  {t("time")}
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="type" className="text-left sm:text-right">
                  {t("type")}
                </Label>
                <Select onValueChange={(v) => setType(v as Reminder["type"])}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={t("select_type")}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medication">{t("medication")}</SelectItem>
                    <SelectItem value="Appointment">{t("appointment")}</SelectItem>
                   <SelectItem value="Self-care">{t("self_care")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={async () => {
                  if (!user || !title) return;

                  const docRef = await addDoc(collection(db, "reminders"), {
                    userId: user.uid,
                    title,
                    time,
                    type,
                    createdAt: serverTimestamp(),
                  });

                  setReminders(prev => [
                    ...prev,
                    { id: docRef.id, title, time, type }
                  ]);

                  setTitle("");
                  setTime("12:00");
                  setType("Medication");
                  setOpen(false);
                }}
              >
                {t("save_reminder")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
  <TableHead className="px-2 sm:px-4">{t("title")}</TableHead>
  <TableHead className="px-2 sm:px-4">{t("time")}</TableHead>
  <TableHead className="px-2 sm:px-4">{t("type")}</TableHead>
  <TableHead className="px-2 sm:px-4">{t("action")}</TableHead>
</TableRow>
          </TableHeader>
          <TableBody>
            {reminders.map((reminder) => (
              <TableRow key={reminder.id}>
  <TableCell className="font-medium px-2 sm:px-4">{reminder.title}</TableCell>
  <TableCell className="px-2 sm:px-4">
  {formatTime(reminder.time)}
</TableCell>
  <TableCell className="px-2 sm:px-4">{getTypeBadge(reminder.type)}</TableCell>

  <TableCell>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => deleteReminder(reminder.id)}
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  </TableCell>

</TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {activeReminder && (
  <div className="fixed bottom-6 right-6 bg-white border shadow-lg rounded-xl p-4 w-72 z-50">

    <div className="flex items-center gap-3">
      <Bell className="text-pink-500" />
      <div>
        <p className="font-semibold">{t("reminder")}</p>
        <p className="text-sm text-muted-foreground">
          {activeReminder.title}
        </p>
      </div>
    </div>

   <Button
  className="mt-3 w-full"
  onClick={() => {
    if(activeReminder){
      setTriggeredReminders(prev => [...prev, activeReminder.id])
    }
    setActiveReminder(null)
  }}
>
 {t("dismiss")}
</Button>

  </div>
)}
    </div>
  )
}