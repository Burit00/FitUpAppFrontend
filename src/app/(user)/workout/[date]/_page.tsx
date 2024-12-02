'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils';
import { addWorkoutExercise, createWorkout, deleteWorkoutExercise } from '@features/workouts/actions';
import { useWorkout } from '@features/workouts/hooks/useWorkout';
import { WorkoutDetails } from '@features/workouts/components';
import { TWorkoutExercise } from '@features/workouts/types';
import { WorkoutSetSheet } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetSheet';
import { AddWorkoutExerciseSheet } from './_components/AddWorkoutExerciseSheet';
import { WorkoutBar } from './_components/WorkoutBar';
import { Loader } from '@components/Loader';
import { NextDayButton, PreviousDayButton } from '@/app/(user)/workout/[date]/_components/NextDayButton';

type WorkoutPageProps = {
  date: Date;
};

export default function WorkoutPage(props: WorkoutPageProps) {
  const { workout, isLoading, fetchWorkout } = useWorkout(props.date);
  const [selectedExercise, setSelectedExercise] = useState<TWorkoutExercise | undefined>(undefined);

  useEffect(() => {
    if (!selectedExercise) return;

    const workoutExercise = workout?.exercises.find((e) => e.id === selectedExercise.id);
    if (workoutExercise) setSelectedExercise(workoutExercise);
  }, [workout]);

  const createOrUpdateWorkout = async (exerciseId: string) => {
    if (!workout) await createWorkout({ date: props.date, exerciseIds: [exerciseId] });
    else await addWorkoutExercise({ workoutId: workout.id, exerciseId });
    fetchWorkout();
  };

  const handleWorkoutExerciseDelete = async (workoutExerciseId: string) => {
    await deleteWorkoutExercise(workoutExerciseId);
    fetchWorkout();
  };

  return (
    <>
      <div className={'w-full flex flex-col justify-between gap-5'}>
        <WorkoutBar
          date={props.date}
          exercisesToFilter={workout?.exercises || []}
          onAddNewExercise={createOrUpdateWorkout}
        />
        <div className={'relative flex-grow overflow-hidden'}>
          <div
            className={cn(
              'w-full h-full flex flex-col justify-center items-center overflow-auto',
              workout && workout.exercises.length > 0 && 'justify-start'
            )}
          >
            <Loader isLoading={isLoading} />
            <WorkoutDetails
              workout={workout}
              onRequestRefresh={fetchWorkout}
              onExerciseClick={setSelectedExercise}
              onExerciseDelete={handleWorkoutExerciseDelete}
            />
          </div>
        </div>
        <div className={'w-full flex gap-2 justify-center md:hidden'}>
          <PreviousDayButton date={props.date} />
          <AddWorkoutExerciseSheet
            className={'w-full'}
            exercisesToFilter={workout?.exercises}
            onAddNewExercise={createOrUpdateWorkout}
          />
          <NextDayButton date={props.date} />
        </div>
      </div>
      <WorkoutSetSheet
        open={!!selectedExercise}
        onOpenChange={(open: boolean) => !open && setSelectedExercise(undefined)}
        workoutExercise={selectedExercise}
        onRequestRefresh={fetchWorkout}
      />
    </>
  );
}
