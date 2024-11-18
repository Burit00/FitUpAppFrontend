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

type WorkoutPageProps = {
  date: Date;
};

export default function WorkoutPage(props: WorkoutPageProps) {
  const { workout, isLoading, fetchWorkout } = useWorkout(props.date);
  const [selectedExercise, setSelectedExercise] = useState<TWorkoutExercise>(null);

  useEffect(() => {
    if (!selectedExercise) return;

    const workoutExercise = workout.exercises.find((e) => e.id === selectedExercise.id);
    setSelectedExercise(workoutExercise);
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
        <WorkoutBar date={props.date} onAddNewExercise={createOrUpdateWorkout} />
        <div
          className={cn(
            'w-full flex-grow flex flex-col justify-center items-center overflow-auto',
            workout?.exercises.length > 0 && 'justify-start',
          )}
        >
          {isLoading ? (
            <p>Loading..</p>
          ) : (
            <WorkoutDetails
              workout={workout}
              onExerciseClick={setSelectedExercise}
              onExerciseDelete={handleWorkoutExerciseDelete}
            />
          )}
        </div>
        <div className={'w-full flex justify-center md:hidden'}>
          <AddWorkoutExerciseSheet className={'w-full'} onAddNewExercise={createOrUpdateWorkout} />
        </div>
      </div>
      <WorkoutSetSheet
        open={!!selectedExercise}
        onOpenChange={(open: boolean) => !open && setSelectedExercise(null)}
        workoutExercise={selectedExercise}
        requestRefresh={fetchWorkout}
      />
    </>
  );
}
