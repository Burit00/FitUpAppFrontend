import { SignUpForm } from '@features/auth/components';
import { FormWrapper } from '../_components/FormWrapper';
import { LoginPageLink } from '../_components/LoginPageLink';

export default function LoginPage() {
  return (
    <FormWrapper direction={'reverse'}>
      <SignUpForm />
      <LoginPageLink />
    </FormWrapper>
  );
}
