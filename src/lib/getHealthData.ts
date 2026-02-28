import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// ⭐ NOW ACCEPT USER ID
export async function getMoodAnalytics(uid: string) {

  // ⭐ FIRESTORE FILTER (MOST IMPORTANT LINE)
  const q = query(
    collection(db, "dailyHealth"),
    where("userId", "==", uid)
  );

  const snapshot = await getDocs(q);

  const counts: Record<string, number> = {
    Happy: 0,
    Calm: 0,
    Stressed: 0,
    Tired: 0,
  };

  snapshot.forEach((doc) => {
    const data = doc.data();
    const mood = data.mood;

    if (counts[mood] !== undefined) {
      counts[mood]++;
    }
  });

  // chart format
  return [
    { mood: "Happy", value: counts.Happy },
    { mood: "Calm", value: counts.Calm },
    { mood: "Stressed", value: counts.Stressed },
    { mood: "Tired", value: counts.Tired },
  ];
}