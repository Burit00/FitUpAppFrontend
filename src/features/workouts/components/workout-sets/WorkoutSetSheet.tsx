import React, { FC, useEffect, useState } from 'react';
import { Button, Sheet, SheetContent, SheetFooter, SheetTitle } from '@components/ui';
import { WorkoutSet, WorkoutSetInput } from '@features/workouts/components';
import {
  TSetParameterName,
  TSetParameterNameWithValue,
  TSetParameterNameWithValueArray,
  TWorkoutExercise,
  TWorkoutSet,
} from '@features/workouts/types';
import { TimeSpan, TimeSpanString } from '@/types/TimeSpan';

function generateSetValuesWithInitialValues(workoutExercise: TWorkoutExercise): TSetParameterNameWithValueArray {
  return workoutExercise.parameters.map<TSetParameterNameWithValue>(
    (parameter: TSetParameterName): TSetParameterNameWithValue => {
      switch (parameter.name) {
        case 'time':
          return {
            ...parameter,
            name: 'time',
            value: new TimeSpan(),
          };
        default:
          return {
            ...parameter,
            name: parameter.name,
            value: 0,
          };
      }
    },
  );
}

type WorkoutSetSheetBodyProps = {
  workoutExercise: TWorkoutExercise;
  onCreateSet: (workoutSet: TSetParameterNameWithValueArray) => void;
};

export const WorkoutSetSheetBody: FC<WorkoutSetSheetBodyProps> = ({
  workoutExercise,
  onCreateSet: handleCreateSet,
}: WorkoutSetSheetBodyProps) => {
  const [workoutSetParameters, setWorkoutSetParameters] = useState<TSetParameterNameWithValueArray>([]);

  useEffect(() => {
    const initialSetParameters: TSetParameterNameWithValueArray = generateSetValuesWithInitialValues(workoutExercise);
    setWorkoutSetParameters(initialSetParameters ?? []);
  }, [workoutExercise]);

  return (
    <SheetContent className={'flex flex-col'}>
      <SheetTitle>{workoutExercise.name}</SheetTitle>
      <div className={'flex-grow flex flex-col items-center gap-2 overflow-auto h-0'}>
        {workoutExercise.sets.map((set: TWorkoutSet) => (
          <WorkoutSet
            key={set.id}
            set={set}
            className={'w-full cursor-pointer'}
            onClick={() => setWorkoutSetParameters(set.parameters)}
          />
        ))}
      </div>
      <SheetFooter className={'gap-3'}>
        {workoutSetParameters.map((workoutSetParameter: TSetParameterNameWithValue) => (
          <WorkoutSetInput
            key={workoutSetParameter.name.toString()}
            parameter={workoutSetParameter}
            onChange={(value: string | number): void => {
              setWorkoutSetParameters((prev: TSetParameterNameWithValueArray): TSetParameterNameWithValueArray => {
                if (workoutSetParameter.name === 'time') {
                  workoutSetParameter.value = new TimeSpan(value as TimeSpanString);
                } else workoutSetParameter.value = Number(value);

                return [...prev];
              });
            }}
          />
        ))}
        <Button onClick={() => handleCreateSet(workoutSetParameters)}>Dodaj serię</Button>
        <Button
          variant={'outline'}
          onClick={() => {
            const initialValues: TSetParameterNameWithValueArray = generateSetValuesWithInitialValues(workoutExercise);
            setWorkoutSetParameters(initialValues);
          }}
        >
          Resetuj wartości
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

type WorkoutSetSheetProps = {
  workoutExercise: TWorkoutExercise;
  onCreateSet: (workoutSet: TSetParameterNameWithValue[]) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const WorkoutSetSheet: FC<WorkoutSetSheetProps> = ({
  workoutExercise,
  onCreateSet: handleCreateSet,
  ...props
}: WorkoutSetSheetProps) => {
  return (
    <Sheet {...props}>
      {workoutExercise && <WorkoutSetSheetBody workoutExercise={workoutExercise} onCreateSet={handleCreateSet} />}
    </Sheet>
  );
};
