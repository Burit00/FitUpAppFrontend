'use client';

import { ModuleButton, ModuleButtonProps } from '@components/ModuleButton';
import { calendar, parameters, quickStart, settings, statistics } from '@/app/(user)/links';

export default function Home() {
  const modules: ModuleButtonProps[] = [
    {
      ...quickStart,
      className: 'col-span-2 sm:col-span-1 row-start-1',
    },
    calendar,
    statistics,
    parameters,
    settings
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
