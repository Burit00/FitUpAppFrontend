import { UUID } from 'node:crypto';

export type TUserToken = {
  accessToken: string;
  expires: number;
  userId: UUID;
};
