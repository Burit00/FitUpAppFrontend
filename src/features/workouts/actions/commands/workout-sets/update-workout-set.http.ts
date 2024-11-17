import { FitUpHttpClient } from '@api';
import { TUpdateWorkoutSet } from '@features/workouts/types';
import { UpdateWorkoutSetSchema } from '@features/workouts/schemas';

export function updateWorkoutSet(updatedWorkoutSet: TUpdateWorkoutSet): Promise<Response> {
  const data = UpdateWorkoutSetSchema.parse(updatedWorkoutSet);

  return FitUpHttpClient.put('workout-sets', data);
}
