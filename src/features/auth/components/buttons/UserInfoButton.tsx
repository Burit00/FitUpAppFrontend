import { Button, Icon } from '@components/ui';
import { FaRegUser } from 'react-icons/fa6';
import { useAuth } from '@/hooks/useAuth';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { LuLogOut } from 'react-icons/lu';

export const UserInfoButton = () => {
  const { user, logout } = useAuth();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <Icon icon={FaRegUser} />
        </Button>
      </PopoverTrigger>
      <PopoverContent title={'user profile'}>
        <p>
          Email: <span className={'text-foreground'}>{user?.email}</span>
        </p>
        <Button className={'w-full'} variant={'outline'} onClick={logout}>
          <LuLogOut />
          Wyloguj
        </Button>
      </PopoverContent>
    </Popover>
  );
};
