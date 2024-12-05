import React from 'react';
import { AuthSuccessResultEnum } from '@features/auth/enums/auth-success-result.enum';
import { AuthSuccessResultMap } from '@features/auth/maps/auth-success-result.map';
import { titleMetadata } from '@/utils/metadata';

export const metadata = {
  title: titleMetadata('Adres e-mail pomyślnie zweryfikowany'),
};

export default function SignUpConfirmationPage() {
  const message = AuthSuccessResultMap.get(AuthSuccessResultEnum.SIGN_UP);

  return (
    <>
      <h3>Pomyślnie zarejestrowano</h3>
      <p className={'text-primary'}>{message}</p>
    </>
  );
}
