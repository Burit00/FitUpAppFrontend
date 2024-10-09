'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Workout } from '@/app/calendar/mocks/workouts';
import CalendarGrid from '@/app/calendar/components/CalendarGrid';
import CalendarBar from '@/app/calendar/components/CalendarBar';
import WorkoutDialog from '@/app/calendar/components/WorkoutDialog';
import { getWorkouts } from '@/api/mock/workouts';
import { TDateTimeISO } from '@/types/TISODate';

type CalendarPageProps = {
  searchParams: {
    year: number;
  };
};

function CalendarPage(props: CalendarPageProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workout, setWorkout] = useState<Workout>(null);
  const [today] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(props.searchParams.year ?? today.getFullYear());
  const [scrollToToday, setScrollToToday] = useState<boolean>(true);

  useEffect(() => {
    getWorkouts({ year }).then(setWorkouts);
  }, [year]);

  const days: Date[] = useMemo<Date[]>(() => workouts?.map((workout: Workout) => new Date(workout.date)), [workouts]);

  const handleScrollToToday = () => {
    setScrollToToday(false);
    setTimeout(() => {
      setScrollToToday(true);
    }, 1);
  };

  const handleDaySelect = (selectedDay: Date) => {
    const selectedDayISOString = selectedDay.toISOString() as TDateTimeISO;
    const selectedWorkout = workouts.find((workout) => workout.date === selectedDayISOString);

    if (!selectedWorkout)
      setWorkout({
        date: selectedDayISOString,
        exercises: [],
      });
    else setWorkout(selectedWorkout);
  };

  const handleWorkoutDialogOpenChange = (value: boolean) => {
    if (!value) setWorkout(null);
  };

  return (
    <div className={'w-full h-full flex flex-col gap-4 items-center'}>
      <CalendarBar year={year} onScrollToToday={handleScrollToToday} onYearChange={setYear} />
      <CalendarGrid
        className={'w-full'}
        days={days}
        year={year}
        scrollToToday={scrollToToday}
        onDaySelect={handleDaySelect}
      />
      <WorkoutDialog workout={workout} isOpen={!!workout} onOpenChange={handleWorkoutDialogOpenChange} />
    </div>
  );
}

export default CalendarPage;
