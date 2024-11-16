'use client';

import { WorkoutBar } from '@/app/workout/[date]/_components/WorkoutBar';
import { AddWorkoutExerciseButton } from '@/app/workout/[date]/_components/AddWorkoutExerciseButton';
import { useWorkout } from '@features/workouts/hooks/useWorkout';
import { cn } from '@/utils';
import { WorkoutDetails } from '@features/workouts/components';
import { useEffect, useState } from 'react';
import { TCreateWorkoutSet, TSetParameterNameWithValue, TWorkoutExercise } from '@features/workouts/types';
import { WorkoutSetSheet } from '@features/workouts/components/workout-sets/sheets/wokrout-sets-sheet/WorkoutSetSheet';
import { addWorkoutExercise, createWorkout, createWorkoutSet, deleteWorkoutExercise } from '@features/workouts/actions';

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

  const handleWorkoutSetCreate = async (workoutSetValues: TSetParameterNameWithValue[]) => {
    const newWorkoutSet: TCreateWorkoutSet = {
      workoutExerciseId: selectedExercise.id,
      orderIndex: -1,
      parameterValues: workoutSetValues,
    };
    await createWorkoutSet(newWorkoutSet);
    fetchWorkout();
  };

  let WorkoutExercises = <h2 className={'text-muted text-center'}>W tym dniu nie dodano żadnego ćwiczenia.</h2>;
  if (workout?.exercises.length > 0) {
    WorkoutExercises = (
      <WorkoutDetails
        workout={workout}
        onExerciseClick={setSelectedExercise}
        onExerciseDelete={handleWorkoutExerciseDelete}
      />
    );
  }

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
          {isLoading ? <p>Loading..</p> : <>{WorkoutExercises}</>}
        </div>
        <div className={'w-full flex justify-center md:hidden'}>
          <AddWorkoutExerciseButton className={'w-full'} onAddNewExercise={createOrUpdateWorkout} />
        </div>
      </div>
      <WorkoutSetSheet
        open={!!selectedExercise}
        onOpenChange={(open: boolean) => setSelectedExercise(open ? selectedExercise : null)}
        workoutExercise={selectedExercise}
        onCreateSet={handleWorkoutSetCreate}
      />
    </>
  );
}
