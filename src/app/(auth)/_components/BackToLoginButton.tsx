import { Button } from '@components/ui';
import Link from 'next/link';

export const BackToLoginButton = () => (
  <Button variant={'ghost'} className={'w-full'} asChild>
    <Link href={'/login'}>Powróć aby się zalogować</Link>
  </Button>
);
