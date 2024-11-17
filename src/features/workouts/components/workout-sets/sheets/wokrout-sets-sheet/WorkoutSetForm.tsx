import {
  TSetParameterName,
  TSetParameterNameArray,
  TSetParameterNameWithValue,
  TSetParameterNameWithValueArray,
  TWorkoutExercise,
  TWorkoutSet,
} from '@features/workouts/types';
import React, { FormEvent, useEffect, useState } from 'react';
import { Button } from '@components/ui';
import { TimeSpan, TimeSpanString } from '@/types/TimeSpan';
import { WorkoutSetInput } from '@features/workouts/components/workout-sets/WorkoutSetInput';
import { SetParameterNameWithValueArraySchema } from '@features/workouts/schemas';
import { createWorkoutSet, deleteWorkoutSet, updateSetParameters } from '@features/workouts/actions';

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
  requestRefresh: (mutation: () => Promise<void>) => void;
};

export const WorkoutSetForm = ({ workoutExercise, workoutSetToUpdate, ...props }: WorkoutSetFormProps) => {
  const [parameters, setParameters] = useState<TSetParameterNameWithValueArray>(() =>
    generateSetParametersWithInitialValues(workoutExercise.parameters),
  );

  useEffect(() => {
    if (!workoutSetToUpdate) return;

    setParameters(SetParameterNameWithValueArraySchema.parse(workoutSetToUpdate.parameters));
  }, [workoutSetToUpdate]);

  const handleChangeValue = (parameter: TSetParameterNameWithValue): ((value: string | number) => void) => {
    return (value: string | number): void => {
      setParameters((prev: TSetParameterNameWithValueArray): TSetParameterNameWithValueArray => {
        if (parameter.name === 'time') {
          parameter.value = new TimeSpan(value as TimeSpanString);
        } else parameter.value = value as number;

        return [...prev];
      });
    };
  };

  const handleWorkoutSetDelete = async () => {
    await deleteWorkoutSet(workoutSetToUpdate.id);
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (workoutSetToUpdate) {
      return props.requestRefresh(async (): Promise<void> => {
        await updateSetParameters({
          workoutSetId: workoutSetToUpdate.id,
          parameters,
        });
      });
    }

    props.requestRefresh(async () => {
      await createWorkoutSet({
        workoutExerciseId: workoutExercise.id,
        orderIndex: -1,
        parameterValues: parameters,
      });
    });
  };

  return (
    <form onSubmit={onSubmit} className={'flex flex-col gap-2'}>
      {parameters.map((parameter: TSetParameterNameWithValue) => (
        <WorkoutSetInput key={parameter.id} parameter={parameter} onChange={handleChangeValue(parameter)} />
      ))}
      {workoutSetToUpdate ? (
        <>
          <Button type={'submit'} variant={'warning'}>
            Zapisz zmiany
          </Button>
          <Button type={'submit'} variant={'destructive'} onClick={() => props.requestRefresh(handleWorkoutSetDelete)}>
            Usuń serię
          </Button>
        </>
      ) : (
        <>
          <Button type={'submit'}>Dodaj serię</Button>
          <Button
            type={'reset'}
            variant={'outline'}
            onClick={() => setParameters(generateSetParametersWithInitialValues(workoutExercise.parameters))}
          >
            Resetuj wartości
          </Button>
        </>
      )}
    </form>
  );
};
