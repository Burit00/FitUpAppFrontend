import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { TimeSpan } from '@/types/TimeSpan';
import { Input, InputProps } from '@components/ui';

type TTimeNames = 'hours' | 'minutes' | 'seconds';

type TTimeInputProps = {
  name: TTimeNames;
} & InputProps;

const formElements: TTimeInputProps[] = [
  {
    name: 'hours',
    label: 'Godziny',
    min: 0,
    max: 23,
  },
  {
    name: 'minutes',
    label: 'Minuty',
    min: 0,
    max: 59,
  },
  {
    name: 'seconds',
    label: 'Sekundy',
    min: 0,
    max: 59,
  },
];

type WorkoutSetTimeInputProps = {
  value: TimeSpan;
  onChange: (value: string) => void;
};

export const WorkoutSetTimeInput: FC<WorkoutSetTimeInputProps> = ({ value, ...props }: WorkoutSetTimeInputProps) => {
  const [hours, setHours] = useState<string | number>(value.hours ?? '');
  const [minutes, setMinutes] = useState<string | number>(value.minutes ?? '');
  const [seconds, setSeconds] = useState<string | number>(value.seconds ?? '');

  useEffect(() => {
    const timeSpan = new TimeSpan(Number(hours), Number(minutes), Number(seconds));
    props.onChange(timeSpan.toString());
  }, [hours, minutes, seconds]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'hours':
        setHours(event.target.value);
        break;
      case 'minutes':
        setMinutes(event.target.value);
        break;
      case 'seconds':
        setSeconds(event.target.value);
        break;
    }
  };

  const selectValue = (name: TTimeNames): string | number => {
    switch (name) {
      case 'hours':
        return hours;
      case 'minutes':
        return minutes;
      case 'seconds':
        return seconds;
    }
  };

  return (
    <div className={'w-full flex justify-between flex-shrink gap-3'}>
      {formElements.map((formElement: TTimeInputProps) => (
        <Input
          key={formElement.name}
          value={selectValue(formElement.name)}
          onChange={handleChange}
          {...formElement}
          type={'number'}
          maxLength={2}
          placeholder={'00'}
        />
      ))}
    </div>
  );
};
