import { TSetParameterNameWithValueArray } from '@features/workouts/types';

export type TCreateWorkoutSet = {
  workoutExerciseId: string;
  orderIndex: number;
  parameterValues: TSetParameterNameWithValueArray;
};
