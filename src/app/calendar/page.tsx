'use client';

import React, { useMemo, useState } from 'react';
import { Workout, WORKOUTS_MOCK } from '@/app/calendar/trenings.mock';
import CalendarGrid from '@/app/calendar/(components)/CalendarGrid';
import { Button } from '@/components/ui';
import { FaArrowLeft } from 'react-icons/fa6';

type CalendarPageProps = {
  params: {};
  searchParams: {};
};

function CalendarPage(props: CalendarPageProps) {
  const [workouts, setWorkouts] = useState<Workout[]>(WORKOUTS_MOCK);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const days = useMemo(() => workouts.map((workout: Workout) => workout.date), [workouts]);

  return (
    <div className={'w-full h-full flex flex-col gap-4 items-center'}>
      <div className={'bg-background2 w-[80%] p-2 flex justify-between sticky z-[100] top-5'}>
        <Button size={'icon'} variant={'ghost'} onClick={() => history.back()}>
          <FaArrowLeft />
        </Button>
      </div>
      <CalendarGrid className={'w-full'} days={days} year={year} scrollToToday />
    </div>
  );
}

export default CalendarPage;
