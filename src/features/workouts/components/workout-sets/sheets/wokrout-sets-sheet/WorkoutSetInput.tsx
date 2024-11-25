import React, { FC } from 'react';
import { TSetParameterNameWithValue } from '@features/workouts/types';
import { InputProps } from '@components/ui';
import { InputWithStepButtons } from '@components/InputWithStepButtons';
import { WorkoutSetTimeInput } from '@features/workouts/components';
import { MEASURES_MAP, SET_PARAMETER_NAMES_TRANSLATION_MAP } from '@features/workouts/maps';

type WorkoutSetInputProps = {
  parameter: TSetParameterNameWithValue;
  onChange: (value: string | number) => void;
} & Omit<InputProps, 'onChange'>;

export const WorkoutSetInput: FC<WorkoutSetInputProps> = ({ parameter, ...props }: WorkoutSetInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(event.target.value);
  };

  let label = SET_PARAMETER_NAMES_TRANSLATION_MAP.get(parameter.name);
  if (MEASURES_MAP.get(parameter.name) !== '') label += ` (${MEASURES_MAP.get(parameter.name)})`;

  switch (parameter.name) {
    case 'weight':
      return (
        <InputWithStepButtons
          name={parameter.name}
          buttonStepValue={2.5}
          step={0.05}
          label={label}
          placeholder={'0'}
          value={parameter.value}
          onChange={handleChange}
        />
      );
    case 'reps':
      return (
        <InputWithStepButtons
          name={parameter.name}
          buttonStepValue={1}
          step={1}
          label={label}
          placeholder={'0'}
          value={parameter.value}
          onChange={handleChange}
        />
      );
    case 'distance':
      return (
        <InputWithStepButtons
          name={parameter.name}
          buttonStepValue={100}
          step={0.5}
          label={label}
          placeholder={'0'}
          value={parameter.value}
          onChange={handleChange}
        />
      );
    case 'time':
      return <WorkoutSetTimeInput value={parameter.value} onChange={props.onChange} />;
  }

  return <></>;
};
