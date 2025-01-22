import { FaChartLine, FaCirclePlay, FaGear, FaHeartPulse } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';

export type Link = {
  name: string;
  link: string;
  icon: IconType;
  disabled?: boolean;
};

export const quickStart: Link = {
  name: 'Szybki start',
  link: '/workout/',
  icon: FaCirclePlay,
};

export const calendar: Link = {
  name: 'Kalendarz',
  link: '/calendar',
  icon: FaCalendarAlt,
};

export const statistics: Link = {
  name: 'Statystyki',
  link: '/exercise',
  icon: FaChartLine,
  disabled: true,
};

export const parameters: Link = {
  name: 'Twoje Parametry',
  link: '/calendar',
  icon: FaHeartPulse,
  disabled: true,
};

export const settings: Link = {
  name: 'Ustawienia',
  link: '/settings',
  icon: FaGear,
  disabled: true,
};

export const appLinks: Link[] = [quickStart, calendar, statistics, parameters, settings];
