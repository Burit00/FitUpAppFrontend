import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import CalendarPage from '@/app/(user)/calendar/_page';
import { titleMetadata } from '@/utils/metadata';

type CalendarServerPageProps = {
  searchParams: {
    year: string;
  };
};

export async function generateMetadata({ searchParams }: CalendarServerPageProps): Promise<Metadata> {
  return {
    title: titleMetadata(`Kalendarz roku ${searchParams.year}`),
    description:
      'Strona prezentuje interaktywny kalendarz roczny, na którym zaznaczone są wszystkie dni, w których odbyły się twoje treningi. Umożliwia szybki wgląd w regularność i postępy w treningach w ujęciu całorocznym, a także pozwala użytkownikowi na analizę swoich aktywności i wyciąganie wniosków na temat konsekwencji w realizacji celów fitness.',
  };
}

export default function CalendarServerPage(props: CalendarServerPageProps) {
  const yearAsNumber = Number(props.searchParams.year);

  if (!props.searchParams.year || isNaN(yearAsNumber)) {
    return redirect('calendar?year=' + new Date().getFullYear());
  }

  return <CalendarPage year={yearAsNumber} />;
}
