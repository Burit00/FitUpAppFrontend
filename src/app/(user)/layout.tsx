import NavigationLayout from '@components/layouts/NavigationLayout/NavigationLayout';
import { AuthHeader } from '@features/auth/components/common/AuthHeader';
import type { Metadata } from 'next';
import { titleMetadata } from '@/utils/metadata';

export const metadata: Metadata = {
  title: titleMetadata('Home'),
  description: 'Strona startowa',
};

type UserLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <AuthHeader />
      <NavigationLayout>{children}</NavigationLayout>
    </>
  );
}
