import { FitUpHttpClient } from '@api';

export function deleteWorkoutSet(workoutSetId: string): Promise<Response> {
  return FitUpHttpClient.delete(`workout-sets/${workoutSetId}`);
}
