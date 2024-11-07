import { z } from 'zod';
import { SignUpSchema } from '../schemas';

export type TSignUp = z.infer<typeof SignUpSchema>;
