import { z } from 'zod';
import { ResetPasswordSchema } from '../../schemas';

export type TResetPassword = z.infer<typeof ResetPasswordSchema>;
