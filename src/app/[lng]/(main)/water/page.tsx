"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import { Droplet, Plus, Minus } from "lucide-react";
import { useTranslation } from "@/lib/i18n/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const TOTAL_GLASSES = 8;

export default function WaterIntakePage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = React.use(params);
  const { t } = useTranslation(lng, "common");

  const { user } = useAuth();

  const [glasses, setGlasses] = useState(0);
  const [docId, setDocId] = useState<string | null>(null);

  const percentage = (glasses / TOTAL_GLASSES) * 100;

  const todayDate = new Date().toISOString().split("T")[0];

  // 🔹 LOAD TODAY RECORD
  useEffect(() => {
    if (!user) return;

    const loadWater = async () => {
      const q = query(
        collection(db, "waterIntake"),
        where("userId", "==", user.uid),
        where("date", "==", todayDate)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        setGlasses(docSnap.data().glasses);
        setDocId(docSnap.id);
      }
    };

    loadWater();
  }, [user]);

  // 🔹 SAVE OR UPDATE FUNCTION
  const saveWater = async (newGlasses: number) => {
    if (!user) return;

    if (docId) {
      await updateDoc(doc(db, "waterIntake", docId), {
        glasses: newGlasses,
      });
    } else {
      const newDoc = await addDoc(collection(db, "waterIntake"), {
        userId: user.uid,
        date: todayDate,
        glasses: newGlasses,
        createdAt: serverTimestamp(),
      });
      setDocId(newDoc.id);
    }
  };

  const addGlass = () => {
    const newValue = Math.min(TOTAL_GLASSES, glasses + 1);
    setGlasses(newValue);
    saveWater(newValue);
  };

  const removeGlass = () => {
    const newValue = Math.max(0, glasses - 1);
    setGlasses(newValue);
    saveWater(newValue);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t("page_title_water")}</h1>
        <p className="text-muted-foreground">{t("page_subtitle_water")}</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("water_today_progress")}</CardTitle>
          <CardDescription className="text-lg">
            {glasses} / {TOTAL_GLASSES} {t("glasses")}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-8 p-4 sm:p-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[...Array(TOTAL_GLASSES)].map((_, i) => (
              <Droplet
                key={i}
                className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-all duration-300 ${
                  i < glasses ? "text-blue-400 fill-blue-300" : "text-muted/50"
                }`}
              />
            ))}
          </div>

          <div className="w-full space-y-4">
            <Progress value={percentage} className="h-4" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs mx-auto">
              <Button
                variant="outline"
                size="icon"
                onClick={removeGlass}
                disabled={glasses === 0}
                className="w-full sm:w-auto"
              >
                <Minus className="w-5 h-5" />
              </Button>

              <Button
                size="lg"
                onClick={addGlass}
                disabled={glasses === TOTAL_GLASSES}
                className="w-full sm:w-auto"
              >
                <Plus className="w-5 h-5 mr-2" /> {t("add_glass")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}