import React, { FC, useState } from 'react';
import {
  TSetParameterName,
  TSetParameterNameWithValue,
  TSetParameterNameWithValueArray,
  TWorkoutExercise,
  TWorkoutSet,
} from '@features/workouts/types';
import { TimeSpan } from '@/types/TimeSpan';
import { SheetContent, SheetFooter, SheetTitle } from '@components/ui';
import { WorkoutSet } from '@features/workouts/components';
import { deepCopy } from '@/utils/deepCopy';
import { WorkoutSetForm } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetForm';

function generateSetValuesWithInitialValues(workoutExercise: TWorkoutExercise): TSetParameterNameWithValueArray {
  return workoutExercise.parameters.map<TSetParameterNameWithValue>(
    (parameter: TSetParameterName): TSetParameterNameWithValue => {
      switch (parameter.name) {
        case 'time':
          return { ...parameter, name: 'time', value: new TimeSpan() };
        default:
          return { ...parameter, name: parameter.name, value: 0 };
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
  const [workoutSetParameters, setWorkoutSetParameters] = useState<TSetParameterNameWithValueArray>(() =>
    generateSetValuesWithInitialValues(workoutExercise),
  );

  const handleCreateWorkoutSet = () => {
    handleCreateSet(workoutSetParameters);
  };

  return (
    <SheetContent className={'flex flex-col'}>
      <SheetTitle>{workoutExercise.name}</SheetTitle>
      <div className={'flex-grow flex flex-col items-center gap-2 overflow-auto h-0'}>
        {workoutExercise.sets.map((set: TWorkoutSet) => (
          <WorkoutSet
            key={set.id}
            set={set}
            className={'w-full cursor-pointer'}
            onClick={() => {
              const newParameters: TSetParameterNameWithValueArray = deepCopy(set.parameters);
              setWorkoutSetParameters(newParameters);
            }}
          />
        ))}
      </div>
      <SheetFooter className={'gap-3'}>
        <WorkoutSetForm workoutExercise={workoutExercise} onCreate={handleCreateWorkoutSet} />
      </SheetFooter>
    </SheetContent>
  );
};
