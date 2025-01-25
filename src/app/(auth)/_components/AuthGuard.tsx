'use client';

import { useRouter } from 'next/navigation';
import { useCookie } from '@/hooks/useCookie';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { AdminPage, HomePage } from '@/middleware';
import { TUserToken } from '@features/auth/types';
import { UserRoleEnum } from '@features/auth/enums';

export default function AuthGuard() {
  const [token] = useCookie<TUserToken>(COOKIE_KEYS.USER);
  const router = useRouter();

  if (token) router.push(token.roles.includes(UserRoleEnum.ADMIN) ? AdminPage : HomePage);

  return null;
}
