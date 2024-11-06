import { TCookieKey } from '@/constants/CookieKeys';

export function getCookie(name: TCookieKey): string {
  const value = document.cookie.split(`${name}=`).pop().split(';').shift();

  return decodeURIComponent(value);
}
