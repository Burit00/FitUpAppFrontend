import { cn } from '@/utils';
import { Separator } from '@/components/ui';
import { usePathname } from 'next/navigation';
import { NavigationButton } from '@components/layouts/NavigationLayout/_components/NavigationButton';
import { Link } from '@/types/link';

type NavigationProps = {
  topSectionLinks?: Link[];
  bottomSectionLinks?: Link[];
};

const Navigation = (props: NavigationProps) => {
  const pathname = usePathname();

  if (['/home', '/admin'].includes(pathname)) return null;

  return (
    <nav
      className={cn(
        'hidden lg:flex flex-col gap-2 p-2 rounded bg-background2 w-[20%] min-w-[220px] max-w-[350px] sticky top-0'
      )}
    >
      <div className={'flex flex-col gap-1 flex-grow'}>
        {props.topSectionLinks && props.topSectionLinks?.map((link) => {
          return <NavigationButton key={link.name} link={link} />;
        })}
      </div>
      <div className={'flex flex-col gap-2 w-full'}>
        {(props.bottomSectionLinks && props.bottomSectionLinks.length > 0) && (
          <>
            <Separator />
            {props.bottomSectionLinks.map((link) => <NavigationButton key={link.name} link={link} />)}
          </>
        )}
      </div>
    </nav>
  );
};
export default Navigation;
