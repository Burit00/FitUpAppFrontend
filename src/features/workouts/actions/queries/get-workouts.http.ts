import { FitUpHttpClient } from '@api';

type TGetWorkoutsParams = {
  dateStart?: Date;
  dateEnd?: Date;
  categories?: string[];
};

export async function getWorkouts(params: TGetWorkoutsParams, signal?: AbortSignal): Promise<Response> {
  return FitUpHttpClient.get('workouts', {
    params: {
      dateStart: params.dateStart?.toISOString(),
      dateEnd: params.dateEnd?.toISOString(),
      categories: params?.categories,
    },
    signal,
  });
}
