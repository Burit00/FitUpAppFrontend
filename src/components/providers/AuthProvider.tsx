'use client';

import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TUserToken } from '@/api/types/auth/TUserToken';
import FitUpHttpClient from '@/api/http/fit-up/fit-up-http-client';
import { HttpStatusEnum } from '@/api/enums/HttpStatusEnum';
import { useCookie } from '@/hooks/useCookie';
import { COOKIE_KEYS } from '@/constants/CookieKeys';

export type TAuthContext = {
  user: TUserToken;
  login: (auth: TUserToken) => void;
  logout: (redirect?: boolean) => void;
};

export const AuthContext = createContext<TAuthContext>(null);
type AuthProviderProps = {} & PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [logoutInterceptor, setLogoutInterceptor] = useState(null);
  const [user, setUser, deleteUser] = useCookie<TUserToken>(COOKIE_KEYS.USER);
  const pathname = usePathname();
  const router = useRouter();

  const logout = useCallback((): void => {
    deleteUser();
    router.push('/auth');
  }, [deleteUser, router]);

  const login = (auth: TUserToken): void => {
    if (!auth) return;

    setUser(auth);
    router.push('/');
  };

  useEffect(() => {
    if (!user) return FitUpHttpClient.removeResponseInterceptor(logoutInterceptor);

    const responseInterceptor = FitUpHttpClient.addResponseInterceptor((response: Response) => {
      if (response?.status === HttpStatusEnum.UNAUTHORIZED) logout();

      return response;
    });

    setLogoutInterceptor(responseInterceptor);
  }, [user, logout]);

  useEffect(() => {
    if (!user) return;

    const tokenExpires = user.expires - Date.now();

    const timeoutId = setTimeout(() => {
      logout();
    }, tokenExpires);

    return () => clearTimeout(timeoutId);
  }, [user, logout]);

  useEffect(() => {
    if (!user && !pathname.startsWith('/auth')) router.push('/auth');
  }, [user, pathname, router]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
