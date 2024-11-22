'use client';

import { useEffect, useState } from 'react';
import { emailVerification } from '@features/auth/actions/commands/email-verification.http';
import { TApiError } from '@api/types/api-error';
import { AuthErrorResultMap } from '@features/auth/maps';
import { AuthErrorResultEnum } from '@features/auth/enums';
import { TbLoader2 } from 'react-icons/tb';

type EmailVerificationPageProps = {
  token: string;
  userId: string;
};

export default function EmailVerificationPage(props: EmailVerificationPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const verifyEmail = async (signal: AbortSignal) => {
    setError('');
    setIsLoading(true);
    const response = await emailVerification({ ...props }, signal);
    setIsLoading(false);

    if (!response.ok) {
      const error: TApiError = await response.json();
      setError(AuthErrorResultMap.get(error.code as AuthErrorResultEnum));

      return;
    }

    setSuccessMessage('Pomyślnie zweryfikowano adres e-mail.');
  };

  useEffect(() => {
    const controller = new AbortController();
    verifyEmail(controller.signal);

    return () => controller.abort({});
  }, []);

  return (
    <div>
      <h3>Weryfikacja adresu e-mail</h3>
      {isLoading ? (
        <>
          <div className={'w-full flex justify-center'}>
            <TbLoader2 className={'h-10 w-10 text-primary animate-spin repeat-infinite'} />
          </div>
          <p className={'text-center'}>Trwa weryfikacja twojego adresu e-mail</p>
        </>
      ) : (
        <>
          {successMessage && <p className={'text-primary'}>{successMessage}</p>}
          {error && <p className={'text-destructive'}>{error}</p>}
        </>
      )}
    </div>
  );
}
