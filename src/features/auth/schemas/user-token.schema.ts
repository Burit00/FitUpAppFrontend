import { z } from 'zod';
import { UserRoleEnum } from '@features/auth/enums';

const userRoleEnum = z.nativeEnum(UserRoleEnum);

export const UserTokenSchema = z.object({
  accessToken: z.string(),
  expires: z.number().int().positive(),
  userId: z.string().uuid(),
  email: z.string().email(),
  roles: z.array(userRoleEnum),
});
