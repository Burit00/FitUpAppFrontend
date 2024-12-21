import { ReactNode } from 'react';
import type { Metadata } from 'next';
import NavigationLayout from '@components/layouts/NavigationLayout/NavigationLayout';
import { AuthHeader } from '@features/auth/components/common/AuthHeader';
import { titleMetadata } from '@/utils/metadata';
import AuthGuard from './_components/AuthGuard';

export const metadata: Metadata = {
  title: titleMetadata('Home'),
  description: 'Strona startowa',
};

type UserLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <AuthHeader />
      <NavigationLayout>{children}</NavigationLayout>
      <AuthGuard/>
    </>
  );
}
