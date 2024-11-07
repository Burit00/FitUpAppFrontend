import { z } from 'zod';

export const SetParameterNameSchema = z.union([
  z.literal('weight'),
  z.literal('reps'),
  z.literal('distance'),
  z.literal('time'),
]);
