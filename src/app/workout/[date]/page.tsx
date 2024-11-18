import React from 'react';
import type { Metadata } from 'next';
import WorkoutPage from './_page';

type WorkoutServerPageProps = {
  params: {
    date: string;
  };
};

export async function generateMetadata({ params }: WorkoutServerPageProps): Promise<Metadata> {
  const date = new Date(decodeURIComponent(params.date));

  return {
    title: `Trening ${date.toLocaleDateString()} | FitUp`,
    description:
      'Na tej stronie znajdziesz szczegółowy plan treningowy na wybrany dzień, zaprojektowany, aby pomóc Ci w monitorowaniu i realizacji celów fitness. Wygodnie podzielone na sesje i grupy mięśniowe, ćwiczenia uwzględniają czas trwania, liczbę serii, powtórzeń oraz obciążenie dla każdego ruchu. Przy każdym ćwiczeniu znajdziesz dodatkowe wskazówki dotyczące prawidłowej techniki oraz sugestie dotyczące intensywności, aby maksymalizować efekty treningu.',
  };
}

export default async function WorkoutServerPage(props: WorkoutServerPageProps) {
  const date = new Date(decodeURIComponent(props.params.date));

  return <WorkoutPage date={date} />;
}
