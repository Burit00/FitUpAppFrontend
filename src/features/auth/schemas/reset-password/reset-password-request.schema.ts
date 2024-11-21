import { z } from 'zod';
import { EmailSchema } from '@features/auth/schemas';

export const ResetPasswordRequestSchema = z.object({
  email: EmailSchema,
});
