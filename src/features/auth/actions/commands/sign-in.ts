import { FitUpHttpClient } from '@api';
import { TSignIn } from '@features/auth/types';

export async function signIn(signIn: TSignIn): Promise<Response> {
  return FitUpHttpClient.post<TSignIn>('account/sign-in', signIn);
}
