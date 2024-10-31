import { type NextRequest, NextResponse } from 'next/server';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

function isAuthenticated(cookies: RequestCookies): boolean {
  return cookies.has('user');
}

export default function middleware(req: NextRequest): NextResponse {
  const isLoggedIn = isAuthenticated(req.cookies);

  if (!isLoggedIn && req.nextUrl.pathname !== '/auth') {
    const nextUrl = new URL('/auth', req.url);
    const redirectUrl = encodeURIComponent(req.nextUrl.pathname);
    nextUrl.searchParams.append('redirect', redirectUrl);

    return NextResponse.redirect(nextUrl);
  }

  if (isLoggedIn && req.nextUrl.pathname === '/auth') {
    // return NextResponse.redirect(new URL('/', req.url));
    return NextResponse.rewrite(req.url);
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
