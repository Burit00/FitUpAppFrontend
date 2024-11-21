import { z } from 'zod';
import { comparePasswords, ConfirmPasswordSchema, PasswordSchema } from '@features/auth/schemas/fields/password.schema';
import { EmailSchema } from '@features/auth/schemas/fields/email.schema';

export const SignUpSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .superRefine(comparePasswords);
