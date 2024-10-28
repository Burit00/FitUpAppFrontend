import { type NextRequest, NextResponse } from 'next/server';
import { getUserCookie } from '@/utils/get-server-cookies';

export default function middleware(req: NextRequest): NextResponse {
  const user = getUserCookie();

  if (!user && req.nextUrl.pathname !== '/auth') {
    const nextUrl = new URL('/auth', req.url);

    if (req.nextUrl.pathname !== '/auth') {
      const redirectUrl = encodeURIComponent(req.nextUrl.pathname);

      nextUrl.searchParams.append('redirect', redirectUrl);
    }

    return NextResponse.redirect(nextUrl);
  }

  if (user && req.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth', '/calendar'],
};
