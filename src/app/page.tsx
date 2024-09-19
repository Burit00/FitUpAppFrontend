import {Button} from '@/components/ui/button';

export default function Home() {
  const modules = [
    {
      name: 'Kalendarz'
    },
    {
      name: 'Ćwiczenia'
    },
    {
      name: 'Parametry'
    },
    {
      name: 'Ustawienia'
    },
    {
      name: 'Szybki start',
      class: 'grow'
    },
  ];

  return (
    <div className={'w-full h-[100vh] flex justify-center items-center flex-wrap gap-10'}>
      {modules.map((module) => (
        <Button key={module.name} variant={'default'} className={`bg-accent text-accent-foreground w-[40%] lg:w-[200px] lg:aspect-square ${module?.class}`}>
          {module.name}
        </Button>
      ))}
    </div>
  );
}
