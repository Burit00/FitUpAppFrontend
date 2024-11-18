import { TSetParameterName } from '@features/workouts/types';

export const SET_PARAMETER_NAMES_ORDER_MAP = new Map<TSetParameterName, number>([
  ['weight', 0],
  ['distance', 1],
  ['reps', 2],
  ['time', 3],
]);
