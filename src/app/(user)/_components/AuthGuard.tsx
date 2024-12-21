'use client';

import { useRouter } from 'next/navigation';
import { useCookie } from '@/hooks/useCookie';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { TUserToken } from '@features/auth/types';

export default function AuthGuard() {
  const [user] = useCookie<TUserToken>(COOKIE_KEYS.USER);
  const router = useRouter();

  if (!user) router.push('/login');
  else if (user.expires - Date.now() < 0) router.push('/unauthorized');

  return null;
}
