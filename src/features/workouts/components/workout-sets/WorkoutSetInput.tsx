import React, { FC } from 'react';
import { TSetParameterNameWithValue } from '@features/workouts/types';
import { InputProps } from '@components/ui';
import { InputWithStepButtons } from '@components/InputWithStepButtons';
import { WorkoutSetTimeInput } from '@features/workouts/components';

type WorkoutSetInputProps = {
  parameter: TSetParameterNameWithValue;
  onChange: (value: string | number) => void;
} & Omit<InputProps, 'onChange'>;

export const WorkoutSetInput: FC<WorkoutSetInputProps> = ({ parameter, ...props }: WorkoutSetInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event);
    props.onChange(event.target.value);
  };

  switch (parameter.name) {
    case 'weight':
      return (
        <InputWithStepButtons
          name={parameter.name}
          step={2.5}
          label={'Ciężar'}
          value={parameter.value}
          onChange={handleChange}
        />
      );
    case 'reps':
      return <InputWithStepButtons name={parameter.name} step={1} label={'Powtórzenia'} onChange={handleChange} />;
    case 'distance':
      return <InputWithStepButtons name={parameter.name} step={100} label={'Dystans'} onChange={handleChange} />;
    case 'time':
      return <WorkoutSetTimeInput value={parameter.value} onChange={props.onChange} />;
  }

  return <></>;
};
