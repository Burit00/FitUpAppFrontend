import { z } from 'zod';
import { IdSchema } from '@schemas/id.schema';

export const BrowseWorkoutSchema = z.object({
  id: IdSchema,
  date: z
    .string()
    .or(z.date())
    .transform((arg) => new Date(arg)),
});

export const BrowseWorkoutArraySchema = z.array(BrowseWorkoutSchema);
