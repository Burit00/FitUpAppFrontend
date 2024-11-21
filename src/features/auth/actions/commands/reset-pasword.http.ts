import { FitUpHttpClient } from '@api';
import { TResetPassword } from '@features/auth/types';

export function resetPassword(resetPassword: TResetPassword) {
  return FitUpHttpClient.post('account/reset-password', resetPassword);
}
