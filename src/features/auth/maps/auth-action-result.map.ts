import { AuthActionResultEnum } from '@features/auth/enums/auth-action-result.enum';

export const AuthActionResultMap = new Map<AuthActionResultEnum, string>([
  [AuthActionResultEnum.BAD_USER_CREDENTIALS, 'Nieprawidłowy email lub hasło.'],
  [AuthActionResultEnum.SOMETHING_WENT_WRONG, 'Coś poszło nie tak.'],
]);
