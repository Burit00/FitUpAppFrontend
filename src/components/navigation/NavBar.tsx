'use client';

import React, { useContext } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import Link from 'next/link';
import { Button, Icon, Logo } from '@/components/ui';
import { AuthContext } from '@/components/providers/AuthProvider';

function NavBar() {
  const authContext = useContext(AuthContext);

  return (
    <header className={'w-full flex flex-row justify-between items-center px-4 py-2 bg-background2'}>
      <Link href={'/'}>
        <Logo className={'h-[24px]'} />
      </Link>
      <div className={'h-10'}>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            if (authContext.user) authContext.logout(false);
          }}
        >
          <Icon icon={FaRegUser} />
        </Button>
      </div>
    </header>
  );
}

export default NavBar;
