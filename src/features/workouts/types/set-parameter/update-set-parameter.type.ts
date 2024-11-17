import { TSetParameterNameWithValueArray } from '@features/workouts/types';

export type TUpdateSetParameter = {
  workoutSetId: string;
  parameters: TSetParameterNameWithValueArray;
};
