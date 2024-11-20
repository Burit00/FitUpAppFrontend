import React, { useMemo } from 'react';
import { cn } from '@/utils';
import { Separator } from '@/components/ui';
import { appLinks, settings } from '@/roots/links';
import { usePathname } from 'next/navigation';
import { NavigationButton } from '@components/layouts/NavigationLayout/_components/NavigationButton';

const Navigation = () => {
  const pathname = usePathname();
  const links = useMemo(() => {
    return appLinks.filter((link) => link !== settings);
  }, []);

  if (['/', '/login', '/signup'].includes(pathname)) return null;

  return (
    <nav
      className={cn(
        'hidden lg:flex flex-col gap-2 p-2 rounded bg-background2 w-[20%] min-2-[220px] max-w-[350px] sticky top-0',
      )}
    >
      <div className={'flex flex-col gap-1 flex-grow'}>
        {links.map((link) => {
          return <NavigationButton key={link.name} link={link} />;
        })}
      </div>
      <div className={'flex flex-col gap-2 w-full'}>
        <Separator />
        <NavigationButton key={settings.name} link={settings} />
      </div>
    </nav>
  );
};
export default Navigation;
