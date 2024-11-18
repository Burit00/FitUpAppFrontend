import { TWorkout, TWorkoutExercise } from '@features/workouts/types';
import { FC } from 'react';
import { WorkoutExercise } from '@features/workouts/components/workout-exercises';

type WorkoutDetailsProps = {
  workout: TWorkout;
  onExerciseClick: (workoutExercise: TWorkoutExercise) => void;
  onExerciseDelete: (workoutExerciseId: string) => void;
};

export const WorkoutDetails: FC<WorkoutDetailsProps> = ({ workout, ...props }) => {
  if (!workout || workout?.exercises.length === 0)
    return <h2 className={'text-muted text-center'}>W tym dniu nie dodano żadnego ćwiczenia.</h2>;

  return (
    <div className={'flex flex-col w-full gap-4'}>
      {workout.exercises.map((exercise) => (
        <WorkoutExercise
          key={exercise.id}
          onExerciseClick={props.onExerciseClick}
          onExerciseDelete={props.onExerciseDelete}
          workoutExercise={exercise}
        />
      ))}
    </div>
  );
};
