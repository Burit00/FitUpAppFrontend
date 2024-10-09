import { Workout } from '@/app/calendar/mocks/workouts';

export async function getWorkouts({ year }: { year?: number }): Promise<Workout[]> {
  return await fetch('http://localhost:3001/workouts?date_like=' + year).then((res) => res.json());
}
