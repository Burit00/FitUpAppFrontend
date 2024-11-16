import React, { FC } from 'react';
import { Sheet } from '@components/ui';
import { TSetParameterNameWithValue, TWorkoutExercise } from '@features/workouts/types';
import { WorkoutSetSheetBody } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetSheetBody';

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
