import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().min(1, 'Pole wymagane'),
  password: z.string().min(1, 'Pole wymagane'),
});

export type TSignIn = z.infer<typeof SignInSchema>;
