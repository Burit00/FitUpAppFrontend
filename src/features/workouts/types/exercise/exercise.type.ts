import { z } from 'zod';
import { ExerciseSchema } from '../../schemas';
import { TSetParameterNameWithIdArray } from '@features/workouts/types';

export type TExercise = z.infer<typeof ExerciseSchema>;

export type TExerciseDetails = TExercise & { setParameterNames: TSetParameterNameWithIdArray };
