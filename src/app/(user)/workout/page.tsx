'use client';

import { useRouter } from 'next/navigation';
import { toDateOnly } from '@/utils/date';
import { Loader } from '@components/Loader';

export default function WorkoutPage() {
  const router = useRouter();
  router.replace(`/workout/${toDateOnly(new Date())}`);

  return <Loader />;
}
