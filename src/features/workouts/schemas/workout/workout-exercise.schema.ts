import { z } from 'zod';
import { WorkoutSetSchema } from '@features/workouts/schemas/workout-set/workout-set.schema';
import { SetParameterNameWithIdArraySchema } from '@features/workouts/schemas';

export const WorkoutExerciseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: z.string(),
  orderIndex: z.number(),
  sets: z.array(WorkoutSetSchema),
  parameters: SetParameterNameWithIdArraySchema,
});
