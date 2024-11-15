import { FitUpHttpClient } from '@api';

export function deleteWorkoutExercise(exerciseId: string): Promise<Response> {
  return FitUpHttpClient.delete(`workout-exercises/${exerciseId}`);
}
