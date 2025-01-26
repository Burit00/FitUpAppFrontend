'use client';

import { FaChartLine, FaCirclePlay, FaGear, FaHeartPulse } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from '@/types/link';

export const quickStart: Link = {
  name: 'Szybki start',
  link: '/workout',
  icon: FaCirclePlay,
};

export const calendar: Link = {
  name: 'Kalendarz',
  link: '/calendar',
  icon: FaCalendarAlt,
};

export const statistics: Link = {
  name: 'Statystyki',
  link: '/stats',
  icon: FaChartLine,
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