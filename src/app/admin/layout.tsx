import NavigationLayout from '@components/layouts/NavigationLayout/NavigationLayout';
import { AuthHeader } from '@features/auth/components/common/AuthHeader';
import AuthGuard from '@/app/(user)/_components/AuthGuard';

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <AuthGuard/>
      <AuthHeader />
      <NavigationLayout>{children}</NavigationLayout>
    </>
  );
}
