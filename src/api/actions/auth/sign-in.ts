import { TSignIn } from '@/api/types/auth/TSignIn';
import FitUpHttpClient from '@/api/http/fit-up/fit-up-http-client';

export async function signIn(signIn: TSignIn): Promise<Response> {
  return FitUpHttpClient.post<TSignIn>('account/sign-in', signIn);
}
