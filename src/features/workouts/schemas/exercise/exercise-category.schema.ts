import { z } from 'zod';

export const ExerciseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});
