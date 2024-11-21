import React from 'react';
import Header from '@components/layouts/NavigationLayout/_components/Header';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
