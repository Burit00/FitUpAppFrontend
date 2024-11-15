import { z } from 'zod';
import { WorkoutExerciseArraySchema } from '@/features/workouts/schemas/workout/workout-exercise.schema';

export const WorkoutSchema = z.object({
  id: z.string(),
  date: z.string().transform((date) => new Date(date)),
  exercises: WorkoutExerciseArraySchema,
});
