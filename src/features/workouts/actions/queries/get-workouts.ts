import { FitUpHttpClient } from '@api';

type TGetWorkoutsParams = {
  dateStart?: Date;
  dateEnd?: Date;
  categories?: string[];
};

export async function getWorkouts(params: TGetWorkoutsParams): Promise<Response> {
  return FitUpHttpClient.get('workouts', {
    params: {
      dateStart: params.dateStart?.toISOString(),
      dateEnd: params.dateEnd?.toISOString(),
      categories: params?.categories,
    },
  });
}
