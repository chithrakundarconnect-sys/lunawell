// No "use client" needed here (this is just a logic hook)

type DayState = 'normal' | 'gentle';

interface DayStateInput {
  mood?: string;
  stressLevel?: number;
  sleepHours?: number;
}

/**
 * Calculates day mode based on user's wellness values.
 * This is a PURE calculation hook (NO React state, NO useEffect).
 * That prevents Next.js hydration crash.
 */
export function useDayState({
  mood,
  stressLevel,
  sleepHours,
}: DayStateInput): DayState {

  // Safe defaults during first render
  const currentMood = mood ?? 'Calm';
  const stress = stressLevel ?? 5;
  const sleep = sleepHours ?? 7;

  // Gentle day conditions
  const isGentleDay =
    stress > 7 ||         // High stress
    sleep < 6 ||          // Low sleep
    currentMood === 'Stressed' ||
    currentMood === 'Tired';

  return isGentleDay ? 'gentle' : 'normal';
}