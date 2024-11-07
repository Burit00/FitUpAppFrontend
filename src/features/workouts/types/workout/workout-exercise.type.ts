import { z } from 'zod';
import { WorkoutExerciseSchema } from '../../schemas';

export type TWorkoutExercise = z.infer<typeof WorkoutExerciseSchema>;
