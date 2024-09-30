import { FaChartLine, FaCirclePlay, FaGear, FaHeartPulse } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
type Link = {
  name: string;
  link: string;
  icon: IconType;
};

export const quickStart: Link = {
  name: 'Szybki start',
  link: '/trening?date=' + new Date().toISOString().split('T')[0],
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
};

export const parameters: Link = {
  name: 'Twoje Parametry',
  link: '/calendar',
  icon: FaHeartPulse,
};

export const settings: Link = {
  name: 'Ustawienia',
  link: '/settings',
  icon: FaGear,
};

export const appLinks: Link[] = [quickStart, calendar, statistics, parameters, settings];
