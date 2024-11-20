import React from 'react';
import { Button } from '@components/ui';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import AnimatedCounter from '@components/AnimatedCounter';

type CalendarBarYearCounterProps = {
  year: number;
  onYearChange: (year: number) => void;
};

function CalendarBarYearCounter({ year, onYearChange }: CalendarBarYearCounterProps) {
  return (
    <div className={'flex gap-4 items-center'}>
      <Button size={'icon'} variant={'darker'} onClick={() => onYearChange(+year - 1)}>
        <FaChevronDown />
      </Button>
      <AnimatedCounter value={year} className={'text-2xl font-bold'} />
      <Button size={'icon'} variant={'darker'} onClick={() => onYearChange(+year + 1)}>
        <FaChevronUp />
      </Button>
    </div>
  );
}

export default CalendarBarYearCounter;
