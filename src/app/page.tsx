import {FaCalendarAlt} from 'react-icons/fa';
import {FaChartLine, FaCirclePlay, FaGear, FaHeartPulse} from 'react-icons/fa6';
import {ModuleButton, ModuleButtonProps} from '@/app/(components)/moduleButton';

export default function Home() {
  const modules: ModuleButtonProps[] = [
    {
      name: 'Szybki start',
      className: 'col-span-2 sm:col-span-1 row-start-1',
      link: '/trening?date=' + new Date().toISOString().split('T')[0],
      icon: FaCirclePlay
    },
    {
      name: 'Kalendarz',
      link: '/calendar',
      icon: FaCalendarAlt
    },
    {
      name: 'Statystyki',
      link: '/exercise',
      icon: FaChartLine
    },
    {
      name: 'Twoje Parametry',
      link: '/calendar',
      icon: FaHeartPulse
    },
    {
      name: 'Ustawienia',
      link: '/calendar',
      icon: FaGear
    }
  ];

  return (
    <div className={'w-full flex flex-col flex-grow justify-start lg:justify-center items-center p-10'}>
      <div
        className={'w-full lg:w-[80%] 2xl:w-[60%] grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 gap-2 md:gap-4'}>
        {modules.map((module) => (
          <ModuleButton key={module.name} {...module}/>
        ))}
      </div>
    </div>
  );
}
