import { FitUpHttpClient } from '@api';

type TGetExercisesParams = {
  search?: string;
  categoryId?: string;
};

export async function getExercises(params: TGetExercisesParams): Promise<Response> {
  return FitUpHttpClient.get('exercises', {
    params: {
      search: params.search,
      exerciseCategoryIds: params.categoryId && [params.categoryId],
    },
  });
}
