import { z } from 'zod';
import { ExerciseCategorySchema } from '@/features/workouts/schemas/exercise/exercise-category.schema';

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: ExerciseCategorySchema,
});
