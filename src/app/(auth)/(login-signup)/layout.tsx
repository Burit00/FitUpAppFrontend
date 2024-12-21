import { ReactNode } from 'react';
import LogoSlider from './_components/LogoSlider';
import AuthGuard from '@/app/(auth)/_components/AuthGuard';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={'relative w-full h-full p-10 sm:px-[5rem] flex-grow flex justify-around items-center'}>
      {children}
      <LogoSlider />
      <AuthGuard />
    </div>
  );
}
