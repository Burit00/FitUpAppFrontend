import React from 'react';
import LoginForm from '@/app/auth/components/LoginForm';
import SignUpForm from '@/app/auth/components/SignUpForm';
import { Logo } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AuthSearchEnum } from '@/app/auth/enums/AuthSearchEnum';

type AuthPageProps = {
  searchParams: {
    auth: AuthSearchEnum;
  };
};

function AuthPage(props: AuthPageProps) {
  const auth = props.searchParams.auth ?? AuthSearchEnum.LOGIN;

  return (
    <div className={'relative w-full h-full p-10 sm:px-[5rem] flex-grow flex justify-around items-center'}>
      <LoginForm
        className={cn('w-full max-w-[450px] lg:w-2/5', auth === AuthSearchEnum.LOGIN ? 'flex' : 'hidden lg:flex')}
      />
      <SignUpForm
        className={cn('w-full max-w-[450px] lg:w-2/5', auth === AuthSearchEnum.SIGNUP ? 'flex' : 'hidden lg:flex')}
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
