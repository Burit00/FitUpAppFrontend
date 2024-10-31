'use client';

import { createContext, PropsWithChildren, useEffect } from 'react';
import { TUserToken } from '@/api/types/auth/TUserToken';
import { useRouter } from 'next/navigation';
import { useCookie } from '@/hooks/useCookie';

type TAuthContext = {
  user: TUserToken;
  login: (auth: TUserToken) => void;
  logout: (redirect?: boolean) => void;
};

export const AuthContext = createContext<TAuthContext>(null);
const REDIRECT_KEY = 'redirect';

type AuthProviderProps = {} & PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser, deleteUser] = useCookie<TUserToken>('user');
  const router = useRouter();

  const login = (auth: TUserToken): void => {
    if (auth === null) return;

    setUser(auth);

    const currentSearchParams = new URLSearchParams(window.location.search);

    if (currentSearchParams.has(REDIRECT_KEY)) {
      const redirectUrl = currentSearchParams.get(REDIRECT_KEY);
      router.push(redirectUrl);

      return;
    }
    router.push('/');
  };

  const logout = (redirect: boolean = true): void => {
    deleteUser();
    if (redirect) {
      const redirectUrl = encodeURIComponent(location.pathname + location.search);

      return router.push(`/auth?${REDIRECT_KEY}=${redirectUrl}`);
    }

    router.push('/auth');
  };

  useEffect(() => {
    if (!user) return;

    const tokenExpires = user.expires - Date.now();

    const timeoutId = setTimeout(() => {
      logout(true);
    }, tokenExpires);

    return () => clearTimeout(timeoutId);
  }, [user?.expires, logout]);

  if (user === null) logout();

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
