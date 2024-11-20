import React from 'react';
import { LoginForm } from '@features/auth/components';

export default function LoginPage() {
  return (
    <>
      <LoginForm className={'w-full max-w-[400px] lg:w-2/5'} />
      <div className={'hidden lg:block w-full max-w-[450px] lg:w-2/5'}></div>
    </>
  );
}
