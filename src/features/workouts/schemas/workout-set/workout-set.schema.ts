import { z } from 'zod';
import { SetParameterNameWithValueArraySchema } from '@features/workouts/schemas/set-parameter-name/set-parameter-name.schema';
import { TWorkoutSet } from '@features/workouts/types';

export const WorkoutSetSchema = z.object({
  id: z.string().uuid(),
  orderIndex: z.number(),
  parameters: SetParameterNameWithValueArraySchema,
});

export const WorkoutSetArraySchema = z
  .array(WorkoutSetSchema)
  .transform((data: TWorkoutSet[]): TWorkoutSet[] =>
    data.sort((setA: TWorkoutSet, setB: TWorkoutSet): number => setA.orderIndex - setB.orderIndex),
  );
