import { z } from 'zod';
import { WorkoutSetArraySchema } from '@features/workouts/schemas/workout-set/workout-set.schema';
import { SetParameterNameArraySchema } from '@features/workouts/schemas';
import { TWorkoutExercise } from '@features/workouts/types';

export const WorkoutExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  orderIndex: z.number(),
  sets: WorkoutSetArraySchema,
  parameters: SetParameterNameArraySchema,
});

export const WorkoutExerciseArraySchema = z
  .array(WorkoutExerciseSchema)
  .transform((data: TWorkoutExercise[]): TWorkoutExercise[] =>
    data.sort(
      (exerciseA: TWorkoutExercise, exerciseB: TWorkoutExercise): number => exerciseA.orderIndex - exerciseB.orderIndex,
    ),
  );
