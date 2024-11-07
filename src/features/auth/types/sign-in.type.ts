import { z } from 'zod';
import { SignInSchema } from '../schemas';

export type TSignIn = z.infer<typeof SignInSchema>;
