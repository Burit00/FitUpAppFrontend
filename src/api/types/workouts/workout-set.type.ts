import { TSetParameterName } from '@/api/types/workouts/set-parameter-name';

type TParameter = {
  id: string;
  name: TSetParameterName;
  value: string;
};

export type TWorkoutSet = {
  id: string;
  orderIndex: number;
  parameters: TParameter[];
};
