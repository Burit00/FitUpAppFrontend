import { z } from 'zod';
import { WorkoutSetSchema } from '../../schemas';

export type TWorkoutSet = z.infer<typeof WorkoutSetSchema>;
