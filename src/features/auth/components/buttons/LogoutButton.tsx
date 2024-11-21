import { Button, Icon } from '@components/ui';
import { FaRegUser } from 'react-icons/fa6';
import { useAuth } from '@/hooks/useAuth';

export const LogoutButton = () => {
  const auth = useAuth();

  return (
    <Button
      size={'icon'}
      variant={'ghost'}
      onClick={() => {
        auth.logout();
      }}
    >
      <Icon icon={FaRegUser} />
    </Button>
  );
};
