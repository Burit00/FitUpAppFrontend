import LogoSlider from '@/app/(auth)/(authentication)/_components/LogoSlider';
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={'relative w-full h-full p-10 sm:px-[5rem] flex-grow flex justify-around items-center'}>
      {children}
      <LogoSlider />
    </div>
  );
}
