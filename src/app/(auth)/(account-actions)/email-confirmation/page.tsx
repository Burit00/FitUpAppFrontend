import EmailVerificationPage from './_page';
import { titleMetadata } from '@/utils/metadata';

export const metadata = {
  title: titleMetadata('Potwierdzenie adresu e-mail'),
};

type EmailVerificationServerPageProps = {
  searchParams: {
    token: string;
    email: string;
  };
};

export default function EmailVerificationServerPage({ searchParams }: EmailVerificationServerPageProps) {
  return <EmailVerificationPage {...searchParams} />;
}
