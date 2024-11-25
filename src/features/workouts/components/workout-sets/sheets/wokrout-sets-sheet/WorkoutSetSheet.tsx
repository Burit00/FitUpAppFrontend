import React, { FC } from 'react';
import { Sheet } from '@components/ui';
import { TWorkoutExercise } from '@features/workouts/types';
import { WorkoutSetSheetBody } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetSheetBody';

type WorkoutSetSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workoutExercise: TWorkoutExercise;
  onRequestRefresh: () => Promise<void>;
};

export const WorkoutSetSheet: FC<WorkoutSetSheetProps> = ({ open, onOpenChange, ...props }: WorkoutSetSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {props.workoutExercise && <WorkoutSetSheetBody {...props} />}
    </Sheet>
  );
};
