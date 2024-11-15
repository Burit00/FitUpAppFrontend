import React from 'react';
import type { Metadata } from 'next';
import WorkoutPage from './_page';

export const metadata: Metadata = {
  title: 'FitUp | Workout',
  description: 'FitUp - Workout',
};

type WorkoutServerPageProps = {
  params: {
    date: string;
  };
};

export default async function WorkoutServerPage(props: WorkoutServerPageProps) {
  const date = new Date(decodeURIComponent(props.params.date));

  return <WorkoutPage date={date} />;
}
