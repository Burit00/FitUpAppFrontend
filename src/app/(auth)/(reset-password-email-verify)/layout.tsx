import React from 'react';
import { BackToLoginButton } from '@/app/(auth)/_components/BackToLoginButton';
import { Logo } from '@components/ui';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={'h-full w-full grid place-items-center'}>
      <div className={'p-5 rounded bg-background2 w-full sm:w-[500px] flex flex-col gap-4'}>
        <Logo className={'h-10 mx-auto'} />
        {children}
        <BackToLoginButton />
      </div>
    </div>
  );
}
