import { FitUpHttpClient } from '@api';
import { TSignUp } from '@features/auth/types';

export async function signUp(signUpCredentials: TSignUp): Promise<Response> {
  return FitUpHttpClient.post('account/sign-up', signUpCredentials);
}
