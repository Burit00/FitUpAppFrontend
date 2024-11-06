import { useCookies } from 'react-cookie';
import { CookieGetOptions, CookieSetOptions } from 'universal-cookie';
import { TCookieKey } from '@/constants/CookieKeys';

type CookieHookReturn<T> = [T, (value: T) => void, () => void];

export function useCookie<T>(key: TCookieKey, options?: CookieGetOptions): CookieHookReturn<T> {
  const [cookies, setCookies, deleteCookies] = useCookies([key], options);
  const value: T = cookies[key];

  const setCookie = (value: T, options?: CookieSetOptions): void => {
    setCookies(key, JSON.stringify(value), options);
  };

  const removeCookie = (): void => {
    deleteCookies(key);
  };

  return [value, setCookie, removeCookie];
}