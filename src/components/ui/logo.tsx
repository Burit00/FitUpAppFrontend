import Image from 'next/image';

type LogoProps = {
  className?: string;
};

const Logo = (props: LogoProps) => {
  return <Image src={'assets/logo.svg'} width={122} height={24} alt={''} {...props} />;
};

export { Logo };
