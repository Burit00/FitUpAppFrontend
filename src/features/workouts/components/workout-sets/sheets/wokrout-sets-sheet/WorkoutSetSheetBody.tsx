import React, { FC, useEffect, useState } from 'react';
import { TWorkoutExercise, TWorkoutSet } from '@features/workouts/types';
import { SheetContent, SheetFooter, SheetTitle } from '@components/ui';
import { WorkoutSetForm } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetForm';
import { WorkoutSetSheetTable } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetSheetTable';

type WorkoutSetSheetBodyProps = {
  workoutExercise: TWorkoutExercise;
  requestRefresh: () => void;
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
        {workoutExercise.sets.length === 0 && <p>Nie dodano żadnych serii do tego ćwiczenia.</p>}
        <WorkoutSetSheetTable
          parameters={workoutExercise.parameters}
          sets={workoutExercise.sets}
          activeSet={selectedWorkoutSet}
          onRowClick={(workoutSet) => {
            setSelectedWorkoutSet(selectedWorkoutSet === workoutSet ? null : workoutSet);
          }}
        />
        {/*{workoutExercise.sets.map((set: TWorkoutSet) => (*/}
        {/*  <WorkoutSet*/}
        {/*    key={set.id}*/}
        {/*    isActive={selectedWorkoutSet === set}*/}
        {/*    set={set}*/}
        {/*    className={'w-full'}*/}
        {/*    onClick={() => {*/}
        {/*      setSelectedWorkoutSet(selectedWorkoutSet === set ? null : set);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*))}*/}
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
