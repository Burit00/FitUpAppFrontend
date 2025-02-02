import { z } from 'zod';
import { TimeSpan } from '@/types/TimeSpan';

export const CreateOrUpdateWorkoutSetParameterValueSchema = z.object({
  id: z.string().uuid(),
  value: z
    .string()
    .or(z.number())
    .or(z.instanceof(TimeSpan))
    .transform((data: string | number | TimeSpan): string => data.toString()),
});

export const CreateWorkoutSetSchema = z.object({
  workoutExerciseId: z.string().uuid(),
  orderIndex: z.number().optional(),
  parameterValues: z.array(CreateOrUpdateWorkoutSetParameterValueSchema),
});

export const UpdateWorkoutSetSchema = z.object({
  id: z.string().uuid(),
  orderIndex: z.number().optional(),
  parameterValues: z.array(CreateOrUpdateWorkoutSetParameterValueSchema),
});
