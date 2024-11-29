import React, { FC, useEffect, useState } from 'react';
import { TWorkoutExercise, TWorkoutSet } from '@features/workouts/types';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@components/ui';
import { WorkoutSetForm } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetForm';
import { WorkoutSetSheetTable } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetSheetTable';

type WorkoutSetSheetBodyProps = {
  workoutExercise: TWorkoutExercise;
  onRequestRefresh: () => Promise<void>;
};

export const WorkoutSetSheetBody: FC<WorkoutSetSheetBodyProps> = ({
  workoutExercise,
  onRequestRefresh,
}: WorkoutSetSheetBodyProps) => {
  const [selectedWorkoutSet, setSelectedWorkoutSet] = useState<TWorkoutSet | undefined>(undefined);

  useEffect(() => {
    if (!selectedWorkoutSet) return;

    const prevSelectedWorkoutSet = workoutExercise.sets.find((set) => set.id === selectedWorkoutSet.id);
    setSelectedWorkoutSet(prevSelectedWorkoutSet);
  }, [workoutExercise]);

  const cancelSelectedWorkoutSet = () => {
    setSelectedWorkoutSet(undefined);
  };

  return (
    <SheetContent className={'flex flex-col sm:max-w-[450px] sm:w-[450px]'} onClick={cancelSelectedWorkoutSet}>
      <SheetHeader>
        <SheetTitle>{workoutExercise.name}</SheetTitle>
        <SheetDescription>
          Kategoria: <b>{workoutExercise.category}</b>
        </SheetDescription>
      </SheetHeader>
      <div className={'flex-grow flex flex-col items-center gap-2 overflow-auto h-0'}>
        {workoutExercise.sets.length === 0 ? (
          <p>Nie dodano żadnej serii do tego ćwiczenia.</p>
        ) : (
          <WorkoutSetSheetTable
            parameters={workoutExercise.parameters}
            sets={workoutExercise.sets}
            activeSet={selectedWorkoutSet}
            onRowClick={(workoutSet) => {
              setSelectedWorkoutSet(selectedWorkoutSet === workoutSet ? undefined : workoutSet);
            }}
          />
        )}
      </div>
      <SheetFooter onClick={(e) => e.stopPropagation()}>
        <WorkoutSetForm
          workoutExercise={workoutExercise}
          workoutSetToUpdate={selectedWorkoutSet}
          onRequestRefresh={onRequestRefresh}
        />
      </SheetFooter>
    </SheetContent>
  );
};
