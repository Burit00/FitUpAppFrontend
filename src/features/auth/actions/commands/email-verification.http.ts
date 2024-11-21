import { FitUpHttpClient } from '@api';

type TEmailVerification = {
  userId: string;
  token: string;
};

export function emailVerification(data: TEmailVerification, signal?: AbortSignal): Promise<Response> {
  return FitUpHttpClient.post('account/email-verification', data, {
    signal,
  });
}
