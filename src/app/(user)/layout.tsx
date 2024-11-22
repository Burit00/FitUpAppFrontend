import NavigationLayout from '@components/layouts/NavigationLayout/NavigationLayout';
import { AuthHeader } from '@features/auth/components/common/AuthHeader';

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