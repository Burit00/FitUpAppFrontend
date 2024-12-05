import React from 'react';
import type { Metadata } from 'next';
import WorkoutPage from './_page';
import { titleMetadata } from '@/utils/metadata';
import { redirect } from 'next/navigation';

type WorkoutServerPageProps = {
  params: {
    date: string;
  };
};

export async function generateMetadata({ params }: WorkoutServerPageProps): Promise<Metadata> {
  const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
  if (!dateRegex.test(params.date)) redirect('../');

  const date = new Date(decodeURIComponent(params.date));

  return {
    title: titleMetadata(`Trening ${date.toLocaleDateString()}`),
    description:
      'Na tej stronie znajdziesz szczegółowy plan treningowy na wybrany dzień, zaprojektowany, aby pomóc Ci w monitorowaniu i realizacji celów fitness. Wygodnie podzielone na sesje i grupy mięśniowe, ćwiczenia uwzględniają czas trwania, liczbę serii, powtórzeń oraz obciążenie dla każdego ruchu. Przy każdym ćwiczeniu znajdziesz dodatkowe wskazówki dotyczące prawidłowej techniki oraz sugestie dotyczące intensywności, aby maksymalizować efekty treningu.',
  };
}

export default async function WorkoutServerPage(props: WorkoutServerPageProps) {
  const date = new Date(decodeURIComponent(props.params.date));

  return <WorkoutPage date={date} />;
}
