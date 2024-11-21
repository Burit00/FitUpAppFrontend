import Link from 'next/link';
import { ButtonProps, Logo } from '@/components/ui';
import { ReactElement } from 'react';

type HeaderProps = {
  buttons?: ReactElement<ButtonProps>[];
};

function Header({ buttons }: HeaderProps) {
  return (
    <header className={'w-full flex flex-row justify-between items-center px-4 py-2 bg-background2'}>
      <Link href={'/'}>
        <Logo className={'h-[24px]'} />
      </Link>
      <div className={'h-10'}>{buttons}</div>
    </header>
  );
}

export default Header;
