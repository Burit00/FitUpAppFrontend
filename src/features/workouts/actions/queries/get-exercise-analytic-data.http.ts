import { FitUpHttpClient } from '@api';
import { TSetParameterName } from '@features/workouts/types';

export type GetExerciseAnalyticDataHttpParams = {
  exerciseId: string;
  parameterName: TSetParameterName;
  startDate?: Date;
  endDate?: Date;
};

export async function getExerciseAnalyticData(params: GetExerciseAnalyticDataHttpParams): Promise<Response> {
  return FitUpHttpClient.get('exercises/analytics', { params });
}
