import { z } from 'zod';
import { WorkoutSetSchema } from '@/features/workouts/schemas/workout/workout-set.schema';

export const WorkoutExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  sets: z.array(WorkoutSetSchema),
});
