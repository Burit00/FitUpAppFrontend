import { AuthSuccessResultEnum } from '@features/auth/enums/auth-success-result.enum';

export const AuthSuccessResultMap = new Map<AuthSuccessResultEnum, string>([
  [
    AuthSuccessResultEnum.SIGN_UP,
    'Rejestracja zakończona pomyślnie, sprawdź swoją skrzynkę pocztową w celu zweryfikowania adresu e-mail.',
  ],
  [AuthSuccessResultEnum.EMAIL_VERIFICATION, 'Twój adres e-mail został pomyślnie zweryfikowany!'],
  [AuthSuccessResultEnum.RESET_PASSWORD, 'Twoje hasło zostało pomyślnie zresetowane!'],
  [AuthSuccessResultEnum.RESET_PASSWORD_REQUEST, 'Niedługo otrzymasz e-mail z linkiem do resetowania hasła.'],
]);
