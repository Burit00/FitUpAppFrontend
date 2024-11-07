import { z } from 'zod';
import { ExerciseCategorySchema } from '../../schemas';

export type TExerciseCategory = z.infer<typeof ExerciseCategorySchema>;
