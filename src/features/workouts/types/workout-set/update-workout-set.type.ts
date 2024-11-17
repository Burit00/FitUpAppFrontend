import { TSetParameterNameWithValueArray } from '@features/workouts/types';

export type TUpdateWorkoutSet = {
  id: string;
  orderIndex: number;
  parameterValues: TSetParameterNameWithValueArray;
};
