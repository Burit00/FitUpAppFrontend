'use server';

import { cookies } from 'next/headers';
import { TUserToken } from '@/api/types/auth/TUserToken';

export async function getUserCookie(): Promise<TUserToken> {
  const cookie = cookies();

  if (!cookie.has('user')) return null;

  return JSON.parse(cookie.get('user').value) satisfies TUserToken;
}

export async function setUserCookie(user: TUserToken): Promise<void> {
  const cookie = cookies();

  cookie.set('user', JSON.stringify(user));
}
