'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookie } from '@/hooks/useCookie';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { TSignIn, TUserToken } from '@features/auth/types';
import { signIn } from '@features/auth/actions/commands/sign-in';
import { UserTokenSchema } from '@features/auth/schemas';
import { AuthErrorResultEnum } from '@features/auth/enums';
import { TApiError } from '@api/types/api-error';

export type TAuthContext = {
  user: TUserToken;
  login: (auth: TSignIn) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth(): TAuthContext {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
}

type AuthProviderProps = {} & PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser, deleteUser] = useCookie<TUserToken>(COOKIE_KEYS.USER);
  const [_, setAccessToken, deleteAccessToken] = useCookie<string>(COOKIE_KEYS.ACCESS_TOKEN);
  const router = useRouter();

  const logout = useCallback((): void => {
    deleteUser();
    deleteAccessToken();
    router.push('/login');
  }, [deleteUser, deleteAccessToken, router]);

  const login = async (userCredentials: TSignIn): Promise<void> => {
    const res = await signIn(userCredentials);
    const body = await res.json();

    if (!res.ok) {
      const error: TApiError<AuthErrorResultEnum> = body;
      throw new Error(error.code);
    }
    const auth = UserTokenSchema.parse(body);

    if (!auth) throw new Error(AuthErrorResultEnum.SOMETHING_WENT_WRONG);

    router.replace('/');
    setUser(auth, { expires: new Date(auth.expires) });
    setAccessToken(auth.accessToken, { expires: new Date(auth.expires) });
  };

  useEffect(() => {
    if (!user) return;

    const sessionExpired = () => {
      deleteUser();
      deleteAccessToken();
      router.push('/session-expired');
    };

    const tokenExpires = user.expires - Date.now();
    const timeoutId = setTimeout(sessionExpired, tokenExpires > 0 ? tokenExpires : 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, deleteUser, deleteAccessToken, router]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
