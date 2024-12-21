import Image from 'next/image';
import { env } from '@/environment/env';

type LogoProps = {
  className?: string;
};

const Logo = (props: LogoProps) => {
  return <Image src={'/assets/logo.svg'} width={122} height={24} alt={`${env.APP_NAME} logo`} {...props} />;
};

export { Logo };
