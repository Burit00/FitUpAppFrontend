import { z } from 'zod';
import { BrowseWorkoutArraySchema, BrowseWorkoutSchema } from '../../schemas';

export type TBrowseWorkout = z.infer<typeof BrowseWorkoutSchema>;
export type TBrowseWorkoutArray = z.infer<typeof BrowseWorkoutArraySchema>;
