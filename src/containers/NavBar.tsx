import React from 'react';
import { FaRegUser } from 'react-icons/fa6';
import Link from 'next/link';
import { Button, Icon, Logo } from '@/components/ui';

function NavBar() {
  return (
    <nav className={'w-full flex flex-row justify-between items-center px-4 py-2 bg-background2'}>
      <Link href={'/'}>
        <Logo className={'h-[24px]'} />
      </Link>
      <div>
        <Button size={'icon'} variant={'ghost'}>
          <Icon icon={FaRegUser} />
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
