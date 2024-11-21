import { FitUpHttpClient } from '@api';
import { TResetPasswordRequest } from '@features/auth/types';

export function resetPasswordRequest(resetPassword: TResetPasswordRequest) {
  return FitUpHttpClient.post('account/reset-password-request', resetPassword);
}
