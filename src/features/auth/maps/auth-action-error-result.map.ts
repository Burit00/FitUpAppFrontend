import { AuthActionErrorResultEnum } from '@features/auth/enums/auth-action-error-result.enum';

export const AuthActionErrorResultMap = new Map<AuthActionErrorResultEnum, string>([
  [AuthActionErrorResultEnum.BAD_USER_CREDENTIALS, 'Nieprawidłowy email lub hasło.'],
  [AuthActionErrorResultEnum.USER_WITH_EMAIL_ALREADY_EXIST, 'Użytkownik z tym adresem email już istnieje.'],
  [AuthActionErrorResultEnum.EMAIL_VERIFICATION, 'Nie udało się zweryfikować twojego adresu email.'],
  [AuthActionErrorResultEnum.RESET_PASSWORD, 'Wystąpił błąd podczas resetowania hasła.'],
  [AuthActionErrorResultEnum.RESET_PASSWORD_REQUEST, 'Nie znaleziono podanego adresu email.'],
  [AuthActionErrorResultEnum.SOMETHING_WENT_WRONG, 'Coś poszło nie tak.'],
]);
