'use client';

import { createContext, PropsWithChildren } from 'react';
import { TUserToken } from '@/api/types/auth/TUserToken';
import { useRouter } from 'next/navigation';
import { useCookie } from '@/hooks/useCookie';

type TAuthContext = {
  user: TUserToken;
  login: (auth: TUserToken) => void;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext>(null);

type AuthProviderProps = {} & PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser, deleteUser] = useCookie<TUserToken>('user');
  const router = useRouter();

  const login = (auth: TUserToken): void => {
    setUser(auth);

    const currentSearchParams = new URLSearchParams(window.location.search);

    if (currentSearchParams.has('redirect')) {
      const redirectUrl = currentSearchParams.get('redirect');

      router.push(redirectUrl);

      return;
    }
    router.push('/');
  };

  const logout = () => {
    deleteUser();
    router.push('/auth');
  };

  if (user === null) logout();

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
