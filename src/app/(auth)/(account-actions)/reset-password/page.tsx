import ResetPasswordClientPage from '@/app/(auth)/(account-actions)/reset-password/_page';
import { titleMetadata } from '@/utils/metadata';

export const metadata = {
  title: titleMetadata('Resetowanie hasła'),
};

type ResetPasswordPageProps = {
  searchParams: {
    token: string;
    email: string;
  };
};

export default function ResetPasswordServerPage({ searchParams }: ResetPasswordPageProps) {
  return <ResetPasswordClientPage {...searchParams} />;
}
