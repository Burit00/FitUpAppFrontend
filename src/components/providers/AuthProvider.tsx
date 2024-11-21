'use client';

import { createContext, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FitUpHttpClient } from '@api';
import { HttpStatusEnum } from '@/api/enums';
import { useCookie } from '@/hooks/useCookie';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { TSignIn, TUserToken } from '@features/auth/types';
import { signIn } from '@features/auth/actions/commands/sign-in';
import { UserTokenSchema } from '@features/auth/schemas';
import { AuthActionErrorResultEnum, UserRoleEnum } from '@features/auth/enums';

export type TAuthContext = {
  user: TUserToken;
  login: (auth: TUserToken) => Promise<void>;
  logout: (redirect?: boolean) => void;
};

export const AuthContext = createContext<TAuthContext>(null);
type AuthProviderProps = {} & PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const logoutInterceptor = useRef(null);
  const [user, setUser, deleteUser] = useCookie<TUserToken>(COOKIE_KEYS.USER);
  const router = useRouter();

  const logout = useCallback((): void => {
    deleteUser();
    router.push('/login');
  }, [deleteUser, router]);

  const login = async (userCredentials: TSignIn): Promise<void> => {
    const res = await signIn(userCredentials);
    const body = await res.json();
    //TODO: show toaster on action

    if (!res.ok) throw new Error(AuthActionErrorResultEnum.BAD_USER_CREDENTIALS);
    const auth = UserTokenSchema.parse(body);

    if (!auth) throw new Error(AuthActionErrorResultEnum.SOMETHING_WENT_WRONG);

    setUser(auth);

    if (auth.roles.includes(UserRoleEnum.ADMIN)) router.push('/admin');
    else router.push('/');
  };

  useEffect(() => {
    if (!user) return;

    logoutInterceptor.current = FitUpHttpClient.addResponseInterceptor((response: Response) => {
      if (response?.status === HttpStatusEnum.UNAUTHORIZED) logout();

      return response;
    });

    const tokenExpires = user.expires - Date.now();
    const timeoutId = setTimeout(logout, tokenExpires > 0 ? tokenExpires : 0);

    return () => {
      clearTimeout(timeoutId);
      FitUpHttpClient.removeResponseInterceptor(logoutInterceptor.current);
    };
  }, [user, logout]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
