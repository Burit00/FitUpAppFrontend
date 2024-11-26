import { z } from 'zod';
import { comparePasswords, ConfirmPasswordSchema, PasswordSchema } from '@features/auth/schemas';

export const ResetPasswordSchema = z
  .object({
    token: z.string(),
    email: z.string().email(),
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .superRefine(comparePasswords);
