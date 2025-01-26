'use client';

import { ModuleButton, ModuleButtonProps } from '@components/ModuleButton';
import { categories, exercises, settings, users } from './links';

export default function AdminHomePage() {
  const modules: ModuleButtonProps[] = [
    {
      ...exercises,
      className: 'col-span-2 sm:col-span-1 row-start-1',
    },
    categories,
    users,
    settings,
  ];

  return (
    <div className={'w-full flex flex-col flex-grow justify-start lg:justify-center items-center p-10'}>
      <div
        className={
          'w-full lg:w-[80%] 2xl:w-[60%] grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 gap-2 md:gap-4'
        }
      >
        {modules.map((module) => (
          <ModuleButton key={module.name} {...module} />
        ))}
      </div>
    </div>
  );
}
