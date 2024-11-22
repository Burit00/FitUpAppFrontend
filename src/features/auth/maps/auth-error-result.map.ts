import { AuthErrorResultEnum } from '@features/auth/enums/auth-error-result.enum';

export const AuthErrorResultMap = new Map<AuthErrorResultEnum, string>([
  [AuthErrorResultEnum.BAD_USER_CREDENTIALS, 'Nieprawidłowy email lub hasło.'],
  [AuthErrorResultEnum.USER_WITH_EMAIL_ALREADY_EXIST, 'Użytkownik z tym adresem email już istnieje.'],
  [
    AuthErrorResultEnum.EMAIL_NOT_VERIFIED,
    'Podany adres email nie został zweryfikowany. Sprawdź swoją skrzynkę pocztą.',
  ],
  [AuthErrorResultEnum.EMAIL_VERIFICATION, 'Nie udało się zweryfikować twojego adresu email.'],
  [AuthErrorResultEnum.RESET_PASSWORD, 'Wystąpił błąd podczas resetowania hasła.'],
  [AuthErrorResultEnum.RESET_PASSWORD_REQUEST, 'Nie znaleziono podanego adresu email.'],
  [AuthErrorResultEnum.SOMETHING_WENT_WRONG, 'Coś poszło nie tak.'],
]);
