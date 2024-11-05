import { useContext } from 'react';
import { AuthContext, TAuthContext } from '@/components/providers/AuthProvider';

export function useAuth(): TAuthContext {
  return useContext(AuthContext);
}
