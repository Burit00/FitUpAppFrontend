import { TDateTimeISO } from '@/types/TISODate';
import { TWorkout } from '@/api/types/workouts/workout.type';
import FitUpHttpClient from '@/api/http/fit-up/fit-up-http-client';

type TGetWorkoutsParams = {
  dateStart?: TDateTimeISO;
  dateEnd?: TDateTimeISO;
  categories?: string[];
};

export async function getWorkouts(params: TGetWorkoutsParams): Promise<TWorkout[]> {
  const res = await FitUpHttpClient.get('workouts', { params });

  return await res.json();
}
