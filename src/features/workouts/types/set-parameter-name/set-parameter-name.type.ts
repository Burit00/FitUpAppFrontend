import { z } from 'zod';
import { SetParameterNameSchema } from '../../schemas';

// export type TSetParameterName = 'weight' | 'reps' | 'distance' | 'time';
export type TSetParameterName = z.infer<typeof SetParameterNameSchema>;
