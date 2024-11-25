'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import CalendarBar from '@/app/(user)/calendar/_components/CalendarBar';
import WorkoutDialog from '@/app/(user)/calendar/_components/WorkoutDialog';
import { getWorkouts } from '@features/workouts/actions';
import { TBrowseWorkout } from '@features/workouts/types/workout/browse-workout.type';
import { BrowseWorkoutArraySchema } from '@features/workouts/schemas';
import dynamic from 'next/dynamic';
import { Loader } from '@components/Loader';

const DynamicCalendarGrid = dynamic(() => import('./_components/CalendarGrid'));

type CalendarPageProps = {
  year: number;
};

export default function CalendarPage({ year }: CalendarPageProps) {
  const [workouts, setWorkouts] = useState<TBrowseWorkout[]>([]);
  const [workout, setWorkout] = useState<TBrowseWorkout>(null);
  const [scrollToToday, setScrollToToday] = useState<boolean>(true);

  useEffect(() => {
    const dateStart = new Date(year, 0, 0);
    const dateEnd = new Date(year + 1, 0, -1);

    const controller = new AbortController();

    getWorkouts({ dateStart, dateEnd }, controller.signal)
      .then((res) => res.json())
      .then((data) => {
        try {
          const parsedData = BrowseWorkoutArraySchema.parse(data);
          setWorkouts(parsedData);
        } catch (error) {
          console.error(error);
        }
      });

    return () => {
      controller.abort({});
    };
  }, [year]);

  const days: Date[] = useMemo<Date[]>(() => {
    return workouts?.map((workout: TBrowseWorkout) => workout.date);
  }, [workouts]);

  useEffect(() => {
    if (scrollToToday) setScrollToToday(false);
  }, [scrollToToday]);

  const handleDaySelect = (selectedDay: Date) => {
    const selectedWorkout = workouts.find((workout) => {
      const workoutDate = new Date(workout.date);

      return (
        workoutDate.getDate() === selectedDay.getDate() &&
        workoutDate.getMonth() === selectedDay.getMonth() &&
        workoutDate.getFullYear() === selectedDay.getFullYear()
      );
    });

    if (!selectedWorkout)
      setWorkout({
        id: null,
        date: selectedDay,
      });
    else setWorkout(selectedWorkout);
  };

  const handleWorkoutDialogOpenChange = (value: boolean) => {
    if (!value) setWorkout(null);
  };

  return (
    <div className={'w-full h-full flex flex-col items-center overflow-auto'}>
      <CalendarBar year={year} onScrollToToday={() => setScrollToToday(true)} />
      <Suspense fallback={<Loader />}>
        <DynamicCalendarGrid days={days} year={year} scrollToToday={scrollToToday} onDaySelect={handleDaySelect} />
      </Suspense>
      <WorkoutDialog workout={workout} isOpen={!!workout} onOpenChange={handleWorkoutDialogOpenChange} />
    </div>
  );
}
