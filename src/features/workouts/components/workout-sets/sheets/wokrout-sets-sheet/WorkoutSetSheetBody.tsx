import React, { FC, useEffect, useState } from 'react';
import { TWorkoutExercise, TWorkoutSet } from '@features/workouts/types';
import { SheetContent, SheetFooter, SheetTitle } from '@components/ui';
import { WorkoutSet } from '@features/workouts/components';
import { WorkoutSetForm } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetForm';
import { cn } from '@/utils';

type WorkoutSetSheetBodyProps = {
  workoutExercise: TWorkoutExercise;
  requestRefresh: (mutation: () => Promise<void>) => void;
};

export const WorkoutSetSheetBody: FC<WorkoutSetSheetBodyProps> = ({
  workoutExercise,
  requestRefresh,
}: WorkoutSetSheetBodyProps) => {
  const [selectedWorkoutSet, setSelectedWorkoutSet] = useState<TWorkoutSet>(null);

  useEffect(() => {
    if (!selectedWorkoutSet) return;

    const prevSelectedWorkoutSet = workoutExercise.sets.find((set) => set.id === selectedWorkoutSet.id);
    setSelectedWorkoutSet(prevSelectedWorkoutSet);
  }, [workoutExercise]);

  return (
    <SheetContent className={'flex flex-col'}>
      <SheetTitle>{workoutExercise.name}</SheetTitle>
      <div className={'flex-grow flex flex-col items-center gap-2 overflow-auto h-0'}>
        {workoutExercise.sets.map((set: TWorkoutSet) => (
          <WorkoutSet
            key={set.id}
            set={set}
            className={cn('w-full cursor-pointer', selectedWorkoutSet === set && 'bg-primary/30')}
            onClick={() => {
              setSelectedWorkoutSet(selectedWorkoutSet === set ? null : set);
            }}
          />
        ))}
      </div>
      <SheetFooter>
        <WorkoutSetForm
          workoutExercise={workoutExercise}
          workoutSetToUpdate={selectedWorkoutSet}
          requestRefresh={requestRefresh}
        />
      </SheetFooter>
    </SheetContent>
  );
};
