import {
  TCreateWorkoutSet,
  TSetParameterName,
  TSetParameterNameArray,
  TSetParameterNameWithValue,
  TSetParameterNameWithValueArray,
  TWorkoutExercise,
  TWorkoutSet,
} from '@features/workouts/types';
import React, { FormEvent, useState } from 'react';
import { Button } from '@components/ui';
import { TimeSpan, TimeSpanString } from '@/types/TimeSpan';
import { WorkoutSetInput } from '@features/workouts/components/workout-sets/WorkoutSetInput';

function generateSetParametersWithInitialValues(parameters: TSetParameterNameArray): TSetParameterNameWithValueArray {
  return parameters.map<TSetParameterNameWithValue>((parameter: TSetParameterName): TSetParameterNameWithValue => {
    switch (parameter.name) {
      case 'time':
        return { ...parameter, name: 'time', value: new TimeSpan() };
      default:
        return { ...parameter, name: parameter.name, value: 0 };
    }
  });
}

type WorkoutSetFormProps = {
  workoutExercise: TWorkoutExercise;
  workoutSetToUpdate?: TWorkoutSet;
  onCreate: (newWorkout: TCreateWorkoutSet) => void;
};

export const WorkoutSetForm = ({ workoutExercise, ...props }: WorkoutSetFormProps) => {
  const [parameters, setParameters] = useState<TSetParameterNameWithValueArray>(() =>
    generateSetParametersWithInitialValues(workoutExercise.parameters),
  );

  const handleChangeValue = (parameter: TSetParameterNameWithValue): ((value: string | number) => void) => {
    return (value: string | number): void => {
      console.log(value);
      setParameters((prev: TSetParameterNameWithValueArray): TSetParameterNameWithValueArray => {
        if (parameter.name === 'time') {
          parameter.value = new TimeSpan(value as TimeSpanString);
        } else parameter.value = value as number;

        return [...prev];
      });
    };
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    props.onCreate({
      workoutExerciseId: workoutExercise.id,
      orderIndex: -1,
      parameterValues: parameters,
    });
  };

  return (
    <form onSubmit={onSubmit} className={'flex flex-col gap-2'}>
      {parameters.map((parameter: TSetParameterNameWithValue) => (
        <WorkoutSetInput key={parameter.id} parameter={parameter} onChange={handleChangeValue(parameter)} />
      ))}
      <Button type={'submit'}>Dodaj serię</Button>
      <Button type={'reset'} variant={'outline'}>
        Resetuj wartości
      </Button>
    </form>
  );
};
