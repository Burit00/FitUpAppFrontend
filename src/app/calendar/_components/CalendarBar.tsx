'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { IoTodaySharp } from 'react-icons/io5';
import CalendarBarYearCounter from '@/app/calendar/_components/CalendarBarYearCounter';
import { PageBar } from '@/components/PageBar';

type CalendarBarProps = {
  year: number;
  onScrollToToday: () => void;
  onYearChange: (year: number) => void;
};

function CalendarBar(props: CalendarBarProps) {
  return (
    <PageBar
      className={'sticky top-0 z-[100]'}
      centerSlot={<CalendarBarYearCounter year={props.year} onYearChange={(value) => props.onYearChange(value)} />}
      rightSlot={
        <Button
          size={'icon'}
          onClick={() => {
            props.onYearChange(new Date().getFullYear());
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
