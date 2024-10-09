'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';
import { IoTodaySharp } from 'react-icons/io5';
import CalendarBarYearCounter from '@/app/calendar/components/CalendarBarYearCounter';

type CalendarBarProps = {
  year: number;
  onScrollToToday: () => void;
  onYearChange: (year: number) => void;
};

function CalendarBar(props: CalendarBarProps) {
  const router = useRouter();

  return (
    <div className={'bg-background2 w-full p-2 flex justify-between sticky z-[50] top-5 rounded'}>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={() => {
          router.back();
        }}
      >
        <FaArrowLeft />
      </Button>
      <CalendarBarYearCounter year={props.year} onYearChange={(value) => props.onYearChange(value)} />
      <div className={'flex gap-1'}>
        <Button
          size={'icon'}
          onClick={() => {
            props.onYearChange(new Date().getFullYear());
            props.onScrollToToday();
          }}
        >
          <IoTodaySharp />
        </Button>
      </div>
    </div>
  );
}

export default CalendarBar;
