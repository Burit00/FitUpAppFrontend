import Link from 'next/link';

export const SignUpPageLink = () => {
  return (
    <p>
      Nie posiadasz jeszcze konta?{' '}
      <Link href={'/signup'} className={'text-primary underline text-nowrap'}>
        Zarejestruj się
      </Link>
    </p>
  );
};
