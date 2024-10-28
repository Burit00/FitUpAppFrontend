'use server';

import { Workout } from '@/app/calendar/mocks/workouts';
import { TDateTimeISO } from '@/types/TISODate';
import { UUID } from 'node:crypto';
import { HttpClient } from '@/api/actions/http-client';

type TGetWorkoutsParams = {
  dateStart?: TDateTimeISO;
  dateEnd?: TDateTimeISO;
  categories?: UUID[];
};

export async function getWorkouts(params: TGetWorkoutsParams): Promise<Workout[]> {
  const res = await HttpClient.getHttp<Workout[]>('workouts', params);

  return res.data;
}
