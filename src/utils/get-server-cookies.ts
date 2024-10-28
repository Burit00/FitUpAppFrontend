import { cookies } from 'next/headers';
import { TUserToken } from '@/api/types/auth/TUserToken';

export function getUserCookie(): TUserToken {
  const cookie = cookies();

  if (!cookie.has('user')) return null;

  return JSON.parse(cookie.get('user').value) satisfies TUserToken;
}

export function setUserCookie(user: TUserToken): void {
  const cookie = cookies();

  cookie.set('user', JSON.stringify(user));
}
