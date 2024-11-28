'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [workout, setWorkout] = useState<TBrowseWorkout>(null);
  const [scrollToToday, setScrollToToday] = useState<boolean>(true);

  useEffect(() => {
    const dateStart = new Date(year, 0, 0);
    const dateEnd = new Date(year + 1, 0, -1);

    const controller = new AbortController();

    setIsLoading(true);
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
    setIsLoading(false);

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
    <div className={'w-full h-full flex flex-col gap-5 items-center relative'}>
      <CalendarBar year={year} onScrollToToday={() => setScrollToToday(true)} />
      <DynamicCalendarGrid days={days} year={year} scrollToToday={scrollToToday} onDaySelect={handleDaySelect} />
      <DynamicWorkoutDialog workout={workout} isOpen={!!workout} onOpenChange={handleWorkoutDialogOpenChange} />
      {isLoading && (
        <div className={'absolute top-[5rem] left-[50%] -translate-x-1/2 rounded-full p-1 bg-background2'}>
          <Loader fullSpace={false} color={'primary'} />
        </div>
      )}
    </div>
  );
}
