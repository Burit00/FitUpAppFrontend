import { z } from 'zod';
import {
  SetParameterNameSchema,
  SetParameterNameWithIdArraySchema,
  SetParameterNameWithIdSchema,
  SetParameterNameWithValueArraySchema,
  SetParameterNameWithValueSchema,
} from '../../schemas';

export type TSetParameterName = z.infer<typeof SetParameterNameSchema>;
export type TSetParameterNameWithId = z.infer<typeof SetParameterNameWithIdSchema>;
export type TSetParameterNameWithValue = z.infer<typeof SetParameterNameWithValueSchema>;

export type TSetParameterNameWithIdArray = z.infer<typeof SetParameterNameWithIdArraySchema>;
export type TSetParameterNameWithValueArray = z.infer<typeof SetParameterNameWithValueArraySchema>;
