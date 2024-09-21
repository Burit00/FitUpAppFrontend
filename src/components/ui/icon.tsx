import React from 'react';
import { IconType } from 'react-icons';

type IconProps = {
  icon: IconType;
  className?: string;
};

function Icon(props: IconProps) {
  const { className, icon: Component } = props;

  return <Component className={className} />;
}

export { Icon };
