'use client';
import React, { useEffect, useMemo, useState } from 'react';
import WORKOUTS_MOCK, { Workout } from '@/app/calendar/mocks/workouts';
import CalendarGrid from '@/app/calendar/components/CalendarGrid';
import CalendarBar from '@/app/calendar/components/CalendarBar';

type CalendarPageProps = {
  searchParams: {
    year: number;
  };
};

function CalendarPage(props: CalendarPageProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [today] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(props.searchParams.year ?? today.getFullYear());
  const [scrollToToday, setScrollToToday] = useState<boolean>(true);

  useEffect(() => {
    setWorkouts(WORKOUTS_MOCK.filter((workouts) => workouts.date.getFullYear() === year));
  }, [year]);

  const days: Date[] = useMemo<Date[]>(() => workouts?.map((workout: Workout) => workout.date), [workouts]);

  const handleScrollToToday = () => {
    setScrollToToday(false);
    setTimeout(() => {
      setScrollToToday(true);
    }, 1);
  };

  return (
    <div className={'w-full h-full flex flex-col gap-4 items-center'}>
      <CalendarBar year={year} onScrollToToday={handleScrollToToday} onYearChange={setYear} />
      <CalendarGrid className={'w-full'} days={days} year={year} scrollToToday={scrollToToday} />
    </div>
  );
}

export default CalendarPage;
