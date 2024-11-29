import { TCookieKey } from '@/constants/CookieKeys';

export function getCookie(name: TCookieKey): string | undefined {
  const value = document.cookie.split(`${name}=`).pop()?.split(';').shift();

  return value && decodeURIComponent(value);
}
