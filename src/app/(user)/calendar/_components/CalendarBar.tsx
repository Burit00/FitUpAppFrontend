'use client';

import React from 'react';
import { Button } from '@components/ui';
import { IoTodaySharp } from 'react-icons/io5';
import CalendarBarYearCounter from '@/app/(user)/calendar/_components/CalendarBarYearCounter';
import { PageBar } from '@components/PageBar';
import { useRouter } from 'next/navigation';

type CalendarBarProps = {
  year: number;
  onScrollToToday: () => void;
};

function CalendarBar(props: CalendarBarProps) {
  const router = useRouter();

  const goToYear = (year: number) => {
    router.push(`calendar?year=${year}`);
  };

  return (
    <PageBar
      className={'sticky top-0'}
      centerSlot={<CalendarBarYearCounter year={props.year} onYearChange={(year) => goToYear(year)} />}
      rightSlot={
        <Button
          size={'icon'}
          onClick={() => {
            goToYear(new Date().getFullYear());
            props.onScrollToToday();
          }}
        >
          <IoTodaySharp />
        </Button>
      }
    />
  );
}

export default CalendarBar;
