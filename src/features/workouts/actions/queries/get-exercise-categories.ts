import { FitUpHttpClient } from '@api';

export async function getExerciseCategories(search: string): Promise<Response> {
  return FitUpHttpClient.get('exercise-categories', { params: { search } });
}
