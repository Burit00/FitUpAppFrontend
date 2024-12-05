import { LoginForm } from '@features/auth/components';
import { FormWrapper } from '../_components/FormWrapper';
import { SignUpPageLink } from '../_components/SignUpPageLink';
import { titleMetadata } from '@/utils/metadata';

export const metadata = {
  title: titleMetadata('Logowanie'),
  description: 'Strona logowania',
};

export default function LoginPage() {
  return (
    <FormWrapper>
      <LoginForm />
      <SignUpPageLink />
    </FormWrapper>
  );
}
