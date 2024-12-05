import { titleMetadata } from '@/utils/metadata';
import ResetPasswordRequestClientPage from '@/app/(auth)/(account-actions)/reset-password-request/_page';

export const metadata = {
  title: titleMetadata('Resetowanie hasła'),
};

export default function ResetPasswordRequestServerPage() {
  return <ResetPasswordRequestClientPage />;
}
