import React from 'react';
import { cn } from '@/utils';
import Link from 'next/link';
import { Button, Separator } from '@/components/ui';
import { appLinks, settings } from '@/roots/links';
import { usePathname } from 'next/navigation';

const navigationButtonClassName = 'flex justify-between gap-4 w-full text-md';

const links = appLinks.filter((link) => link !== settings);

const Navigation = () => {
  const pathname = usePathname();

  if (pathname === '/' || pathname.startsWith('/auth')) return null;

  return (
    <nav
      className={cn(
        'hidden lg:flex flex-col gap-2 p-2 rounded bg-background2 w-[20%] min-2-[220px] max-w-[350px] sticky top-0',
      )}
    >
      <div className={'flex flex-col gap-1 flex-grow'}>
        {links.map((link) => {
          return (
            <Link key={link.name} href={link.link}>
              <Button variant={'secondary'} className={navigationButtonClassName}>
                <span>{link.name}</span>
                <link.icon />
              </Button>
            </Link>
          );
        })}
      </div>
      <div className={'flex flex-col gap-2 w-full'}>
        <Separator />
        <Link href={settings.link}>
          <Button variant={'secondary'} className={navigationButtonClassName}>
            {settings.name}
            <settings.icon />
          </Button>
        </Link>
      </div>
    </nav>
  );
};
export default Navigation;
