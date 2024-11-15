import React from 'react';
import { IconType } from 'react-icons';

type IconProps = {
  icon: IconType;
  className?: string;
  onClick?: () => void;
};

function Icon(props: IconProps) {
  const { className, onClick: handleClick, icon: Component } = props;

  return <Component onClick={handleClick} className={className} />;
}

export { Icon };
