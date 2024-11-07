import { z } from 'zod';
import { ExerciseSchema } from '../../schemas';

export type TExercise = z.infer<typeof ExerciseSchema>;
