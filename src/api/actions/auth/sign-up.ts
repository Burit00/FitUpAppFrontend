import { TSignUp } from '@/api/types/auth/TSignUp';
import FitUpHttpClient from '@/api/http/fit-up/fit-up-http-client';

export async function signUp(signUpCredentials: TSignUp): Promise<Response> {
  return FitUpHttpClient.post<TSignUp>('account/sign-up', signUpCredentials);
}
