import { FitUpHttpClient } from '@api';
import { TCreateWorkoutSet } from '@features/workouts/types/workout-set/create-workout-set.type';
import { CreateWorkoutSetSchema } from '@features/workouts/schemas';

export function createWorkoutSet(workoutSet: TCreateWorkoutSet): Promise<Response> {
  const newWorkoutSet = CreateWorkoutSetSchema.parse(workoutSet);

  return FitUpHttpClient.post('workout-sets', newWorkoutSet);
}
