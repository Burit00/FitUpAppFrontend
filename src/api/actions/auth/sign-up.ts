import { TSignUp } from '@/api/types/auth/TSignUp';
import FitUpHttpClient from '@/api/http/fit-up/fit-up-http-client';
import { CreateOrUpdateResponse } from '@/api/types/common/CreateOrUpdateResponse';

export async function signUp(signUpCredentials: TSignUp): Promise<CreateOrUpdateResponse> {
  return await FitUpHttpClient.post<TSignUp>('account/sign-up', signUpCredentials).then((res) => res.json());
}
