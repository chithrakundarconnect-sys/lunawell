'use client';

import { useState, useEffect } from 'react';

type DayState = 'normal' | 'gentle';

interface DayStateInput {
  mood: string;
  stressLevel: number;
  sleepHours: number;
}

/**
 * Custom hook to determine the day state based on mood, stress, and sleep.
 * @param {DayStateInput} input - The user's current wellness metrics.
 * @returns {DayState} The calculated day state ('normal' or 'gentle').
 */
export function useDayState({ mood, stressLevel, sleepHours }: DayStateInput): DayState {
  const [dayState, setDayState] = useState<DayState>('normal');

  useEffect(() => {
    // A "gentle" day is recommended if stress is high, sleep is low, or mood is negative.
    const isGentleDay =
      stressLevel > 7 || // High stress is defined as > 7 on a 1-10 scale
      sleepHours < 6 ||
      mood === 'Stressed' ||
      mood === 'Tired';

    setDayState(isGentleDay ? 'gentle' : 'normal');
  }, [mood, stressLevel, sleepHours]);

  return dayState;
}
