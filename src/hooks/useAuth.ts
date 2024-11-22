import { useContext } from 'react';
import { AuthContext, TAuthContext } from '@features/auth/contexts/AuthProvider';

export function useAuth(): TAuthContext {
  return useContext(AuthContext);
}
