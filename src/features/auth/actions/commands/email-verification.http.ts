import { FitUpHttpClient } from '@api';

type TEmailVerification = {
  email: string;
  token: string;
};

export function emailConfirmation(data: TEmailVerification, signal?: AbortSignal): Promise<Response> {
  return FitUpHttpClient.post('account/email-verification', data, {
    signal,
  });
}
