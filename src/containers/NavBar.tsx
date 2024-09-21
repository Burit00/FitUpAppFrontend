import React from 'react';
import {Logo} from '@/components/ui/logo';
import {FaRegUser} from 'react-icons/fa6';
import {Button} from '@/components/ui/button';
import {Icon} from '@/components/ui/icon';
import Link from 'next/link';

async function NavBar() {
  return (
    <nav className={'w-full flex flex-row justify-between items-center px-4 py-2 bg-background2'}>
      <Link href={'/'}><Logo className={'h-[30px]'}/></Link>
      <div><Button size={'icon'} variant={'ghost'}><Icon icon={FaRegUser}/></Button></div>
    </nav>
  );
}

export default NavBar;