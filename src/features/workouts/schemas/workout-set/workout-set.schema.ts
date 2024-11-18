import { z } from 'zod';
import { SetParameterNameWithValueArraySchema } from '@features/workouts/schemas/set-parameter-name/set-parameter-name-with-id.schema';

export const WorkoutSetSchema = z.object({
  id: z.string().uuid(),
  orderIndex: z.number(),
  parameters: SetParameterNameWithValueArraySchema,
});
