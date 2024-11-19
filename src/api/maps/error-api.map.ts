import { ErrorApiEnum } from '@api/enums/ErrorApi.enum';

export const ERROR_API_MAP = new Map<ErrorApiEnum, string>([
  [ErrorApiEnum.BAD_USER_CREDENTIALS, 'Nieprawidłowy email lub hasło.'],
  [ErrorApiEnum.SOMETHING_WENT_WRONG, 'Coś poszło nie tak.'],
]);
