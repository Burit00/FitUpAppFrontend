import { z } from 'zod';
import { EmailSchema } from '@features/auth/schemas/fields/email.schema';

export const SignInSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, 'Pole wymagane'),
});
