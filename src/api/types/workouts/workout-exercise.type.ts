import { TSetParameterName } from '@/api/types/workouts/set-parameter-name';
import { TWorkoutSet } from '@/api/types/workouts/workout-set.type';

export type TWorkoutExercise = {
  id: string;
  name: string;
  category: string;
  orderIndex: number;
  sets: TWorkoutSet[];
  parameters: TSetParameterName[];
};
