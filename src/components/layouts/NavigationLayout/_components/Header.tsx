'use client';

import { FaRegUser } from 'react-icons/fa6';
import Link from 'next/link';
import { Button, Icon, Logo } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

function Header() {
  const auth = useAuth();
  const pathname = usePathname();

  return (
    <header className={'w-full flex flex-row justify-between items-center px-4 py-2 bg-background2'}>
      <Link href={'/'}>
        <Logo className={'h-[24px]'} />
      </Link>
      <div className={'h-10'}>
        {!pathname.startsWith('/auth') && (
          <Button
            size={'icon'}
            variant={'ghost'}
            onClick={() => {
              auth.logout();
            }}
          >
            <Icon icon={FaRegUser} />
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
