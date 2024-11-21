import { z } from 'zod';
import { ResetPasswordRequestSchema } from '../../schemas';

export type TResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
