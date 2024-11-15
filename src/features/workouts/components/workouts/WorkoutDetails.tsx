import { TWorkout, TWorkoutExercise } from '@features/workouts/types';
import { FC } from 'react';
import { WorkoutExercise } from '@features/workouts/components/workout-exercises';

type WorkoutDetailsProps = {
  workout: TWorkout;
  onExerciseClick: (workoutExercise: TWorkoutExercise) => void;
  onExerciseDelete: (workoutExerciseId: string) => void;
};

export const WorkoutDetails: FC<WorkoutDetailsProps> = (props) => {
  return (
    <div className={'flex flex-col w-full gap-4'}>
      {props.workout?.exercises.map((exercise) => (
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
