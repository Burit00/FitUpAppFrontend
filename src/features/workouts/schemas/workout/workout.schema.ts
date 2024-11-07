import { z } from 'zod';
import { WorkoutExerciseSchema } from '@/features/workouts/schemas/workout/workout-exercise.schema';

export const WorkoutSchema = z.object({
  id: z.string(),
  date: z.string().transform((date) => new Date(date)),
  exercises: z.array(WorkoutExerciseSchema),
});
