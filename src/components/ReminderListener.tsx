"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReminderListener() {

  const { user } = useAuth()

  const [reminders, setReminders] = useState<any[]>([])
  const [activeReminder, setActiveReminder] = useState<any>(null)
  const [triggered, setTriggered] = useState<string[]>([])

  /* Ask notification permission */
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission()
    }
  }, [])

  /* Real-time reminder listener */
  useEffect(() => {

    if (!user) return

    const q = query(
      collection(db, "reminders"),
      where("userId", "==", user.uid)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const list: any[] = []

      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })

      setReminders(list)

    })

    return () => unsubscribe()

  }, [user])

  /* Reminder checker */
  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")

      const currentTime = `${hours}:${minutes}`

      reminders.forEach(reminder => {

        if (
          reminder.time === currentTime &&
          !triggered.includes(reminder.id)
        ) {

          setActiveReminder(reminder)

          setTriggered(prev => [...prev, reminder.id])

          if (Notification.permission === "granted") {
            new Notification("Reminder 🔔", {
              body: reminder.title
            })
          }

        }

      })

    }, 1000)

    return () => clearInterval(interval)

  }, [reminders, triggered])

  if (!activeReminder) return null

  return (

    <div className="fixed bottom-6 right-6 bg-white border shadow-lg rounded-xl p-4 w-72 z-50">

      <div className="flex items-center gap-3">

        <Bell className="text-pink-500" />

        <div>
          <p className="font-semibold">Reminder</p>
          <p className="text-sm">{activeReminder.title}</p>
        </div>

      </div>

      <Button
        className="mt-3 w-full"
        onClick={() => setActiveReminder(null)}
      >
        Dismiss
      </Button>

    </div>

  )

}