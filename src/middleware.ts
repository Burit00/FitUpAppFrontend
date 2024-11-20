import { NextRequest, NextResponse } from 'next/server';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { TUserToken } from '@features/auth/types';
import { UserRoleEnum } from '@features/auth/enums';

export const LoginPage = '/login';
export const SignUpPage = '/signup';
export const AdminPage = '/admin';
export const HomePage = '/';
export const CalendarPage = '/calendar';
export const WorkoutPage = '/workout';
export const WorkoutDatePage = '/workout/:date';

function isAuthenticated(cookies: RequestCookies): boolean {
  return cookies.has(COOKIE_KEYS.USER);
}

function getUser(cookies: RequestCookies): TUserToken {
  return JSON.parse(cookies.get(COOKIE_KEYS.USER)?.value) as TUserToken;
}

export default function middleware(req: NextRequest): NextResponse {
  const nextPathname = req.nextUrl.pathname;
  const isLoggedIn = !!isAuthenticated(req.cookies);

  if (!isLoggedIn) {
    if (nextPathname !== LoginPage && nextPathname !== SignUpPage) {
      return NextResponse.redirect(new URL(LoginPage, req.url));
    }

    return NextResponse.next();
  }

  const user = getUser(req.cookies);
  const hasAdminRole = user.roles.includes(UserRoleEnum.ADMIN);
  const hasUserRole = user.roles.includes(UserRoleEnum.USER);

  if (nextPathname.startsWith(LoginPage)) {
    const redirectPath = hasAdminRole ? LoginPage : HomePage;

    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  if (hasAdminRole && !nextPathname.startsWith(AdminPage)) {
    return NextResponse.redirect(new URL(AdminPage, req.url));
  }

  if (hasUserRole && nextPathname.startsWith(AdminPage)) {
    return NextResponse.redirect(new URL(HomePage, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    //PublicRoutes
    '/login',
    '/signup',
    //AuthRoutes
    '/',
    '/admin',
    '/calendar',
    '/workout/:date',
  ],
};
