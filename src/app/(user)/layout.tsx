import NavigationLayout from '@components/layouts/NavigationLayout/NavigationLayout';

type UserLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: UserLayoutProps) {
  return <NavigationLayout>{children}</NavigationLayout>;
}
