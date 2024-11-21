'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@components/ui';
import { IoTodaySharp } from 'react-icons/io5';
import CalendarBarYearCounter from '@/app/(user)/calendar/_components/CalendarBarYearCounter';
import { PageBar } from '@components/PageBar';
import { useRouter } from 'next/navigation';

const URL_CHANGE_DELAY = 500;

type CalendarBarProps = {
  year: number;
  onScrollToToday: () => void;
};

function CalendarBar(props: CalendarBarProps) {
  const [year, setYear] = useState(props.year);
  const router = useRouter();

  useEffect(() => {
    setYear(props.year);
  }, [props.year]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push(`calendar?year=${year}`);
    }, URL_CHANGE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [year]);

  return (
    <PageBar
      className={'sticky top-0'}
      centerSlot={<CalendarBarYearCounter year={year} onYearChange={(year) => setYear(year)} />}
      rightSlot={
        <Button
          size={'icon'}
          onClick={() => {
            setYear(new Date().getFullYear());
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
