import { SignUpForm } from '@features/auth/components';
import { FormWrapper } from '../_components/FormWrapper';
import { LoginPageLink } from '../_components/LoginPageLink';
import { titleMetadata } from '@/utils/metadata';

export const metadata = {
  title: titleMetadata('Rejestracja'),
  description: 'Strona rejestracji',
};

export default function LoginPage() {
  return (
    <FormWrapper direction={'reverse'}>
      <SignUpForm />
      <LoginPageLink />
    </FormWrapper>
  );
}
