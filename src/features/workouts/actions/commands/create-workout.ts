import { FitUpHttpClient } from '@api';

export type TCreateWorkoutParams = {
  date: Date;
  exerciseIds: string[];
};

export async function createWorkout(newWorkout: TCreateWorkoutParams): Promise<Response> {
  return FitUpHttpClient.post('workouts', newWorkout);
}
