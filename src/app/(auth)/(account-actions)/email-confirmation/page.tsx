import EmailVerificationPage from './_page';

type EmailVerificationServerPageProps = {
  searchParams: {
    token: string;
    email: string;
  };
};

export default function EmailVerificationServerPage({ searchParams }: EmailVerificationServerPageProps) {
  return <EmailVerificationPage {...searchParams} />;
}
