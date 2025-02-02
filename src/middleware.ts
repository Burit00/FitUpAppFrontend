import { NextRequest, NextResponse } from 'next/server';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { COOKIE_KEYS } from '@/constants/CookieKeys';

export const LoginPage = '/login';
export const SignUpPage = '/signup';
export const EmailConfirmationPage = '/email-confirmation';
export const ResetPasswordPage = '/reset-password';
export const ResetPasswordRequestPage = '/reset-password-request';
export const UnauthorizedPage = '/unauthorized';
export const AdminPage = '/admin';
export const HomePage = '/home';
export const CalendarPage = '/calendar';
export const WorkoutPage = '/workout';
export const WorkoutDatePage = '/workout/:path?';
export const WorkoutDatePageRegex = /workout\/(\d{4}-\d{2}-\d{2})/;

function isAuthenticated(cookies: RequestCookies): boolean {
  return cookies.has(COOKIE_KEYS.USER);
}

// function getUserInfo(cookies: RequestCookies): TUserToken | undefined {
//   return JSON.parse(cookies.get(COOKIE_KEYS.USER)?.value ?? '') as TUserToken;
// }

const LOGGED_IN_ROUTES = [HomePage, CalendarPage, WorkoutPage];
const LOGOUT_ROUTES = [LoginPage, SignUpPage];

export default function middleware(req: NextRequest): NextResponse {
  const nextPathname = req.nextUrl.pathname;
  const isLoggedIn = isAuthenticated(req.cookies);

  if (nextPathname === '/') {
    return NextResponse.redirect(new URL(isLoggedIn ? HomePage : LoginPage, req.url));
  }

  if (
    !isLoggedIn &&
    LOGGED_IN_ROUTES.some(
      (authPath: string) => nextPathname.startsWith(authPath) || WorkoutDatePageRegex.test(nextPathname)
    )
  ) {
    return NextResponse.redirect(new URL(UnauthorizedPage, req.url));
  }

  if (isLoggedIn && LOGOUT_ROUTES.includes(nextPathname)) {
    return NextResponse.redirect(new URL(HomePage, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    //AuthRoutes
    '/home',
    '/calendar',
    '/workout',
    '/workout/:path?',
    '/admin',
    '/admin/exercises',
    '/admin/exercise-categories',
    //PublicRoutes
    '/login',
    '/signup',
  ],
};
