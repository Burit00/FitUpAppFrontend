import { IconType } from 'react-icons';

export type Link = {
  name: string;
  link: string;
  icon: IconType;
  disabled?: boolean;
};