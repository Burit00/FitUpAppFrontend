'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalendarGrid from '@/app/calendar/_components/CalendarGrid';
import CalendarBar from '@/app/calendar/_components/CalendarBar';
import WorkoutDialog from '@/app/calendar/_components/WorkoutDialog';
import { getWorkouts } from '@features/workouts/actions/queries/get-workouts';
import { TBrowseWorkout } from '@features/workouts/types/workout/browse-workout.type';
import { BrowseWorkoutArraySchema } from '@features/workouts/schemas';

type CalendarPageProps = {
  searchParams: {
    year: number;
  };
};

export default function CalendarPage(props: CalendarPageProps) {
  const [workouts, setWorkouts] = useState<TBrowseWorkout[]>([]);
  const [workout, setWorkout] = useState<TBrowseWorkout>(null);
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState<boolean>(false);
  const [today] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(props.searchParams.year ?? today.getFullYear());
  const [scrollToToday, setScrollToToday] = useState<boolean>(true);

  useEffect(() => {
    const dateStart = new Date(year, 0, 0);
    const dateEnd = new Date(year + 1, 0, -1);

    getWorkouts({ dateStart, dateEnd })
      .then((res) => res.json())
      .then((data) => {
        try {
          const parsedData = BrowseWorkoutArraySchema.parse(data);
          setWorkouts(parsedData);
        } catch (error) {
          console.error(error);
        }
      });
  }, [year]);

  const days: Date[] = useMemo<Date[]>(() => {
    return workouts?.map((workout: TBrowseWorkout) => new Date(workout.date));
  }, [workouts]);

  const handleScrollToToday = () => {
    setScrollToToday(false);
    setTimeout(() => {
      setScrollToToday(true);
    }, 1);
  };

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
