'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalendarGrid from '@/app/calendar/_components/CalendarGrid';
import CalendarBar from '@/app/calendar/_components/CalendarBar';
import WorkoutDialog from '@/app/calendar/_components/WorkoutDialog';
import { TDateTimeISO } from '@/types/TISODate';
import { getWorkouts } from '@/api/actions/workouts/get-workouts';
import { TWorkout } from '@/api/types/workouts/workout.type';

type CalendarPageProps = {
  searchParams: {
    year: number;
  };
};

export default function CalendarPage(props: CalendarPageProps) {
  const [workouts, setWorkouts] = useState<TWorkout[]>([]);
  const [workout, setWorkout] = useState<TWorkout>(null);
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState<boolean>(false);
  const [today] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(props.searchParams.year ?? today.getFullYear());
  const [scrollToToday, setScrollToToday] = useState<boolean>(true);

  useEffect(() => {
    const dateStart = new Date(year, 0, 0).toISOString() as TDateTimeISO;
    const dateEnd = new Date(year + 1, 0, -1).toISOString() as TDateTimeISO;

    getWorkouts({ dateStart, dateEnd }).then(setWorkouts);
  }, [year]);

  const days: Date[] = useMemo<Date[]>(() => {
    return workouts?.map((workout: TWorkout) => new Date(workout.date));
  }, [workouts]);

  const handleScrollToToday = () => {
    setScrollToToday(false);
    setTimeout(() => {
      setScrollToToday(true);
    }, 1);
  };

  const handleDaySelect = (selectedDay: Date) => {
    const selectedWorkout = workouts.find((workout) => workout.date === selectedDay);

    if (!selectedWorkout)
      setWorkout({
        id: null,
        date: selectedDay,
        exercises: null,
      } satisfies TWorkout);
    else setWorkout(selectedWorkout);

    setIsWorkoutDialogOpen(true);
  };

  const handleWorkoutDialogOpenChange = (value: boolean) => {
    setIsWorkoutDialogOpen(value);
    if (!value) setWorkout(null);
  };

  return (
    <div className={'w-full h-full flex flex-col items-center overflow-auto'}>
      <CalendarBar year={year} onScrollToToday={handleScrollToToday} onYearChange={setYear} />
      <CalendarGrid days={days} year={year} scrollToToday={scrollToToday} onDaySelect={handleDaySelect} />
      <WorkoutDialog workout={workout} isOpen={isWorkoutDialogOpen} onOpenChange={handleWorkoutDialogOpenChange} />
    </div>
  );
}
