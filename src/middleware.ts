import { NextRequest, NextResponse } from 'next/server';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { COOKIE_KEYS } from '@/constants/CookieKeys';

export const LoginPage = '/login';
export const SignUpPage = '/signup';
export const EmailConfirmationPage = '/email-confirmation';
export const ResetPasswordPage = '/reset-password';
export const ResetPasswordRequestPage = '/reset-password-request';
export const SessionExpiredPage = '/session-expired';
export const AdminPage = '/admin';
export const HomePage = '/';
export const CalendarPage = '/calendar';
export const WorkoutPage = '/workout';
export const WorkoutDatePage = '/workout/:path?';

function isAuthenticated(cookies: RequestCookies): boolean {
  return cookies.has(COOKIE_KEYS.ACCESS_TOKEN);
}

export default function middleware(req: NextRequest): NextResponse {
  const nextPathname = req.nextUrl.pathname;
  const isLoggedIn = isAuthenticated(req.cookies);

  if (
    !isLoggedIn &&
    (nextPathname === HomePage || (!nextPathname.startsWith(LoginPage) && !nextPathname.startsWith(SignUpPage)))
  ) {
    return NextResponse.redirect(new URL(LoginPage, req.url));
  }

  if (isLoggedIn && (nextPathname.startsWith(LoginPage) || nextPathname.startsWith(SignUpPage)))
    return NextResponse.redirect(new URL(HomePage, req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    //AuthRoutes
    '/',
    '/calendar',
    '/workout',
    '/workout/:path?',
    //PublicRoutes
    '/login',
    '/signup',
  ],
};
