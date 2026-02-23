"use client"

import { use, useState } from "react"
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

const initialReminders: Reminder[] = [
  { id: "1", title: "Take Vitamin D supplement", time: "09:00 AM", type: "Medication" },
  { id: "2", title: "Gynecologist Appointment", time: "02:30 PM", type: "Appointment" },
  { id: "3", title: "Evening Meditation", time: "09:00 PM", type: "Self-care" },
  { id: "4", title: "Refill prescription", time: "11:00 AM", type: "Medication" },
];

export default function RemindersPage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');
  const [reminders, setReminders] = useState(initialReminders)
  const [open, setOpen] = useState(false)

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
                <Input id="title" placeholder="e.g., Evening Meditation" className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="time" className="text-left sm:text-right">
                  Time
                </Label>
                <Input id="time" type="time" defaultValue="12:00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="type" className="text-left sm:text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="self-care">Self-care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setOpen(false)}>Save Reminder</Button>
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
