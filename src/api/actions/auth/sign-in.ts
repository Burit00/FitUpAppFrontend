import { TSignIn } from '@/api/types/auth/TSignIn';
import { TUserToken } from '@/api/types/auth/TUserToken';
import FitUpHttpClient from '@/api/http/fit-up/fit-up-http-client';

export async function signIn(signIn: TSignIn): Promise<TUserToken> {
  return FitUpHttpClient.post<TSignIn>('account/sign-in', signIn).then((res) => res.json());
}
