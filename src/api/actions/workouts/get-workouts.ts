'use server';

import { TDateTimeISO } from '@/types/TISODate';
import { UUID } from 'node:crypto';
import { HttpClient } from '@/api/actions/http-client';
import { TWorkout } from '@/api/types/workouts/workout.type';

type TGetWorkoutsParams = {
  dateStart?: TDateTimeISO;
  dateEnd?: TDateTimeISO;
  categories?: UUID[];
};

export async function getWorkouts(params: TGetWorkoutsParams): Promise<TWorkout[]> {
  const res = await HttpClient.getHttp('workouts', params);

  return res.json();
}
