import { z } from 'zod';
import { WorkoutSchema } from '../../schemas';

export type TWorkout = z.infer<typeof WorkoutSchema>;
