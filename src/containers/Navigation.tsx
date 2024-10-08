'use client';

import React, { PropsWithChildren } from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { appLinks, settings } from '@/roots/links';
import { Separator } from '@/components/ui/separator';
import NavBar from '@/containers/NavBar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type NavigationProps = {} & PropsWithChildren;

const navigationButtonClassName = 'flex justify-between gap-4 w-full text-md';

function Navigation(props: NavigationProps) {
  const location = usePathname();

  return (
    <>
      <NavBar />
      <div className={'w-full flex-grow flex gap-5 p-5 relative'}>
        <div
          className={cn(
            'hidden lg:flex flex-col gap-2 p-2 rounded bg-background2 h-[89.5vh] w-[20%] min-2-[220px] max-w-[350px] sticky top-5',
            location === '/' || location === '/auth' ? 'lg:hidden' : '',
          )}
        >
          <div className={'flex flex-col gap-1 flex-grow'}>
            {appLinks
              .filter((link) => link !== settings)
              .map((link) => {
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
        </div>
        <div className={navigationButtonClassName}>{props.children}</div>
      </div>
    </>
  );
}

export default Navigation;
