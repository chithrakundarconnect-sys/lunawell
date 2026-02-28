"use client"

import * as React from 'react';
import { useState } from "react"
import { Bell, Clock, Plus, Tag } from "lucide-react"

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
              <DialogTitle>New Reminder</DialogTitle>
              <DialogDescription>
                Set a reminder for your medication, appointments, or self-care activities.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="title" className="text-left sm:text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Evening Meditation"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="time" className="text-left sm:text-right">
                  Time
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
                  Type
                </Label>
                <Select onValueChange={(v) => setType(v as Reminder["type"])}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medication">Medication</SelectItem>
                    <SelectItem value="Appointment">Appointment</SelectItem>
                    <SelectItem value="Self-care">Self-care</SelectItem>
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
                Save Reminder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-2 sm:px-4"><Bell className="h-4 w-4 inline-block mr-2" /> Title</TableHead>
              <TableHead className="px-2 sm:px-4"><Clock className="h-4 w-4 inline-block mr-2" /> Time</TableHead>
              <TableHead className="px-2 sm:px-4"><Tag className="h-4 w-4 inline-block mr-2" /> Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reminders.map((reminder) => (
              <TableRow key={reminder.id}>
                <TableCell className="font-medium px-2 sm:px-4">{reminder.title}</TableCell>
                <TableCell className="px-2 sm:px-4">{reminder.time}</TableCell>
                <TableCell className="px-2 sm:px-4">{getTypeBadge(reminder.type)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}