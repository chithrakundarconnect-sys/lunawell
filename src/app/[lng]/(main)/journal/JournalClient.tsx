'use client';

import useLng from '@/hooks/useLng';
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";

import { useTranslation } from '@/lib/i18n/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export default function HealthJournalPage() {

  const lng = useLng();
  const { t } = useTranslation(lng, 'common');

  // 🔐 logged user
  const { user } = useAuth();

  // journal text state
  const [entryText, setEntryText] = useState("");

  // ⭐ store past entries
  const [entries, setEntries] = useState<any[]>([]);

  // ---------------- LOAD USER JOURNAL ----------------
  const loadEntries = async () => {
    if (!user) return;

    try {
      const q = query(
  collection(db, "journal"),
  where("userId", "==", user.uid)
);


      const snapshot = await getDocs(q);

const data: any[] = [];

snapshot.forEach((doc) => {
  data.push({
    id: doc.id,
    ...doc.data()
  });
});

// ⭐ THIS IS THE IMPORTANT PART (sorting)
data.sort((a, b) => {
  if (!a.createdAt || !b.createdAt) return 0;
  return b.createdAt.seconds - a.createdAt.seconds;
});

setEntries(data);

      setEntries(data);

    } catch (error) {
      console.error("Load journal error:", error);
    }
  };

  // load when user is ready
  useEffect(() => {
  if (!user || !user.uid) return;

  loadEntries();

}, [user?.uid]);
  // ---------------- SAVE JOURNAL ----------------
  const saveJournal = async () => {

    if (!user) {
      alert("Please login first");
      return;
    }

    if (entryText.trim() === "") {
      alert("Write something first");
      return;
    }

    try {
      await addDoc(collection(db, "journal"), {
        userId: user.uid,
        text: entryText,
        createdAt: serverTimestamp(),
      });

      setEntryText("");
      loadEntries(); // reload after save
      alert("Journal saved ❤️");

    } catch (error) {
      console.error("Journal save error:", error);
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          {t('page_title_journal')}
        </h1>
        <p className="text-muted-foreground">
          {t('page_subtitle_journal')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* WRITE JOURNAL */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('journal_todays_entry')}</CardTitle>
              <CardDescription>
                Take a moment to reflect on your physical and emotional state.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              <Textarea
                placeholder={t('journal_placeholder')}
                className="min-h-[200px] resize-none"
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
              />

              <Button onClick={saveJournal}>
                {t('journal_save')}
              </Button>

            </CardContent>
          </Card>
        </div>

        {/* ⭐ REAL PAST ENTRIES */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('journal_past_entries')}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              {entries.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No journal entries yet.
                </p>
              )}

              {entries.map((entry, index) => (
                <div key={index} className="space-y-1">
                  <p className="font-medium text-sm">
                    {entry.createdAt?.seconds
                      ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString()
                      : "Just now"}
                  </p>

                  <p className="text-muted-foreground text-sm">
                    {entry.text}
                  </p>

                  {index < entries.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}

            </CardContent>
          </Card>
        </div>

      </div>

      <p className="text-center text-muted-foreground text-sm pt-4">
        {t('journal_footer_note')}
      </p>

    </div>
  );
}