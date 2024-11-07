import FitUpHttpClient from '@/api/http/fit-up/fit-up-http-client';

export async function getWorkoutById(id: string): Promise<Response> {
  return FitUpHttpClient.get(`workouts/${id}`);
}

export async function getWorkoutByDate(date: Date): Promise<Response> {
  const workoutDate = new Date(date);
  // workoutDate.setMinutes(workoutDate.getMinutes() - workoutDate.getTimezoneOffset());

  return FitUpHttpClient.get(`workouts/${workoutDate.toISOString()}`);
}
