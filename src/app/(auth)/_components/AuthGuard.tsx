'use client';

import { useRouter } from 'next/navigation';
import { useCookie } from '@/hooks/useCookie';
import { COOKIE_KEYS } from '@/constants/CookieKeys';

export default function AuthGuard() {
  const [token] = useCookie(COOKIE_KEYS.USER);
  const router = useRouter();

  if (token) router.push('/');

  return null;
}
