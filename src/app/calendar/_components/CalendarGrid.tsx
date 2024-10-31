import { Calendar } from '@/components/ui';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/utils';
import { pl } from 'date-fns/locale/pl';

type CalendarGridProps = {
  scrollToToday?: boolean;
  onDaySelect: (selectedDay: Date) => void;
  days: Date[];
  year: number;
  className?: string;
};

const monthsAmount = 12;
const months: number[] = Array.from({ length: monthsAmount });

function CalendarGrid(props: CalendarGridProps) {
  const today = new Date();
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.scrollToToday) return;

    const yOffset = 80;
    const y = calendarRef.current?.getBoundingClientRect().top + window.scrollY - yOffset;

    window.scrollTo({ behavior: 'smooth', top: y });
  }, [props.scrollToToday]);

  const onDayClick = (days: Date[], selectedDay: Date) => {
    props.onDaySelect(selectedDay);
  };

  return (
    <div
      className={cn(
        'md:grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] lg:auto-cols-auto',
        props.className,
      )}
    >
      {months.map((month, monthIndex) => (
        <div
          key={`${props.year}${monthIndex}`}
          ref={(ref) => {
            if (props.year !== today.getFullYear()) return;
            if (monthIndex !== today.getMonth()) return;
            calendarRef.current = ref;
          }}
        >
          <Calendar
            locale={pl}
            selected={props.days}
            components={{}}
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
