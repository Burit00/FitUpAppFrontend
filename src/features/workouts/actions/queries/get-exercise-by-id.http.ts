import { FitUpHttpClient } from '@api';

export async function getExerciseById(exerciseId: string): Promise<Response> {
  return FitUpHttpClient.get(`exercises/${exerciseId}`);
}
