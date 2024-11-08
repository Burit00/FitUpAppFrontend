'use client';

import { WorkoutBar } from '@/app/workout/[date]/_components/WorkoutBar';
import { AddWorkoutExerciseButton } from '@/app/workout/[date]/_components/AddWorkoutExerciseButton';
import { useWorkout } from '@features/workouts/hooks/useWorkout';
import { createWorkout } from '@features/workouts/actions/commands/create-workout';
import { addWorkoutExercise } from '@features/workouts/actions/commands/add-workout-exercise';
import { cn } from '@/utils';

type WorkoutPageProps = {
  date: Date;
};

export default function WorkoutPage(props: WorkoutPageProps) {
  const { workout, isLoading, fetchWorkout } = useWorkout(props.date);

  const createOrUpdateWorkout = async (exerciseId: string) => {
    if (!workout) await createWorkout({ date: props.date, exerciseIds: [exerciseId] });
    else await addWorkoutExercise({ workoutId: workout.id, exerciseId });
    fetchWorkout();
  };

  let WorkoutExercises = <h2>Nie dodano w tym dniu żadnego ćwiczenia</h2>;
  if (workout?.exercises.length > 0) {
    WorkoutExercises = (
      <>
        {workout?.exercises.map((exercise) => (
          <div key={exercise.id}>
            <h3 className={'text-2xl font-bold'}>{exercise.name}</h3>
          </div>
        ))}
      </>
    );
  }

  return (
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
  );
}
