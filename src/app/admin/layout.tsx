import NavigationLayout from '@components/layouts/NavigationLayout/NavigationLayout';
import { AuthHeader } from '@features/auth/components/common/AuthHeader';

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <AuthHeader />
      <NavigationLayout>{children}</NavigationLayout>
    </>
  );
}
