import { z } from 'zod';

export const UserTokenSchema = z.object({
  accessToken: z.string(),
  expires: z.number().int().positive(),
  userId: z.string().uuid(),
  email: z.string().email(),
  roles: z.array(z.string()),
});
