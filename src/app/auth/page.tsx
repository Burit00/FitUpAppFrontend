import React from 'react';
import LoginForm from '@/app/auth/LoginForm';
import SignUpForm from '@/app/auth/SignUpForm';
import { Logo } from '@/components/ui';
import { cn } from '@/lib/utils';

enum AuthPageEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

type AuthPageProps = {
  searchParams: {
    auth: AuthPageEnum;
  };
};

function AuthPage(props: AuthPageProps) {
  let { auth } = props.searchParams;

  if (!auth) {
    auth = AuthPageEnum.LOGIN;
  }

  return (
    <div className={'relative w-full h-full p-10 sm:px-[5rem] flex-grow flex justify-around items-center'}>
      <LoginForm
        className={cn('w-full max-w-[450px] lg:w-2/5', auth === AuthPageEnum.LOGIN ? 'flex' : 'hidden lg:flex')}
      />
      <SignUpForm
        className={cn('w-full max-w-[450px] lg:w-2/5', auth === AuthPageEnum.SIGNUP ? 'flex' : 'hidden lg:flex')}
      />
      <div
        className={cn(
          'h-full w-1/2 bg-background hidden lg:grid place-items-center absolute transition',
          auth === 'login' ? 'translate-x-1/2' : '-translate-x-1/2',
        )}
      >
        <Logo className={'md:w-[90%] w-[80%] max-w-[500px]'} />
      </div>
    </div>
  );
}

export default AuthPage;
