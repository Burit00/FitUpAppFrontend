import { type NextRequest, NextResponse } from 'next/server';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { COOKIE_KEYS } from '@/constants/CookieKeys';

function isAuthenticated(cookies: RequestCookies): boolean {
  return cookies.has(COOKIE_KEYS.USER);
}

export default function middleware(req: NextRequest): NextResponse {
  const isLoggedIn = isAuthenticated(req.cookies);

  if (!isLoggedIn && !req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  if (isLoggedIn && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    //PublicRoutes
    '/auth',
    //AuthRoutes
    '/',
    '/calendar',
    '/workout',
    '/workout/:id',
  ],
};
