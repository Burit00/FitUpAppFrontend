import React, { ChangeEvent, FC } from 'react';
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
    max: 99,
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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const time = new TimeSpan(value);

    switch (event.target.name) {
      case 'hours':
        if (Number(inputValue) > TimeSpan.MAX_HOURS) break;
        time.hours = Number(inputValue || 0);
        break;
      case 'minutes':
        if (Number(inputValue) >= TimeSpan.MINUTES_IN_HOUR) break;
        time.minutes = Number(inputValue || 0);
        break;
      case 'seconds':
        if (Number(inputValue) >= TimeSpan.SECONDS_IN_MINUTE) break;
        time.seconds = Number(inputValue || 0);
        break;
    }

    props.onChange(time.toString());
  };

  const selectValue = (name: TTimeNames): string | number => {
    switch (name) {
      case 'hours':
        return value.hours || '';
      case 'minutes':
        return value.minutes || '';
      case 'seconds':
        return value.seconds || '';
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
          placeholder={'0'}
          autoComplete={'off'}
        />
      ))}
    </div>
  );
};
