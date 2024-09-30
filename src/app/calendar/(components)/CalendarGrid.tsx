import { Calendar } from '@/components/ui/calendar';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type CalendarGridProps = {
  scrollToToday?: boolean;
  days: Date[];
  year: number;
  className?: string;
};

const months = [...new Array(12).keys()];

function CalendarGrid(props: CalendarGridProps) {
  const [days, setDay] = useState<Date[]>(props.days);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.scrollToToday) calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [calendarRef, props.scrollToToday]);

  const onDayClick = (x, y, z, e) => {
    setDay(x);
  };

  return (
    <div
      className={cn(
        'md:grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] lg:auto-cols-auto items-center',
        props.className,
      )}
    >
      {months.map((month) => {
        return (
          <div
            key={month}
            ref={(ref) => {
              if (props.year !== new Date().getFullYear()) return;
              if (month === new Date().getMonth()) {
                calendarRef.current = ref;
              }
            }}
          >
            <Calendar
              selected={days}
              components={{}}
              mode={'multiple'}
              month={new Date(props.year, month)}
              classNames={{
                nav_button_previous: 'hidden',
                nav_button_next: 'hidden',
              }}
              showOutsideDays={false}
              onSelect={onDayClick}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CalendarGrid;
