import { TCookieKeys } from '@/constants/cookie-keys';

export function getCookie(name: TCookieKeys): string {
  const value = document.cookie.split(`${name}=`).pop().split(';').shift();

  return decodeURIComponent(value);
}
