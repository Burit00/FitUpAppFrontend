import { z } from 'zod';
import { SetParameterNameSchema } from '@features/workouts/schemas/set-parameter-name/set-parameter-name.schema';

const ParameterSchema = z.object({
  id: z.string().uuid(),
  name: SetParameterNameSchema,
  value: z.string(),
});

export const WorkoutSetSchema = z.object({
  id: z.string(),
  orderIndex: z.number(),
  parameters: z.array(ParameterSchema),
});
