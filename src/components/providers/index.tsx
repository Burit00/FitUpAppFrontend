import React, { PropsWithChildren } from 'react';
import AuthProvider from '@/components/providers/AuthProvider';
import CookieProvider from '@/components/providers/CookieProvider';

type ProvidersProps = PropsWithChildren;

export default function Providers({ children }: ProvidersProps) {
  return (
    <CookieProvider>
      <AuthProvider>{children}</AuthProvider>
    </CookieProvider>
  );
}
