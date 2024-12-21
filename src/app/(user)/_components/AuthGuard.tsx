'use client';

import { useRouter } from 'next/navigation';
import { useCookie } from '@/hooks/useCookie';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { TUserToken } from '@features/auth/types';
import { LoginPage, UnauthorizedPage } from '@/middleware';

export default function AuthGuard() {
  const [user] = useCookie<TUserToken>(COOKIE_KEYS.USER);
  const router = useRouter();

  if (!user) router.push(LoginPage);
  else if (user.expires - Date.now() < 0) router.push(UnauthorizedPage);

  return null;
}
