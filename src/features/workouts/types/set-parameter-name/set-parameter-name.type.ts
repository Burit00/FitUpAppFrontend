import { z } from 'zod';
import {
  SetParameterNameArraySchema,
  SetParameterNameSchema,
  SetParameterNameWithValueArraySchema,
  SetParameterNameWithValueSchema,
} from '../../schemas';

// export type TSetParameterName = 'weight' | 'reps' | 'distance' | 'time';
export type TSetParameterName = z.infer<typeof SetParameterNameSchema>;
export type TSetParameterNameWithValue = z.infer<typeof SetParameterNameWithValueSchema>;

export type TSetParameterNameArray = z.infer<typeof SetParameterNameArraySchema>;
export type TSetParameterNameWithValueArray = z.infer<typeof SetParameterNameWithValueArraySchema>;
