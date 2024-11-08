import { z } from 'zod';
import { UserTokenSchema } from '@features/auth/schemas/user-token.schema';

export type TUserToken = z.infer<typeof UserTokenSchema>;
