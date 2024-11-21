import { z } from 'zod';
import { comparePasswords, ConfirmPasswordSchema, PasswordSchema } from '@features/auth/schemas';

export const ResetPasswordSchema = z
  .object({
    token: z.string(),
    userId: z.string().uuid(),
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .superRefine(comparePasswords);
