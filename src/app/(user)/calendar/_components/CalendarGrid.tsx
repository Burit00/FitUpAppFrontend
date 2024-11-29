import { Calendar } from '@components/ui';
import React, { useEffect, useRef } from 'react';
import { pl } from 'date-fns/locale/pl';

type CalendarGridProps = {
  scrollToToday?: boolean;
  onDaySelect: (selectedDay: Date) => void;
  days: Date[];
  year: number;
};

const months = Array.from({ length: 12 });

function CalendarGrid(props: CalendarGridProps) {
  const today = new Date();
  const todayRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!props.scrollToToday) return;

    todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [props.scrollToToday]);

  const onDayClick = (_: Date[] | undefined, selectedDay: Date) => {
    props.onDaySelect(selectedDay);
  };

  return (
    <div
      className={
        'w-full md:grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] lg:auto-cols-auto auto-rows-[22rem] overflow-auto'
      }
    >
      {months.map((_, monthIndex) => (
        <div
          key={`${props.year}${monthIndex}`}
          ref={(ref: HTMLDivElement) => {
            if (props.year !== today.getFullYear()) return;
            if (monthIndex !== today.getMonth()) return;
            todayRef.current = ref;
          }}
        >
          <Calendar
            locale={pl}
            selected={props.days}
            mode={'multiple'}
            month={new Date(props.year, monthIndex)}
            classNames={{
              nav_button_previous: 'hidden',
              nav_button_next: 'hidden',
            }}
            showOutsideDays={false}
            onSelect={onDayClick}
          />
        </div>
      ))}
    </div>
  );
}

export default CalendarGrid;
