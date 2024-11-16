import { z } from 'zod';
import { WorkoutSetSchema } from '@features/workouts/schemas/workout-set/workout-set.schema';
import { SetParameterNameArraySchema } from '@features/workouts/schemas';

export const WorkoutExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  orderIndex: z.number(),
  sets: z.array(WorkoutSetSchema),
  parameters: SetParameterNameArraySchema,
});
