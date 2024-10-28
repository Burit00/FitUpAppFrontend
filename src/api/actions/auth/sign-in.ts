'use server';

import { TSignIn } from '@/api/types/auth/TSignIn';
import { TUserToken } from '@/api/types/auth/TUserToken';
import { setUserCookie } from '@/utils/get-server-cookies';
import { HttpStatusEnum } from '@/api/enums/HttpStatusEnum';
import { HttpClient } from '@/api/actions/http-client';
import { THttpError } from '@/api/types/common/THttpError';

export const signIn = async (data: TSignIn): Promise<TUserToken | THttpError> => {
  const res = await HttpClient.postHttp('account/sign-in', data);

  switch (res.status as HttpStatusEnum) {
    case HttpStatusEnum.OK:
      const user = (await res.json()) satisfies TUserToken as TUserToken;

      setUserCookie(user);

      return user;
    case HttpStatusEnum.BAD_REQUEST:
      const error: THttpError = {
        status: res.status,
        message: 'Złe dane logowania',
      } satisfies THttpError as THttpError;

      return error;
    default:
  }
};
