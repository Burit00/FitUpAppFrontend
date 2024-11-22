import Link from 'next/link';

export const LoginPageLink = () => {
  return (
    <p>
      Masz już konto?{' '}
      <Link href={'/login'} className={'text-primary underline text-nowrap'}>
        Zaloguj się
      </Link>
    </p>
  );
};
