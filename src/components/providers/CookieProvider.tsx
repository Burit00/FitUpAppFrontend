'use client';

import { CookiesProvider } from 'react-cookie';

export default function CookieProvider({ children }: { children: React.ReactNode }) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
