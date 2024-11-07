import { TDateTimeISO } from '@/types/TISODate';
import FitUpHttpClient from '@/api/http/fit-up/fit-up-http-client';

type TGetWorkoutsParams = {
  dateStart?: TDateTimeISO;
  dateEnd?: TDateTimeISO;
  categories?: string[];
};

export async function getWorkouts(params: TGetWorkoutsParams): Promise<Response> {
  return FitUpHttpClient.get('workouts', { params });
}
