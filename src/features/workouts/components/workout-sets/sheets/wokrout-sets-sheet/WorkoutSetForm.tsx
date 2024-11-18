import {
  TSetParameterNameWithId,
  TSetParameterNameWithIdArray,
  TSetParameterNameWithValue,
  TSetParameterNameWithValueArray,
  TWorkoutExercise,
  TWorkoutSet,
} from '@features/workouts/types';
import React, { FormEvent, useEffect, useState } from 'react';
import { TimeSpan, TimeSpanString } from '@/types/TimeSpan';
import { WorkoutSetInput } from '@features/workouts/components/workout-sets/WorkoutSetInput';
import { SetParameterNameWithValueArraySchema } from '@features/workouts/schemas';
import { createWorkoutSet, deleteWorkoutSet, updateSetParameters } from '@features/workouts/actions';
import { WorkoutSetFormButtons } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetFormButtons';

function generateSetParametersWithInitialValues(
  parameters: TSetParameterNameWithIdArray,
): TSetParameterNameWithValueArray {
  return parameters.map<TSetParameterNameWithValue>(
    (parameter: TSetParameterNameWithId): TSetParameterNameWithValue => {
      switch (parameter.name) {
        case 'time':
          return { ...parameter, name: 'time', value: new TimeSpan() };
        default:
          return { ...parameter, name: parameter.name, value: 0 };
      }
    },
  );
}

type WorkoutSetFormProps = {
  workoutExercise: TWorkoutExercise;
  workoutSetToUpdate?: TWorkoutSet;
  requestRefresh: () => void;
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

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (workoutSetToUpdate) {
      await updateSetParameters({
        workoutSetId: workoutSetToUpdate.id,
        parameters,
      });

      return props.requestRefresh();
    }
    await createWorkoutSet({
      workoutExerciseId: workoutExercise.id,
      orderIndex: -1,
      parameterValues: parameters,
    });
    props.requestRefresh();
  };

  return (
    <form onSubmit={onSubmit} className={'flex flex-col gap-2'}>
      {parameters.map((parameter: TSetParameterNameWithValue) => (
        <WorkoutSetInput key={parameter.id} parameter={parameter} onChange={handleChangeValue(parameter)} />
      ))}
      <WorkoutSetFormButtons
        type={workoutSetToUpdate ? 'update' : 'create'}
        onResetForm={() => setParameters(generateSetParametersWithInitialValues(workoutExercise.parameters))}
        onRemoveSet={async () => {
          await handleWorkoutSetDelete();
          props.requestRefresh();
        }}
      />
    </form>
  );
};
