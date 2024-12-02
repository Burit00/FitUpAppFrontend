'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { getWorkouts } from '@features/workouts/actions';
import { TBrowseWorkout } from '@features/workouts/types/workout';
import { BrowseWorkoutArraySchema } from '@features/workouts/schemas';
import CalendarBar from './_components/CalendarBar';
import { Loader } from '@components/Loader';

const DynamicCalendarGrid = dynamic(() => import('./_components/CalendarGrid'));
const DynamicWorkoutDialog = dynamic(() => import('./_components/WorkoutDialog'));

type CalendarPageProps = {
  year: number;
};

export default function CalendarPage({ year }: CalendarPageProps) {
  const [workouts, setWorkouts] = useState<TBrowseWorkout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<TBrowseWorkout | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrollToToday, setScrollToToday] = useState<boolean>(true);

  useEffect(() => {
    const dateStart = new Date(year, 0, 0);
    const dateEnd = new Date(year + 1, 0, 0);

    const controller = new AbortController();

    setIsLoading(true);
    getWorkouts({ dateStart, dateEnd }, controller.signal)
      .then((res) => res.json())
      .then((data) => {
        try {
          const parsedData = BrowseWorkoutArraySchema.parse(data);
          setWorkouts(parsedData);
        } catch {}
      });

    return () => {
      controller.abort({});
    };
  }, [year]);

  const days: Date[] = useMemo<Date[]>(() => {
    setIsLoading(false);

    return workouts?.map((workout: TBrowseWorkout) => workout.date);
  }, [workouts]);

  useEffect(() => {
    if (scrollToToday) setScrollToToday(false);
  }, [scrollToToday]);

  const handleDaySelect = useCallback(
    (selectedDay: Date) => {
      const selectedWorkout = workouts.find((workout) => {
        const workoutDate = new Date(workout.date);

        return (
          workoutDate.getDate() === selectedDay.getDate() &&
          workoutDate.getMonth() === selectedDay.getMonth() &&
          workoutDate.getFullYear() === selectedDay.getFullYear()
        );
      });

      if (!selectedWorkout)
        setSelectedWorkout({
          id: '',
          date: selectedDay,
        });
      else setSelectedWorkout(selectedWorkout);
    },
    [workouts]
  );

  const handleWorkoutDialogOpenChange = (value: boolean) => {
    if (!value) setSelectedWorkout(undefined);
  };

  return (
    <div className={'w-full h-full flex flex-col gap-5 items-center'}>
      <CalendarBar year={year} onScrollToToday={() => setScrollToToday(true)} />
      <div className={'w-full flex-grow flex flex-col overflow-hidden relative'}>
        <DynamicCalendarGrid days={days} year={year} scrollToToday={scrollToToday} onDaySelect={handleDaySelect} />
        <Loader isLoading={isLoading} />
      </div>
      <DynamicWorkoutDialog workout={selectedWorkout} onOpenChange={handleWorkoutDialogOpenChange} />
    </div>
  );
}
