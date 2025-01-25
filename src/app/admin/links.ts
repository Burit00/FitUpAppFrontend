'use client';

import { FaGear } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa';
import { Link } from '@/types/link';
import { PiPersonSimpleBikeFill } from 'react-icons/pi';
import { BiSolidCategory } from 'react-icons/bi';

export const exercises: Link = {
  name: 'Ćwiczenia',
  link: '/admin/exercises',
  icon: PiPersonSimpleBikeFill,
};

export const categories: Link = {
  name: 'Kategorie ćwiczeń',
  link: '/admin/categories',
  icon: BiSolidCategory,
};

export const users: Link = {
  name: 'Użytkownicy',
  link: '/admin/users',
  icon: FaUsers,
  disabled: true,
};

export const settings: Link = {
  name: 'Ustawienia',
  link: '/admin/settings',
  icon: FaGear,
  disabled: true,
};
