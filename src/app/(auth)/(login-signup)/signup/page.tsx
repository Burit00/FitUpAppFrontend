import React from 'react';
import { SignUpForm } from '@features/auth/components';

export default function LoginPage() {
  return (
    <>
      <div className={'hidden lg:block w-full max-w-[450px] lg:w-2/5'}></div>
      <SignUpForm className={'w-full max-w-[400px] lg:w-2/5'} />
    </>
  );
}
