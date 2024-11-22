import { LoginForm } from '@features/auth/components';
import { FormWrapper } from '../_components/FormWrapper';
import { SignUpPageLink } from '../_components/SignUpPageLink';

export default function LoginPage() {
  return (
    <FormWrapper>
      <LoginForm />
      <SignUpPageLink />
    </FormWrapper>
  );
}
