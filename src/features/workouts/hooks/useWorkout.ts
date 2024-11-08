'use client';

import { useCallback, useEffect, useState } from 'react';
import { TWorkout } from '@features/workouts/types';
import { getWorkoutByDate } from '@features/workouts/actions/queries/get-workout';

type TUseWorkout = {
  workout: TWorkout;
  fetchWorkout: () => Promise<void>;
  isLoading: boolean;
};

export function useWorkout(date: Date): TUseWorkout {
  const [workout, setWorkout] = useState<TWorkout>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWorkout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    const response = await getWorkoutByDate(date);

    setIsLoading(false);
    if (!response.ok) return;
    setWorkout(await response.json());
  }, []);

  useEffect(() => {
    fetchWorkout();
  }, []);

  return {
    workout,
    fetchWorkout,
    isLoading,
  };
}
