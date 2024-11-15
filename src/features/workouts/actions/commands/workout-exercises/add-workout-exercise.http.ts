import { FitUpHttpClient } from '@api';

type TAddWorkoutExerciseParams = {
  workoutId: string;
  exerciseId: string;
  orderIndex?: number;
};

export function addWorkoutExercise(newWorkoutExercise: TAddWorkoutExerciseParams) {
  return FitUpHttpClient.post('workout-exercises', newWorkoutExercise);
}
